import React, { useState } from "react";

function Form({ data, setData }) {
  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.value;
    const value = e.target.value;

    setPostData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(postData.title);
  console.log(postData.body);
  return (
    <form className="flex items-center justify-center gap-4  max-w-max mx-auto bg-[#1E1E1E] p-4 rounded-[10px]">
      {/* Add Title */}
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
          className="inputStyles"
          placeholder="Add Title"
        />
      </div>
      {/* Add Post */}
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          value={postData.body}
          onChange={handleInputChange}
          placeholder="Add Post"
          className="inputStyles"
        />
      </div>
      {/* Add Button */}
      <button type="submit" className="btnBaseStyles bg-blue-500 text-white">
        Add
      </button>
    </form>
  );
}

export default Form;
