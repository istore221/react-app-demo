import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import SelfA from '../forms/SelfA';
import * as actions from '../../actions/selfa';
import loadingGif from '../../assets/images/loading.gif';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import LocalService from '../../agent/localservice';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import Popup from 'react-popup';


class Bla extends React.Component {

  render(){

    const data = [
            {
                color: "steelblue",
                points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: 3}]
            }
        ];

    return (

                      <div>

                        <center>
                       <LineChart
                               width={320}
                               height={320}
                               xLabel="Number Of Clusters"
                               yLabel="Within set sum of squared errors"
                               data={data}
                           />
                       </center>
                       <br />
                       <form >
                        <div className="form-group">
                          <label htmlFor="email">No Of Clusters:</label>
                          <input type="text" className="form-control" id="email" />
                        </div>

                        <button type="submit" className="btn btn-primary text-uppercase">ok</button>


                      </form>




                      </div>
    )
  }

}



/** Prompt plugin */
Popup.registerPlugin('dumbpromot', function (handleSubmit) {

    this.create({
        title: (""),
        content: <Bla />,

        buttons: {
            right: [{
                text: 'Cancel',
                className: 'success',
                action: function () {
                    Popup.close();
                }
            }]
        }
    });
});



const mapStateToProps = state => {
  return {
    getselfaProgress: state.selfa.getselfaProgress,
    getselfaError: state.selfa.getselfaError,
    getselfaResponse:state.selfa.getselfaResponse,
    addselfaProgress:state.selfa.addselfaProgress,
    addselfaError: state.selfa.addselfaError,
    addselfaResponse: state.selfa.addselfaResponse
  }};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export class SelfAnalytics extends React.Component {


  constructor(props) {
    super(props);
  }

  createRows = () => {

     let rows = [];

     this.props.getselfaResponse.forEach(function (value,index) {
           rows[index] = value;
      });

     return rows;
   };

  handleSubmit = (values) => {
    this.props.addSelfa(values);
    setTimeout(()=>{
      this.props.getSelfa();
    }, 1000);
  }

  help = (row) => {

    var ses =  row.session ? row.session.state : 'Queued';

    if(ses == "starting"){
      ses = "Publishing"
    }
    if(ses == "running"){
      ses = "Published"
    }
    if(ses == "success"){
      ses = "success"
    }
    if(ses == "dead" || ses == "killed"){
      ses = "Ended"
    }

    return ses;
  }


  helpClass = (row) => {

    var ses =  row.session ? row.session.state : 'Queued';

    if(ses == "Queued"){
      ses = "label-primary"
    }
    if(ses == "starting"){
      ses = "label-info"
    }
    if(ses == "running"){
      ses = "label-success"
    }
    if(ses == "success"){
      ses = "label-success"
    }
    if(ses == "dead" || ses == "killed"){
      ses = "label-danger"
    }

    return ses;

  }



  renderstate = () => {

    return (
      <TableHeaderColumn dataField='bu_state' dataFormat={(cell, row)=>{
                  return `<span class="label label-md ${this.helpClass(row)}">${ this.help(row)  }</span>`  ;
              }}>Status</TableHeaderColumn>
    )

  }

  view = () => {
    Popup.plugins().dumbpromot((value) => {
      console.log(value)
    });
  }

  renderResultbutton = () => {


    return (

      <TableHeaderColumn dataFormat={(cell, row)=>{
                  return (
                    <span>
                     { (row.session ? (row.session.state == "success") ? <button type="button" onClick={this.view.bind(this,row)} className="btn btn-sm btn-info">View Results</button> : null  : null) }

                    </span>
                  ) ;
              }}></TableHeaderColumn>



    )

  }


  componentDidMount(){
    this.props.getSelfa();
  }

  refresh = () => {
    this.props.getSelfa();
  }

   js_yyyy_mm_dd_hh_mm_ss = () => {
    var now = new Date();
    var year = "" + now.getFullYear();
    var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  }



  render() {




        this.rows = this.createRows();

        const runid = LocalService.getUser().username+"-"+this.js_yyyy_mm_dd_hh_mm_ss();



    return (

      <div className="col-md-12 no-padding">

        <div className="col-md-12 p-t-15">
          <div className="panel panel-default">
            <div className="panel-heading text-uppercase text-info">
               Self Analytics
            </div>
            <div className="panel-body">

              <div className="row">


                            <SelfA initialValues={{runsid:runid}} onSubmit={ this.handleSubmit }></SelfA>

                            <br/>

                <ul className="list-unstyled list-inline pull-right">
                  <li>{this.props.getselfaProgress ? <img style={{width:50}} className="text-center image-responsive" src={loadingGif} /> : null}</li>
                  <li><button type="button" className="btn text-capitalize btn-info text-uppercase " onClick={this.refresh}><i className="fas fa-sync-alt"></i> Refresh</button></li>
                </ul>


                <BootstrapTable  data={this.rows} search={false}  pagination={true}>
                    <TableHeaderColumn isKey hidden={true} dataField='id'>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='runsid'>RunId</TableHeaderColumn>
                    <TableHeaderColumn dataField='runs'>No Of Clusters</TableHeaderColumn>

                    {this.renderstate()}
                    {this.renderResultbutton()}
                </BootstrapTable>




              </div>

              <Popup />




            </div>
          </div>
        </div>
        </div>

    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfAnalytics);
