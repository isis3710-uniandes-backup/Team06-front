import React, {Component} from 'react';

export default class Home extends Component{  

  state = {
    user: this.props.user,
    fetching: false  
  }

  componentDidMount(){
    this.setState({
      fetching: true
    }, () => {
      console.log('xd');     
    });
    document.dispatchEvent(new Event('component'));
  }

  render(){

    return(

      <div className = "container">

        <br></br>
        <br></br>
        <h5 className = "center-align">Home</h5>
        <br></br>
        <br></br>

        {
          this.state.fetching?
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
          :
          <div>
            <div className="card-panel grey lighten-5 z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s2">
                  <img src="./images/defaultprofile.jpg" alt="" className="circle responsive-img"/>
                </div>
                <div className="col s10">
                  <span className="black-text">
                    This is a square image. Add the "circle" className to it to make it appear circular.
                  </span>
                </div>
              </div>
            </div>
          </div> 
        }
        

                      

      </div>
    )     
  }  
}
