import React, {Component} from 'react';
import { Redirect } from 'react-router';

import LogIn from './LogIn';
import SignUp from './SignUp';

export default class App extends Component{

  state = {
    login: false
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
                
                  <li><a href="#action">Join us</a></li>
                             
                </ul>
              </div>
            </div>
          </div>  
        </nav>

        <div className="parallax-container">
          <div className="parallax"><img className = "responsive-img" src="./assets/A.jpg"/></div>
        </div>

        <br></br>
        <br></br>

        <div className = "row">
          <div className = "col s6">
              <div className ="container">
                <center>
                  <br></br>
                  <i className="material-icons large">account_box</i>
                  <h3>Make your own profile!</h3>
                  <h5 className="light grey-text text-lighten-1">Post your favorite songs</h5>
                </center>
              </div>
          </div>
          <div className = "col s6">
              <div className ="container">
                <center>
                  <h3>Connect to other people</h3>
                  <h5 className="light grey-text text-lighten-1">And become friends!</h5>
                  <br></br>              
                  <i className="material-icons large">supervisor_account</i>
                  <br></br>
                </center>
              </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className="parallax-container">
          <div className="parallax"><img className = "responsive-img" src="./assets/E.jpg"/></div>
        </div>

        <br></br>
        <br></br>

        <div className = "row">
          <div className = "col s6">
              <div className ="container">
                <center>                  
                  <h3>Create your music spaces!</h3>
                  <h5 className="light grey-text text-lighten-1">Sharing never was this easy</h5>
                  <br></br>
                  <i className="material-icons large">music_video</i>
                  <br></br>
                </center>
              </div>
          </div>
          <div className = "col s6">
              <div className ="container">
                <center>
                  <br></br>
                  <i className="material-icons large">check</i>
                  <h3>Know more about music</h3>
                  <h5 className="light grey-text text-lighten-1">According to your preferences</h5>                  
                </center>
              </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className="parallax-container">
          <div className="parallax"><img className = "responsive-img" src="./assets/G.jpg"/></div>
        </div>

        <div id = "action" className="container">          
          <br></br>
          <br></br>
          {
            this.state.login?
            <LogIn toSignUp = {this.toSignUp}/>  
            :<SignUp toLogIn = {this.toLogIn}/>  
          }
          <br></br>
          <br></br>
          <br></br>                 
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
            <a className="grey-text text-lighten-4 right" href="#">Home</a>
            </div>
          </div>
        </footer>   
        
      </div>
    )     
  }  
}
