import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Step2Form from '../../forms/promotion/Step2Form';
import loadingGif from '../../../assets/images/loading.gif';
import { Redirect } from 'react-router-dom';
import * as promotionActions from '../../../actions/promotion';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RuleForm from '../../forms/RuleForm';
import LocalService from '../../../agent/localservice';
import _ from 'lodash';

const mapStateToProps = state => {
  return {
    selectedRules: state.promotion.selectedRules,
    getPromotionResponse: state.promotion.getPromotionResponse
  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);


export class Step2 extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      renderRuleForm:false,
      rows: this.props.selectedRules
    }
  }



  handleSubmit = (values) => {

  }

  createRule = () => {
    this.setState({
      renderRuleForm:true
    })
  }

  closeRule = () => {
    this.setState({
      renderRuleForm:false
    })
  }

  handleRuleSubmit = (values) => {
    this.closeRule();

    let rows = this.props.selectedRules.slice();
    rows.push(values);
    this.props.clearPromotionState({
        selectedRules:rows
    })



  }

  renderRuleForm = () => {
    if(this.state.renderRuleForm){
      return <RuleForm  onSubmit={this.handleRuleSubmit}/>
    }else{
      return null;
    }
  }



  onDelete = (rowIndex) => {

    let rows  = this.props.selectedRules.filter((value,index)=>index!=rowIndex)

    this.props.clearPromotionState({
        selectedRules:rows
    })
  }

  cellButton = (cell, row, enumObject, rowIndex) => {

      return (
         <div>
          <button onClick={this.onDelete.bind(this,rowIndex)}  type="button" className="btn btn-sm text-capitalize btn-danger text-uppercase "><i className="fa fa-trash" aria-hidden="true"></i></button>
         </div>
       )


  }

  handleStepSubmit = (values) => {

    var nextstep = 0;
    const roles = _.map(LocalService.getUser().roles, 'name');

    if(_.includes(roles,"Administrator")){
      nextstep = 3;
    }else{
      nextstep = 4;
    }
    this.props.clearPromotionState({
      activeStep: nextstep
    });
  }

  render() {

    this.rows = [];
    if(this.props.selectedRules){
      this.rows = this.props.selectedRules;
    }
    



    return (


      <div>

        <p className="text-info text-uppercase">Rules List</p>
        <button type="button" className="btn btn-lg text-capitalize btn-primary text-uppercase pull-right" onClick={this.state.renderRuleForm ? this.closeRule : this.createRule}>{this.state.renderRuleForm ? "Close" : "Add Rule"}</button>
        <div className="clearfix"></div>

        {this.renderRuleForm()}

        <BootstrapTable  data={this.rows} search={false}  pagination={true}>
            <TableHeaderColumn isKey dataField='segmentation'>Segmentation</TableHeaderColumn>
            <TableHeaderColumn dataField='threshold'>Threshold</TableHeaderColumn>
            <TableHeaderColumn dataField='product'>Product</TableHeaderColumn>
            <TableHeaderColumn dataField='message'>Message</TableHeaderColumn>
            <TableHeaderColumn
                 dataField='button'
                 dataFormat={this.cellButton}></TableHeaderColumn>
        </BootstrapTable>



        <div className="clearfix"></div>
          <Step2Form onSubmit={this.handleStepSubmit}/>
        <button onClick={()=>{
          this.props.clearPromotionState({
            activeStep: 1
          });
        }} className="btn btn-info pull-left">Previous</button>


      </div>



    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
