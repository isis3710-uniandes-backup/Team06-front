import React, {Component} from 'react';
import { Redirect } from 'react-router';

import LogIn from './LogIn';
import SignUp from './SignUp';

export default class App extends Component{

  state = {
    login: true
  }

  toSignUp = () =>{
    this.setState({
        login: false
    });
  }

  toLogIn = () =>{
      this.setState({
          login: true
      });
  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));
  }

  render(){

    if(JSON.parse(localStorage.getItem('loggeduser')) != null){
      return <Redirect to='/session'/>;
    }

    return(
      <div>
        <nav>     
            
          <div className="nav-wrapper pink darken-4">
            <div className = "row"> 
              <div className = "col s12">
                <a href="#" className="brand-logo center">SPACEBEAT</a>
                <ul className="right hide-on-med-and-down">
                {
                  this.state.login?
                  <li><a onClick = {this.toSignUp} href="#">Sign Up</a></li>
                  :<li><a onClick = {this.toLogIn} href="#">Log In</a></li>
                }                
                </ul>
              </div>
            </div>
          </div>  
        </nav>

        <div className = "row">
          <div className = "col s7">
            <div className="slider">
              <ul className="slides">
                <li>
                  <img src="./assets/1.jpg"/>
                  <div className="caption center-align">
                    <h3>Make your own profile!</h3>
                    <h5 className="light grey-text text-lighten-3">Post your favorite songs</h5>
                  </div>
                </li>
                <li>
                  <img src="./assets/5.jpg"/>
                  <div className="caption left-align">
                    <h3>Connect to other people</h3>
                    <h5 className="light grey-text text-lighten-3">And become friends!</h5>
                  </div>
                </li>
                <li>
                  <img src="./assets/4.jpg"/>
                  <div className="caption right-align">
                    <h3 className= "grey-text text-darken-3">Create your music spaces!</h3>
                    <h5 className="light grey-text text-darken-2">Sharing never was that easy</h5>
                  </div>
                </li>
                <li>
                  <img src="./assets/2.jpg"/>
                  <div className="caption center-align">
                    <h3>Meet other artists</h3>
                    <h5 className="light grey-text text-lighten-3">According to your preferences</h5>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className = "col s5">            

            <div className="container">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {
                this.state.login?
                <LogIn toSignUp = {this.toSignUp}/>  
                :<SignUp toLogIn = {this.toLogIn}/>  
              }
                          
            </div>            
          </div>          
        </div> 

        <footer className="page-footer pink darken-4">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Spacebeat saves you</h5>
                <p className="grey-text text-lighten-4">Spacebeat will manage your information correctly. We guarantee the safe handling of your data.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Made by</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!">Sebastian Benítez</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Diego Ramos</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Nicolás Hernández</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2019 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">Home</a>
            </div>
          </div>
        </footer>   
        
      </div>
    )     
  }  
}
