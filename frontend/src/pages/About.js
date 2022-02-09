import React from "react";
import Sideprofile from "./SideProfile";
const image2 = require("../images/images.jpg");
const About = () => {
  return (
    <>
      <div className="column">
        <h1>Your Profile</h1>
        <div className="row">
          <div className="profile_picture">
            <img src={image2} alt="" />
          </div>
          <i className="fas fa-edit edit_button"></i>
        </div>
        <h2>==================== ABOUT ME ====================</h2>
        <textarea name="" id="" cols="30" rows="10" className="textarea">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          beatae vero nisi soluta quod perspiciatis, excepturi minima porro sit
          est harum, accusamus architecto tempore, rerum a? Quas enim vitae
          quia.
        </textarea>
        <h2>==================== CATEGORIES ====================</h2>
        <textarea name="" id="" cols="30" rows="10" className="textarea">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          beatae vero nisi soluta quod perspiciatis, excepturi minima porro sit
          est harum, accusamus architecto tempore, rerum a? Quas enim vitae
          quia.
        </textarea>
        <button className="about_save"> UPDATE! </button>
      </div>
    </>
  );
};

export default About;
