import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return {

  }};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);




export class SelfA extends React.Component {



  renderField = ({input, label, type, meta: {touched, error}}) => {
    return (
      <div>
          <input {...input} className="form-control" type={type} placeholder={label}   />
          {touched && error && <span className="text-danger">{error}</span>}
      </div>
    )
  }

  render(){

    const { handleSubmit,pristine,submitting,invalid} = this.props;

    return (
      <form className="selfa-form" onSubmit={ handleSubmit } >
      <div className="col-md-2">
        <div className="form-group">
          <label htmlFor="min">Run Id</label>
          <Field type="text"  name="runsid"   component={this.renderField}  />
        </div>
      </div>

        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="min">Max No of Clusters</label>
            <Field type="text"  name="runs"   component={this.renderField}  />
          </div>
        </div>

          <button type="submit" disabled={pristine || submitting} className="btn btn-primary btn-block text-uppercase">Start</button>
      </form>
    )
  }

}


SelfA = reduxForm({
  form: 'selfa'
})(SelfA);


export default connect(mapStateToProps, mapDispatchToProps)(SelfA);
