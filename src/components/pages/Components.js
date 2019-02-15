import React from 'react';



export default class Components extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="container-fluid">
      <div className="row">

        <div className="well text-uppercase">
            colors
        </div>



        <div className="col-md-6">

          <ul className="list-inline list-unstyled pull-left">
            <li><div className="bg-primary color-box"></div></li>
            <li><div className="bg-success color-box"></div></li>
            <li><div className="bg-info color-box"></div></li>
            <li><div className="bg-danger color-box"></div></li>
            <li><div className="bg-warning color-box"></div></li>
            <li><div className="bg-default color-box"></div></li>
          </ul>
          <ul className="list-inline list-unstyled">
            <li><div className="bg-primary color-circle"></div></li>
            <li><div className="bg-success color-circle"></div></li>
            <li><div className="bg-info color-circle"></div></li>
            <li><div className="bg-danger color-circle"></div></li>
            <li><div className="bg-warning color-circle"></div></li>
            <li><div className="bg-default color-circle"></div></li>
          </ul>


        </div>



      </div>

      <div className="row">

        <div className="well text-uppercase">
            ui components
        </div>

        <div className="col-md-12">
            <h6 className="text-uppercase text-center">[buttons]</h6>
              <div className="col-md-12">
                  <h6 className="text-uppercase">[Default State]</h6>
              </div>

              <ul className="list-inline list-unstyled">
                <li><button type="button" className="btn btn-primary  text-uppercase ">primary</button></li>
                <li><button type="button" className="btn btn-success text-uppercase">success</button></li>
                <li><button type="button" className="btn btn-info text-uppercase">info</button></li>
                <li><button type="button" className="btn btn-danger text-uppercase">danger</button></li>
                <li><button type="button" className="btn btn-warning text-uppercase">warning</button></li>
                <li><button type="button" className="btn btn-default text-uppercase">default</button></li>
              </ul>



        </div>




      </div>

      <div className="row">
        <div className="col-md-12">
          <h6 className="text-uppercase text-center">[form elements]</h6>

            <div className="col-md-3">
              <div className="form-group">

                  <input type="text" className="form-control"  placeholder="Enter your keyword..." />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">

                  <input type="text" className="form-control" placeholder="Enter your keyword..." />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <select className="form-control">
                  <option value="Categories">Categories</option>
                  <option value="Exclusive">Exclusive</option>
                  <option value="Coupon">Coupon</option>
                  <option value="Cashback">Cashback</option>
                </select>


            </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">

                    <textarea className="form-control" rows="10" id="comment"></textarea>
              </div>
            </div>
        </div>

      </div>


      <div className="row">
        <div className="col-md-12">

          <ul className="list-unstyled list-inline">
            <li>
              <div className="form-group">

                <div className="radio">

                     <label className="text-uppercase"><input type="radio" /> <span></span> Option 1</label>

                </div>

                <div className="radio">

                     <label className="text-uppercase"><input type="radio" checked /> <span></span> Option 2</label>

                </div>


              </div>
            </li>
            <li>
              <div className="form-group">

          <div className="checkbox">

               <label className="text-uppercase"><input type="checkbox" /> <span></span> Option 1</label>

          </div>
          <div className="checkbox">

               <label className="text-uppercase"><input type="checkbox" checked /> <span></span> Option 2</label>

          </div>


        </div>
            </li>

          </ul>


        </div>
      </div>


      <div className="row">
        <div className="col-md-12">
            <h6 className="text-uppercase text-center">[Navigation]</h6>
          <ul className="nav nav-tabs text-center">
            <li className="active"><a href="#">Users</a></li>
            <li><a href="#">Roles</a></li>
            <li><a href="#">Managment</a></li>
            <li><a href="#">Settings</a></li>

          </ul>

        </div>
      </div>

    </div>


    );


  }
}
