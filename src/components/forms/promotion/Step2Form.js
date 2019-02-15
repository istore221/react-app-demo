import React from 'react';
import { Field, reduxForm , FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loadingGif from '../../../assets/images/loading.gif';

const mapStateToProps = state => {

  return {
    initialValues: {
      ...state.form.promotionWizard.values,
      rules: state.promotion.selectedRules
    },
    selectedRules: state.promotion.selectedRules
  }};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);



export class Step2Form extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount(){

  }



  renderRules = ({ fields }) => {


     return <ul className="list-unstyled">{fields.map((rule, index) => {
        return (
            <li key={index}>

              <Field
                name={`${rule}.segmentation`}
                type="hidden"
                component='input'
              />
              <Field
                name={`${rule}.threshold`}
                type="hidden"
                component='input'
              />
              <Field
                name={`${rule}.product`}
                type="hidden"
                component='input'
              />
              <Field
                name={`${rule}.message`}
                type="hidden"
                component='input'
              />


          </li>

        )
    })}</ul>


  }


  render() {



    const { handleSubmit,pristine,submitting } = this.props;

    return (

      <form onSubmit={ handleSubmit }>

        <FieldArray name="rules" component={this.renderRules} />
        <button type="submit" disabled={this.props.selectedRules.length <= 0}  className="btn btn-primary pull-right text-uppercase">Next</button>


      </form>

    );

  }

}




Step2Form = reduxForm({
  form: 'promotionWizard',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true
})(Step2Form);




export default connect(mapStateToProps, mapDispatchToProps)(Step2Form);
