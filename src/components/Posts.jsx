import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";

function Posts() {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  const getPostData = async () => {
    try {
      let res = await getPost();
      setPostsData(res.data || []); // ✅ Ensure it's always an array
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // ✅ Stop loading when data is fetched
    }
  };

  // Function to delete a Post
  const handleDeletePost = async (id) => {
    try {
      let res = await deletePost(id);
      if (res.status === 200) {
        let newUpdatedPost = postsData.filter((post) => post.id !== id);
        setPostsData(newUpdatedPost);
      } else {
        console.log("Failed To Delete The Post", res.status); // ✅ Fixed syntax error
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <section className="section-form">
        <Form data={postsData} setData={setPostsData} />
      </section>

      <section className="section-post">
        {loading ? ( // ✅ Show loading while fetching data
          <p>Loading posts...</p>
        ) : (
          <ol>
            {postsData.length > 0 ? (
              postsData.map(({ id, body, title }) => (
                <li key={id}>
                  <p>Title: {title}</p>
                  <p>Body: {body}</p>
                  <button>Edit</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </ol>
        )}
      </section>
    </>
  );
}

export default Posts;
