import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
export const Appbar = () => {
  return (
    <Link to={"/blogs"}>
      <div className="flex justify-between border-b p-3 m-1">
        <div className="font-bold text-lg">PenCraft</div>
        <div>
          <Avatar name="Akshit" />
        </div>
      </div>
    </Link>
  );
};
