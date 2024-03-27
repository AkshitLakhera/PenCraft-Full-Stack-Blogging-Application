import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "@/components/Appbar";
import { BACKEND_URL } from '@/config';
import { AiOutlineDelete } from 'react-icons/ai'; // Import delete icon
import Modal from 'react-modal'; // Import modal library
import Trash from '@/assets/recycle-bin.png';

interface BookmarkProps {
  id: number;
  title: string;
  content: string;
  onDelete:()=>void;
}

export const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);
  const  [selectedBookmark,setSelectedBookmark] = useState<BookmarkProps | null>(null); //to track the selected bookmark for deletion
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
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
      console.log(extractedData);
      if (response.status === 200) {
        console.log('Successful response:');
        setBookmarks(extractedData);
      } else {
        console.error('Unexpected response status:');
      }
      setBookmarks(extractedData);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };
  const openDeleteModal = (bookmark: BookmarkProps) => {
    setSelectedBookmark(bookmark);
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedBookmark(null);
    setIsModalOpen(false);
  }

  return (
    <div>
      <Appbar onSearch={() => {}} />
      <div className='flex flex-wrap'>
        {bookmarks.map((bookmark) => (
          <Card
            id={bookmark.id}
            key={bookmark.id}
            title={bookmark.title}
            content={bookmark.content.slice(0, 90) + "..."}
            onDelete = { () => openDeleteModal(bookmark)}
          />
        ))}
      </div>  
            {/* Confirmation Modal */}

      <Modal isOpen = {isModalOpen} onRequestClose={closeDeleteModal}  contentLabel="Delete Confirmation">
      <div className="text-center w-56">
          <Trash/>
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-danger w-full">Delete</button>
            <button
              className="btn btn-light w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Card: React.FC<BookmarkProps> = ({ title, content ,onDelete}) => {
  return (
    <div className="blog-card w-96 mx-auto my-8 p-6 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="blog-header text-left">
        <h2 className="blog-title text-xl font-semibold text-gray-800 ">{title}</h2>
      </div>
      <div className="blog-content mt-4">
        <p className="blog-summary text-gray-700 text-left">{content}</p>
        {/* <p className="blog-author text-gray-600">Author: {author}</p> */}
      </div>
       {/* Delete Icon */}
       <div className="flex justify-end mt-4">
        <AiOutlineDelete className="cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
};
