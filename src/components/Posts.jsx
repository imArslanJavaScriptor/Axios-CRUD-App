import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  //   function to delete Post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handleUpdatePost
  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  return (
    <>
      <section>
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="p-2">
        <ol className="list-layout">
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}  className="card-styles">
                <div className="text-white font-medium mb-4">
                <p>Title: {title}</p>
                <p className="line-clamp-3">Body: {body}</p>
                </div>

                <div className="flex items-center gap-4">
                <button className="btn btn-edit" onClick={() => handleUpdatePost(curElem)}>Edit</button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};
