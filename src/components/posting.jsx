import React, { useState } from "react";
import { connect } from "react-redux";
import { redirect } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { AiOutlinePicture } from "react-icons/ai";
import axios from "axios";

function Posting(props) {
  const [selectedImage, setSelectedImage] = useState([]);
  const [postText, setPostText] = useState();

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

    for (const image of selectedImage) {
      data.append("images", image);
    }
    console.log(data.get("images"));
    axios.post("/api/post", data);
  };

  const handleDelete = (name) => {
    setSelectedImage(selectedImage.filter((pic) => pic.name !== name));
  };

  return (
    <div className=" flex flex-col items-center justify-center w-[100%] ">
      <div className=" lg:w-[800px] sm:w-[300px] border border-gray p-5 rounded-[30px] m-10">
        <span>
          <div className="flex gap-5 items-center">
            <p className="">
              <BsPersonCircle size="40" />
            </p>
            <p>
              <h1 className="text-sm font-bold">{props?.auth?.name}</h1>
              <h2 className="text-xsm">{props?.auth?.surname}</h2>
            </p>
          </div>
        </span>
        <div className="bg-primary w-full rounded-[20px] p-8">
          <textarea
            className="bg-primary w-full outline-none lg:h-[300px] sm:h-[150px]"
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
                  <AiOutlinePicture size="30" className="cursor-pointer " />
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
              <AiOutlinePicture
                size="30"
                color="gray"
                className="cursor-pointer "
              />
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
