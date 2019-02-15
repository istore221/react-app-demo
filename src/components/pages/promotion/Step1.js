import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Step1Form from '../../forms/promotion/Step1Form';
import loadingGif from '../../../assets/images/loading.gif';
import { Redirect } from 'react-router-dom';
import * as promotionActions from '../../../actions/promotion';


const mapStateToProps = state => {
  return {
    selectedPromotion: state.promotion.selectedPromotion
  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);






export class Step1 extends React.Component {

  constructor(props) {
    super(props);

  }


  handleSubmit = (values) => {

    this.props.clearPromotionState({
      activeStep: 2
    });
  }

  componentDidMount(){

  }



  render() {
    
    return (
        <Step1Form initialValues={this.props.selectedPromotion}   onSubmit={this.handleSubmit} disabled={true}/>
    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
