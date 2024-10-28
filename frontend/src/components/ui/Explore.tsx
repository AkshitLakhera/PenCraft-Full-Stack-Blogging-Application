import Blog from "../ui/Blog";

export const Explore = () => {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h1 className="text-lg md:text-xl lg:text-3xl xl:text-5xl font-bold whitespace-nowrap mb-10">
        Blog
      </h1>
      <p className="mb-10 text-xs sm:text-base md:text-base lg:text-base xl:text-lg">
        Here, we share travel tips, guides, and stories that inspire your next
        adventure.
      </p>
      <ul className="flex flex-wrap justify-start lg:justify-between mb-5">
        <li className="text-center  font-bold rounded-md cursor-pointer bg-blue-400 px-4 py-2 text-white mt-3 mx-2 hover:bg-white hover:text-blue-400 transition duration-500 ease-in-out">
          All
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer bg-blue-400 px-4 py-2 text-white mt-3 mx-2 hover:bg-white hover:text-blue-400 transition duration-500 ease-in-out">
          Destination
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer bg-blue-400 px-4 py-2 text-white mt-3 mx-2 hover:bg-white hover:text-blue-400 transition duration-500 ease-in-out">
          Culinary
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer bg-blue-400 px-4 py-2 text-white mt-3 mx-2 hover:bg-white hover:text-blue-400 transition duration-500 ease-in-out">
          Lifestyle
        </li>
        <li className="text-center font-bold rounded-md cursor-pointer bg-blue-400 px-4 py-2 text-white mt-3 mx-2 hover:bg-white hover:text-blue-400 transition duration-500 ease-in-out">
          Tips & Hacks
        </li>
      </ul>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="border-b mb-5 flex justify-between text-sm">
          <div className="text-blue-400 flex items-center pb-2 pr-2 border-b-2 border-blue-400 uppercase">
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
              All
            </a>
          </div>
          <a href="#">See All</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <Blog
            imgSrc="https://images.squarespace-cdn.com/content/v1/651f3729b2f69811ea357c79/74a113a6-ab95-493d-9c33-fab940272ca4/clay-banks-IYLcwiyYUgc-unsplash-no+guy.jpg?format=1500w"
            heading="Unveiling the Secrets Beyond the Tourist Trails"
            description="Dive into the local culture, discover hidden spots, and experience the authentic charm that often..."
            time="20"
            comments={10}
            tag="Destination"
          />
          <Blog
            imgSrc="https://plus.unsplash.com/premium_photo-1670604211960-82b8d84f6aea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading="Culinary Delights: Must-Try Dishes from Around the World"
            description="Embark on a culinary journey with these must-try dishes that capture the essence of their regions..."
            time="30"
            comments={8}
            tag="Culinary"
          />
          <Blog
            imgSrc="https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
            heading="Lifestyle Tips for a Happier, Healthier You"
            description="Transform your daily routine with these lifestyle changes that promote well-being and positivity..."
            time="25"
            comments={15}
            tag="Lifestyle"
          />
          <Blog
            imgSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            heading="Top Travel Hacks for a Smoother Journey"
            description="Simplify your travel experience with these smart tips and tricks that every traveler should know..."
            time="15"
            comments={5}
            tag="Tips & Hacks"
          />
          <Blog
            imgSrc="https://images.unsplash.com/photo-1683009427666-340595e57e43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzdGluYXRpb258ZW58MHx8MHx8fDA%3D"
            heading="Exploring Hidden Destinations Off the Beaten Path"
            description="Step away from the crowded tourist spots and uncover these hidden gems that offer a unique experience..."
            time="40"
            comments={22}
            tag="Destination"
          />
          <Blog
            imgSrc="https://images.unsplash.com/photo-1505870136463-c17bc84b30a2?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading="The Ultimate Guide to Street Food Around the World"
            description="Discover the best street food scenes from bustling markets to charming alleys across the globe..."
            time="35"
            comments={18}
            tag="Culinary"
          />
        </div>
      </div>
    </div>
  );
};
