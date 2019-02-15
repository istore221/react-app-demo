import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Step4Form from '../../forms/promotion/Step4Form';
import loadingGif from '../../../assets/images/loading.gif';
import { Redirect } from 'react-router-dom';
import * as promotionActions from '../../../actions/promotion';
import _ from 'lodash';
import { hashHistory } from 'react-router';


const mapStateToProps = state => {
  return {
    promotionWizard: state.form.promotionWizard,
    addPromotionProgress: state.promotion.addPromotionProgress,
    addPromotionError: state.promotion.addPromotionError,
    addPromotionResponse: state.promotion.addPromotionResponse
  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);


export class Step5 extends React.Component {


  constructor(props) {
    super(props);
  }

  publishPromotion = () => {
    const newPromotion =  _.omitBy(this.props.promotionWizard.values,_.isEmpty);
    //alert(JSON.stringify(newPromotion))
    this.props.addPromotion(newPromotion);
  }


  render() {


    if(this.props.addPromotionResponse){
      this.props.destroyForm(); // remove form
      this.props.clearPromotionState({
        selectedPromotion: null,
        activeStep: 1,
        selectedRules: [],
        selectedSource: null,
        selectedSourceFormat: null,
        addPromotionError: null,
        addPromotionResponse: null
      }) // clear state values

      this.props.history.push("/promotion-manager")  // redirect
    }

    return (

      <div className="col-md-12 no-padding">

      <div className="col-md-12 p-t-15">
        <div className="panel panel-default">
          <div className="panel-heading text-center">
          <img src="https://cloud-cdn-digitalocean-com.global.ssl.fastly.net/aurora/assets/images/empty-storage-4db567da638dec05110de455097fdd84.svg" style={{height:120}} />
          {this.props.addPromotionProgress ? <img style={{width:60,margin:'0px auto',display:'block',position:'relative'}} className="text-center image-responsive" src={loadingGif} /> : null}
          <h4 className="op-7">Publish Your Promotion.</h4>
          <p className="op-6">Promotions can be monitoerd under promotions tab</p>
          <button type="button" className="btn btn-lg text-capitalize btn-primary text-uppercase " onClick={this.publishPromotion}>Publish Promotion</button>
          </div>
        </div>
      </div>

      <button onClick={()=>{
        this.props.clearPromotionState({
          activeStep: 4
        });
      }} className="btn btn-info pull-left">Previous</button>

      </div>



    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step5);
