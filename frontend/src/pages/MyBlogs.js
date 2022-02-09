import React from "react";
import Sideprofile from "./SideProfile";
import { Link } from "react-router-dom";
const image1 = require("../images/login.jpg");
const image2 = require("../images/signup3.webp");
const image3 = require("../images/images.jpg");

const Myblogs = () => {
  var blogs = [
    {
      image: image1,
      id:"1",
      title: "My Title",
      category: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sit aspernatur autem! Doloribus expedita illum dolorem voluptatem natus in voluptates mollitia adipisci, quas debitis necessitatibus aliquid fugiat, obcaecati qui consequuntur.",
    },
    {
      image: image2,
      id:"2",
      title: "My Title",
      category: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sit aspernatur autem! Doloribus expedita illum dolorem voluptatem natus in voluptates mollitia adipisci, quas debitis necessitatibus aliquid fugiat, obcaecati qui consequuntur.",
    },
    {
      image: image3,
      id:"3",
      title: "My Title",
      category: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sit aspernatur autem! Doloribus expedita illum dolorem voluptatem natus in voluptates mollitia adipisci, quas debitis necessitatibus aliquid fugiat, obcaecati qui consequuntur.",
    },
    {
      image: image1,
      id:"4",
      title: "My Title",
      category: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sit aspernatur autem! Doloribus expedita illum dolorem voluptatem natus in voluptates mollitia adipisci, quas debitis necessitatibus aliquid fugiat, obcaecati qui consequuntur.",
    },
  ];
  return (
    <>
      <div className="blogs">
        <div className="row" style={{ flexWrap: "wrap" }}>
          {blogs.map((blog, index) => {
            return (
              <Link to="/">
                <div className="card" key={index} style={{ margin: "1rem" }}>
                  <img src={blog.image} alt={blog.title} />
                  <div
                    className="row"
                    style={{
                      margin: "0.5rem 0",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <i className="fas fa-edit" style={{ margin: "0.5rem" }}></i>
                    <i className="fas fa-trash-alt mx-2"></i>
                  </div>
                  <h1>{blog.title}</h1>
                  <h3>{blog.category}</h3>
                  <div className="desc">{blog.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Sideprofile />
    </>
  );
};

export default Myblogs;
