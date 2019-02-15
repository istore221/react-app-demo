import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth';
import SigninForm from '../forms/SigninForm';
import loadingGif from '../../assets/images/loading.gif';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    signinInProgress: state.auth.signinInProgress,
    signinError: state.auth.signinError,
    token:state.auth.token
  }};

const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);



export class Signin extends React.Component {


  constructor(props) {
    super(props);
  }


  handleSubmit = (values) => {
    this.props.signIn(values)
  }


  render() {

    if(this.props.token){
      //auth completed
      return <Redirect to={`/`} />;
    }


    if(this.props.signinError){
      switch (this.props.signinError.error.statusCode) {
        case 401: // unautharized
          this.message = "Login Failed";
          break;
        case 400:  // validation error
          this.message = "Username and Password is required";
            break;
        default:

      }
    }





    return (

      <div className="sigin-wrapper">
        <div className="signin-box">

          <div className="inner-wrapper">
            <img src="https://pbs.twimg.com/profile_images/627394779589013504/7GLg7Aq6_400x400.jpg" className="img-circle avatar" alt="Avatar" />

            <ul className="nav nav-tabs text-center text-uppercase">
              <li><a href="#">signup</a></li>
              <li className="active"><a href="#">signin</a></li>
            </ul>

            <hr />

            <SigninForm  onSubmit={this.handleSubmit}/>

            {this.props.signinInProgress ? <img style={{width:60,margin:'0px auto',display:'block',position:'relative'}} className="text-center image-responsive" src={loadingGif} /> : null}
            {this.props.signinError ? <p className="text-danger text-center m-t-5"><small>{this.message}</small></p> : null}
          </div>

          <a href="#" className="text-primary  absolute b-8 r-8" ><small>Forgot password?</small></a>

        </div>
      </div>

    );


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
