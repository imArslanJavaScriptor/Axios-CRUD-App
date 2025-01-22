import React, { useEffect } from "react";
import { createPost, getPost } from "./api/PostApi";

function App() {
  let getPostData = async () => {
    let res = await getPost()
    console.log(res.data)
    
  }

  

  useEffect(() => {
    getPostData()
  })
  return <div className="w-full min-h-screen flex items-center justify-center bg-blue-500 text-white text-5xl font-extrabold">App</div>;
}

export default App;
