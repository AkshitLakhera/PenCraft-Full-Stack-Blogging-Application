import Blog from "../ui/Blog";
export const Explore = () => {
  return (
    <div className=" flex flex-col">
      <h1 className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold whitespace-nowrap">
        Blog
      </h1>
      <p>
        Here, we share travel tips, guides, and stories that inspire your next
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
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="border-b mb-5 flex justify-between text-sm">
          <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
            <svg
              className="h-6 mr-3"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 455.005 455.005"
              enableBackground="new 0 0 455.005 455.005"
              xmlSpace="preserve"
            >
              <g>
                <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"></path>
              </g>
            </svg>
            <a href="#" className="font-semibold inline-block">
              Cooking Blog
            </a>
          </div>
          <a href="#">See All</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <Blog />
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
