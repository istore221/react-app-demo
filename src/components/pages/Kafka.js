import React from 'react';

export default class Kafka extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      changeBroker: undefined
    }
  }

  changeBroker  = (e) => {
    this.setState({changeBroker: event.target.value});
  }

  render() {

    return (

        <div className="col-md-12 no-padding">

          <div className="col-md-12 p-t-15">
            <div className="panel panel-default">
              <div className="panel-heading text-uppercase text-info">
                Kafka Configuration
              </div>
              <div className="panel-body">

              <div className="row">

              <div className="col-md-3">
                <p>Brokers List</p>
              </div>

              <div className="col-md-6">
                <p>
                A consumer pulls messages off of a Kafka topic while producers push messages into a Kafka topic. Lastly, Kafka, as a distributed system, runs in a cluster. Each node in the cluster is called a Kafka broker
                </p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"100%",textAlign:'center'}} onChange={(e) => {this.changeBroker(e)}} value={this.state.changeBroker} />
              </div>

              </div>

              <hr/>


              <div className="row">

              <div className="col-md-3">
                <p>Source Channel</p>
              </div>

              <div className="col-md-6">
                  <p></p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"100%",textAlign:'center'}} onChange={(e) => {this.changeBroker(e)}} value={this.state.changeBroker} />
              </div>

              </div>



              <hr />


              <div className="row">

              <div className="col-md-3">
                <p>Integration channel</p>
              </div>

              <div className="col-md-6">
                  <p></p>
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" style={{width:"100%",textAlign:'center'}} onChange={(e) => {this.changeBroker(e)}} value={this.state.changeBroker} />
              </div>

              </div>



              </div>





            </div>





            </div>




        </div>

    );


  }
}
