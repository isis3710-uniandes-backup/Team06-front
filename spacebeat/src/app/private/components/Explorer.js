import React, {Component} from 'react';

export default class Explorer extends Component{

  state = {
    user: this.props.user,
    search: ''
  }

  stopSearching = () =>{
    this.setState({
        search: ''
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

    return(

        <div className = "container">
            <br></br>
            <div className="row">
                <div className="col s8">
                    <nav>
                        <div className="nav-wrapper grey">
                            <form>
                                <div className="input-field">
                                <input id="search" type="search" value={this.state.search} onChange = {this.handleInput} required/>
                                <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                                <i onClick = {this.stopSearching} className="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>
                </div>
                <div className ="col s4" >
                    <div className="card large">                    
                        <div className="card-content">
                        <p>Hola hola Hola Hola hola HolaHola hola HolaHola hola HolaHola hola HolaHola hola HolaHola hola HolaHola hola HolaHola hola Hola</p>
                        </div>
                        <div className="card-action">
                        <p>Hola</p>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )     
  }  
}