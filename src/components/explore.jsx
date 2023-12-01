import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingIcons from "react-loading-icons";

function Explore(props) {
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Tab 1");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        axios.get("/api/allPosts").then((res) => {
          setAllPosts(res.data);
          setLoading(false)
        });
        axios
          .get("/api/myPosts", { params: { user_id: parsedUser.id } })
          .then((res) => {
            setMyPosts(res.data);
          });
      } else {
        navigate("/auth/login");
      }
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
        <div className=" lg:text-sm sm:text-xxsm flex flex-row space-x-4 p-5">
          <button
            onClick={() => handleTabClick("Tab 1")}
            className={`lg:py-2 lg:px-4 sm:py-1 sm:px-2 rounded-md border lg:w-[200px] sm:w-[100px] ${
              activeTab === "Tab 1"
                ? "bg-lightRed text-blue border-blue"
                : "bg-gray text-darkGray border-lightGray"
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => handleTabClick("Tab 2")}
            className={`lg:py-2 lg:px-4 sm:py-1 sm:px-2 rounded-md border lg:w-[200px] sm:w-[100px] ${
              activeTab === "Tab 2"
                ? "bg-lightRed text-blue border-blue"
                : "bg-gray text-darkGray border-lightGray"
            }`}
          >
            My Posts
          </button>
        </div>
      </div>
      {loading ? (
        <div className="items-center justify-cente flex h-[50vh] mt-[200px]">
          <LoadingIcons.TailSpin stroke="white" width='100' height='100' speed={.8}  />
        </div>
      ) : (
      <div>
      {activeTab === "Tab 1"
        ? allPosts.map((post) => (
            <a
              href={`/post/${post._id}`}
              className="flex flex-col gap-5 lg:w-[800px] sm:w-[300px] border border-gray lg:p-10 sm:p-5 lg:rounded-[30px] sm:rounded-[15px] lg:m-10 sm:m-4 lg:text-sm sm:text-xxsm"
            >
              <div className="flex gap-5 items-center">
                <p className="lg:flex sm:hidden">
                  <BsPersonCircle size="40" />
                </p>
                <p className="lg:hidden">
                  <BsPersonCircle size="20" />
                </p>
                <h1 className="lg:text-sm sm:text-xsm font-bold">{post.user_name}</h1>
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
                      className="lg:w-[350px] sm:w-[160px] rounded-[20px]"
                    />
                  );
                })}
              </div>
            </a>
          ))
        : ""}
      {activeTab === "Tab 2"
        ? myPosts.map((post) => (
            <a
              href={`/post/${post._id}`}
              className="flex flex-col gap-5 lg:w-[800px] sm:w-[300px] border border-gray lg:p-10 sm:p-5 lg:rounded-[30px] sm:rounded-[15px] lg:m-10 sm:m-4 lg:text-sm sm:text-xxsm"
            >
              <div className="flex gap-5 items-center">
              <p className="lg:flex sm:hidden">
                  <BsPersonCircle size="40" />
                </p>
                <p className="lg:hidden">
                  <BsPersonCircle size="20" />
                </p>
                <h1 className="lg:text-sm sm:text-xsm font-bold">{post.user_name}</h1>
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
                      className="lg:w-[350px] sm:w-[160px]  rounded-[20px]"
                    />
                  );
                })}
              </div>
            </a>
          ))
        : ""}
      </div>)}
      <span className="bg-lightRed fixed right-0 bottom-0 m-10 rounded-full text-xxlg flex items-center justify-center w-20 h-20">
        <a href="/posting">+</a>
      </span>
    </div>
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Explore);
