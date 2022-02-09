import React from "react";
const blogImage = require("../images/images.jpg");
const image1 = require("../images/login.jpg");
const image2 = require("../images/signup3.webp");
const image3 = require("../images/images.jpg");

const Home = () => {
  var blogs = [
    {
      image: image1,
      title: "My Title",
      category: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sit aspernatur autem! Doloribus expedita illum dolorem voluptatem natus in voluptates mollitia adipisci, quas debitis necessitatibus aliquid fugiat, obcaecati qui consequuntur.",
    },
    {
      image: image2,
      title: "My Title",
      category: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sit aspernatur autem! Doloribus expedita illum dolorem voluptatem natus in voluptates mollitia adipisci, quas debitis necessitatibus aliquid fugiat, obcaecati qui consequuntur.",
    },
    {
      image: image3,
      title: "My Title",
      category: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sit aspernatur autem! Doloribus expedita illum dolorem voluptatem natus in voluptates mollitia adipisci, quas debitis necessitatibus aliquid fugiat, obcaecati qui consequuntur.",
    },
  ];
  return (
    <>
      <div className="home_body">
        <div className="home_image">
          <img src={blogImage} alt="" />
        </div>
        <div className="row">

          {blogs.map((blog, index) => {
            return (
              <div className="card" key={index}>
                <img src={blog.image} alt={blog.title} />
                <h1>{blog.title}</h1>
                <h3>{blog.category}</h3>
                <div className="desc">{blog.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
