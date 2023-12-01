import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import Cookies from "js-cookie";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const uploadData = async () => {
      try {
        const res = await axios.get(`/api/post/${id}`);
        setPost(res.data);
        const res2 = await axios.get(`/api/post/${id}/comments`);
        setComments(res2.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    uploadData();
  }, [id, refresh]);

  function encodeBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  const handlePost = () => {
    const userCookie = JSON.parse(Cookies.get("user"));
    const data = {
      id: userCookie.id,
      name: userCookie.name,
      post_id: id,
      text: commentText,
    };

    try {
      axios.post("/api/post/comment", data);
      toast.success("Successfully posted!");
    } catch (error) {
      toast.error("Error occurred while posting the comment!");
    }

    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col justify-center items-center w-[100%] min-h-[85vh] lg:text-sm sm:text-xxsm">
      {post && (
        <div className="flex flex-col gap-5 lg:w-[1000px] sm:w-[350px] lg:p-10 sm:p-5 lg:rounded-[30px] sm:rounded-[15px] lg:m-10 sm:mt-4 ">
          <div className="flex gap-5 items-center">
            <p className="lg:flex sm:hidden">
              <BsPersonCircle size="40" />
            </p>
            <p className="lg:hidden">
              <BsPersonCircle size="20" />
            </p>
            <h1 className="lg:text-sm sm:text-xsm font-bold">
              {post.user_name}
            </h1>
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

          <div className="border-t border-gray" />
          <div className="flex items-center justify-center lg:m-5 sm:m-1">
            <span className=" lg:w-[40px] lg:h-[40px] sm:w-[30px] sm:h-[30px]">
            <p className="lg:flex sm:hidden">
              <BsPersonCircle size="40" />
            </p>
            <p className="lg:hidden">
              <BsPersonCircle size="20" />
            </p>
            </span>
            <span className="px-2">
              <textarea
                placeholder="Comment on the post..."
                className="outline-none border border-gray bg-primary lg:px-5 lg:py-4 sm:px-2 sm:py-2  lg:w-[700px] sm:w-[200px] lg:rounded-[15px] sm:rounded-[5px] lg:h-[60px] sm:h-[30px]"
                onChange={(e) => setCommentText(e.target.value)}
              />
            </span>
            <span
              className="bg-lightRed lg:px-8 lg:py-3 sm:px-3 sm:py-1 rounded-[20px] font-bold cursor-pointer"
              onClick={handlePost}
            >
              Post
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col w-[100%] justify-center items-center lg:gap-4 sm:gap-2 ">
        {comments.map((comment) => (
          <span className=" flex items-center justify-start lg:w-[900px] sm:w-[300px]">
            <span className="flex flex-col gap-5">
              <div className="border-t border-gray lg:w-[900px] sm:w-[300px]" />
              <span className="flex items-center gap-5">
              <div className="flex gap-5 items-center">
            <p className="lg:flex sm:hidden">
              <BsPersonCircle size="40" />
            </p>
            <p className="lg:hidden">
              <BsPersonCircle size="20" />
            </p>
            <h1 className="lg:text-sm sm:text-xsm font-bold">
              {post.user_name}
            </h1>
          </div>
              </span>
              <h1>{comment.text}</h1>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Post);
