import React, { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";

function Posts() {
  const [postsData, setPostsData] = useState([]);

  const getPostData = async () => {
    let res = await getPost();
    console.log(res.data);
    setPostsData(res.data);
  };

  useEffect(() => {
    getPostData();
  });

  return (
    <section className="section-post">
      <div>Posts Component</div>
      <ol>
        {postsData.map((currentElem) => {
          const { id, body, title } = currentElem;
          return (
            <li key={id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <button>Edit</button>
              <button className="btn-delete">Delete</button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Posts;
