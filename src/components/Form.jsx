import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  //   get the udpated Data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  //   updatePostData
  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch ({ error }) {
      console.log(error);
    }
  };

  //   form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="my-6 flex items-center gap-2 bg-[#ebebeb] rounded-[100px] overflow-hidden p-2">
      <div className="inp-box">
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          className="inp-style"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

     <div className="inp-box">
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          className="inp-style"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>

      <button className="form-btn" type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};
