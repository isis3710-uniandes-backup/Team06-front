import React, {Component} from 'react';

export default class Home extends Component{

  state = {
    user: this.props.user    
  }

  componentDidMount(){    
    document.dispatchEvent(new Event('component'));
  }

  render(){

    return(

      <div className = "container">

        <br></br>
        <br></br>
        <h5 className = "center-align">Home</h5>
        <br></br>             

      </div>
    )     
  }  
}
