import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { redirect } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";

function Explore(props) {
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Tab 1");

  useEffect(() => {
    try {
      const userCookie = JSON.parse(Cookies.get("user"));
      axios.get("/api/allPosts").then((res) => {
        setAllPosts(res.data);
        console.log(res.data);
      });
      axios.get("/api/myPosts", { params: { user_id: userCookie.id } }).then((res) => {
        setMyPosts(res.data);
        console.log(res.data);
      });
    } catch {
      console.log("error");
    }
  }, []);

  if (!props?.auth || !props.auth.name) {
    redirect("/");
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function encodeBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  return (
    <div className=" flex flex-col items-center justify-center w-[100%] min-h-[75vh]">
      <div className="flex w-full justify-center items-center flex-col">
        <div className="lg:text-sm sm:text-xsm flex flex-row space-x-4 p-5">
          <button
            onClick={() => handleTabClick("Tab 1")}
            className={`py-2 px-4 rounded-md border w-[200px] ${
              activeTab === "Tab 1"
                ? "bg-lightRed text-blue border-blue"
                : "bg-gray text-darkGray border-lightGray"
            }`}
          >
           All Posts
          </button>
          <button
            onClick={() => handleTabClick("Tab 2")}
            className={`py-2 px-4 rounded-md border w-[200px] ${
              activeTab === "Tab 2"
                ? "bg-lightRed text-blue border-blue"
                : "bg-gray text-darkGray border-lightGray"
            }`}
          >
            My Posts
          </button>
        </div>
      </div>
      {activeTab==="Tab 1"
        ? allPosts.map((post) => (
            <a
              href={`/post/${post._id}`}
              className="flex flex-col gap-5 lg:w-[800px] sm:w-[300px] border border-gray p-10 rounded-[30px] m-10"
            >
              <div className="flex gap-5 items-center">
                <p className="">
                  <BsPersonCircle size="40" />
                </p>
                <h1 className="text-sm font-bold">{post.user_name}</h1>
              </div>
              <p>{post.text}</p>
              <div className="grid grid-cols-2">
                {post.images.map((image, index) => {
                  const dataURL = `data:image/jpeg;base64,${encodeBase64(
                    image.data
                  )}`;
                  return (
                    <img
                      key={index}
                      src={dataURL}
                      alt={`Post ${index}`}
                      className="w-[350px] rounded-[20px]"
                    />
                  );
                })}
              </div>
            </a>
          ))
        : ""}
        {activeTab==="Tab 2"
        ? myPosts.map((post) => (
            <a
              href={`/post/${post._id}`}
              className="flex flex-col gap-5 lg:w-[800px] sm:w-[300px] border border-gray p-10 rounded-[30px] m-10"
            >
              <div className="flex gap-5 items-center">
                <p className="">
                  <BsPersonCircle size="40" />
                </p>
                <h1 className="text-sm font-bold">{post.user_name}</h1>
              </div>
              <p>{post.text}</p>
              <div className="grid grid-cols-2">
                {post.images.map((image, index) => {
                  const dataURL = `data:image/jpeg;base64,${encodeBase64(
                    image.data
                  )}`;
                  return (
                    <img
                      key={index}
                      src={dataURL}
                      alt={`Post ${index}`}
                      className="w-[350px] rounded-[20px]"
                    />
                  );
                })}
              </div>
            </a>
          ))
        : ""}
      <span className="bg-lightRed fixed right-0 bottom-0 m-10 rounded-full text-xxlg flex items-center justify-center  w-20 h-20">
        <a href="/posting">+</a>
      </span>
    </div>
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Explore);
