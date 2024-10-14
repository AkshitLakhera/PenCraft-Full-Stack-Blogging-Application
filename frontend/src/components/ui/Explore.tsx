import Blog from "../ui/Blog";
export const Explore = () => {
  return (
    <div className="border-4 mt-9 border-red-600 flex flex-col">
      <h3>Blog</h3>
      <p>
        Here, we share travel tips, guides, and stories that inpire your next
        adventure.
      </p>
      <ul className="flex justify-between">
        <li className="text-center font-bold rounded-md cursor-pointer hover:bg-white hover:text-blue-500">
          All
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer hover:bg-white hover:text-blue-500">
          Destination
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer hover:bg-white hover:text-blue-500">
          Culinary
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer hover:bg-white hover:text-blue-500">
          Lifestyle
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer hover:bg-white hover:text-blue-500">
          Tips & Hacks
        </li>
      </ul>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 w-1/2 grid-rows-2 justify-center items-center border-4 border-blue-600">
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
        </div>
      </div>
    </div>
  );
};
