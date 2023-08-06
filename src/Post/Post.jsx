import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    if (id === "new") return;
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/posts/${id}`);
      setPost(res.data);
    };
    fetchPosts();
  }, []);
  console.log(post);

  const handleChange = (e) => {
    const postClone = { ...post };
    postClone[e.target.name] = e.target.value;
    setPost(postClone);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    try {
      if (id === "new") {
        axios.post("http://localhost:3000/posts", post);
        return navigate("/");
      } else {
        axios.put("http://localhost:3000/posts" + "/" + id, post);
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(post, "post");
  return (
    <div
      className="rounded-lg py-6 px-4
    bg-white/70 flex-col flex gap-3
    items-start shadow-[0_0_30px_10px_rgba(255,255,255,0.3)]"
    >
      <form>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          className=" bg-transparent outline-none w-full"
          placeholder="Title..."
          value={post.title}
        />
        <input
          onChange={handleChange}
          name="body"
          type="text"
          className=" bg-transparent outline-none w-full mt-2"
          placeholder="Content..."
          value={post.body}
        />
        <button
          onClick={handleSumbit}
          className=" bg-blue-600 mt-3 rounded-full px-5 cursor-pointer py-1 w-fit text-lg font-semibold text-white"
        >
          {id === "new" ? "Post" : "Update"}
        </button>
      </form>
    </div>
  );
}
