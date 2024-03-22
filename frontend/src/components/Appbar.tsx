import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

interface AppbarProps {
  onSearch: (query: string) => void; // Specify the type of the onSearch prop
}

export const Appbar: React.FC<AppbarProps> = ({ onSearch }) => {
  // Correctly use array destructuring to get state value and setter function
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Provide type annotation for the event parameter 'e'
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };
  const navigate = useNavigate();
  const handlePublish = () => {
    console.log("clicked");
    navigate("/publish");
  };
  const handleBookmarkClick = () => {
    // Navigate to the bookmark page
    navigate("/bookmark");
  };
  const handleHomepage = () => {
    navigate("/blogs")
  }

  return (
    <div className="flex justify-between border-b p-3 m-1" style={{ position: "sticky", top: 0, zIndex: 1000,backgroundColor:"white" }}>
      <div className="font-bold text-lg cursor-pointer" onClick={handleHomepage}>PenCraft</div>
      {/* search bar */}
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-8 rounded-xl  bg-slate-100 overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-slate-100"
            type="text"
            id="search"
            placeholder="Search something.."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex justify-center gap-5">
        <Button title="Bookmarks" onClick={handleBookmarkClick} />
        <Button title="Create a blog" onClick={handlePublish} />
        {/* <Avatar name="Akshit" /> */}
      </div>
    </div>
  );
};

export function Button({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-xl text-xs px-3 py-2 text-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 w-32 h-10 flex items-center justify-center"
    >
      {title}
    </button>
  );
}
