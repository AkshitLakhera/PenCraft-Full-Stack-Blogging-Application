import { FC } from "react";
interface BlogProps {
  imgSrc: string;
  heading: string;
  description: string;
  time: string;
  comments: number;
  tag: string;
}
const Blog: FC<BlogProps> = ({
  imgSrc,
  heading,
  description,
  time,
  comments,
  tag,
}) => {
  return (
    <div className="">
      {/* Card 1 */}
      <div className="rounded overflow-hidden shadow-lg flex flex-col">
        <div className="relative">
          <a href="#">
            <img
              className="w-full h-64 object-cover"
              src={imgSrc}
              alt="Sunset in the mountains"
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          </a>
          <a href="#!">
            <div className="text-xs absolute top-0 right-0 bg-blue-400 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-blue-400 transition duration-500 ease-in-out">
              {tag}
            </div>
          </a>
        </div>
        <div className="px-6 py-4 mb-auto">
          <a
            href="#"
            className="font-medium text-lg inline-block hover:text-blue-400 transition duration-500 ease-in-out inline-block mb-2"
          >
            {heading}
          </a>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span className="py-1 text-xs font-regular text-gray-900 flex flex-row items-center">
            <svg
              height="13px"
              width="13px"
              version="1.1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                </g>
              </g>
            </svg>
            <span className="ml-1">{time} mins ago</span>
          </span>
          <span className="py-1 text-xs font-regular text-gray-900 flex flex-row items-center">
            <svg
              className="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="ml-1">{comments} Comments</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
