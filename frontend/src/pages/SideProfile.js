import React from "react";
import { useState, useEffect } from "react";
const image3 = require("../images/images.jpg");

const Sideprofile = () => {
  const [aboutMe, setAboutMe] = useState("");
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

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
        const cat = resData.resData.categories.split(" ");
        setCategories(cat);
        const temp =
          "http://localhost:8080/" +
          resData.resData.imageUrl.split("\\")[0] +
          "/" +
          resData.resData.imageUrl.split("\\")[1];
        // setImage(temp);
        setImagePreview(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    findUser();
  }, []);
  return (
    <aside className="myblog_profile">
      <div className="myblog_header">
        <div className="separator"></div>
        <h1>ABOUT ME</h1>
        <div className="separator"></div>
      </div>
      {/* <div className="profile_image">
        <img src={image3} alt="" />
      </div> */}
      <div className="profile_picture">
        <div
          className="img"
          style={{ backgroundImage: `url('${imagePreview}')` }}
        ></div>
      </div>
      <div className="profile_desc">{aboutMe}</div>
      <div className="myblog_header">
        <div className="separator"></div>
        <h1>Categories</h1>
        <div className="separator"></div>
      </div>
      <div
        className="row"
        style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}
      >
        {categories.map((cat, index) => (
          <h3 style={{ margin: "0 0.4rem" }} key={index}>
            * {cat}
          </h3>
        ))}

        {/* <h3 style={{ margin: "0 0.4rem" }}>* Cycling</h3> */}
      </div>
    </aside>
  );
};

export default Sideprofile;
