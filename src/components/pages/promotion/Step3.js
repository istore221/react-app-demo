import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Step3Form from '../../forms/promotion/Step3Form';
import loadingGif from '../../../assets/images/loading.gif';
import { Redirect } from 'react-router-dom';
import * as promotionActions from '../../../actions/promotion';


const mapStateToProps = state => {
  return {

  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);


export class Step3 extends React.Component {


  constructor(props) {
    super(props);
  }


  handleSubmit = (values) => {

    this.props.clearPromotionState({
      activeStep: 4
    });
  }


  render() {


    return (

      <div>
        <Step3Form onSubmit={this.handleSubmit}/>
        <button onClick={()=>{
          this.props.clearPromotionState({
            activeStep: 2
          });
        }} className="btn btn-info pull-left">Previous</button>

      </div>

    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
