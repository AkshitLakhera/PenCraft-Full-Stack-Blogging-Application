import { Appbar } from "@/components/Appbar";
import { BlogCard } from "@/components/BlogCard";

export const Blogs = () => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center items-center h-full ">
        <div className="flex flex-col items-center ">
          <BlogCard
            authorName={"Akshit Lakhera"}
            title={"How to get rich without getting lucky?"}
            content={
              "To get rich you have see world with open eyes ,you have to see wht short of opportunities are there and in which bull you can move"
            }
            publishedDate={"2 March,2024"}
          />
          <BlogCard
            authorName={"Akshit Lakhera"}
            title={"How to get rich without getting lucky?"}
            content={
              "To get rich you have see world with open eyes ,you have to see wht short of opportunities are there and in which bull you can move"
            }
            publishedDate={"2 March,2024"}
          />
          <BlogCard
            authorName={"Akshit Lakhera"}
            title={"How to get rich without getting lucky?"}
            content={
              "To get rich you have see world with open eyes ,you have to see wht short of opportunities are there and in which bull you can move"
            }
            publishedDate={"2 March,2024"}
          />
        </div>
        A
      </div>
    </div>
  );
};
