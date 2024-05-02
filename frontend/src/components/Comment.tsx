
export const Comment = () => {
  return (
    <div className="card"> 
      <div className="mb-6">
    <h1 className="text-2xl font-extrabold">Response:</h1>
  </div>
  <textarea
    placeholder="Write your comment here..."
    className="w-full h-10 border border-gray-300 rounded p-2"
  />
  <div className="btns flex">
  <button className="mt-2 text-black font-bold py-2 px-4 rounded">
    reply
  </button>
  <button className="mt-2  text-black font-bold py-2 px-4 rounded">
    edit
  </button>
  <button className="mt-2 text-black font-bold py-2 px-4 rounded">
    delete
  </button>
  </div>
  </div>
  )
}
