import React from 'react';
import Iframe from 'react-iframe'

export default class Home extends React.Component {

  constructor(props) {
    super(props);

  }

  renderh1 = () => {
    let array = [];

    for (var index = 0; index < 20; index++) {
      //array.push(<h1 key={index}>Hello world</h1>)
    }

    return array;
  }

  render() {
    return (
      <div>

      <Iframe url="https://app.powerbi.com/view?r=eyJrIjoiNWM3OThiMTItM2Q1Zi00MjViLWFiNGEtYWU3MWI4OWMwYWY1IiwidCI6ImViYTlkZDU5LTdlMGItNGE0Ni1iNzIxLTk5MTU2ZGY3NjkzMyIsImMiOjEwfQ%3D%3D"
        width="100%"
        height="95vh"
        id="myId"
        allowFullScreen/>



      </div>
    );

  }

}
