import React, {Component} from 'react';

class Nest extends Component {
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
  }
  
  export default Nest;