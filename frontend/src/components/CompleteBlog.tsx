import { Blog } from "@/hooks";
import { Appbar } from "./Appbar";
import clap from "@/assets/clapping.png";
import filledCap from "@/assets/filledclapping(1).png";
import comment from "@/assets/bubble-chat.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Comment } from "./fearture/Comment";
import AddedComment from "./fearture/AddedComment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface User {
  name: string;
}

interface Comment {
  id: string;
  content: string;
  timestamp: string;
  postId: string;
  userId: string;
  parentId: string | null;
  user: User; // Include the user property
  childComments?: Comment[]; // Array of nested comments
}

export const CompleteBlog = ({ blog }: { blog: Blog }) => {
  const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0); // State to hold the like count
  const [toggleComponent, setIsToggleComponent] = useState(false); // State  to manage state section visibility
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [finalfilteredContent, setFinalFilteredContent] = useState<string[]>([])


  const OntoggleComment = () => {
    setIsToggleComponent(!toggleComponent);
  };
  const handleCancel = () => {
    setIsToggleComponent(!toggleComponent);
  };
  // To fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/posts/${blog.id}/comments`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blog.id, toggleComponent, comments]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
    if (!token) {
      throw new Error("Authentication token not found");
    }
    // Fetch the like count when the component mounts
    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/${blog.id}/likeCount`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    fetchLikeCount();
  }, [blog.id]); // Fetch like count when blog id changes

  const handleClick = async (event: {
    stopPropagation: () => void;
    preventDefault: () => void;
  }) => {
    event.stopPropagation(); // Prevent link navigation from bubbling up
    event.preventDefault();
    setIsLiked(!isLiked);
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
      if (!token) {
        throw new Error("Authentication token not found");
      }
      if (!isLiked) {
        await axios.post(`${BACKEND_URL}/api/v1/${blog.id}/like`, null, {
          headers: {
            Authorization: token,
          },
        });
        setLikeCount(likeCount + 1); // Update like count
      } else {
        const token = localStorage.getItem("token");
        await axios.delete(`${BACKEND_URL}/api/v1/dislike/${blog.id}`, {
          headers: {
            Authorization: token,
          },
        });
        setLikeCount(likeCount - 1); // Update like count
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };
  // const transformValue = toggleComponent ? 'translateX(0)' : 'translateX(-100%)';

  //adding search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const paragraphs = blog.content.split('. ');

    const filteredContent = paragraphs.filter(paragraph =>
      paragraph.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const highlightedContent = filteredContent.map(paragraph =>
      paragraph.replace(new RegExp(query, 'gi'), match => `<span class="bg-yellow-500 font-bold">${match}</span>`)
    )

    setFinalFilteredContent(highlightedContent.length > 0 ? highlightedContent : ['No matches found.'])

  }
  return (
    <div>
      <div className={`${toggleComponent ? "opacity-50 " : ""}`}>
        <Appbar onSearch={handleSearch} />
      </div>
      <div className={`flex justify-center  `}>
        <div className="lg:grid lg:grid-cols-12 flex flex-col-reverse px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8 mr-4">
            <div className={`${toggleComponent ? "opacity-50 " : ""}`}>
              <div className="lg:text-5xl md:text-4xl text-3xl  font-extrabold">{blog.title}</div>
              <div className="text-slate-500 pt-2">
                {`post on ${blog.publishedDate ? formatDate(blog.publishedDate.toLocaleString()) : "2 March 2024"}`}
              </div>
              <div
                className="pt-4 mb-6">
                {searchQuery && finalfilteredContent.length > 0 ? (
                  finalfilteredContent.map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                )}
              </div>
              <div className="flex gap-8">
                {/* Like section  */}
                <div
                  className="like mb-10 flex gap-2 cursor-pointer"
                  onClick={handleClick}
                >
                  <img
                    src={isLiked ? filledCap : clap}
                    alt=""
                    className="w-7 h-auto cursoer-pointer"
                  />
                  <div className="text-slate-500 hover:text-slate-600">
                    {likeCount} {likeCount > 1 ? "claps" : "clap"}{" "}
                  </div>
                </div>
                {/* Comment section */}
                <div
                  className="comment mb-10 flex gap-2 cursor-pointer"
                  onClick={OntoggleComment}
                >
                  <img
                    src={comment}
                    alt="comment"
                    className="w-7 h-auto cursoer-pointer"
                  />
                  <div className="text-slate-500 hover:text-slate-600">{comments.length}</div>
                </div>
              </div>
            </div>

            {toggleComponent && (
              <div
                className={`fixed top-0 right-0 h-full box-border overflow-auto bg-white p-8 flex flex-col justify-start transition-transform duration-100 ${toggleComponent ? "transform translate-x-0" : "transform -translate-x-full"}`}
                style={{
                  zIndex: 540,
                  width: 412,
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                }}
              >
                {/* Your comment section UI */}
                <Comment handleCancel={handleCancel} blogID={blog.id} />
                <div className="mt-5 ">
                  {comments.slice().reverse().map((comment) => (
                    <AddedComment key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Hide when comment card is open */}
          {!toggleComponent && (
            <div className="col-span-4 lg:ml-14 py-3 px-3 mb-8 md:ml-0 -ml-3  ">
              <div className="text-slate-600 text-lg">Author</div>
              <div className="flex w-full md:ml-0  -ml-2">
                <div className="flex flex-col md:px-5 md:py-2 py-1 px-2 ">
                  <Avatar className="md:w-9 md:h-9 h-6 w-6  rounded-sm">
                    <AvatarImage />
                    <AvatarFallback className="md:w-9 md:h-9 w-6 h-6  rounded-sm capitalize">
                      {blog.author.name.slice(0, 1) || "Anonymous"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                  </div>
                  <div className="md:pt-2 pt-1 md:ml-0 -ml-8 text-slate-500">
                    Random catch phrase about the author's ability to grab the
                    user's attention
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
