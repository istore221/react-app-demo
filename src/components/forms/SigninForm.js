import React from 'react';
import { Field, reduxForm } from 'redux-form';


export class SigninForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { handleSubmit,pristine,submitting} = this.props;

    return (

      <form className="sigin-form" onSubmit={ handleSubmit } >
        <div className="form-group">
          <Field component="input" type="text" className="form-control" name="username"  placeholder="Username" />
        </div>
        <div className="form-group">
          <Field component="input" type="password" className="form-control" name="password"  placeholder="Password" />
        </div>

        <button type="submit" disabled={pristine || submitting} className="btn btn-primary btn-block text-uppercase">signin</button>

      </form>

    );

  }

}

// Decorate the form component
SigninForm = reduxForm({
  form: 'signin' // a unique name for this form
})(SigninForm);

export default SigninForm;
