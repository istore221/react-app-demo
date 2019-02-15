import React from 'react';

export default class Db extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      sparkMax: 4,
      maxAppAttempts: 4,
      attemptFailuresValidityInterval: '1h',
      failures: 48,
      failuresValidityInterval: '1h'
    }
  }

  changeSparkMax = (e) => {
    this.setState({sparkMax: event.target.value});
  }

  maxAppAttempts = (e) => {
    this.setState({maxAppAttempts: event.target.value});
  }

  attemptFailuresValidityInterval = (e) => {
    this.setState({attemptFailuresValidityInterval: event.target.value});
  }

  failures = (e) => {
    this.setState({failures: event.target.value});
  }

  failuresValidityInterval = (e) => {
    this.setState({failuresValidityInterval: event.target.value});
  }

  render() {

    return (

      <div className="col-md-12 no-padding">

        <div className="col-md-12 p-t-15">
          <div className="panel panel-default">
            <div className="panel-heading text-uppercase text-info">
              Spark Configuration
            </div>
            <div className="panel-body">

              <div className="row">

              <div className="col-md-3">
                <p>spark.task.maxFailures</p>
              </div>

              <div className="col-md-6">
                <p>
                  Number of failures of any particular task before giving up on the job. The total number of failures spread across different tasks will not cause the job to fail; a particular task has to fail this number of attempts. Should be greater than or equal to 1. Number of allowed retries = this value - 1.
                </p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"80px",textAlign:'center'}} onChange={(e) => {this.changeSparkMax(e)}} value={this.state.sparkMax} />
              </div>

              </div>

              <hr />


              <div className="row">

              <div className="col-md-3">
                <p>spark.yarn.maxAppAttempts</p>
              </div>

              <div className="col-md-6">
                  <p>
                  The maximum number of attempts that will be made to submit the application. It should be no larger than the global number of max attempts in the YARN configuration.

                  </p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"80px",textAlign:'center'}} onChange={(e) => {this.maxAppAttempts(e)}} value={this.state.maxAppAttempts} />
              </div>

              </div>

              <hr />

              <div className="row">

              <div className="col-md-3">
                <p>spark.yarn.am.attemptFailuresValidityInterval</p>
              </div>

              <div className="col-md-6">
                  <p>
                  Defines the validity interval for AM failure tracking. If the AM has been running for at least the defined interval, the AM failure count will be reset. This feature is not enabled if not configured.
                  </p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"80px",textAlign:'center'}} onChange={(e) => {this.attemptFailuresValidityInterval(e)}} value={this.state.attemptFailuresValidityInterval} />
              </div>

              </div>

              <hr />

              <div className="row">

              <div className="col-md-3">
                <p>spark.yarn.max.executor.failures</p>
              </div>

              <div className="col-md-6">
                  <p>
                  The maximum number of executor failures before failing the application.
                  </p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"80px",textAlign:'center'}} onChange={(e) => {this.failures(e)}} value={this.state.failures} />
              </div>

              </div>

              <hr />

              <div className="row">

              <div className="col-md-3">
                <p>spark.yarn.executor.failuresValidityInterval</p>
              </div>

              <div className="col-md-6">
                  <p>
                  Defines the validity interval for executor failure tracking. Executor failures which are older than the validity interval will be ignored.
                  </p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"80px",textAlign:'center'}} onChange={(e) => {this.failuresValidityInterval(e)}} value={this.state.failuresValidityInterval} />
              </div>

              </div>


            </div>
          </div>

          </div>




      </div>


    );


  }
}
