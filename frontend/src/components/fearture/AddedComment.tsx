
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { BACKEND_URL } from "@/config";

interface User {
  name: string;
}

interface Comment {
  content: string;
  id: string;
  user: User;
  childComments?: Comment[]; // Include childComments
}

interface CommentWithPostId extends Comment {
  postId: string; // Add postId property
}

const AddedComment: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [content, setContent] = useState<string>("");
  const [isReplying, setIsReplying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showChildComments, setShowChildComments] = useState(false); // State for toggling child comments

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setIsActive(event.target.value.trim().length > 0);
  };
 
  const handleOpentextarea = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  const handleReply = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/posts/${(comment as CommentWithPostId).postId}/comments`, {
        content: content,
        parentId: comment.id, // Pass the parent comment ID
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Comment created:", response.data.comment);
      setContent("");
      // Optionally, you can update the UI to reflect the new comment
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const toggleChildComments = () => {
    setShowChildComments(!showChildComments);
  };

  return (
    <div>
      <div className="flex items-start mt-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-lg">{comment.user.name[0]}</span>
          </div>
        </div>
        {/* Comment content */}
        <div className="ml-4">
          <div className="text-gray-800 font-medium">{comment.user.name}</div>
          <div className="text-gray-600">{comment.content}</div>
          {/* Button to toggle child comments */}
          {comment.childComments && comment.childComments.length > 0 && (
            <button onClick={toggleChildComments} className="text-blue-600 hover:text-blue-800">
              {showChildComments ? "Collapse" : "Expand"} ({comment.childComments.length})
            </button>
          )}

          
        </div>
      </div>
      {/* Reply section */}
      {isReplying ? (
        <div className="mt-4 ml-7">
          <textarea
            placeholder="Write your reply..."
            className="w-full h-20 border border-gray-300 rounded p-2 resize-none text-gray-500"
            onChange={handleTextareaChange}
          />
          <div className="flex gap-3 mt-2 justify-between">
            <button className="text-gray-500" onClick={handleCancelReply}>
              Cancel 
            </button>
            <button 
             type="button" 
            className={`text-white font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none 
             ${isActive ? 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'bg-gray-400 cursor-not-allowed'}`}
             disabled={!isActive}
             onClick={handleReply}>Respond</button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 mt-4 ml-7 justify-end">
          <button className="text-blue-600 hover:text-blue-800" onClick={handleOpentextarea}>
            Reply
          </button>
        </div>
      )}
      {/* Render child comments if they exist and are toggled */}
      {showChildComments && comment.childComments && (
        <div className="ml-12">
          {comment.childComments.map((childComment) => (
            <AddedComment key={childComment.id} comment={childComment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddedComment;

