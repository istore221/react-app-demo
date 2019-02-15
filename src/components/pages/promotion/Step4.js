import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Step4Form from '../../forms/promotion/Step4Form';
import loadingGif from '../../../assets/images/loading.gif';
import { Redirect } from 'react-router-dom';
import * as promotionActions from '../../../actions/promotion';
import LocalService from '../../../agent/localservice';
import _ from 'lodash';

const mapStateToProps = state => {
  return {
    downurl: state.form.promotionWizard.values.customer_category_file
  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);


export class Step4 extends React.Component {


  constructor(props) {
    super(props);
  }


  handleSubmit = (values) => {


    this.props.clearPromotionState({
      activeStep: 5
    });
  }


  render() {


    return (

      <div>
        <center><a target="_blank" href={this.props.downurl}>{this.props.downurl ? "Download File" : ""}</a></center>
        <Step4Form onSubmit={this.handleSubmit}/>
        <button onClick={()=>{

          var backStep = 0;
          const roles = _.map(LocalService.getUser().roles, 'name');

          if(_.includes(roles,"Administrator")){
            backStep = 3;
          }else{
            backStep = 2;
          }

          this.props.clearPromotionState({
            activeStep: backStep
          });
        }} className="btn btn-info pull-left">Previous</button>

      </div>

    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
