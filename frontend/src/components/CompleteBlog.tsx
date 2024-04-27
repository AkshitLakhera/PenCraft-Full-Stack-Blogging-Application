import { Blog } from "@/hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const CompleteBlog = ({blog}: {blog: Blog}) => {
  const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString(undefined, options);
  };

  return (
    <div>
      <Appbar onSearch={() => {}} />
      <div className="flex justify-center ">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8 ">
            <div className="text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
              {`post on ${blog.publishedDate ? formatDate(blog.publishedDate.toLocaleString()) : "2 March 2024"}`}
            </div>
            <div className="pt-4 mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
            {/* <div className="pt-4">{blog.content}</div> */}
          </div>
          <div className="col-span-4" >
            <div className="text-slate-600 text-lg" >
              Author
            </div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar  name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the user's attention
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};
