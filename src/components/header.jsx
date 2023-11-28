import React, { Component } from "react";
import logo from "../components/images/logo.png";
import { connect } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

class Header extends Component {
  render() {
    return (
      <div className=" flex items-center justify-between p-5 text-md">
        <img src={logo} alt="logo"></img>
        <span className="flex gap-16 pr-10">
          <a href="/">Home</a>
          <a href="/explore">Explore</a>
          <a href="/#about">About</a>
          <a href="/#contact-us">Contact Us</a>
          {this.props.auth ? (
            <span className="flex items-center justify-center gap-3">
            <a href="/">
              {this.props.auth.name} {this.props.auth.surname}
            </a>
            <a href="/api/logout">
            <AiOutlineLogout/>
            </a>
            </span>
          ) : (
            <a  href="/auth/login">
              <span className="bg-lightRed py-2 px-5">
              Login
                </span></a>
          )}
        </span>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
