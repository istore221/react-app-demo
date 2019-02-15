import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loadingGif from '../../../assets/images/loading.gif';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


const mapStateToProps = state => {
  return {

  }};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);




export class Step1Form extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount(){

  }


  renderField = ({input, label, type, meta: {touched, error}}) => {
    return (
      <div>
          <input {...input} className="form-control" type={type} placeholder={label}  />
          {touched && error && <span className="text-danger">{error}</span>}
      </div>
    )
  }

  renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => {

      return (
        <div>
        <select {...input} className="form-control">
          {children}
        </select>
        {touched && error && <span className="text-danger">{error}</span>}
        </div>
      )

  }

  renderRadioField = ({ input, label, type, meta: { touched, error }}) => {

    return (
      <div className="radio">
        <label className="text-uppercase"> <input {...input}  type={type} placeholder={label} /><span></span> {label}</label>
      </div>
    )

  }


  renderDatetimePicker = ({input, label, type, meta: {touched, error}}) => {
    return (
      <div>
        <Datetime {...input} inputProps={{readOnly:true}}  />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>

    )
  }




  render() {



    const { handleSubmit,submitting,initialValues,invalid  } = this.props;



    return (


      <form  onSubmit={ handleSubmit }>

          <div className="form-group">
            <label htmlFor="promotion_id">Promotion Id</label>
            <Field type="text"  name="promotion_id" label="Promotion Id goes here..."   component={this.renderField}    />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <Field type="text"  name="start_date"  component={this.renderDatetimePicker}  />
          </div>

          <div className="col-md-6 no-padding">
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <Field type="text" name="duration"  label="Duration goes here..." component={this.renderField}  />
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-group">
            <ul className="list-unstyled list-inline">
                <li>
                  <Field component={this.renderRadioField} type="radio" name="duration_type" value="hours" label="Hours"/>
                </li>
                <li>
                  <Field component={this.renderRadioField} type="radio" name="duration_type" value="days" label="Days"/>
                </li>
                <li>
                  <Field component={this.renderRadioField} type="radio" name="duration_type" value="weeks" label="Weeks"/>
                </li>
                <li>
                  <Field component={this.renderRadioField} type="radio" name="duration_type" value="months" label="Months"/>
                </li>

            </ul>
          </div>
          </div>
          <div className="clearfix"></div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <Field name="type" component={this.renderSelectField}>
              <option></option>
              <option value="revenue">Revenue</option>
              <option value="usage">Usage</option>
            </Field>
        </div>

        <button type="submit" disabled={invalid || submitting} className="btn btn-primary pull-right text-uppercase">Next</button>
      </form>

    );

  }

}


const validate = values => {
  const errors = {}

  if (!values.promotion_id) {
    errors.promotion_id = 'Required'
  }

  if (isNaN(Number(values.promotion_id))){
      errors.promotion_id = 'Must be a number'
  }


  if (!values.duration) {
    errors.duration = 'Required'
  }

  if (isNaN(Number(values.duration))){
      errors.duration = 'Must be a number'
  }

  if (!values.start_date) {
    errors.start_date = 'Required'
  }

  if (!values.type) {
    errors.type = 'Required'
  }

  if (!values.duration_type) {
    errors.duration_type = 'Required'
  }

  return errors
}


Step1Form = reduxForm({
  form: 'promotionWizard',
  enableReinitialize: true,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Step1Form);




export default connect(mapStateToProps, mapDispatchToProps)(Step1Form);
