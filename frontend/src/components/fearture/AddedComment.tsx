import React, { useState } from 'react';
interface User {
  name: string;
}

interface Comment {
  content: string;
  id: string;
  user: User;
}

interface Comment {
  content: string;
  id:string;
}
const AddedComment: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isActive,setIsActive] = useState(false)
   const handleTextareaChange = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
    // Check if the textarea value contains at least one word
    setIsActive(event.target.value.trim().length > 0);
  };

  const handleOpentextarea = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
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
        </div>
      </div>
      {/* Reply section */}
      {isReplying ? (
        <div className="mt-4 ml-7">
          <textarea
            placeholder="Write your reply..."
            className="w-full h-20 border border-gray-300 rounded p-2 resize-none"
            onChange={handleTextareaChange}
          />
          <div className="flex gap-3 mt-2 justify-between">
            <button className="hover:text-gray-500" onClick={handleCancelReply}>
              Cancel 
            </button>
            <button 
             type="button" 
            className={`text-white font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none 
             ${isActive ? 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'bg-gray-400 cursor-not-allowed'}`}
             disabled={!isActive}
                >
  Respond
</button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 mt-4 ml-7 justify-end">
          <button className="text-blue-600 hover:text-blue-800" onClick={handleOpentextarea}>
            Reply
          </button>
        </div>
      )}
    </div>
  );
      };

export default AddedComment;
