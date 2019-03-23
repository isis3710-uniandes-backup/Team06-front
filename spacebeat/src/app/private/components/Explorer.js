import React, {Component} from 'react';

export default class Explorer extends Component{

  state = {
    user: this.props.user,
    search: '',
    searching: false,
    users: [],
    artists: [],
    albums: [],
    songs: []
  }

  stopSearching = () =>{
    this.setState({
      search: '',
      searching: false
    });
  }

  convertDuration = (duration) =>{
    let min = Math.floor(duration/(1000*60))
    let seg = Math.ceil((duration - min*1000*60)/1000)
    return min +' minutes '+seg+' seconds'
  }

  updateSearching = () =>{
    if(this.state.search.replace(/\s/g,'').length == 0){
      this.setState({
        users: [],
        artists: [],
        songs: [],
        albums: []
      });
    }
    else if(this.state.search !== ''){
      this.setState({
        searching: true
      }, () =>{

        var users = new Promise(
          (resolve, reject)=>{
            fetch('/api/userbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{    
              this.setState({
                users: data
              }, () => resolve(true));        
            }).catch(error => reject(true));
          }
        );

        var artists = new Promise(
          (resolve, reject)=>{
            fetch('/api/artistbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{        
              this.setState({
                artists: data
              }, () => resolve(true));        
            }).catch(error => reject(true));
          }
        );

        var albums = new Promise(
          (resolve, reject)=>{
            fetch('/api/albumbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{     
              this.setState({
                albums: data
              }, () => resolve(true));        
            }).catch(error => reject(true));
          }
        );

        var songs = new Promise(
          (resolve, reject)=>{
            fetch('/api/songbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{
              this.setState({
                songs: data
              }, () => resolve(true));        
            }).catch(error => reject(true));
          }
        );

