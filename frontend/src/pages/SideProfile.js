import React from "react";
const image3 = require("../images/images.jpg");

const Sideprofile = () => {
  return (
    <aside className="myblog_profile">
      <div className="myblog_header">
        <div className="separator"></div>
        <h1>ABOUT ME</h1>
        <div className="separator"></div>
      </div>
      <div className="profile_image">
        <img src={image3} alt="" />
      </div>
      <div className="profile_desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore impedit
        unde, obcaecati inventore est eligendi? Illo reprehenderit, omnis ut qui
        ea soluta inventore earum itaque dolorum assumenda, corporis, nam sed?
      </div>
      <div className="myblog_header">
        <div className="separator"></div>
        <h1>Categories</h1>
        <div className="separator"></div>
      </div>
      <div
        className="row"
        style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}
      >
        <h3 style={{ margin: "0 0.4rem" }}>* Food</h3>
        <h3 style={{ margin: "0 0.4rem" }}>* Cycling</h3>
      </div>
    </aside>
  );
};

export default Sideprofile;
