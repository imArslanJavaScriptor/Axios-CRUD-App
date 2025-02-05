import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";

function Posts() {
  const [postsData, setPostsData] = useState([]);

  const getPostData = async () => {
    let res = await getPost();
    setPostsData(res.data);
  };

// Function to delete Post 
const handleDeletePost = async (id) => {
  try {
  let res = await deletePost(id)
  if(res.status === 200) {
    let newUpdatedPost = postsData.filter((currentElem) => currentElem.id !== id)
    setPostsData(newUpdatedPost)
  }
    
  } catch (error) {
    console.log(error)
    
  }
}

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <section className="section-post">
      <ol>
        {postsData.map((currentElem) => {
          const { id, body, title } = currentElem;
          return (
            <li key={id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <button>Edit</button>
              <button 
              className="btn-delete"
              onClick={() => handleDeletePost(id)}
              >Delete</button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Posts;
