import React, {Component} from 'react';

export default class Playlists extends Component{

  state = {
    user: this.props.user,
    playlists: this.props.user.Playlists,
    adding: false,
    playlist_name: ''
  }

  toAdd = () =>{
    this.setState({
      adding: true
    });
  }
  
  addPlaylist = () =>{
    if(this.state.playlist_name != ''){

      const new_playlist = {playlist_name: this.state.playlist_name}

      fetch('/api/user/'+this.state.user.id+'/playlist',{
        method: 'POST',
        body: JSON.stringify(new_playlist),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Playlist could not be created");
        }}).then(data => {
          M.toast({html:'Your playlist has been created correctly', classes: 'rounded'});
          this.setState({
            playlists: [...this.state.playlists, data],
            adding: false,
            playlist_name: ''
          }, () => {
            if(this.state.playlists.length == 1){
              document.dispatchEvent(new Event('component'));
            }
            let updatedUser = this.state.user;
            updatedUser.Playlists = this.state.playlists;
            this.props.updateProfile(updatedUser);
          });
        }).catch(error => M.toast({html:error.message, classes: 'rounded'}));      
    }
    else{
      M.toast({html: 'You must provide a valid name for a playlist', classes: 'rounded'});
    }  
  }

  deletePlaylist = (n) =>{

    fetch('/api/user/'+this.state.user.id+'/playlist/'+this.state.playlists[n].id,{
      method: 'DELETE'
      }).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Playlist could not be deleted");
      }}).then(data => {
        M.toast({html:'Your playlist has been deleted correctly', classes: 'rounded'});
        let playlists = [...this.state.playlists];
        playlists.splice(parseInt(n),1);
        this.setState({
            playlists: playlists
        }, () => {
          let updatedUser = this.state.user;
          updatedUser.Playlists = playlists;
          this.props.updateProfile(updatedUser);
        });
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));    
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }

  componentDidMount(){    
    document.dispatchEvent(new Event('component'));
  }

  render(){  
      
    const playlists = this.state.playlists.map((playlist,i) =>{
        return(
            <li key = {i}>
                <div className="collapsible-header"><i className="material-icons">format_list_bulleted</i>{playlist.playlist_name}</div>
                <div className="collapsible-body"><span>{playlist.playlist_name}</span>

                  <center>
                    <a className="waves-effect waves-light btn grey" href="#!">Change name</a>
                    {" "}
                    <a onClick = {() => this.deletePlaylist(i)} className="waves-effect waves-light btn red darken-4"  href="#!">Delete</a>
                  </center>
                </div>
            </li>
        )
    });

    return(

        <div className = "container">

            <br></br>
            <br></br>
            <h5 className = "center-align">My playlists</h5>
            <br></br>
            {
              this.state.playlists.length > 0?
              <ul className="collapsible">
                {playlists}
              </ul>
              :null
            }
            
            <br></br>
            {
                this.state.adding?                            
                <div className = "row">
                  <center>
                    <div className = "container">
                      <div className = "col s11">                  
                        <input id="playlist_name" placeholder = "Name of playlist" type="text" className="validate" onChange = {this.handleInput}/>
                      </div>
                      <div className = "col s1">  
                        <a onClick = {this.addPlaylist} className="btn-floating btn-medium waves-effect waves-light green darken-3"><i className="material-icons right ">check</i></a>
                      </div>
                    </div>
                  </center>
                </div>
                :<center>
                  <a onClick = {this.toAdd} className="btn-floating btn-large waves-effect waves-light grey darken-2"><i className="material-icons">add</i></a>
                </center> 
            }
                 

        </div>
    )     
  }  
}