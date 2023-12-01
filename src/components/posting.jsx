import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { redirect } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { AiOutlinePicture } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Posting(props) {
  const [selectedImage, setSelectedImage] = useState([]);
  const [postText, setPostText] = useState();
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

  if (!props?.auth || !props.auth.name) {
    redirect("/");
  }

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files);
      setSelectedImage((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handelPost = async () => {
    const data = new FormData();
    data.append("text", postText);
    data.append("id", userData.id);
    data.append("name", userData.name);

    for (const image of selectedImage) {
      data.append("images", image);
    }
    axios.post("/api/post", data);
    toast.success("Successfully posted!");
  };

  const handleDelete = (name) => {
    setSelectedImage(selectedImage.filter((pic) => pic.name !== name));
  };

  return (
    <div className=" flex flex-col items-center justify-center w-[100%] h-[82vh] lg:text-sm sm:text-xxsm">
      <div className=" lg:w-[800px] sm:w-[300px] border border-gray p-4 lg:rounded-[30px] sm:rounded-[20px]  m-10">
        <span>
          <div className="flex gap-5 items-center">
            <p className="lg:flex sm:hidden">
              <BsPersonCircle size="40" />
            </p>
            <p className="lg:hidden">
              <BsPersonCircle size="20" />
            </p>
            <h1 className="lg:text-sm sm:text-xsm font-bold">
              {userData.name}
            </h1>
          </div>
        </span>
        <div className="bg-primary w-full lg:rounded-[20px] sm:rounded-[20px] lg:p-8 sm:py-4">
          <textarea
            className="bg-primary w-full outline-none lg:h-[300px] sm:h-[150px] lg:text-sm sm:text-xxsm"
            placeholder="write your post here..."
            onChange={(e) => setPostText(e.target.value)}
          />
          {selectedImage.length > 0 && (
            <div className="grid grid-cols-2">
              {selectedImage.map((pic) => (
                <span>
                  <TiDelete
                    className="absolute cursor-pointer"
                    size="30"
                    value={pic.name}
                    onClick={(e) => handleDelete(pic.name)}
                  />
                  <img
                    src={URL.createObjectURL(pic)}
                    alt="Selected"
                    className="w-[350px] rounded-[20px] "
                  />
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center m-4">
            {selectedImage.length < 4 ? (
              <>
                <label htmlFor="fileInput">
                  <p className="lg:flex sm:hidden">
                    <AiOutlinePicture size="30" className="cursor-pointer " />
                  </p>
                  <p className="lg:hidden">
                    <AiOutlinePicture size="20" className="cursor-pointer " />
                  </p>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  multiple
                />
              </>
            ) : (
              <span>
                <p className="lg:flex sm:hidden">
                  <AiOutlinePicture
                    size="30"
                    color="gray"
                    className="cursor-pointer "
                  />
                </p>
                <p className="lg:hidden">
                  <AiOutlinePicture
                    size="20"
                    color="gray"
                    className="cursor-pointer "
                  />
                </p>
              </span>
            )}
            <span
              className="bg-lightRed lg:px-10 lg:py-3 sm:px-5 sm:py-1 rounded-[20px] font-bold cursor-pointer "
              onClick={handelPost}
            >
              Post
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Posting);
