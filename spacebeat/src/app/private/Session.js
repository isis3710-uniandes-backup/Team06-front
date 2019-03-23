import React, {Component} from 'react';
import { Redirect } from 'react-router';

import Home from './components/Home';
import Explorer from './components/Explorer';
import Playlists from './components/Playlists';
import Preferences from './components/Preferences';
import Rooms from './components/Rooms';

export default class Session extends Component{

  state = {
    user: {},
    logged : JSON.parse(localStorage.getItem('loggeduser')) == null ? false : true,
    page: 'home',
    ready: false
  }

  updateProfile = (newUser) => {
    this.setState({
      user: newUser
    });
  }

  logOut = () => {
    localStorage.setItem('loggeduser', JSON.stringify(null));
    this.setState({
      logged: false
    }, () => {
      M.toast({html:'Spacebeat will miss you', classes: 'rounded'});
    });
  }

  changePage = (new_page) => {
    if(this.state.ready){
      this.setState({
        page: new_page
      });
    }    
  }

  componentDidMount(){
    var retrievedObject = JSON.parse(localStorage.getItem('loggeduser'));
    if(retrievedObject != null){
      let idUser = retrievedObject.id;
      fetch('/api/user/'+idUser).then(res => res.json()).then(data => {  
        console.log(data);    
        this.setState({
          user: data,
          ready: true
        });             
      }).catch(error => {this.setState({logged:false});});     
    } 
    document.dispatchEvent(new Event('component'));       
  }

  render(){

    if(!this.state.logged){
      return <Redirect to='/'/>;
    }

    return(

      <div className = "content">        
        
        <ul id="mobile-demo" className="sidenav sidenav-fixed">
          <li>
            {
              this.state.ready?
              <div className="user-view">
                <div className="background">
                  <img className = "responsive-img" src={"./images/"+this.state.user.user_banner}/>
                </div>
                <a href="#"><img className="circle" src={"./images/"+this.state.user.user_image}/></a>
                <a href="#"><span className="white-text name">{this.state.user.user_names + " " + this.state.user.user_lastnames}</span></a>
                <a href="#"><span className="white-text email">{this.state.user.user_email}</span></a>
              </div>
              :
              <div className="user-view">
                <div className="background">
                  <img className = "responsive-img" src={"./images/defaultbanner.jpg"}/>
                </div>
                <a href="#"><img className="circle" src={"./images/defaultprofile.jpg"}/></a>
                <a href="#"><span className="white-text name">{this.state.user.user_names + " " + this.state.user.user_lastnames}</span></a>
                <a href="#"><span className="white-text email">{this.state.user.user_email}</span></a>
              </div>
            }
          </li>
          {
            this.state.page == 'home'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('home')} href="#"><i className="material-icons">home</i>Home</a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('home')} href="#"><i className="material-icons">home</i>Home</a></li>
          }
          {
            this.state.page == 'playlists'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('playlists')} href="#"><i className="material-icons">view_list</i>Playlists</a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('playlists')} href="#"><i className="material-icons">view_list</i>Playlists</a></li>
          }
          {
            this.state.page == 'rooms'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('rooms')} href="#"><i className="material-icons">people</i>Rooms</a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('rooms')} href="#"><i className="material-icons">people</i>Rooms</a></li>
          }
          {
            this.state.page == 'explorer'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('explorer')} href="#"><i className="material-icons">search</i>Explorer</a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('explorer')} href="#"><i className="material-icons">search</i>Explorer</a></li>
          }
          <li><div className="divider"></div></li>
          <li><a className="subheader">Your account</a></li>
          {
            this.state.page == 'preferences'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('preferences')}href="#">Settings</a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('preferences')}href="#">Settings</a></li>
          }          
          <li><a className="waves-effect modal-trigger" href="#confirmModal">Log Out</a></li>
        </ul>

        <div className = "sessionmain">

          <nav>            
            <div className="nav-wrapper pink darken-4">
              <a href="#" className="brand-logo center">SPACEBEAT</a>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">                           
              </ul>
            </div>
          </nav>         

          {
            this.state.page == 'home'?
              <Home updateProfile = {this.updateProfile} user = {this.state.user}/>
            :this.state.page == 'playlists'?
              <Playlists updateProfile = {this.updateProfile} user = {this.state.user}/>
            :this.state.page == 'rooms'?
              <Rooms updateProfile = {this.updateProfile} user = {this.state.user}/>
            :this.state.page == 'explorer'?
              <Explorer updateProfile = {this.updateProfile} user = {this.state.user}/>
            :this.state.page == 'preferences'?
              <Preferences updateProfile = {this.updateProfile} user = {this.state.user}/>
            :null
          }        

        </div>
        
        <footer className="page-footer pink darken-4">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Enjoy being here!</h5>
                <p className="grey-text text-lighten-4">Your are in home. Do what ever you want.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#">Contact support</a></li>
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

        {/* Modals */}

        <div id="confirmModal" className="modal">
          <div className="modal-content">
            <h4>Log Out</h4>
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-green btn-flat">No</a>
            <a onClick = {this.logOut} className="modal-close waves-effect waves-green btn-flat">Yes</a>
          </div>
        </div>        

      </div>
    )     
  }  
}
