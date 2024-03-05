interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="p-4 border-b border-slate-200 pb-4 w-10/12 max-w-screen-md cursor-pointer">
      <div className="flex">
      <Avatar name={authorName} />
        <div className="font-normal  text-sm flex justify-center flex-col ml-2">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2 ">
          <Circle />
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>
      <div className=" pt-2  text-4xl font-bold">{title}</div>
      <div className="text-smd font-light mt-3">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-slate-500 text-sm font-light pt-4">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
    </div>
  );
};
export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
export function Avatar({name} :{name:string}) {
  return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
  </div>
}
