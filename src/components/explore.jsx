import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { redirect } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";

function Explore(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      axios.get("/api/posts").then((res) => {
        setPosts(res.data);
        console.log(res.data);
      });
    } catch {
      console.log("error");
    }
  }, []);

  if (!props?.auth || !props.auth.name) {
    redirect("/");
  }

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
      {posts
        ? posts.map((post) => (
            <a href={`/post/${post._id}`} className="flex flex-col gap-5 lg:w-[800px] sm:w-[300px] border border-gray p-10 rounded-[30px] m-10">
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
                    <img key={index} src={dataURL} alt={`Post ${index}`} className="w-[350px] rounded-[20px]" />
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
