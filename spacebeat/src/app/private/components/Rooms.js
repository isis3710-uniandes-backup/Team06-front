import React, {Component} from 'react';

export default class Rooms extends Component{

    /* constructor(){
        super();        
    } */

  state = {
    user: this.props.user,
    rooms: this.props.user.Chatrooms,
    selected : 0,
    chatroom_name: '',
    adding : false
  }

  toAdd = () => {
      this.setState({
          adding: true
      });
  }

  deleteSelected = () => {

    fetch('/api/user/'+this.state.user.id+'/chatroom/'+this.state.rooms[this.state.selected].id,{
        method: 'DELETE'
        }).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Room could not be deleted");
        }}).then(data => {
            M.toast({html:'Your room has been deleted correctly', classes: 'rounded'});
            let rooms = [...this.state.rooms];
            rooms.splice(parseInt(this.state.selected),1);
            this.setState({
                rooms: rooms,
                selected: this.state.selected > 0? this.state.selected-1:0
            }, () => {
                let updatedUser = this.state.user;
                updatedUser.Chatrooms = rooms;
                this.props.updateProfile(updatedUser);
              });
        }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  addRoom = () => {
    if(this.state.chatroom_name != ''){

        const new_chatroom = {chatroom_name: this.state.chatroom_name}
  
        fetch('/api/user/'+this.state.user.id+'/chatroom',{
          method: 'POST',
          body: JSON.stringify(new_chatroom),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(res => {              
            if(res.ok){
              return res.json();                
            } 
            else{
              throw new Error("Room could not be created");
          }}).then(data => {
            M.toast({html:'Your room has been created correctly', classes: 'rounded'});
            this.setState({
                rooms: [...this.state.rooms,data],
                adding: false
            }, () => {                
                let updatedUser = this.state.user;
                updatedUser.Chatrooms = this.state.rooms;
                this.props.updateProfile(updatedUser);
              });
          }).catch(error => M.toast({html:error.message, classes: 'rounded'}));      
      }
      else{
        M.toast({html: 'You must provide a valid name for a room', classes: 'rounded'});
      }           
  }

  selectRoom = (n) => {
      this.setState({
        selected: n
      });
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

    const rooms = this.state.rooms.map((room, i)=>{
        if(this.state.selected == i){
            return(            
                <a key = {i} href="#" className="collection-item active">{room.chatroom_name}</a>
            )
        }
        else{
            return(            
                <a key = {i} onClick = {() => this.selectRoom(i)} href="#" className="collection-item">{room.chatroom_name}</a>
            )
        }        
    });

    const selectedRoom = this.state.rooms[this.state.selected];

    return(

        <div className = "container">

            <br></br>
            <br></br>
            <h5 className = "center-align">My rooms</h5>
            <br></br>

            <div className = "row">

                <div className = "col s4">

                    {
                        this.state.rooms.length > 0?
                        <div className = "collection">
                            {rooms}
                        </div>
                        :null
                    }

                    {                        
                        this.state.adding?                            
                        <div className = "row">
                            <center>
                                <div className = "container">
                                    <div className = "col s12 l9">                  
                                        <input id="chatroom_name" placeholder = "Name of room" type="text" className="validate" onChange = {this.handleInput}/>
                                    </div>
                                    <div className = "col s12 l3">
                                        <a onClick = {this.addRoom} className="btn-floating btn-medium waves-effect waves-light green darken-3"><i className="small material-icons right ">check</i></a>
                                    </div> 
                                </div>                               
                            </center>
                        </div>
                        :this.state.rooms.length < 10?
                        <center>
                            <a onClick = {this.toAdd} className="btn-floating btn-large waves-effect waves-light grey darken-2"><i className="material-icons">add</i></a>
                        </center> 
                        :null
                    }
                    
                </div>

                <div className = "col s8">
                {
                    this.state.rooms.length > 0?
                    <div className="card large">                    
                        <div className="card-content">
                        <p>{selectedRoom.chatroom_name}</p>
                        </div>
                        <div className="card-action">
                        <a className="grey-text text-darken-4" href="#">Change name</a>
                        <a className="red-text text-darken-4" onClick = {this.deleteSelected} href="#"><i className="material-icons right">delete</i></a>
                        </div>
                    </div>
                :<center><h6>Add rooms to enjoy this feature!</h6></center>
                }               
                </div>

            </div>
                      

        </div>
    )     
  }  
}