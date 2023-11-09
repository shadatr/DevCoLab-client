import React, { Component } from "react";
import { connect } from "react-redux";
import { redirect } from "react-router-dom";

class Explore extends Component {
    
  render() {
    if(this.props.auth){
        redirect('/');
    }

    return (
      <div className="">
        
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Explore);
