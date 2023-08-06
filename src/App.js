import { Route, Routes } from "react-router-dom";
import Posts from "./Posts/Posts";
import Post from "./Post/Post";

function App() {
  return (
    <div
      className=" 
         w-full min-h-[100vh] py-10 flex items-center
         justify-center bg-gradient-to-r from-cyan-500 to-blue-500
     "
    >
      <div
        className=" container
      w-[70%]
      mx-auto h-fit "
      >
        <Routes>
          <Route path="/" element={ <Posts />} />
          <Route path="/post/:id" element={ <Post/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
