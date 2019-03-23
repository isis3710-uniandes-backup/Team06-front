import React, {Component} from 'react';

export default class Explorer extends Component{

  state = {
    user: this.props.user,
    search: '',
    searching: false,
    users: [],
    artists: [],
    albums: [],
    songs: [],
    artistToAdd :{},
    albumToAdd : {},
    songToAdd : {},
    roomToAdd : {},
    playlistToAdd : {}
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

      });      
    }
  }

  setPlaylistToAdd = (playlist) =>{
    this.setState({
      playlistToAdd: playlist
    });
  }

  setArtistToAdd = (artist) =>{
    this.setState({
      artistToAdd: artist
    });
  }

  setAlbumToAdd = (album) =>{
    this.setState({
      albumToAdd: album
    });
  }

  setSongToAdd = (song) =>{
    this.setState({
      songToAdd: song
    });
  }

  setRoomToAdd = (room) =>{
    this.setState({
      roomToAdd: room
    });
  }

  addArtistToRoom = () =>{    
    const new_room = {chatroom_name: this.state.roomToAdd.chatroom_name, chatroom_mediaidentifier: 'artist:'+this.state.artistToAdd.artist_identifier};
      
    fetch('/api/user/'+this.state.user.id + '/chatroom/'+this.state.roomToAdd.id,{
      method: 'PUT',
      body: JSON.stringify(new_room),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Has ocurred any problem trying to add this artist to that room");
      }}).then(data => {
          let idUser = this.state.user.id;
          fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {  
            this.setState({
              roomToAdd: {},
              songToAdd : {},
              albumToAdd :{},
              artistToAdd: {},
              playlistToAdd :{}
            }, () =>{
              this.props.updateProfile(updatedUser);  
              M.toast({html:'Artist correctly added to room', classes: 'rounded'});
            });             
          });                   
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  addAlbumToRoom = () =>{    
    const new_room = {chatroom_name: this.state.roomToAdd.chatroom_name, chatroom_mediaidentifier: 'album:'+this.state.albumToAdd.album_identifier};
      
    fetch('/api/user/'+this.state.user.id + '/chatroom/'+this.state.roomToAdd.id,{
      method: 'PUT',
      body: JSON.stringify(new_room),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Has ocurred any problem trying to add this album to that room");
      }}).then(data => {
          let idUser = this.state.user.id;
          fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {  
            this.setState({
              roomToAdd: {},
              songToAdd : {},
              albumToAdd :{},
              artistToAdd: {},
              playlistToAdd :{}
            }, () =>{
              this.props.updateProfile(updatedUser);  
              M.toast({html:'Album correctly added to room', classes: 'rounded'});
            });            
          });                   
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  addSongToRoom = () =>{
    const new_room = {chatroom_name: this.state.roomToAdd.chatroom_name, chatroom_mediaidentifier: 'song:'+this.state.songToAdd.song_identifier};
      
    fetch('/api/user/'+this.state.user.id + '/chatroom/'+this.state.roomToAdd.id,{
      method: 'PUT',
      body: JSON.stringify(new_room),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Has ocurred any problem trying to add this song to that room");
      }}).then(data => {
          let idUser = this.state.user.id;
          fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {
            this.setState({
              roomToAdd: {},
              songToAdd : {},
              albumToAdd :{},
              artistToAdd: {},
              playlistToAdd :{}
            }, () =>{
              this.props.updateProfile(updatedUser);  
              M.toast({html:'Song correctly added to room', classes: 'rounded'});
            });                     
          });                   
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  addSongToPlaylist = () =>{
    const new_playlistsong = {};
      
    fetch('/api/user/'+this.state.user.id + '/playlist/'+this.state.playlistToAdd.id+'/song/'+this.state.songToAdd.id,{
      method: 'POST',
      body: JSON.stringify(new_playlistsong),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Thay playlist already has this song");
      }}).then(data => {
          let idUser = this.state.user.id;
          fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {
            this.setState({
              roomToAdd: {},
              songToAdd : {},
              albumToAdd :{},
              artistToAdd: {},
              playlistToAdd :{}
            }, () =>{
              this.props.updateProfile(updatedUser);  
              M.toast({html:'Song correctly added to playlist', classes: 'rounded'});
            });                     
          });                   
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  cancelAdd = () =>{
    this.setState({
      roomToAdd: {},
      songToAdd : {},
      albumToAdd :{},
      artistToAdd: {},
      playlistToAdd :{}
    });
  }

  buildArtistsCards = () =>{
    const cards = this.state.artists.map((artist,i)=>{

      const albumsItems = artist.Albums.map((album,i)=>{
        return <li key = {i} className="collection-item"><i>{album.album_name}</i><p>{album.album_releasedate.substring(0,10)}</p></li>
      });
      
      return(
        <div key = {artist.artist_identifier} className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={artist.artist_image}/>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{artist.artist_name}<i className="material-icons right">more_vert</i></span>          
          </div>
          <div className="card-action">
            <p><a onClick = {() => this.setArtistToAdd(artist)} className="waves-effect modal-trigger" href="#addArtistModal">Add to Room</a><a href="#!"><i className="material-icons right">thumb_up</i></a></p>
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
          <div key = {'user'+user.id} className="card hoverable">
            <div className="card-image waves-effect waves-block waves-light">
                <img className = "activator" src={"./images/"+user.user_image}/>              
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{user.user_names+' '+user.user_lastnames}<i className="material-icons right">more_vert</i></span>          
            </div>
            <div className="card-action">
              <p><a href="#!">Add as Friend<i className="material-icons right">person_add</i></a></p>
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
        <div key = {album.album_identifier} className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={album.album_image}/>
          </div>
          <div className="card-content">            
            <span className="card-title activator grey-text text-darken-4">{album.album_name}<i className="material-icons right">more_vert</i></span>
          </div>
          <div className="card-action">          
            <p><a onClick = {() => this.setAlbumToAdd(album)} className="waves-effect modal-trigger" href="#addAlbumModal">Add to Room</a><a href="#!"><i className="material-icons right">thumb_up</i></a></p>             
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
        <div key = {song.song_identifier} className="card hoverable">
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
            <p><a onClick = {() => this.setSongToAdd(song)} className="waves-effect modal-trigger" href="#addSongRoomModal">+ Room</a><a onClick = {() => this.setSongToAdd(song)} className="waves-effect modal-trigger" href="#addSongPlaylistModal">+ Playlist</a><a href="#!"><i className="material-icons right">thumb_up</i></a></p> 
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

  buildRoomsDrops = () =>{
    const drops = this.state.user.Chatrooms.map((room,i)=>{
      return(
        <li key = {room.id}><a onClick = {() => this.setRoomToAdd(room)} href="#!">{room.chatroom_name}</a></li>
      )
    });

    return drops;
  }

  buildRoomsPlaylists = () =>{
    const drops = this.state.user.Playlists.map((playlist,i)=>{
      return(
        <li key = {playlist.id}><a onClick = {() => this.setPlaylistToAdd(playlist)} href="#!">{playlist.playlist_name}</a></li>
      )
    });

    return drops;
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

        {/* Modals */}

        <div id="addSongRoomModal" className="modal">
          <div className="modal-content">
            <h4>Add Song to Room</h4>
            <p><b>Song selected: </b>{this.state.songToAdd.song_name}</p>
            {
              this.state.user.Chatrooms.length>0?
              <div>
                <p>Choose the room where you want to add the song you just selected:</p>
                <p><b>Room selected: </b></p><a className='dropdown-trigger btn' data-target='dropdownSongRoom'>{!this.state.roomToAdd.chatroom_name?'Select Room':this.state.roomToAdd.chatroom_name}</a>
                <ul id='dropdownSongRoom' className='dropdown-content'>
                  {this.buildRoomsDrops()}
                </ul>
                <p><i>Any media object you have related to this room will be replaced for this new one.</i></p>
              </div>
              :<p>You have not created any room</p>
            }            
          </div>
          <div className="modal-footer">
            <a onClick = {this.cancelAdd} href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
            {this.state.roomToAdd.chatroom_name?<a onClick = {this.addSongToRoom}  href="#!" className="modal-close waves-effect waves-green btn-flat">Done</a>:null}
          </div>
        </div>

        <div id="addSongPlaylistModal" className="modal">
          <div className="modal-content">
            <h4>Add Song to Playlist</h4>
            <p><b>Song selected: </b>{this.state.songToAdd.song_name}</p>
            {
              this.state.user.Playlists.length>0?
              <div>
                <p>Choose the playlist where you want to add the song you just selected:</p>
                <p><b>Playlist selected: </b></p><a className='dropdown-trigger btn' data-target='dropdownSongPlaylist'>{!this.state.playlistToAdd.playlist_name?'Select Playlist':this.state.playlistToAdd.playlist_name}</a>
                <ul id='dropdownSongPlaylist' className='dropdown-content'>
                  {this.buildRoomsPlaylists()}
                </ul>
              </div>
              :<p>You have not created any room</p>
            }            
          </div>
          <div className="modal-footer">
            <a onClick = {this.cancelAdd} href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
            {this.state.playlistToAdd.playlist_name?<a onClick = {this.addSongToPlaylist}  href="#!" className="modal-close waves-effect waves-green btn-flat">Done</a>:null}
          </div>
        </div>

        <div id="addAlbumModal" className="modal">
          <div className="modal-content">
            <h4>Add Album to Room</h4>
            <p><b>Album selected: </b>{this.state.albumToAdd.album_name}</p>
            {
              this.state.user.Chatrooms.length>0?
              <div>
                <p>Choose the room where you want to add the album you just selected:</p>
                <p><b>Room selected: </b></p><a className='dropdown-trigger btn' data-target='dropdownAlbum'>{!this.state.roomToAdd.chatroom_name?'Select Room':this.state.roomToAdd.chatroom_name}</a>
                <ul id='dropdownAlbum' className='dropdown-content'>
                  {this.buildRoomsDrops()}
                </ul>
                <p><i>Any media object you have related to this room will be replaced for this new one.</i></p>
              </div>
              :<p>You have not created any room</p>
            }             
          </div>
          <div className="modal-footer">
            <a onClick = {this.cancelAdd} href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
            {this.state.roomToAdd.chatroom_name?<a onClick = {this.addAlbumToRoom}  href="#!" className="modal-close waves-effect waves-green btn-flat">Done</a>:null}            
          </div>
        </div>

        <div id="addArtistModal" className="modal">
          <div className="modal-content">
            <h4>Add Artist to Room</h4>
            <p><b>Artist selected: </b>{this.state.artistToAdd.artist_name}</p>
            {
              this.state.user.Chatrooms.length>0?
              <div>
                <p>Choose the room where you want to add the artist you just selected:</p>
                <p><b>Room selected: </b></p><a className='dropdown-trigger btn' data-target='dropdownArtist'>{!this.state.roomToAdd.chatroom_name?'Select Room':this.state.roomToAdd.chatroom_name}</a>
                <ul id='dropdownArtist' className='dropdown-content'>
                  {this.buildRoomsDrops()}
                </ul>
                <p><i>Any media object you have related to this room will be replaced for this new one.</i></p>
              </div>
              :<p>You have not created any room</p>
            }            
          </div>
          <div className="modal-footer">
            <a onClick = {this.cancelAdd} href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
            {this.state.roomToAdd.chatroom_name?<a onClick = {this.addArtistToRoom}  href="#!" className="modal-close waves-effect waves-green btn-flat">Done</a>:null}            
          </div>
        </div>

      </div>
    )     
  }  
}