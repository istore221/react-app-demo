import React from 'react';
import classnames from 'classnames';
import * as commonActions from '../../actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../components/Sidebar';
import { Route , Redirect} from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Roles from './Roles';
import Temp from './Temp';
import Temp2 from './Temp2';
import Temp3 from './Temp3';
import Temp4 from './Temp4';
import Kafka from './Kafka';
import SelfAnalytics from './SelfAnalytics';
import Db from './Db';
import PromotionManager from './PromotionManager';
import Header from '../components/Header';
import ReactDOM from 'react-dom';


const mapStateToProps = state => {
  return {
    sidebarOpened: state.common.sidebarOpened,
    token: state.auth.token,
    user: state.auth.user
  }};

const mapDispatchToProps = dispatch => bindActionCreators(commonActions, dispatch);


export class Master extends React.Component {


  constructor(props) {
    super(props);

  }




  render() {

    if(!this.props.token){
      // user has not logged in
      return <Redirect to={`/signin`} />;
    }

    const classNames = classnames(
      'wrapper',
      {
        'sidebar-open': this.props.sidebarOpened
      }
    );


    return (
    <div className={classNames}>

      <Header />
      {this.props.user ? <Sidebar ref="sidebar" user={this.props.user}  currentPath={this.props.location.pathname} /> : null }



        <div className="content-wrapper" >
            <section className="content">
              <div className="row">

                <div className="col-md-12">

                  <Route exact path="/" component={Home}/>
                  <Route exact path="/behavioral-segmentation" component={Temp}/>
                  <Route exact path="/movement-behavior" component={Temp2}/>
                  <Route exact path="/dormancy-churn-analytics" component={Temp3}/>
                  <Route exact path="/social-network-analytics" component={Temp4}/>
                  <Route exact path="/app/users" component={Users}/>
                  <Route exact path="/app/roles" component={Roles}/>
                  <Route exact path="/app/kafka" component={Kafka}/>
                  <Route exact path="/app/db" component={Db}/>
                    <Route exact path="/self-analytics" component={SelfAnalytics}/>
                  <Route path="/promotion-manager" component={PromotionManager}/>

                </div>

              </div>
            </section>
        </div>

    </div>


    );


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Master);
