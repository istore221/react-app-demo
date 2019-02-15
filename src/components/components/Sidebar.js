import React from 'react';
import classnames from 'classnames';
import { Link , Redirect } from 'react-router-dom';
import _ from 'lodash';
import * as commonActions from '../../actions/common';
import * as authActions from '../../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let actions = {
  ...authActions,
  ...commonActions
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);



export class Sidebar extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      logout:false,
      menu: [
        {
          header: 'personal',
          items: [
            {label:'Dashboard',fa:'dashboard',opened:false,nested:[
                {label:'Dashboard',route:'/',opened:false,breadcrumb:'Dashboard / Home'},
                {label:'Behavioral Segmentation',route:'/behavioral-segmentation',opened:false,breadcrumb:'Dashboard / Behavioral Segmentation'},
                {label:'Movement Behavior',route:'/movement-behavior',opened:false,breadcrumb:'Dashboard / Movement Behavior'},
                {label:'Dormancy-Churn Analytics',route:'/dormancy-churn-analytics',opened:false,breadcrumb:'Dashboard / Dormancy-Churn Analytics'},
                {label:'Social Network Analytics',route:'/social-network-analytics',opened:false,breadcrumb:'Dashboard / Social Network Analytics'}
            ]},
            {label:'Promotion Manager',fa:'th',opened:false,nested:[
              {label:'Promotions',route:'/promotion-manager',opened:false,breadcrumb:'Dashboard / Promotion Manager'},
              {label:'Publish Promotion',route:'/promotion-manager/publish',opened:false,breadcrumb:'Dashboard / Promotion Manager'}
            ]},
            {label:'Self Analytics',fa:'laptop',opened:false,nested:[
              {label:'Self Analytics',route:'/self-analytics',opened:false,breadcrumb:'Dashboard / Self Analytics'}
            ]},
            {label:'UI Elements',fa:'laptop',opened:false,nested:[
              {label:'Elements',route:'/components',opened:false,breadcrumb:'Dashboard / Elements'}
            ]}
          ]
        },
        {
          header: 'preferences',
          items: [
            {label:'Settings',fa:'cog',opened:false,nested:[
              {label:'Users Management',route:'/app/users',opened:false,breadcrumb:'Dashboard / Users Management'},
              {label:'Roles Management',route:'/app/roles',opened:false,breadcrumb:'Dashboard / Roles Management'},
              {label:'Kafka Configuration',route:'/app/kafka',opened:false,breadcrumb:'Dashboard / Kafka'},
              {label:'Spark Configuration',route:'/app/db',opened:false,breadcrumb:'Dashboard / Spark'}
            ]}

          ]
        }
      ],
      activeMenu:null

    }


  }


  signOut = () => {
    this.setState({
      logout:true
    })
  }


  openMenu = (menuItem) =>{

    let menu = this.state.menu.slice();

    menu.forEach(function (value) {
      value.items.forEach(function(e){
          if(e == menuItem){
            e.opened = !menuItem.opened
          }
      });

    });


    this.setState({
      menu:menu,
      activeMenu:menuItem
    })

  }

  componentDidMount(){
    this.props.changeBreadcrumb(this.finalmenuItem);
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.changeBreadcrumb(this.finalmenuItem);
  }


  renderMenuItems = () =>{

//this.props.toggleSidebar();

    this.state.menu.forEach( (menuItem)=> {
     menuItem.items.forEach( (nestedmenuItem) => {

       if(this.state.activeMenu != null && this.state.activeMenu != nestedmenuItem){
            nestedmenuItem.opened = false;

       }

       nestedmenuItem.nested.forEach( (finalmenuItem) => {
         finalmenuItem.opened = false;
         if(finalmenuItem.route === this.props.currentPath){
           nestedmenuItem.opened = true;
           finalmenuItem.opened = true;
           this.finalmenuItem = finalmenuItem;
         }
       });
     });
   });





    return this.state.menu.map((object, i)=>{
      return (
          <span key={i}>
            <li className="header">{object.header}</li>

            {

              object.items.map((item, i)=>{

                const className = `fa fa-${item.fa}`;

                const classNames = classnames(
                  'treeview',
                  {
                    'menu-open':  item.opened
                  }
                );

                const angleclassNames = classnames(
                  'fa pull-right',
                  {
                    'fa-angle-right':  !item.opened
                  },
                  {
                    'fa-angle-down':  item.opened
                  }
                );



                return (
                  <li key={i} className={classNames} onClick={this.openMenu.bind(this,item)}><a>
                    <i className={className}></i>
                    <span>{item.label}</span>
                    <span className="pull-right-container">
                      <i className={angleclassNames}></i>
                    </span>
                  </a>

                  <ul key={i} className="treeview-menu">
                    {


                        item.nested.map((nesteditem, i)=>{
                          const classNames = classnames(
                            {
                              'active' : nesteditem.opened
                            }
                          );


                          return (
                              <li className={classNames} key={i}><Link to={`${nesteditem.route}`}>{nesteditem.label}</Link></li>

                          )
                        })
                    }
                  </ul>

                </li>
                )
              })
            }



          </span>
      )
    });


  }




  render() {

    if(this.state.logout){
      this.props.removeToken();
    }


    return (

      <aside className='main-sidebar'>
        <section className="sidebar">

          <div className="user-panel">
            <div className="image">
              <img src="http://petmedmd.com/images/user-profile.png" className="img-circle img-responsive" alt="User Image" />
            </div>
            <div className="info">
              <p>{this.props.user.firstName} {this.props.user.lastName}</p>
              <span>{this.props.user.roles.length ? this.props.user.roles[0].name : "Unspecified"}</span>
              <ul className="list-inline list-unstyled ">
                <li><a href="#"><i className="fa fa-cog" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a></li>
                <li onClick={this.signOut}><a><i className="fa fa-power-off" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>

          <ul className="sidebar-menu">
            {this.renderMenuItems()}
          </ul>


      </section>

    </aside>
  )

}


};




export default connect(null, mapDispatchToProps)(Sidebar);
