import React from 'react';
import { Route , Redirect} from 'react-router-dom';
import PromotionPublisher from './PromotionPublisher';
import LocalService from '../../agent/localservice';

import loadingGif from '../../assets/images/loading.gif';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as promotionActions from '../../actions/promotion';
import _ from 'lodash';
import classnames from 'classnames';




const mapStateToProps = state => {
  return {
    getPromotionsProgress: state.promotion.getPromotionsProgress,
    getPromotionsError: state.promotion.getPromotionsError,
    getPromotionsResponse:state.promotion.getPromotionsResponse,
    deletePromotionResponse:state.promotion.deletePromotionResponse,
    deletePromotionError: state.promotion.deletePromotionError,
    addPromotionProgress: state.promotion.addPromotionProgress,
    addPromotionError: state.promotion.addPromotionError,
    addPromotionResponse: state.promotion.addPromotionResponse
  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);



class PromotionList extends React.Component {

  constructor(props) {
    super(props);

  }

  createRows = () => {

     let rows = [];

     this.props.getPromotionsResponse.forEach(function (value,index) {
           rows[index] = value;
      });

     return rows;
   };

  componentDidMount(){
    this.props.getPromotions();
    this.props.clearPromotionState({
      activeStep: 1,
      selectedPromotion: null
    });

  }

  createPromotion = () =>{
    this.props.history.push("/promotion-manager/publish")
  }

  onDelete = () => {

  }

  cellButton = (cell, row, enumObject, rowIndex) => {

      return (

         <div>
          <button onClick={this.onDelete.bind(this,row)}  type="button" className="btn btn-sm text-capitalize btn-danger text-uppercase "><i className="fa fa-trash" aria-hidden="true"></i></button>
         </div>
       )


  }

  help = (row) => {

    var ses =  row.session ? row.session.state : 'Queued';

    if(ses == "starting"){
      ses = "Publishing"
    }
    if(ses == "running"){
      ses = "Published"
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
    if(ses == "dead" || ses == "killed"){
      ses = "label-danger"
    }

    return ses;

  }

  renderBuState = () => {
    const roles = _.map(LocalService.getUser().roles, 'name');

    if(_.includes(roles,"Administrator")){

      return null;
    }
    else{

      return (
        <TableHeaderColumn dataField='bu_state' dataFormat={(cell, row)=>{
                    return `<span class="label label-md ${this.helpClass(row)}">${ this.help(row)  }</span>`  ;
                }}>Status</TableHeaderColumn>
      )


    }


  }

  renderItState = () => {

    const roles = _.map(LocalService.getUser().roles, 'name');




    if(_.includes(roles,"Administrator")){



      return (
        <TableHeaderColumn dataField='it_state' dataFormat={(cell, row)=>{

                  const STATE = row.session ? row.session.state : 'Queued' ;
                  const classNames = classnames(
                    {
                    'label label-primary':  STATE == "starting",
                    'label label-info':  STATE == "Queued",
                    'label label-success':  STATE == "running",
                    'label label-danger':  (STATE == "dead" || STATE == "killed")
                     }
                  );



                    return `<span class="label-md ${classNames}">${STATE}</span>`  ;
                }}>Job Status</TableHeaderColumn>
      )
    }
    else{
      return null;


    }

  }

  refresh = () => {
    this.props.getPromotions();
  }

  retry = (promo) => {
    this.props.addPromotion(promo);
    this.props.getPromotions();
  }

  renderButton = () => {

    const roles = _.map(LocalService.getUser().roles, 'name');

    if(_.includes(roles,"Administrator")){
        return (


          <TableHeaderColumn dataFormat={(cell, row)=>{
                      return (
                        <span>
                          <button type="button" onClick={this.loadPromo.bind(this,row)} className="btn btn-sm btn-primary m-r-5"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                          { (row.session ? (row.session.state == "dead" || row.session.state == "killed") ? <button type="button" onClick={this.retry.bind(this,row)} className="btn btn-sm btn-danger"><i className="fa fa-refresh" aria-hidden="true"></i></button> : null  : null) }

                        </span>
                      ) ;
                  }}></TableHeaderColumn>



        )

    }else{
        return null;
    }

  }


  loadPromo = (promo) => {

    this.props.clearPromotionState({
      selectedPromotion : promo,
      selectedRules: promo.rules
    })
    this.props.history.push(`/promotion-manager/publish`)


  }

  cancel = (row) => {
    console.log(row);
  }

  renderCancelButton = (cell, row)=>{

    const roles = _.map(LocalService.getUser().roles, 'name');



    if(_.includes(roles,"Business User") && !row.session){
      return (
          <button type="button" onClick={this.cancel.bind(this,row)} className="btn btn-sm btn-danger">Cancel</button>
      )
    }



  }

  render() {




    this.rows = this.createRows();

    const selectRowProp = {
            clickToSelect: true,
            onSelect: this.onSelect
          };

  if(!this.props.getPromotionsProgress && this.props.getPromotionsResponse.length <= 0){
    return (
      <div className="col-md-12 no-padding">

      <div className="col-md-12 p-t-15">
        <div className="panel panel-default">
          <div className="panel-heading text-center">
          <img src="https://cloud-cdn-digitalocean-com.global.ssl.fastly.net/aurora/assets/images/empty-state-droplet-730f40cbf66ce598b3a6751812f902fd.svg" style={{height:120}} />
          <h4 className="op-7">Looks like you dont have any promotions.</h4>
          <p className="op-6">Fourtunately its very easy to create one.</p>
          <button type="button" className="btn btn-lg text-capitalize btn-primary text-uppercase " onClick={this.createPromotion}>Create Promotion</button>
          </div>
        </div>
      </div>

      </div>
    )
  }else {

    return (
      <div className="col-md-12 no-padding">


        <div className="col-md-12 p-t-15">
          <div className="panel panel-default">
            <div className="panel-heading text-uppercase text-info">
              Promotion List

              <ul className="list-unstyled list-inline pull-right">
                <li>{this.props.getPromotionsProgress ? <img style={{width:50}} className="text-center image-responsive" src={loadingGif} /> : null}</li>
                <li><button type="button" className="btn text-capitalize btn-primary text-uppercase " onClick={this.createPromotion}>Create Promotion</button></li>
                <li><button type="button" className="btn text-capitalize btn-info text-uppercase " onClick={this.refresh}><i className="fas fa-sync-alt"></i> Refresh</button></li>
              </ul>
            </div>
            <div className="panel-body">

              <BootstrapTable  data={this.rows} search={true}  pagination={true} selectRow={selectRowProp}>
                  <TableHeaderColumn hidden={true}>Id</TableHeaderColumn>
                  <TableHeaderColumn isKey dataField='promotion_id'>Promotion Id</TableHeaderColumn>
                  <TableHeaderColumn dataField='start_date'>Started</TableHeaderColumn>
                  <TableHeaderColumn dataField='duration' dataFormat={(cell, row)=>{
                              return `${row.duration} ${row.duration_type}` ;
                          }}>Duration</TableHeaderColumn>
                  <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
                  {this.renderBuState()}
                  {this.renderItState()}
                  {this.renderButton()}
                  <TableHeaderColumn  dataFormat={this.renderCancelButton}></TableHeaderColumn>




              </BootstrapTable>


            </div>
          </div>
        </div>

      </div>

    )

  }


  }

}




export default class PromotionManager extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact  path="/promotion-manager" component={connect(mapStateToProps, mapDispatchToProps)(PromotionList)}/>
        <Route exact  path="/promotion-manager/publish" component={PromotionPublisher}/>

      </div>
    );

  }

}
