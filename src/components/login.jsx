import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      name: email,
      password: password,
    };
    try{
      const res = await axios.post("/api/login", data)
      const userObject = res.data;

      if(userObject){
        Cookies.set('user', JSON.stringify(userObject));
        navigate('/');
        window.location.reload();
      }
    }catch(err){
      toast.error("The password or email are incorrect")
    }
  };
  

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="border border-gray p-8 rounded-[30px] flex items-center justify-center flex-col shadow-lg lg:w-[500px] lg:h-[550px] sm:h-[450px] sm:w-[300px]"
      >
        <h1 className="lg:text-[30px] font-bold m-3 sm:text-[15px]">
          Login To Your Account
        </h1>
        <div className="m-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border bg-darkGray lg:w-[350px] sm:w-[270px] border-darkGray rounded-md outline-none px-3 py-2 h-[50px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="lg:w-[350px] bg-darkGray sm:w-[270px] flex border border-darkGray outline-none rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <button
          type="submit"
          className=" bg-lightRed lg:w-[350px]  sm:w-[270px] text-white font-semibold px-4 py-2 rounded-md h-[50px]"
        >
          Login
        </button>
        {/* <a
        href='/auth/google'
          className=" m-3 bg-darkGray lg:w-[350px] flex justify-center items-center sm:w-[270px] text-white font-semibold px-4 py-2 rounded-md h-[50px]"
        >
          Login With Google
        </a> */}
        <p className="p-5">Do not have an account?</p>
        <a className="p-1 text-blue" href={"/auth/signup"}>
          SignUp
        </a>
      </form>
    </div>
  );
};

export default LoginPage;