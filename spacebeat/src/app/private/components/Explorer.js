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

      <div>
        <div className = "row">
          <br></br>            
          <div className="col s12">
              <nav>
                  <div className="nav-wrapper grey lighten-1">
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
        </div>

        <div className = "row">
          
        </div>
      </div>
    )     
  }  
}