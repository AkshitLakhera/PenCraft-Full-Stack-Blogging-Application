import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogwrite from "@/assets/blog.png";
import ribbon from "@/assets/ribbon.png";
import blogs from "@/assets/blogging.png"
interface AppbarProps {
  onSearch: (query: string) => void;
}

export const Appbar: React.FC<AppbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNavigationBox, setShowNavigationBox] = useState<boolean>(false);
  const navigationBoxRef = useRef<HTMLDivElement>(null);

  const handleAvatarClick = () => {
    console.log("avatarr clicked",showNavigationBox)
    setShowNavigationBox(!showNavigationBox);
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navigationBoxRef.current &&
        !navigationBoxRef.current.contains(e.target as Node) && 
        showNavigationBox
      ) {
        setShowNavigationBox(false);
      }
    };
   console.log("handleclick outside added")
    document.addEventListener("mousedown", handleClickOutside);
  
    return  () => {
      console.log("handle click outside removed")
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigationBoxRef, showNavigationBox]);
  

  const handlePublish = () => {
    navigate("/publish");
  };

  const handleBookmarkClick = () => {
    navigate("/bookmark");
  };

  const handleHomepage = () => {
    navigate("/blogs");
  };

  const authorname = localStorage.getItem("name") ?? "";

  return (
    <div className="flex justify-between border-b p-3 m-1" style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "white" }}>
      <div className="font-bold text-lg cursor-pointer" onClick={handleHomepage}>PenCraft</div>
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-8 rounded-xl bg-slate-100 overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-slate-100" type="text" id="search" placeholder="Search something.." value={searchQuery} onChange={handleSearch} />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        {/* <Button title="Bookmarks" onClick={handleBookmarkClick} />
        <Button title="Create a blog" onClick={handlePublish} /> */}
        <div ref={navigationBoxRef} className=" box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px cursor-pointer relative inline-flex items-center justify-center bg-gray-200 w-12 h-12 ml-6 overflow-hidden bg-white-100 rounded-full dark:bg-gray-600" onClick={handleAvatarClick}>
          <span className="font-medium text-gray-600 dark:text-gray-300">{authorname[0]}</span>
        </div>
        {showNavigationBox && (
          <div  style ={ {top:"4.5rem"}}className="absolute p-6  right-0 w-48 bg-white border border-gray-200 shadow-lg p-2 rounded-md" ref={navigationBoxRef}>
            <div className="text-white flex flex-col gap-3"> 
            <div className="flex w-10 h-auto justify-start" onClick={handlePublish}>
            <img src={blogwrite} alt="blog write"  className="mr-2"/>
            <Button title="Write" />
              </div>
            <div className="flex w-10 h-auto justify-start " onClick={handleBookmarkClick}>
              <img src={ribbon} alt="bookmarky symbol" className="mr-2" />
              <Button  title="Bookmarks" />
            </div>
            <div className="flex w-10 h-auto justify-start " >
              <img src={blogs} alt="blogs" className="mr-2" />
              <Button  title="My Blogs" />
            </div>
         
       
        </div>
          </div>
        )}
      </div>
    </div>
  );
};

export function Button({ title }: { title: string; }) {
  return (
    <button  type="button" className="text-black bg-white font-xl rounded-xl text-xs px-3 py-2 text-center  me-2 mb-2 w-32 h-10 flex items-center justify-start">
      {title}
    </button>
  );
}
