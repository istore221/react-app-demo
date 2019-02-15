import React from 'react';
import { Field, reduxForm  , change, untouch} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import * as roleActions from '../../actions/role';
import loadingGif from '../../assets/images/loading.gif';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const actions = {
  ...userActions,
  ...roleActions
}

const mapStateToProps = state => {
  return {
    initialValues: state.user.selectedUser,
    addUserError: state.user.addUserError,
    addUserProgress: state.user.addUserProgress,

    getRolesProgress: state.role.getRolesProgress,
    getRolesError: state.role.getRolesError,
    getRolesResponse:state.role.getRolesResponse


  }};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);




export class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: (this.props.initialValues ? this.props.initialValues.roles : "")
    }
  }

  componentDidMount(){
    this.props.getRoles();

  }

  componentWillUnmount(){

    this.props.clearUserState({
      selectedUser: null,
      addUserError: null
    });

  }

  renderErrors = () => {
    if(this.props.addUserError){
       return Object.entries(this.props.addUserError.error.details.messages).map((value,index)=>{
            return <li key={value[0]} className="text-danger"><small>{`${value[0]} ${value[1][0]}`}</small></li>
       })
    }
  }



  render() {


    const { handleSubmit,pristine,submitting,initialValues} = this.props;


    return (

      <div>

      <ul>{this.renderErrors()}</ul>



      <form className="user-form" onSubmit={ handleSubmit }  >
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <Field component="input" type="text" className="form-control" name="firstName"  placeholder="Firstname goes here..." />
          </div>
          <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
            <Field component="input" type="text" className="form-control" name="lastName"  placeholder="Lastname goes here..." />
          </div>
          <div className="form-group">
          <label htmlFor="username">Username</label>
            <Field component="input" type="text" className="form-control" name="username"  placeholder="Username goes here..." />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field component="input" type="password" className="form-control" name="password"   placeholder="Password goes here..." />
          </div>
          <div className="form-group">
            <label htmlFor="roles">Roles</label>
            <Field
              name="roles"
              className="form-control"
                component={props => {
                  return (


                      <Select
                        {...props.input}
                        options={this.props.getRolesResponse}
                        multi={true}
                        labelKey="name"
                        valueKey="id"
                        searchable={false}
                        clearable={true}
                        autofocus={true}
                        openAfterFocus={true}
                        value={this.state.value}
                        onBlur={() => props.input.onBlur(props.input.value.length == 0 ? "" : [...props.input.value])}
                        onChange={(value) => {
                          this.setState({
                            value: value
                          });

                          return props.input.onChange(value.map(p => p.id))
                        }}
                      />

                  )

                }
              }
            />

          </div>

          <div className="form-group text-center">
            <div className="checkbox">
              <label className="text-uppercase"><Field name="locked" component="input" type="checkbox"/> <span></span> Lock</label>
            </div>
         </div>


          <button type="submit" disabled={pristine || submitting} className="btn btn-primary  btn-block text-uppercase">{initialValues ? "Update" : "Add"} user</button>
          {this.props.addUserProgress ? <img style={{width:60,margin:'0px auto',display:'block',position:'relative'}} className="text-center image-responsive" src={loadingGif} /> : null}
    </form>

    </div>

    );

  }

}




UserForm = reduxForm({
  form: 'user'
})(UserForm);




export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
