import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
// const blogImage = require("../images/images.jpg");
// const image1 = require("../images/login.jpg");
// const image2 = require("../images/signup3.webp");
// const image3 = require("../images/images.jpg");

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const token = localStorage.getItem("token");
  const [error, setError] = useState({});
  function fetchBlogs() {
    fetch("http://localhost:8080/fetchallblogs", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        // throw new Error("Failed to fetch posts");

        if (res.status !== 200) {
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        resData.forEach((blog) => {
          blog.imageUrl =
            "http://localhost:8080/" +
            blog.imageUrl.split("\\")[0] +
            "/" +
            blog.imageUrl.split("\\")[1];
          const temp = blog.category[0];
          const categoryArray = temp.split(" ");
          blog.categoryArray = categoryArray;
        });
        setBlogs(resData);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
        setError({
          title: "jdw",
          message: "quwdhiuq",
        });
      });
    console.log(error);
  }
  useEffect(() => {
    fetchBlogs();
  }, []);

  return !isLoaded ? (
    <Loader />
  ) : (
    <>
      <div className="home_body">
        <div
          className="row"
          style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}
        >
          {blogs &&
            blogs.map((blog, index) => {
              return (
                <div
                  className="card"
                  key={index}
                  style={{ margin: "1rem", padding: "1rem", width: "25rem" }}
                >
                  <div
                    className="blog_image"
                    style={{ backgroundImage: `url('${blog.imageUrl}')` }}
                  ></div>
                  <h1>{blog.title}</h1>
                  <div className="row">
                    {blog.categoryArray.map((category, index) => (
                      <h3
                        key={index}
                        style={{
                          backgroundColor: "grey",
                          color: "white",
                          padding: "0.3rem",
                          borderRadius: "10px",
                          margin: "0.5rem",
                        }}
                      >
                        {category}
                      </h3>
                    ))}
                  </div>

                  <div className="desc">
                    {blog.desc}
                    <Link to={`/${blog._id}`} key={index}>
                      ...more
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
