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
   <Appbar onSearch={() => {}} />
      <div className="p-4">
        <input
          type="text"
          value={title }
          onChange={handleTitleChange}
          placeholder="Enter title"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus outline-none"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your content here"
          rows={8}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Publish
        </button>
      </div>
      <ImageUpload/>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ImageUpload() {
  const [file, setFile] = useState<string>()
  function handleChange(e: { target: { files: (Blob | MediaSource)[]; }; }) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));

 }
  return (
    <div className="  ml-4 ">
      <h2 className="my-4 font-medium" >Add Image:</h2>
      <input type="file" onChange={()=> {handleChange}} />
      <img src={file} />
    </div>
  );
}