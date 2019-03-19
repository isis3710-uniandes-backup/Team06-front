import React, {Component} from 'react';

export default class App extends Component{

  state = {
    hola: 'jiji'
  }

  render(){
    return(
      
     <div>{this.state.hola}</div>
    )     
  }  
}
