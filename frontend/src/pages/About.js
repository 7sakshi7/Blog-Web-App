import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sideprofile from "./SideProfile";
import Loader from "../components/Loader";
import { generateBase64FromImage } from "../util/image";
const image2 = require("../images/images.jpg");

const About = () => {
  const [aboutMe, setAboutMe] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  let navigate = useNavigate();

  function imageHandler(e) {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
    generateBase64FromImage(e.target.files[0])
      .then((b64) => {
        setImagePreview(b64);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateProfile() {
    const formData = new FormData();
    formData.append("aboutMe", aboutMe);
    formData.append("categories", categories);
    formData.append("image", image);

    fetch("http://localhost:8080/updateprofile", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Updating Profile Failed");
        }
        navigate("/myblog");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function findUser() {
    fetch("http://localhost:8080/user/" + userId, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("No Such User Find");
        }
        return res.json();
      })
      .then((resData) => {
        setAboutMe(resData.resData.aboutMe);
        setCategories(resData.resData.categories);
        const temp =
          "http://localhost:8080/" +
          resData.resData.imageUrl.split("\\")[0] +
          "/" +
          resData.resData.imageUrl.split("\\")[1];
        setImage(temp);
        setImagePreview(temp);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    findUser();
  }, []);

  return !isLoaded ? (
    <Loader />
  ) : (
    <>
      <div className="column">
        <h1>Your Profile</h1>
        {/* <div className="row"> */}
        <input
          type="file"
          id="image"
          name="image"
          style={{ marginTop: "0.5rem" }}
          onChange={(e) => imageHandler(e)}
        />
        {image !== null ? (
          <div className="profile_picture">
            <div
              className="img"
              style={{ backgroundImage: `url('${imagePreview}')` }}
            ></div>
          </div>
        ) : (
          ""
        )}
        <h2> ABOUT ME </h2>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="textarea"
          onChange={(e) => setAboutMe(e.target.value)}
          style={{ height: "6rem" }}
          defaultValue={aboutMe}
        >
          {/* {aboutMe} */}
        </textarea>
        <h2> CATEGORIES </h2>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="textarea"
          onChange={(e) => setCategories(e.target.value)}
          defaultValue={categories}
          style={{ height: "4rem" }}
        >
          {/* {categories} */}
        </textarea>
        <button className="about_save" onClick={updateProfile}>
          {" "}
          UPDATE!{" "}
        </button>
      </div>
    </>
  );
};

export default About;
