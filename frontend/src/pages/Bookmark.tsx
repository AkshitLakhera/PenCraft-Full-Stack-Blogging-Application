import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "@/components/Appbar";
import { BACKEND_URL } from '@/config';

interface BookmarkProps {
  id: number;
  title: string;
  content: string;
}

export const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);

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
          />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<BookmarkProps> = ({ title, content}) => {
  return (
    <div className="blog-card w-96 mx-auto my-8 p-6 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="blog-header text-left">
        <h2 className="blog-title text-xl font-semibold text-gray-800 ">{title}</h2>
      </div>
      <div className="blog-content mt-4">
        <p className="blog-summary text-gray-700 text-left">{content}</p>
        {/* <p className="blog-author text-gray-600">Author: {author}</p> */}
      </div>
    </div>
  );
};
