import React from 'react';
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import Popup from 'react-popup';
import loadingGif from '../../assets/images/loading.gif';
import UserForm from '../forms/UserForm';


const mapStateToProps = state => {
  return {
    getUsersProgress: state.user.getUsersProgress,
    getUsersError: state.user.getUsersError,
    getUsersResponse:state.user.getUsersResponse,
    addUserResponse:state.user.addUserResponse,
    addUserError: state.user.addUserError,
    deleteUserResponse:state.user.deleteUserResponse,
    deleteUserError: state.user.deleteUserError
  }};

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);



Popup.registerPlugin('userprompt', function (handleSubmit) {

    this.create({
        title: (""),
        content: <UserForm  onSubmit={handleSubmit} />,
        buttons: {
            right: [{
                text: 'Cancel',
                className: 'success',
                action: function () {
                    Popup.close();
                }
            }]
        }
    });
});


export  class Users extends React.Component {

  constructor(props) {
    super(props);
  }

  createRows = () => {
    let rows = [];

    this.props.getUsersResponse.forEach(function (value,index) {

      rows[index] = value;

     });

    return rows;
   };



  componentDidMount () {
    this.props.getUsers();
  }

  upsertUser = () => {
    Popup.plugins().userprompt((value) => {
      this.props.addUser(value);

    });
  }

  onSelect = (row) => {
    this.props.selectUser(row);
    Popup.plugins().userprompt((value) => {
      if(value.roles === ""){
        delete value.roles
      }
      this.props.addUser(value);
    });
  }

  onDelete = (row) => {
    Popup.create({
        title: null,
        content: `Are You sure do you want to delete ${row.username} ?`,
        buttons: {
            right: [
              {
                  text: 'Yes',
                  className: 'danger',
                  action:  () => {
                    Popup.close();
                    this.props.deleteUser(row);
                  }
              },
              {
                text: 'No',
                action:  () => {
                  Popup.close();
                }
            }]
        }
    });
  }

  cellButton = (cell, row, enumObject, rowIndex) => {

      return (

         <div>
           <button onClick={this.onSelect.bind(this,row)} type="button" className="btn btn-sm text-capitalize btn-info text-uppercase "><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button onClick={this.onDelete.bind(this,row)}  type="button" className="btn btn-sm text-capitalize btn-danger text-uppercase "><i className="fa fa-trash" aria-hidden="true"></i></button>
         </div>
       )




  }

  render() {


    if(this.props.addUserResponse){
      this.props.clearUserState({
        addUserResponse: null
      });
      Popup.close();
      Popup.alert(`User ${this.props.addUserResponse.username} successfully saved`);
      this.props.getUsers();
    }
    if(this.props.deleteUserResponse){
      this.props.clearUserState({
        deleteUserResponse: null
      });
      Popup.close();
      Popup.alert('User successfully deleted');
      this.props.getUsers();
    }


    const selectRowProp = {
            clickToSelect: true,
            onSelect: this.onSelect
          };

    this.rows = this.createRows();


    return (
      <div className="col-md-12 no-padding">
        <Popup />
        <ul className="nav nav-tabs text-center p-t-2">
          <li  className="active m-r-22 "><Link to={`/app/users`}>Users</Link></li>
          <li><Link to={`/app/roles`}>Roles</Link></li>
        </ul>


        <div className="col-md-12 p-t-15">
          <div className="panel panel-default">
            <div className="panel-heading text-uppercase text-info">
              Users List
              <ul className="list-unstyled list-inline pull-right">
                <li>{this.props.getUsersProgress ? <img style={{width:60}} className="text-center image-responsive" src={loadingGif} /> : null}</li>
                <li><button type="button" className="btn text-capitalize btn-primary text-uppercase " onClick={this.upsertUser}>Add User</button></li>
              </ul>
            </div>
            <div className="panel-body">

              <BootstrapTable  data={this.rows} search={true}  pagination={true} selectRow={selectRowProp} >
                  <TableHeaderColumn hidden={true} isKey dataField='id'>Id</TableHeaderColumn>
                  <TableHeaderColumn dataField='avatar' dataFormat={(cell, row)=>{
                          return (<img style={{width:35}} className="img-responsive img-circle" src={cell}/>) ;
                      }}>Image</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataFormat={(cell, row)=>{
                                return `${row.firstName} ${row.lastName}` ;
                            }}>Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='roles' dataFormat={(cell, row)=>{
                            return (<span className="label label-info" title={JSON.stringify(cell.map(a => a.name))}>{JSON.stringify(cell.map(a => a.name))}</span>) ;
                        }}>Roles</TableHeaderColumn>
                  <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
                  <TableHeaderColumn dataField='created'>Created</TableHeaderColumn>
                  <TableHeaderColumn dataField='modified'>Modified</TableHeaderColumn>
                  <TableHeaderColumn
                     dataField='button'
                     dataFormat={this.cellButton}></TableHeaderColumn>

              </BootstrapTable>


            </div>
          </div>
        </div>

      </div>
    );

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
