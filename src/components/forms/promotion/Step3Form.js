import React from 'react';
import { Field, reduxForm , change } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loadingGif from '../../../assets/images/loading.gif';
import {ReduxFormChange,ReduxFormUntouch} from '../../../actions/common';
import {clearPromotionState} from '../../../actions/promotion';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Collapsible from 'react-collapsible';

const mapStateToProps = state => {
  return {
    selectedSource: state.promotion.selectedSource,
    selectedSourceFormat: state.promotion.selectedSourceFormat
  }};

const mapDispatchToProps = dispatch => bindActionCreators({ReduxFormChange,ReduxFormUntouch,clearPromotionState,change}, dispatch);





export class Step3Form extends React.Component {

  constructor(props) {
    super(props);
    this.items = {
      huawei: [1,2,3,4],
      verizon: [2,1,4,3],
      customized: ["","","",""]
    }

  }

  componentWillUnmount(){

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

  renderField = ({input, label, type, meta: {touched, error}}) => {
    return (
      <div>
          <input {...input} className="form-control" type={type} placeholder={label}   />
          {touched && error && <span className="text-danger">{error}</span>}
      </div>
    )
  }


  onSourceChange = (event) => {

    const target_value = event.target.value;
    if(target_value == "Select Source"){
      this.props.change('promotionWizard', 'msidn',"")
      this.props.change('promotionWizard', 'event_time',"")
      this.props.change('promotionWizard', 'usage',"")
      this.props.change('promotionWizard', 'charge',"")
    }else{
        const items = this.items[target_value];

        this.props.change('promotionWizard', 'msidn',items[0])
        this.props.change('promotionWizard', 'event_time',items[1])
        this.props.change('promotionWizard', 'usage',items[2])
        this.props.change('promotionWizard', 'charge',items[3])
    }


  }

  renderCustomSourcePane = () => {
    return (
        <div>
          <div className="form-group">
            <label htmlFor="delimiter">Delimiter</label>
            <Field type="text"  name="delimiter" label="Overide Delimiter"  component={this.renderField}  /> <span className="text-muted">(default -> tab)</span>
          </div>



        </div>
    )
  }







  render() {




    this.items['custom'] =  (this.props.selectedSourceFormat != null ? this.props.selectedSourceFormat : this.items['huawei'] ); // set custom format to  last known selected format

    const { handleSubmit,invalid,submitting} = this.props;



    return (

      <div>

      <form onSubmit={ handleSubmit }>

      <Collapsible trigger="SOURCE CONFIGURATION">


              <div className="panel-heading text-center text-uppercase text-info">
                Source Configuration
              </div>
              <br />

                  <div className="form-group">
                    <label htmlFor="type">Source</label>
                    <Field name="source" component={this.renderSelectField} onChange={this.onSourceChange}>
                      <option>Select Source</option>
                      <option value="huawei">Huawei</option>
                      <option value="verizon">Verizon</option>
                      <option value="customized">Custom</option>
                    </Field>
                </div>

                <div className="col-md-3 no-padding">
                  <div className="form-group">
                    <label htmlFor="msidn">MSIDN</label>
                    <Field type="text"  name="msidn" label="MSIDN index goes here..."  component={this.renderField}  />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="event_time">Event Time</label>
                    <Field type="text"  name="event_time" label="Event Time index goes here..."  component={this.renderField}  />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="usage">Usage</label>
                    <Field type="text"  name="usage" label="Usage index goes here..."  component={this.renderField}  />
                  </div>
                </div>


                <div className="col-md-3 no-padding">
                  <div className="form-group">
                    <label htmlFor="charge">Charge</label>
                    <Field type="text"  name="charge" label="Charge index goes here..."  component={this.renderField}  />
                  </div>
                </div>

      </Collapsible>


          <div className="clearfix"></div>
          <br/>


          <Collapsible trigger="SPARK CONFIGURATION">

          <div className="panel-heading text-center text-uppercase text-info">
            Spark Configuration
          </div>

          <br />

          <div className="col-md-3">
            <p>spark.task.maxFailures</p>
          </div>

          <div className="col-md-6">
            <p>
              Number of failures of any particular task before giving up on the job. The total number of failures spread across different tasks will not cause the job to fail; a particular task has to fail this number of attempts. Should be greater than or equal to 1. Number of allowed retries = this value - 1.
            </p>
          </div>

          <div className="col-md-3">
            <Field type="text"  name="sparkTaskMaxFailures"  component={this.renderField}  />
          </div>


          <div className="clearfix"></div>
          <hr />

          <div className="col-md-3">
            <p>spark.yarn.maxAppAttempts</p>
          </div>

          <div className="col-md-6">
              <p>
              The maximum number of attempts that will be made to submit the application. It should be no larger than the global number of max attempts in the YARN configuration.

              </p>
          </div>

          <div className="col-md-3">
            <Field type="text"  name="sparkYarnMaxAppAttempts"  component={this.renderField}  />
          </div>

            <div className="clearfix"></div>
              <hr />

          <div className="col-md-3">
              <p>spark.yarn.max.attemptFailuresValidityInterval</p>
          </div>

          <div className="col-md-6">
              <p>
              Defines the validity interval for AM failure tracking. If the AM has been running for at least the defined interval, the AM failure count will be reset. This feature is not enabled if not configured.
              </p>
          </div>

          <div className="col-md-3">
            <Field type="text"  name="sparkYarnMaxattemptFailuresValidityInterval"  component={this.renderField}  />
          </div>

          <div className="clearfix"></div>
          <hr />

          <div className="col-md-3">
            <p>spark.yarn.max.executor.failures</p>
          </div>

          <div className="col-md-6">
              <p>
              The maximum number of executor failures before failing the application.
              </p>
          </div>

          <div className="col-md-3">
                <Field type="text"  name="sparkYarnMaxExecutorFailures"  component={this.renderField}  />
          </div>

          </Collapsible>




          <div className="clearfix"></div>
          <br/>


          <Collapsible trigger="KAFKA CONFIGURATION">

          <div className="panel-heading text-center text-uppercase text-info">
            Kafka Configuration
          </div>

          <div className="col-md-3">
            <p>Brokers List</p>
          </div>

          <div className="col-md-6">
          <p>
            Each node in the cluster is called a Kafka broker
          </p>
          </div>

          <div className="col-md-3">
                <Field type="text"  name="brokers"  component={this.renderField}  />
          </div>

          <div className="clearfix"></div>
          <hr />

          <div className="col-md-3">
            <p>Source Channel</p>
          </div>

          <div className="col-md-6">
          <p>
            Source Channel
          </p>
          </div>

          <div className="col-md-3">
                <Field type="text"  name="sourceChannel"  component={this.renderField}  />
          </div>

          <div className="col-md-3">
            <p>Integration Channel</p>
          </div>

          <div className="col-md-6">
          <p>
            Integration Channel
          </p>
          </div>

          <div className="col-md-3">
                <Field type="text"  name="IntegrationChannel"  component={this.renderField}  />
          </div>


          </Collapsible>


          <div className="clearfix"></div>
          <br/>


                    <Collapsible trigger="DATABASE CONFIGURATION">

                    <div className="panel-heading text-center text-uppercase text-info">
                      Database Configuration
                    </div>

                    <div className="col-md-3">
                      <p>Server</p>
                    </div>

                    <div className="col-md-6">
                    <p>
                      Hostname of the database server
                    </p>
                    </div>

                    <div className="col-md-3">
                          <Field type="text"  name="server"  component={this.renderField}  />
                    </div>

                    <div className="clearfix"></div>
                    <hr />


                    <div className="col-md-3">
                      <p>Port</p>
                    </div>

                    <div className="col-md-6">
                    <p>
                      Database Server Port
                    </p>
                    </div>

                    <div className="col-md-3">
                          <Field type="text"  name="Port"  component={this.renderField}  />
                    </div>

                    <div className="col-md-3">
                      <p>Database</p>
                    </div>

                    <div className="col-md-6">
                    <p>
                      Database Name
                    </p>
                    </div>

                    <div className="col-md-3">
                          <Field type="text"  name="database"  component={this.renderField}  />
                    </div>

                    <div className="clearfix"></div>
                    <hr />


                    <div className="col-md-3">
                      <p>Table</p>
                    </div>

                    <div className="col-md-6">
                    <p>
                      Table Name
                    </p>
                    </div>

                    <div className="col-md-3">
                          <Field type="text"  name="table"  component={this.renderField}  />
                    </div>


                              <div className="col-md-3">
                                <p>Username</p>
                              </div>

                              <div className="col-md-6">
                              <p>
                                Database Username
                              </p>
                              </div>

                              <div className="col-md-3">
                                    <Field type="text"  name="dbusername"  component={this.renderField}  />
                              </div>

                              <div className="clearfix"></div>
                              <hr />

                              <div className="col-md-3">
                                <p>Password</p>
                              </div>

                              <div className="col-md-6">
                              <p>
                                Database Password
                              </p>
                              </div>

                              <div className="col-md-3">
                                    <Field type="password"  name="dbpassword"  component={this.renderField}  />
                              </div>

                    </Collapsible>






          <div className="clearfix"></div>
          <br/>



          <button type="submit" disabled={invalid || submitting}  className="btn btn-primary pull-right text-uppercase">Next</button>


        </form>


      </div>



    );


  }

}


const validate = values => {
  const errors = {}

  if (!values.source) {
    errors.source = 'Required'
  }

 

  if (isNaN(Number(values.msidn))){
      errors.msidn = 'Index Must be a number'
  }

  if (isNaN(Number(values.event_time))){
      errors.event_time = 'Index Must be a number'
  }

  if (isNaN(Number(values.usage))){
      errors.usage = 'Index Must be a number'
  }

  if (isNaN(Number(values.charge))){
      errors.charge = 'Index Must be a number'
  }

  return errors
}


Step3Form = connect(mapStateToProps, mapDispatchToProps)(Step3Form)


Step3Form = reduxForm({
  form: 'promotionWizard',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate

})(Step3Form);




export default Step3Form;
