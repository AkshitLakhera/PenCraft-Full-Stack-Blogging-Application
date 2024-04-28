import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "@/components/Appbar";
import { BACKEND_URL } from '@/config';
import { AiOutlineDelete } from 'react-icons/ai'; // Import delete icon
import Modal from 'react-modal'; // Import modal library
import Trash from '../assets/recycle-bin.png';
import { Link } from 'react-router-dom';
import { BookmarkmyblogsSkeleton } from '@/components/BookmarkmyblogsSkeleton';
// Set the app element for the modal
Modal.setAppElement('#root');
interface BookmarkProps {
  id: number;
  title: string;
  content: string;
  onDelete: (id: number) => void;
}

export const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);
  const  [selectedBookmark,setSelectedBookmark] = useState<number|null>(null); //to track the selected bookmark for deletion
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const  [loading,setloading] =useState(true);
  const filteredBlogs = bookmarks.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setloading(true)
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
      if (!token) {
        throw new Error('Authentication token not found');
      }
      const response = await axios.get(`${BACKEND_URL}/api/v1/bookmarks`, {
        headers: {
          Authorization:token  // Assuming you have stored the token in localStorage
        }
      });
      // This how I extracted data from tedious response
      const info  = response.data.bookmarks;
      const extractedData = info.map((item: { post: { title: string; content: string; authorId: string; id: string; }; }) => {
        return {
          title: item.post.title,
          content: item.post.content,
          authorId: item.post.authorId,
          id: item.post.id
        };
      });
      
      // Now extractedData will contain an array of objects with the extracted values
      if (response.status === 200) {
        setBookmarks(extractedData);
      } else {
        console.error('Unexpected response status:');
      }
      setBookmarks(extractedData);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }finally {
      // Set loading state to false after fetching regardless of success or failure
      setloading(false);
    }
  };
  const handleDelete = async (id:number) => {
    try {
      console.log('Deleting bookmark with id:', id);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      await axios.delete(`${BACKEND_URL}/api/v1/${id}/bookmarks`, {
        headers: {
          Authorization: token
        }
      });
      console.log('Bookmark deleted:', id);
      closeDeleteModal();
    // Fetch bookmarks again to reflect the changes
    fetchBookmarks();
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };
  
  // Inside the openDeleteModal function
  const openDeleteModal = (id:number) => {
    console.log('Opening delete modal for bookmark with id:', id);
    setSelectedBookmark(id);
    setIsModalOpen(true);
  };
  
  // Inside the closeDeleteModal function
  const closeDeleteModal = () => {
    console.log('Closing delete modal');
    setSelectedBookmark(null);
    setIsModalOpen(false);
  };
  if (loading) {
    console.log(loading)
    return (
      <div>
         <Appbar onSearch={handleSearch} />
        <div className="flex justify-center items-center h-full">
          <div className="flex  items-center flex-wrap gap-4">
            <BookmarkmyblogsSkeleton/>
            <BookmarkmyblogsSkeleton/>
            <BookmarkmyblogsSkeleton/>
            <BookmarkmyblogsSkeleton/>  
          </div>
        </div>
      </div>
    );
  }

  return (
    // Using string interpolation to add conditional classes
    <div className={`${isModalOpen ? 'opacity-50 pointer-events-none' : ''}`}>
      <Appbar onSearch={handleSearch}/>
      <div className='flex flex-wrap'>
        {filteredBlogs.length >0 ? (
        filteredBlogs.map((bookmark) => (
          <Card
            id={bookmark.id}
            key={bookmark.id}
            title={bookmark.title}
            content={bookmark.content.slice(0, 90) + "..."}
            onDelete = {openDeleteModal}
          />
          
        ))) : (
          <div>No blogs found</div>
        )}
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
        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => selectedBookmark !== null && handleDelete(selectedBookmark)}>Delete</button>
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={closeDeleteModal}>Cancel</button>
      </div>
    </div>
  </div>
</div>

      </Modal>
    </div>
  );
};

const Card: React.FC<BookmarkProps> = ({ title, content ,id ,onDelete}) => {
    // const authorname = localStorage.getItem("name") ?? "";
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
        {/* <p className="blog-author text-gray-600">Author: {authorname}</p> */}
      </div>
       {/* Delete Icon */}
       <div className="flex justify-end mt-4">
        <AiOutlineDelete className="cursor-pointer" onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};
// 