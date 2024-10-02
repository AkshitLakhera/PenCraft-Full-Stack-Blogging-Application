import { Link } from "react-router-dom";
import ribbon from "../assets/ribbon.png";
import ribbonfilled from "../assets/bookmark.png";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: Date | string;
}
export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = async (event: {
    stopPropagation: () => void;
    preventDefault: () => void;
  }) => {
    event.stopPropagation(); // Prevent link navigation from bubbling up
    event.preventDefault();
    setIsBookmarked(!isBookmarked);

    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
      if (!token) {
        throw new Error("Authentication token not found");
      }
      console.log("Posting bookmark...");
      console.log(id);
      console.log(token);
      // Make POST request to create bookmark, including user ID in headers
      if (!isBookmarked) {
        await axios.post(`${BACKEND_URL}/api/v1/${id}`, null, {
          headers: {
            Authorization: token, // Pass authorization token
          },
        });

        console.log("Bookmark added successfully:", id);
      } else {
        // To delete the bookmark added
        const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
        await axios.delete(`${BACKEND_URL}/api/v1/${id}/bookmarks`, {
          headers: {
            Authorization: token, // Pass authorization token
          },
        });
        console.log("Bookmark deleted");
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b pb-4 w-screen max-w-screen-md">
        <div className="flex">
          {/* <Avatar name={authorName} /> */}
          <Avatar className="w-9 h-9 rounded-sm">
            <AvatarImage />
            <AvatarFallback className="w-9 h-9 rounded-sm capitalize">
              {authorName ? authorName.slice(0, 1) : "CN"}
            </AvatarFallback>
          </Avatar>
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2 ">
            <div className="h-1 w-1 rounded-full bg-slate-500" />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate.toLocaleString()}
          </div>
          {/* image */}
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div
          className="pt-4"
          dangerouslySetInnerHTML={{ __html: content.slice(0, 100) + "..." }}
        />
        <div className="flex justify-between pt-4 items-center cursor-pointer">
          <div className="text-slate-500 text-base font-light pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
          <div onClick={handleClick}>
            <img
              src={isBookmarked ? ribbonfilled : ribbon}
              className="w-5 h-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
