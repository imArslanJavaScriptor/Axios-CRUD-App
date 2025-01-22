import React, { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/PostApi";
import Form from "./Form";

function Posts() {
  let [data, setData] = useState([]);
  const [expandedCards, setExpandedCards] = useState(new Set());

  const getPostData = async () => {
    const response = await getPost();
    data = response.data;
    return setData(data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const filteredPostData = data.filter((currentItem) => {
          return currentItem.id !== id;
        });

        setData(filteredPostData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  return (
    <>
      <section>
        <Form />
      </section>
      <section className="w-full">
        <ol className="flex justify-center flex-wrap w-full gap-4 mt-10">
          {data.map((dataItem) => {
            const { id, title, body } = dataItem;
            return (
              <li key={dataItem.id} className="dataBoxStyles flex-shrink-0 ">
                <p className="h-6 w-6 rounded-[50%] text-white bg-[#121212] flex items-center justify-center text-xs font-semibold">
                  {id}
                </p>
                <h2 className="py-2 text-lg font-semibold leading-5 text-[#e3e3e3]">
                  Title: {title}
                </h2>
                <h4
                  className={`text-sm text-[#8d8d8d] ${
                    expandedCards.has(id)
                      ? "h-[100px]"
                      : "line-clamp-1 h-[20px]"
                  } overflow-hidden`}
                >
                  Description: {body}
                </h4>
                <button
                  onClick={() => toggleExpand(id)}
                  className="text-xs text-white font-medium"
                >
                  {expandedCards.has(id) ? "See Less" : "See More"}
                </button>
                {/* Edit/Delete Buttons */}
                <div className="flex items-center gap-2 mt-2">
                  <button className="btnBaseStyles bg-green-500">Edit</button>
                  <button
                    onClick={() => handleDeletePost(id)}
                    className="btnBaseStyles bg-red-500"
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
}

export default Posts;
