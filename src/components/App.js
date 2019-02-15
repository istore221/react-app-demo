import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APP_LOAD } from '../constants/common';
import { Route, Switch,Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import Master from './pages/Master';
import Components from './pages/Components';
import Signin from './pages/Signin';
import * as commonActions from '../actions/common';


import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'animate.css/animate.min.css';
import '../styles/style.scss';


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName
  }};

const mapDispatchToProps = dispatch => bindActionCreators(commonActions, dispatch);


export class App extends React.Component {



  componentWillMount() {
    this.props.onload();
  }



  render() {
    return (

      <div className="b-wrapper">

          <Switch>
              <Route exact path="/signin" component={Signin}/>
              <Route exact path="/components" component={Components}/>
              <Route path="/" component={Master}/>

          </Switch>

      </div>

    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App);
