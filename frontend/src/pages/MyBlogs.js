import React from "react";
import { useEffect, useState } from "react";
import Sideprofile from "./SideProfile";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

// const image1 = require("../images/login.jpg");
// const image2 = require("../images/signup3.webp");
// const image3 = require("../images/images.jpg");

const Myblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoaded, setIsLoaded] = useState(false);

  function fetchBlogs() {
    fetch("http://localhost:8080/fetchuserblogs", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch posts");
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
          // console.log(temp);
        });
        setBlogs(resData);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteBlog(blogId) {
    fetch("http://localhost:8080/delete/" + blogId, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Cant delete this blog");
        }

        fetchBlogs();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchBlogs();
  }, []);
  return !isLoaded ? (
    <Loader />
  ) : (
    <>
      <div className="blogs">
        <div className="row" style={{ flexWrap: "wrap" }}>
          {blogs &&
            blogs.map((blog, index) => {
              return (
                <div
                  className="card"
                  key={index}
                  style={{ margin: "1rem", padding: "1rem" }}
                >
                  <div
                    className="blog_image"
                    style={{ backgroundImage: `url('${blog.imageUrl}')` }}
                  ></div>
                  <div
                    className="row"
                    style={{
                      margin: "0.5rem 0",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Link to={`/updateblog/${blog._id}`}>
                      <i
                        className="fas fa-edit"
                        style={{ margin: "0.5rem" }}
                      ></i>
                    </Link>
                    <i
                      className="fas fa-trash-alt mx-2"
                      onClick={() => deleteBlog(blog._id)}
                    ></i>
                  </div>
                  <h1>{blog.title}</h1>
                  <div className="row">
                    {blog.categoryArray.map((category) => (
                      <h3
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
      <Sideprofile />
    </>
  );
};

export default Myblogs;
