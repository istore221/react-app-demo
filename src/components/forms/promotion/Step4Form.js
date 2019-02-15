import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loadingGif from '../../../assets/images/loading.gif';
import Dropzone from 'react-dropzone';
import axios from 'axios';



const mapStateToProps = state => {
  return {
      
  }};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);



const ACCEPTED_MIME_TYPES = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel';

export class Step4Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading:false
    }
  }

  componentWillUnmount(){

  }

  renderDropzoneInputForCustomerCategory = (field) => {
    const files = field.input.value;


    return (
      <div>



        <Dropzone
          style={{width:'100%',border:'1px dashed gray',height:'150px',textAlign:'center'}}
          name={field.name}
          maxfiles={1}
          multiple={false}
          onDrop={( files, e ) => {
            this.setState({uploading:true})
            const file = files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "pbaejxpq");
            formData.append("api_key", "895821418824158");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            axios.post("https://api.cloudinary.com/v1_1/dl0kmjyls/upload", formData, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
              const data = response.data;
              const fileURL = data.secure_url;
              field.input.onChange(fileURL);
              this.setState({uploading:false})

            }).catch(()=>{
              this.setState({uploading:false})
            });


          }}
        >
          <div>Drop Customer Category file Here.</div>
        </Dropzone>
        {files && Array.isArray(files) && (
          <ul className="list-unstyled">
            { files.map((file, i) => <li key={i}>{file.name}</li>) }
          </ul>
        )}
      </div>
    );

  }


  onupload = (prmoise) => {
    alert("sas");
  }



  render() {



    const { handleSubmit,pristine,submitting,invalid} = this.props;

    return (

      <div className="col-md-12">

      {this.state.uploading ? <img style={{width:60,margin:'0px auto',display:'block',position:'relative'}} className="text-center image-responsive" src={loadingGif} /> : null}


        <form onSubmit={ handleSubmit }>

            <div className="col-md-12">
              <div className="form-group">
                <Field name="customer_category_file" onupload={this.onupload} component={this.renderDropzoneInputForCustomerCategory}  />
              </div>
            </div>


          <button type="submit" disabled={invalid || submitting}  className="btn btn-primary pull-right text-uppercase">Next</button>


        </form>


      </div>


    );

  }

}


const validate = values => {
  const errors = {}

  if (!values.customer_category_file) {
    errors.customer_category_file = 'Required'
  }



  return errors
}



Step4Form = reduxForm({
  form: 'promotionWizard',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Step4Form);




export default connect(mapStateToProps, mapDispatchToProps)(Step4Form);
