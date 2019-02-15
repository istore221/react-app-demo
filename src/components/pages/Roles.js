import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleActions from '../../actions/role';
import RoleForm from '../forms/RoleForm';
import Popup from 'react-popup';
import loadingGif from '../../assets/images/loading.gif';


/** Prompt plugin */
Popup.registerPlugin('roleprompt', function (handleSubmit) {

    this.create({
        title: (""),
        content: <RoleForm onSubmit={handleSubmit} />,
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


const mapStateToProps = state => {
  return {
    getRolesProgress: state.role.getRolesProgress,
    getRolesError: state.role.getRolesError,
    getRolesResponse:state.role.getRolesResponse,
    addRoleResponse:state.role.addRoleResponse,
    addRoleError: state.role.addRoleError,
    deleteRoleResponse:state.role.deleteRoleResponse,
    deleteRoleError: state.role.deleteRoleError
  }};

const mapDispatchToProps = dispatch => bindActionCreators(roleActions, dispatch);




export class Roles extends React.Component {

  constructor(props) {
    super(props);


  }

  createRows = () => {

     let rows = [];

     this.props.getRolesResponse.forEach(function (value,index) {
           rows[index] = value;
      });

     return rows;
   };


  componentDidMount(){
    this.props.getRoles();

  }

  upsertRole = () => {

    Popup.plugins().roleprompt((value) => {
      this.props.addRole(value);
    });
  }

  onSelect = (row) => {
    this.props.selectRole(row);
    Popup.plugins().roleprompt((value) => {
      this.props.addRole(value);
    });
  }

  onDelete = (row) => {
    Popup.create({
        title: null,
        content: `Are You sure do you want to delete ${row.name} ?`,
        buttons: {
            right: [
              {
                  text: 'Yes',
                  className: 'danger',
                  action:  () => {
                    Popup.close();
                    this.props.deleteRole(row);
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

    if(rowIndex > 0){

      return (

         <div>
           <button onClick={this.onSelect.bind(this,row)} type="button" className="btn btn-sm text-capitalize btn-info text-uppercase "><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button onClick={this.onDelete.bind(this,row)}  type="button" className="btn btn-sm text-capitalize btn-danger text-uppercase "><i className="fa fa-trash" aria-hidden="true"></i></button>
         </div>
       )

    }else{

      return
    }


  }

  componentWillUnmount(){


  }

  render() {

    if(this.props.addRoleResponse){
      this.props.clearRoleState({
        addRoleResponse: null
      });
      Popup.close();
      Popup.alert(`Role ${this.props.addRoleResponse.name} successfully saved`);
      this.props.getRoles();
    }
    if(this.props.deleteRoleResponse){
      this.props.clearRoleState({
        deleteRoleResponse: null
      });
      Popup.close();
      Popup.alert('Role successfully deleted');
      this.props.getRoles();
    }



    this.rows = this.createRows();

    const selectRowProp = {
        clickToSelect: true,
        unselectable: [ 'Administrator' ],
        onSelect: this.onSelect
      };

    return (
      <div className="col-md-12 no-padding">
        <Popup />
        <ul className="nav nav-tabs text-center p-t-2">
          <li  className="m-r-22 "><Link to={`/app/users`}>Users</Link></li>
          <li className="active"><Link to={`/app/roles`}>Roles</Link></li>
        </ul>

        <div className="col-md-12 p-t-15">
          <div className="panel panel-default">
            <div className="panel-heading text-uppercase text-info">
              Roles List

              <ul className="list-unstyled list-inline pull-right">
                <li>{this.props.getRolesProgress ? <img style={{width:60}} className="text-center image-responsive" src={loadingGif} /> : null}</li>
                <li><button type="button" className="btn text-capitalize btn-primary text-uppercase " onClick={this.upsertRole}>Add Role</button></li>
              </ul>
            </div>
            <div className="panel-body">

              <BootstrapTable  data={this.rows} search={true}  pagination={true} selectRow={selectRowProp}>
                  <TableHeaderColumn hidden={true}>Id</TableHeaderColumn>
                  <TableHeaderColumn isKey dataField='id' dataField='name'>Role</TableHeaderColumn>
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


export default connect(mapStateToProps, mapDispatchToProps)(Roles);
