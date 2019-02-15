import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../actions/common';

const mapStateToProps = state => {
  return {
    activeMenuItem: state.common.activeMenuItem
  }};

const mapDispatchToProps = dispatch => bindActionCreators(commonActions, dispatch);



export class Header extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <header className="main-header">
        <i className="fa fa-bars  visible-xs" aria-hidden="true" onClick={this.props.toggleSidebar}></i>
        <p className="breadcrumbs">{this.props.activeMenuItem.breadcrumb} </p>

      </header>
    );

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
