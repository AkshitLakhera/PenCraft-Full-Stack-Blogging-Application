import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "@/components/Appbar";
import { BACKEND_URL } from '@/config';

interface BookmarkProps {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
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
      if (response.status === 200) {
        console.log('Successful response:', response.data);
        setBookmarks(response.data.bookmarks);
      } else {
        console.error('Unexpected response status:', response.status);
      }
      setBookmarks(response.data.bookmarks);
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
            summary={bookmark.summary}
            author={bookmark.author}
            date={bookmark.date}
          />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<BookmarkProps> = ({ title, summary, author, date }) => {
  return (
    <div className="blog-card w-96 mx-auto my-8 p-6 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="blog-header text-center">
        <h2 className="blog-title text-xl font-semibold text-gray-800">{title}</h2>
        <p className="blog-date text-sm text-gray-600">{date}</p>
      </div>
      <div className="blog-content mt-4">
        <p className="blog-summary text-gray-700">{summary}</p>
        <p className="blog-author text-gray-600">Author: {author}</p>
      </div>
    </div>
  );
};
