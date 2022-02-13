import React from "react";
import { useState } from "react";
import { generateBase64FromImage } from "../util/image";

const Publishblog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  function imageHandler(e) {
    generateBase64FromImage(e.target.files[0])
      .then((b64) => {
        console.log(b64);
        setImage(b64);
      })
      .catch((err) => {
        console.log("error occured while storing image", err);
      });
  }

  return (
    <div className="publish_body">
      <div className="container">
        <form>
          <div className="input_group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input_group">
            <label htmlFor="image" className="form-label">
              Enter Image For Your Blog
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => imageHandler(e)}
            />
          </div>
          {image !== null ? (
            <div className="image_preview">
              <div
                className="img"
                style={{ backgroundImage: `url('${image}')` }}
              ></div>
            </div>
          ) : (
            ""
          )}
          <div className="input_group">
            <label htmlFor="category" className="form-label">
              Category (Separated By Space)
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="input_group">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              className="textarea"
              onChange={(e) => setDesc(e.target.value)}
            >
              {desc}
            </textarea>
          </div>
          <button className="login_btn publish_btn">
            PUBLISH BLOG!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publishblog;
