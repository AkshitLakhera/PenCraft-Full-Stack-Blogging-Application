import { Appbar } from "@/components/Appbar"
import { Link } from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai'; // Import delete icon
import { BACKEND_URL } from "@/config";
import axios  from "axios";
import { useEffect, useState} from "react";
import Modal from 'react-modal'; // Import modal library
import Trash from '../assets/recycle-bin.png';
interface MyblogsProps {
  id: number;
  title: string;
  content: string;
  onDelete: (id: number) => void;
}
export const Myblogs = () => {
  const [blogs, setBlogs] =  useState<MyblogsProps[]>([]); 
  const [selectedBlog,setSelectedBlog]= useState<number|null>(null); //it is used to track the selected blog
  const [isModalOpen,setIsModalOpen] = useState(false)//it is used to track modal state
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
  const handleDelete = async (id:number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error ('Authentication token is not found');
      }
      await axios.delete(`${BACKEND_URL}/api/v1/${id}`, {
        headers: {
          Authorization: token
        }
      });
      console.log("Blog deleted")
      closeDeleteModal();
      // Fetch bookmarks again to reflect the changes
      fetchOwnBlogs();
    }
    catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  }
  const openDeleteModal = (id:number) => {
  setSelectedBlog(id);
  setIsModalOpen(true);
  }
  // Empty  selected blog state null for future use
  const closeDeleteModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false)

  }
  return (
    <div className={`${isModalOpen ? 'opacity-50 pointer-events-none' : ''}`}>
         <Appbar onSearch={() => {}} />
         <div className='flex flex-wrap'>
         {blogs.map((blog) => (
        <Card key={blog.id} id={blog.id} title={blog.title} content={blog.content.slice(0, 90) + "..."} onDelete={openDeleteModal} />
      ))}
      </div>
       {/* Confirmation Modal */}

       <Modal  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
   overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"   isOpen = {isModalOpen} onRequestClose={closeDeleteModal}  contentLabel="Delete Confirmation">
      <div className="fixed inset-0 flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <div className="text-center">
    <div className="flex items-center justify-center mb-4">
        <img src={Trash} className='w-10' alt="" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this item?
        </p>
      </div>
      <div className="flex gap-4 mt-4 flexc items-center justify-center">
        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => selectedBlog !== null && handleDelete(selectedBlog)}>Delete</button>
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={closeDeleteModal}>Cancel</button>
      </div>
    </div>
  </div>
</div>

      </Modal>
    </div>
  )
}
const Card: React.FC<MyblogsProps> = ({ title, content ,id ,onDelete}) => {
  const authorname = localStorage.getItem("name") ?? "";
  return (
    <div className="blog-card w-96 mx-auto my-8 p-6 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="blog-header text-left">
        <h2 className="blog-title text-xl font-semibold text-gray-800 ">  
 {/* Code added to open whole blog when clicked on card  */}
        <Link to={`/blog/${id}`}>{title}</Link>
        </h2>
      </div>
      <div className="blog-content mt-4">
        <div className="blog-summary text-gray-700 text-left " dangerouslySetInnerHTML={{ __html: content.slice(0, 100) + "..." }}/>
        <p className="blog-author text-gray-600 font-semibold mt-5">Author: {authorname}</p>
      </div>
       {/* Delete Icon */}
       <div className="flex justify-end mt-4">
        <AiOutlineDelete className="cursor-pointer" onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};