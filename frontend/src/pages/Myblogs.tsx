import { Appbar } from "@/components/Appbar"
import { Link } from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai'; // Import delete icon
import { BACKEND_URL } from "@/config";
import axios  from "axios";
import { useEffect, useState} from "react";
interface MyblogsProps {
  id: number;
  title: string;
  content: string;
  onDelete: (id: number) => void;
}
export const Myblogs = () => {
  const [blogs, setBlogs] =  useState<MyblogsProps[]>([]); 
  useEffect( () => {
    fetchOwnBlogs();
  },[] )
  const fetchOwnBlogs = async () => {
    try{
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error ('Authentication token is not found');
      }
      const response = await axios.get(`${BACKEND_URL}/api/v1/user--blogs`, {
        headers: {
          Authorization:token  // Assuming you have stored the token in localStorage
        }
      })
      const info =  response.data.userBlogs;
      setBlogs(info);
      console.log(info)
    }catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  }
  return (
    <div>
         <Appbar onSearch={() => {}} />
         <div className='flex flex-wrap'>
         {blogs.map((blog) => (
        <Card key={blog.id} id={blog.id} title={blog.title} content={blog.content.slice(0, 90) + "..."} onDelete={() => {}} />
      ))}
      </div>
    </div>
  )
}
const Card: React.FC<MyblogsProps> = ({ title, content ,id ,onDelete}) => {
  return (
    <div className="blog-card w-96 mx-auto my-8 p-6 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="blog-header text-left">
        <h2 className="blog-title text-xl font-semibold text-gray-800 ">  
 {/* Code added to open whole blog when clicked on card  */}
        <Link to={`/blog/${id}`}>{title}</Link>
        </h2>
      </div>
      <div className="blog-content mt-4">
        <p className="blog-summary text-gray-700 text-left">{content}</p>
        {/* <p className="blog-author text-gray-600">Author: {author}</p> */}
      </div>
       {/* Delete Icon */}
       <div className="flex justify-end mt-4">
        <AiOutlineDelete className="cursor-pointer" onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};