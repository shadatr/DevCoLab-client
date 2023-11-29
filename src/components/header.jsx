import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import logo from "../components/images/logo.png";
import { connect } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const download = async () => {
      try {
        const userCookie = JSON.parse(Cookies.get("user"));
        setUserData(userCookie);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    download();
  }, []);
  return (
    <div className=" flex items-center justify-between p-5 text-md">
      <img src={logo} alt="logo"></img>
      <span className="flex gap-16 pr-10">
        <a href="/">Home</a>
        <a href="/explore">Explore</a>
        <a href="/#about">About</a>
        <a href="/#contact-us">Contact Us</a>
        {userData ? (
          <span className="flex items-center justify-center gap-3">
            <a href="/">
              {userData.name} 
            </a>
            <a href="/api/logout" onClick={()=> Cookies.remove('user')}>
              <AiOutlineLogout />
            </a>
          </span>
        ) : (
          <a href="/api/login">
            <span className="bg-lightRed py-2 px-5" >Login</span>
         </a>
        )}
      </span>
    </div>
  );
};
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
