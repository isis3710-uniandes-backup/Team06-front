import React, {Component} from 'react';
import { Redirect } from 'react-router';

export default class LogIn extends Component{

  state = {
    user_email: '',
    user_password: '',
    redirect : false
  }

  toSignUp = () =>{
    this.props.toSignUp();
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }

  handleSubmit = () => {
    var identified = false;
    var idIdentified = 0;
    fetch('/api/user').then(res => res.json()).then(data => {      
        data.forEach( (dat) => {
            if(dat.user_email == this.state.user_email && dat.user_password == this.state.user_password)
            {
                idIdentified = dat.id;
                identified = true;
            }
        });  
        
        if(identified == true){
            M.toast({html:'Welcome to Spacebeat', classes: 'rounded'});
            localStorage.setItem('loggeduser', JSON.stringify({id: idIdentified}));
            this.setState({              
              redirect: true
            });
        }             
        else if(this.state.user_password == '' || this.state.user_email == ''){
            M.toast({html:'Provide valid values of your account', classes: 'rounded'});
        }
        else{
            M.toast({html:'Information do not match with any account', classes: 'rounded'});
        }       
    });     
  }

  render(){

    if(this.state.redirect){
      return <Redirect to='/session'/>;
    }

    return(
      <div>
        <center>
            <h3>Log In</h3>
            <h6>or <a onClick = {this.toSignUp} href="#action">sign your account up</a></h6>
            <br></br>
            <br></br>
        </center>
        <div className="row">
            <form className="col s12">
                <div className = "container">                
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="user_email" type="email" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="user_email">E-mail</label>
                            <span className="helper-text" data-error="This e-mail is not valid" data-success="This e-mail is valid">Write your e-mail...</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="user_password" type="password" className="validate" onChange = {this.handleInput}/>
                        <label htmlFor="user_password">Password</label>
                        </div>
                    </div>
                </div>              
            </form>

            <br></br>
            <br></br>
            
            <center>
            <a onClick ={this.handleSubmit} className="waves-effect waves-light btn grey darken-4">Log In</a>
            <br></br>
            <br></br>
            {/**<a onClick = {this.toSignUp} href="#">Did you forget your password?</a>*/}
            </center>
        </div>
      </div>
    )     
  }  
}
