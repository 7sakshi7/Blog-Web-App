import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sideprofile from "./SideProfile";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const { blogId } = useParams();
  console.log(blogId);
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token");

  function fetchBlog() {
    fetch("http://localhost:8080/" + blogId, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed To fetch Blog");
        }
        return res.json();
      })
      .then((resData) => {
          resData.imageUrl =
          "http://localhost:8080/" +
          resData.imageUrl.split("\\")[0] +
          "/" +
          resData.imageUrl.split("\\")[1];
          const temp = resData.category[0];
          const categoryArray = temp.split(" ");
          resData.categoryArray = categoryArray;
          console.log(resData);
        setBlog(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <>
      <div className=" container single_blog">
        {blog && (
          <div
            className="single_card"
            style={{ margin: "1rem", padding: "1rem" }}
          >
            <div
              className="single_blog_image"
              style={{ backgroundImage: `url('${blog.imageUrl}')` }}
            ></div>
            {/* <div
              className="row"
              style={{
                margin: "0.5rem 0",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <i className="fas fa-edit" style={{ margin: "0.5rem" }}></i>
              <i className="fas fa-trash-alt mx-2"></i>
            </div> */}
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

            <div className="desc">{blog.desc}</div>
          </div>
        )}
      </div>
      <Sideprofile />
    </>
  );
}

export default SingleBlog;
