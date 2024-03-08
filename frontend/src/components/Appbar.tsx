import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
export const Appbar = () => {
  return (
    <Link to={"/blogs"}>
      <div className="flex justify-between border-b p-3 m-1">
        <div className="font-bold text-lg">PenCraft</div>
        <div className="flex  justify-center gap-5">
          <Button/>
          <Avatar name="Akshit" />
        </div>
      </div>
    </Link>
  );
};
export function Button()  {
  return <Link to="/publish">
  <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-xl text-xs px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
    Create New Blog
  </button>
</Link>
}