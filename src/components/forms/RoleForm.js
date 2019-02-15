import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleActions from '../../actions/role';
import loadingGif from '../../assets/images/loading.gif';

const mapStateToProps = state => {
  return {
    initialValues: state.role.selectedRole,
    addRoleError: state.role.addRoleError,
    addRoleProgress: state.role.addRoleProgress
  }};

const mapDispatchToProps = dispatch => bindActionCreators(roleActions, dispatch);




export class RoleForm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount(){

    this.props.clearRoleState({
      selectedRole: null,
      addRoleError: null
    });


  }



  render() {



    const { handleSubmit,pristine,submitting,initialValues} = this.props;

    return (

      <form className="role-form" onSubmit={ handleSubmit } >
          <div className="form-group">
            <label htmlFor="name">Role</label>
            <Field component="input" type="text" className="form-control" name="name"  placeholder="Rolename goes here..." />
            {this.props.addRoleError ? <p className="text-danger m-t-2"><small>{this.props.addRoleError.error.details.messages.name[0]}</small></p> : null}
          </div>
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary  btn-block text-uppercase">{initialValues ? "Update" : "Add"} role</button>
          {this.props.addRoleProgress ? <img style={{width:60,margin:'0px auto',display:'block',position:'relative'}} className="text-center image-responsive" src={loadingGif} /> : null}
    </form>

    );

  }

}



// Decorate the form component
RoleForm = reduxForm({
  form: 'role' // a unique name for this form
})(RoleForm);




export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
