import { useState, useEffect } from "react";
import Post from "../Post/Post";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate()
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:3000/posts"
      );
      setPost(res.data);
    };
    fetchPosts();
  }, []);
  const handleDelete = async (id) =>{
    try {
      setPost(post.filter((item)=>item.id !== id));
      axios.delete(`http://localhost:3000/posts/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(post)
  return (
    <div
      className=" rounded-lg py-6 px-4
             bg-white/70 flex-col 
             items-start shadow-[0_0_30px_10px_rgba(255,255,255,0.3)]"
    >
      <div onClick={()=>navigate("/post/new")} className=" bg-blue-600 rounded-full px-5 cursor-pointer py-2 w-fit text-lg font-semibold text-white">
        New Post
      </div>
      <table className=" post-table w-full mt-3">
        <thead className=" w-full ">
          <tr className=" p-3 w-full flex border-b">
            <th className="max-w-[25%] w-[15vw] flex justify-start pl-4">Title</th>
            <th className="max-w-[25%] w-[15vw] flex justify-start pl-4">Content</th>
            <th className="max-w-[25%] w-[15vw] flex justify-start pl-4">Update</th>
            <th className="max-w-[25%] w-[15vw] flex justify-start pl-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {post.map((item) => {
            return (
              <tr key={item.id} className=" p-3 w-full flex border-b">
                <td className="max-w-[25%] w-[15vw] break-all flex justify-start pl-4 pr-2">
                  {item.title}
                </td>
                <td className="max-w-[25%] w-[15vw] flex break-all justify-start pl-4">{item.body}</td>
                <td className="max-w-[25%] w-[15vw] flex justify-start pl-4">
                  <button onClick={()=> navigate(`/post/${item.id}`)} className=" bg-blue-600 px-5 py-2 rounded-full h-fit font-semibold text-white">
                    Update
                  </button>
                </td>
                <td className="max-w-[25%] w-[15vw] flex justify-start pl-4">
                  <button onClick={()=> handleDelete(item.id)} className=" bg-red-600 px-5 py-2 rounded-full h-fit font-semibold text-white">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
