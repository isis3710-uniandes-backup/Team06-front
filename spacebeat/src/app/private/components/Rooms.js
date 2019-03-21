import React, {Component} from 'react';

export default class Rooms extends Component{

    /* constructor(){
        super();        
    } */

  state = {
    user: this.props.user,
    rooms: [{chatroom_name: 'Primero'},{chatroom_name: 'Segundo'}],
    selected : 0
  }

  deleteSelected = () => {
    let rooms = [...this.state.rooms];
    rooms.splice(parseInt(this.state.selected),1);
    this.setState({
        rooms: rooms,
        selected: this.state.selected > 0? this.state.selected-1:0
    });
  }

  addRoom = () => {      
      this.setState({
        rooms: [...this.state.rooms, {chatroom_name: 'My new room'}]
      });      
  }

  selectRoom = (n) => {
      this.setState({
        selected:n
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
                        this.state.rooms.length < 10?
                        <center>
                            <a onClick = {this.addRoom} className="btn-floating btn-medium waves-effect waves-light grey darken-2"><i className="material-icons">add</i></a>
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
                        <a className="grey-text text-darken-3" href="#"><b>Add song</b></a>
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