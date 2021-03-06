import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateBase64FromImage } from "../util/image";

const Publishblog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  let navigate = useNavigate();

  function imageHandler(e) {
    setImage(e.target.files[0]);
    generateBase64FromImage(e.target.files[0])
      .then((b64) => {
        setImagePreview(b64);
      })
      .catch((err) => {
        console.log("error occured while storing image", err);
      });
  }

  function publishBlog() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("category", category);

    const token = localStorage.getItem("token");
    console.log(token);

    let url = "http://localhost:8080/publishblog";
    let method = "POST";

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Publish Blog Failed");
        }
        navigate("/myblog");
        return res.json();
      })
      .catch((err) => {
        console.log(err);
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
                style={{ backgroundImage: `url('${imagePreview}')` }}
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
              defaultValue={desc}
              onChange={(e) => setDesc(e.target.value)}
            >
              {/* {desc} */}
            </textarea>
          </div>
          <button className="login_btn publish_btn" onClick={publishBlog}>
            PUBLISH BLOG!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publishblog;
