import React from 'react';
import { Appbar } from "@/components/Appbar";

interface CardProps {
  title: string;
  summary: string;
  author: string;
  date: string;
}

export const Bookmark = () => {
  return (
    <div>
      <Appbar onSearch={() => {}} />
      <div className='flex flex-wrap'>
      <Card
        title="Navl ravikant"
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et semper enim. Vestibulum at ante nec est eleifend fermentum."
        author="John Doe"
        date="March 22, 2024"
      />
      <Card
        title="Navl ravikant"
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et semper enim. Vestibulum at ante nec est eleifend fermentum."
        author="John Doe"
        date="March 22, 2024"
      />
      <Card
        title="Navl ravikant"
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et semper enim. Vestibulum at ante nec est eleifend fermentum."
        author="John Doe"
        date="March 22, 2024"
      />
      <Card
        title="Navl ravikant"
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et semper enim. Vestibulum at ante nec est eleifend fermentum."
        author="John Doe"
        date="March 22, 2024"
      />
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ title, summary, author, date }) => {
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