        Promise.all([users, songs, albums, artists]).then(values =>{
            this.setState({
              searching: false
            });
          }
        );
        /* fetch('/api/userbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{    
          this.setState({
            users: data
          });        
        });
  
        fetch('/api/artistbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{        
          this.setState({
            artists: data
          });        
        });
  
        fetch('/api/albumbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{     
          this.setState({
            albums: data
          });        
        });
  
        fetch('/api/songbyname/'+ this.state.search.trim()).then(res=>res.json()).then(data =>{
          this.setState({
            songs: data
          });        
        }); */
      });      
    }
  }

  buildArtistsCards = () =>{
    const cards = this.state.artists.map((artist,i)=>{

      const albumsItems = artist.Albums.map((album,i)=>{
        return <li key = {i} className="collection-item"><i>{album.album_name}</i><p>{album.album_releasedate.substring(0,10)}</p></li>
      });
      
      return(
        <div key = {artist.artist_identifier} className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={artist.artist_image}/>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{artist.artist_name}<i className="material-icons right">more_vert</i></span>          
          </div>
          <div className="card-action">
            <p><a href="#">Add to Favorites</a><i className="material-icons right">thumb_up</i></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{artist.artist_name}<i className="material-icons right">close</i></span>
            <p><b>Genre: </b>{artist.artist_genre}</p>
            <p><b>Likes: </b>{artist.artist_likes}</p>
            <br></br>
            <center>
              <h6><b>Albums</b></h6>
            </center>
            <br></br>
            <ul className="collection">
              {albumsItems}
            </ul>            
          </div>
        </div>
      )
    });

    return cards;
  }

  buildUsersCards = () =>{
    const cards = this.state.users.map((user,i)=>{
      if(user.id == this.state.user.id){
        return null;
      }
      else{

        const roomsItems = user.Chatrooms.map((room,i)=>{
          return <li key = {i} className="collection-item"><i>{room.chatroom_name}</i></li>
        });

        const playlistsItems = user.Playlists.map((playlist,i)=>{
          return <li key = {i} className="collection-item"><i>{playlist.playlist_name}</i></li>
        });

        return(        
          <div key = {'user'+user.id} className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <img className = "activator" src={"./images/"+user.user_image}/>              
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{user.user_names+' '+user.user_lastnames}<i className="material-icons right">more_vert</i></span>          
            </div>
            <div className="card-action">
              <p><a href="#">Add as Friend</a><i className="material-icons right">person_add</i></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{user.user_names+' '+user.user_lastnames}<i className="material-icons right">close</i></span>
              <p><b>Names: </b>{user.user_names}</p>
              <p><b>Last Names: </b>{user.user_lastnames}</p>
              <p><b>E-mail: </b>{user.user_email}</p>
              <br></br>
              <center>
                <h6><b>Rooms</b></h6>
              </center>
              <br></br>
              {
                user.Chatrooms.length > 0?
                <ul className="collection">
                  {roomsItems}
                </ul>
                :<p>This user has not created any room</p>
              }
              
              <br></br>
              <center>
                <h6><b>Playlists</b></h6>
              </center>
              <br></br>
              {
                user.Playlists.length > 0?
                <ul className="collection">
                  {playlistsItems}
                </ul>
                :<p>This user has not created any playlist</p>
              }              
            </div>
          </div>
        );
      }      
    });

    return cards;
  }

  buildAlbumsCards = () =>{
    const cards = this.state.albums.map((album,i)=>{

      const songsItems = album.Songs.map((song,i)=>{
        return <li key = {i} className="collection-item"><i>{song.song_name}</i><p>{this.convertDuration(song.song_duration)}</p></li>
      });

      return(
        <div key = {album.album_identifier} className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={album.album_image}/>
          </div>
          <div className="card-content">            
            <span className="card-title activator grey-text text-darken-4">{album.album_name}<i className="material-icons right">more_vert</i></span>
          </div>
          <div className="card-action">
            <p><a href="#">Add to Room</a><i className="material-icons right">thumb_up</i></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{album.album_name}<i className="material-icons right">close</i></span>
            <p><b>Artist: </b>{album.Artist.artist_name}</p>
            <p><b>Release date: </b>{album.album_releasedate.substring(0,10)}</p>
            <p><b>Likes: </b>{album.album_likes}</p>
            <br></br>
            <center>
              <h6><b>Songs</b></h6>
            </center>
            <br></br>
            <ul className="collection">
              {songsItems}
            </ul>  
          </div>
        </div>
      )
    });

    return cards;
  }

  buildSongsCards = () =>{
    const cards = this.state.songs.map((song,i)=>{
      return(
        <div key = {song.song_identifier} className="card">
          <div className="card-content">
            <div className = "row">
              <div className = "col s10">
              <span className="card-title activator grey-text text-darken-4">{song.song_name}</span>
            <p>{song.Album.Artist.artist_name}</p>
            </div>
            <div className = "col s2">
              <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span></div>
            </div>
          </div>
          <div className="card-action">
            <p><a href="#">Add to Room</a><i className="material-icons right">thumb_up</i></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{song.song_name}<i className="material-icons right">close</i></span>
            <p><b>Artist: </b>{song.Album.Artist.artist_name}</p>
            <p><b>Album: </b>{song.Album.album_name}</p>
            <p><b>Duration: </b>{this.convertDuration(song.song_duration)}</p>
            <p><b>Likes: </b>{song.song_likes}</p>
          </div>
        </div>
      )
    });

    return cards;
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    }, () => this.updateSearching());
  }

  componentDidMount(){    
    document.dispatchEvent(new Event('component'));
  }  

  render(){

    return(

      <div>
        <br></br>
        <div className = "row">
          <br></br>            
          <div className="col s12">
              <nav>
                  <div className="nav-wrapper grey lighten-1">
                      <form>
                          <div className="input-field">
                          <input id="search" type="search" value={this.state.search} onChange = {this.handleInput} required/>
                          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                          <i onClick = {this.stopSearching} className="material-icons">close</i>
                          </div>
                      </form>
                  </div>
              </nav>
          </div>           
        </div>
        
        {
          this.state.search==''?
          <div className ="container">
            <br></br>
            <center>
              <h4>Please, type something for searching</h4>
            </center>
          </div>
          :this.state.searching?
          <div>
          <br></br>
          <center>
            <div className="preloader-wrapper active">
              <div className="spinner-layer">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </center> 
          </div>
          :
          <div className = "row">
            <div className = "col s12 m6 xl3">
              <center>
                <h5>Users</h5>
                <br></br>
                {
                  (this.state.users.length > 1 || (this.state.users.length == 1 && this.state.users[0].id != this.state.user.id))?
                    this.buildUsersCards()
                  :<h6>No users found</h6>
                }
              </center>
            </div>
            <div className = "col s12 m6 xl3">
              <center>
                <h5>Artists</h5>
                <br></br>
                {
                  this.state.artists.length >0?
                    this.buildArtistsCards()
                  :<h6>No artists found</h6>
                }
              </center>
            </div> 
            <div className = "col s12 m6 xl3">
              <center>
                <h5>Albums</h5>
                <br></br>
                {
                  this.state.albums.length > 0?
                    this.buildAlbumsCards()
                  :<h6>No albums found</h6>
                }
              </center>
            </div> 
            <div className = "col s12 m6 xl3">
              <center>
                <h5>Songs</h5>
                <br></br>
                {
                  this.state.songs.length > 0?
                    this.buildSongsCards()
                  :<h6>No songs found</h6>
                }
              </center>
            </div>  
          </div>
        }

        
      </div>
    )     
  }  
}