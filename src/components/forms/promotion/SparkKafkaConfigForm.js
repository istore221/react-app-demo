import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const mapStateToProps = state => {
  return {

  }};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);




export class SparkKafkaConfigForm extends React.Component {

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



    const { handleSubmit,submitting,initialValues,invalid} = this.props;


    return (


      <form  onSubmit={ handleSubmit }>

            <div className="row">

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


            </div>

            <div className="clearfix"></div>
            <hr />


            <div className="row">

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

              <div className="clearfix"></div>
              <hr />

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

              <div className="clearfix"></div>
              <hr />


              <div className="row">

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


                <div className="clearfix"></div>
                <hr />

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

                <div className="clearfix"></div>
                <hr />


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


              </div>


            </div>

        <button type="submit" disabled={invalid || submitting} className="btn btn-primary pull-right text-uppercase">Next</button>
      </form>

    );

  }

}


const validate = values => {
  const errors = {}



  return errors
}


SparkKafkaConfigForm = reduxForm({
  form: 'promotionWizard',
  enableReinitialize: true,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SparkKafkaConfigForm);




export default connect(mapStateToProps, mapDispatchToProps)(SparkKafkaConfigForm);
