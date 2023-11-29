import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";

const SignUpPage = () => {
  const email = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      !password1.current?.value ||
      !password2.current?.value ||
      !email.current?.value
    ) {
      toast.error("You should fill all the blank spaces");
      return;
    }

    if (password1.current?.value !== password2.current?.value) {
      toast.error("The password doesn't match");
      return;
    }

    const data = {
      password: password1.current.value,
      name: email.current.value,
    };
    try {
      axios.post("/api/signup", data);
      toast.success("The account created successfully");
    } catch {
      toast.success("An error happened while creating the account");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignUp} 
        className="border border-gray1 p-8 rounded-[30px] flex items-center justify-center flex-col shadow-lg lg:w-[500px] h-[550px] sm:w-[300px]"
      >
        <h1 className="lg:text-[30px] font-bold m-5 sm:text-[15px]">
          Create An Account
        </h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            ref={email}
            className="border outline-none lg:w-[350px] bg-darkGray sm:w-[270px] border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            ref={password1}
            className=" outline-none lg:w-[350px] bg-darkGray sm:w-[270px] flex border border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter the password again"
            ref={password2}
            className="outline-none lg:w-[350px] bg-darkGray sm:w-[270px] flex border border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <button
          type="submit"
          className="lg:w-[350px] bg-lightRed sm:w-[270px] text-white font-semibold px-4 py-2 rounded-md h-[50px]"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;