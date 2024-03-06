import { Appbar } from "@/components/Appbar";
import { BlogCard } from "@/components/BlogCard";
import { useBlogs} from  "@/hooks/index"

export const Blogs = () => {
  const { loading , blogs } = useBlogs();
  if (loading) {
    return <div> loading....</div>
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center items-center h-full ">
        <div className="flex flex-col items-center ">
          {blogs.map((blog) =>  <BlogCard
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={
              blog.content
            }
            publishedDate={"2 March,2024"}
          />)}
          
        </div>
    
      </div>
    </div>
  );
};
