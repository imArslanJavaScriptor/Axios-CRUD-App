import React, { useState } from "react";
import { postData } from "../api/PostApi";

function Form({ data, setData }) {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const addPostData = async () => {
    try {
      const res = await postData(addData); // ✅ Pass addData to postData
      console.log(res.data);
      if (res.status === 201) {
        setData([...data, res.data]);
        setAddData({ title: "", body: "" }); // ✅ Clear input fields after submission
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPostData(); // ✅ No need to pass addData here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <input
          id="body"
          type="text"
          name="body"
          autoComplete="off"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
