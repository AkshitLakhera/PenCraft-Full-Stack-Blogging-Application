import { useState } from "react";
import { Appbar } from "@/components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 const navigate = useNavigate();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    // Handle submission logic here
   await axios.post(`${BACKEND_URL}/api/v1/blog`,{
    title: title,
    content: content
  },{
    headers: {
        Authorization: localStorage.getItem("token")
    }
})
    navigate("/blogs") 
  };

  return (
    <div>
      <Appbar />
      <div className="p-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your content here"
          rows={8}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Publish
        </button>
      </div>
    </div>
  );
};
