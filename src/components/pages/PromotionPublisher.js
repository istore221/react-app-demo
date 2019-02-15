import React from 'react';
import Step1 from './promotion/Step1';
import Step2 from './promotion/Step2';
import Step3 from './promotion/Step3';
import Step4 from './promotion/Step4';
import Step5 from './promotion/Step5';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LocalService from '../../agent/localservice';
import _ from 'lodash';
import * as promotionActions from '../../actions/promotion';

const mapStateToProps = state => {
  return {
    activeStep: state.promotion.activeStep,
    selectedPromotion: state.promotion.selectedPromotion
  }};

const mapDispatchToProps = dispatch => bindActionCreators(promotionActions, dispatch);



export class PromotionPublisher extends React.Component {

  constructor(props) {
    super(props);
    this.StepsByName = {};
  }

  renderStep = ()=>{

    const roles = _.map(LocalService.getUser().roles, 'name');

    if(_.includes(roles,"Administrator")){
      this.StepsByName = {
       Step1: <Step1 id={this.props.match.params.id} />,
       Step2: <Step2 />,
       Step3: <Step3 />,
       Step4: <Step4 />,
       Step5: <Step5 history={this.props.history} />
     };
   }else{
     this.StepsByName = {
      Step1: <Step1 id={this.props.match.params.id} />,
      Step2: <Step2 />,
      Step4: <Step4 />,
      Step5: <Step5 history={this.props.history} />
    };
   }



    return this.StepsByName[`Step${this.props.activeStep}`]
  }

  componentWillUnmount(){

    if(this.props.selectedPromotion){
      this.props.clearPromotionState({
          selectedPromotion: null,
          selectedRules: [],
          selectedSource: null,
          selectedSourceFormat: null
      })
      this.props.destroyForm();
    }

  }


  renderTabs = () => {

    const roles = _.map(LocalService.getUser().roles, 'name');

    if(_.includes(roles,"Administrator")){
      return (
        <ul className="nav nav-tabs text-center">
        <li className={this.props.activeStep == 1 ? 'active' : '' }><a>Promotion</a></li>
        <li className={this.props.activeStep == 2 ? 'active' : '' }><a>Rules</a></li>
        <li className={this.props.activeStep == 3 ? 'active' : '' }><a>Configurations</a></li>
        <li className={this.props.activeStep == 4 ? 'active' : '' }><a>Files</a></li>
        <li className={this.props.activeStep == 5 ? 'active' : '' }><a>Complete</a></li>
        </ul>
      )
    }else{
      return (
        <ul className="nav nav-tabs text-center">
        <li className={this.props.activeStep == 1 ? 'active' : '' }><a>Promotion</a></li>
        <li className={this.props.activeStep == 2 ? 'active' : '' }><a>Rules</a></li>
        <li className={this.props.activeStep == 4 ? 'active' : '' }><a>Files</a></li>
        <li className={this.props.activeStep == 5 ? 'active' : '' }><a>Complete</a></li>
        </ul>
      )
    }



  }


  render() {

     //this.props.getPromotion();



    let progress = 0;

    if(this.props.activeStep == 1){
        progress = 0;
    }else if(this.props.activeStep == 2){
      progress = 25;
    }else if(this.props.activeStep == 3){
        progress = 50;
    }else if(this.props.activeStep == 4){
        progress = 75;
    }else if(this.props.activeStep == 5){
      progress = 95;
    }

    return (
      <div className="col-md-12 no-padding">


              <div className="col-md-12 p-t-15">
                <div className="panel panel-default">
                  <div className="panel-heading">

                    {this.renderTabs()}


                  <span className="pull-right op-6">Step {this.props.activeStep} of 5</span>

                  </div>
                  <div className="panel-body">

                  <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{width: `${progress}%`}}>
                    </div>
                    </div>

                    {this.renderStep()}

                  </div>
                </div>
              </div>
      </div>

    );

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PromotionPublisher);
