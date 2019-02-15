import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return {

  }};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);



export class RuleForm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount(){

  }

  renderField = ({input, label, type, meta: {touched, error}}) => {
    return (
      <div>
          <input {...input} className="form-control" type={type} placeholder={label}   />
          {touched && error && <span className="text-danger">{error}</span>}
      </div>
    )
  }

  render() {

    const { handleSubmit,pristine,submitting,invalid} = this.props;

    return (

      <form className="role-form" onSubmit={ handleSubmit } >
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="segmentation">Segmentation</label>
            <Field type="text"  name="segmentation" label="Segmentation goes here..."  component={this.renderField}  />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="threshold">Threshold</label>
            <Field type="text"  name="threshold" label="Threshold goes here..."  component={this.renderField}  />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="product">product</label>
            <Field type="text"  name="product" label="Product goes here..."  component={this.renderField}  />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="message">message</label>
            <Field type="textarea"  name="message" label="Message goes here..."  component={this.renderField}  />
          </div>
        </div>
        <div className="col-md-12">
          <button type="submit" disabled={invalid || pristine || submitting} className="btn btn-primary  btn-block text-uppercase">Add Rule</button>
        </div>


    </form>

    );

  }

}



const validate = values => {
  const errors = {}

  if (!values.segmentation) {
    errors.segmentation = 'Required'
  }

  if (!values.threshold) {
    errors.threshold = 'Required'
  }

  if (isNaN(Number(values.threshold))){
      errors.threshold = 'Must be a number'
  }

  if (!values.product) {
    errors.product = 'Required'
  }

  if (!values.message) {
    errors.message = 'Required'
  }

  return errors
}


RuleForm = reduxForm({
  form: 'rule',
  validate
})(RuleForm);




export default connect(mapStateToProps, mapDispatchToProps)(RuleForm);
