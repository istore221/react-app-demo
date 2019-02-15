import React from 'react';
import Iframe from 'react-iframe'



export default class Temp extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Iframe url="https://app.powerbi.com/view?r=eyJrIjoiNWM3OThiMTItM2Q1Zi00MjViLWFiNGEtYWU3MWI4OWMwYWY1IiwidCI6ImViYTlkZDU5LTdlMGItNGE0Ni1iNzIxLTk5MTU2ZGY3NjkzMyIsImMiOjEwfQ%3D%3D"
        width="100%"
        height="95vh"
        id="myId"
        allowFullScreen/>


    );


  }
}
