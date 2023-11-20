import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [commentText, setCommentText] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const uploadData = () => {
      axios.get(`/api/post/${id}`).then((res) => {
        setPost(res.data);
        console.log(res.data);
      });
    };
    uploadData();
  }, [id]);

  function encodeBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  const handelPost = () => {
    const data = {
      user_id: this.props.auth.id,
      post_id: id,
      text: commentText,
    };
    try {
      axios.post("/api/comment/1", data);
      toast.success("Successfully posted!");
    } catch (error) {
      console.error("Error posting post:", error);
      toast.error("error happend while posting the comment!");
    }
    setRefresh(!refresh);
  };

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
          <div className="flex items-center  m-5">
            <span className="inline-block rounded-full overflow-hidden lg:w-[40px] lg:h-[40px] sm:w-[30px] sm:h-[30px]">
              <BsPersonCircle size="40" />
            </span>
            <span className="px-2">
              <textarea
                placeholder="Reply on the post..."
                className="outline-none border border-gray bg-primary lg:px-5 lg:py-4 sm:px-2 sm:py-2  lg:w-[700px] sm:w-[200px] rounded-[15px] lg:h-[60px] sm:h-[40px]"
                onChange={(e) => setCommentText(e.target.value)}
              />
            </span>
            <span
              className="bg-lightRed lg:px-8 lg:py-3 sm:px-3 sm:py-1 rounded-[20px] font-bold cursor-pointer"
              onClick={handelPost}
            >
              Post
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
