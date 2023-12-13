import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import logo from "../components/images/logo.png";
import { connect } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
  const [userData, setUserData] = useState("");


  useEffect(() => {
    const download = async () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setUserData(parsedUser);
      }
    };
    
    download();
  }, []);
  

  return (
    <div className=" flex items-center justify-between lg:p-5 sm:py-4 sm:px-1 text-md">
      <img src={logo} alt="logo" className="sm:w-[80px] lg:w-[280px]"></img>
      <span className="lg:text-sm sm:text-xxsm flex lg:gap-16 sm:gap-2 pr-10">
        <a href="/">Home</a>
        <a href="/explore">Explore</a>
        <a href="/#about">About</a>
        <a href="/#contact-us">Contact Us</a>
        {userData.name ? (
          <span className="flex items-center justify-center gap-3">
            <a href="/">
              {userData.name} 
            </a>
            <a href="/api/logout" onClick={()=> Cookies.remove('user')}>
              <AiOutlineLogout />
            </a>
          </span>
        ) : (
          <a href="/auth/login">
            <span className="bg-lightRed lg:py-2 lg:px-5 sm:py-1 sm:px-2" >Login</span>
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
