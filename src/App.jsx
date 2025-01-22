import React, { useEffect, useState } from "react";
import { getPost } from "./api/PostApi";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#121212] pt-10">
      <Posts />
    </div>
  );
}

export default App;
