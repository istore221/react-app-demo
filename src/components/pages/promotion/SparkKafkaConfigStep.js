import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SparkKafkaConfigForm from '../../forms/promotion/SparkKafkaConfigForm';
import loadingGif from '../../../assets/images/loading.gif';
import { Redirect } from 'react-router-dom';
import * as promotionActions from '../../../actions/promotion';
import _ from 'lodash';
import { hashHistory } from 'react-router';


const mapStateToProps = state => {
  return {
  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);


export class SparkKafkaConfigStep extends React.Component {


  constructor(props) {
    super(props);
  }

 handleSubmit = (values) => {

 }


  render() {


    return (

      <div>
        <SparkKafkaConfigForm onSubmit={this.handleSubmit}/>
        <button onClick={()=>{
          this.props.clearPromotionState({
            activeStep: 2
          });
        }} className="btn btn-info pull-left">Previous</button>

      </div>



    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SparkKafkaConfigStep);
