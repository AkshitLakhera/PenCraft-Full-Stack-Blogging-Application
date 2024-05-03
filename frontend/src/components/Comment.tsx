import { useState } from "react"

export const Comment = ({ handleCancel }: { handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const [isActive,setIsActive]=useState(false);
  const handleTextareaChange = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
    // Check if the textarea value contains at least one word
    setIsActive(event.target.value.trim().length > 0);
  };
  return (
    <div>
        <div className="mb-6">
    <h1 className="text-2xl font-extrabold">Response:</h1>
  </div>
    <div className="border-2 border-gray-300 rounded-xl p-4 "> 
    <div className="  flex gap-2 ">
      <div>
    <div className="transition-transform duration-1000 ease-in-out box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px cursor-pointer relative inline-flex justify-center bg-gray-200 w-12 h-12  overflow-hidden bg-white-100 rounded-full dark:bg-gray-600  felx-col items-center">
          <span className="font-medium text-gray-1000 dark:text-gray-300">N</span>
        </div>
        </div>
        <div className="authorName  flex  items-center">Naval ravikant</div>
        </div>
  <textarea
    placeholder="What are yours thoughts?"
    className="w-full h-10 border border-gray-300 rounded p-2 mt-2 resize-none"
    onChange={handleTextareaChange}
  />
   <div className="flex justify-between mt-3">
    <button onClick={handleCancel} className="hover:text-gray-500">Cancel</button>
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
  </div>
  )
}
