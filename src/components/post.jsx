import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const uploadData = () => {
      axios.get(`/api/post/${id}`).then((res) => {
        setPost(res.data);
        console.log(res.data);
      });
    };
    uploadData();
  }, [id]);
  console.log(post);

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
    <div className="flex justify-center items-center w-[100%]">
      {post ? (
        <div className="flex flex-col gap-5 lg:w-[1000px] sm:w-[300px] p-10 rounded-[30px] m-10 text-md">
          <div className="flex gap-5 items-center">
            <p className="">
              <BsPersonCircle size="60" />
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
                  className="w-[450px] rounded-[20px]"
                />
              );
            })}
          </div>
          <div className="border-t border-gray"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
