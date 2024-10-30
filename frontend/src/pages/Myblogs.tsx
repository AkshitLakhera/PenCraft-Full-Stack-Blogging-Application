import { Appbar } from "@/components/Appbar";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai"; // Import delete icon
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal"; // Import modal library
import Trash from "../assets/recycle-bin.png";
import Edit from "@/assets/edit.png";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { BookmarkmyblogsSkeleton } from "@/components/BookmarkmyblogsSkeleton";
interface MyblogsProps {
  id: number;
  title: string;
  content: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
export const Myblogs = () => {
  const [loading, setloading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<MyblogsProps[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null); //it is used to track the selected blog
  const [isModalOpen, setIsModalOpen] = useState(false); //it is used to track delete modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //It is used to track the edit modal state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const editor = useRef(null);
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  const handleSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    fetchOwnBlogs();
  }, []);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const fetchOwnBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is not found");
      }
      const response = await axios.get(`${BACKEND_URL}/api/v1/user--blogs`, {
        headers: {
          Authorization: token, // Assuming you have stored the token in localStorage
        },
      });
      const info = response.data.userBlogs;
      setBlogs(info);
      console.log(info);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    } finally {
      // Set loading state to false after fetching regardless of success or failure
      setloading(false);
    }
  };
  // Delete code and delete modal
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is not found");
      }
      await axios.delete(`${BACKEND_URL}/api/v1/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Blog deleted");
      closeDeleteModal();
      // Fetch bookmarks again to reflect the changes
      fetchOwnBlogs();
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };
  const openDeleteModal = (id: number) => {
    setSelectedBlog(id);
    setIsModalOpen(true);
  };
  // Empty  selected blog state null for future use
  const closeDeleteModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };
  // Edit blog code and edit modal
  const handleEditBlog = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is not found");
      }
      await axios.put(
        `${BACKEND_URL}/api/v1/edit`,
        {
          id,
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      closeEditModal();
      fetchOwnBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  const openEditModal = (id: number) => {
    // Added prefill as blogs (we are store list  of blogs here)
    const selectedBlog = blogs.find((blog) => blog.id === id);
    if (selectedBlog) {
      setTitle(selectedBlog.title);
      setContent(selectedBlog.content);
    }
    setSelectedBlog(id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedBlog(null);
    setIsEditModalOpen(false);
  };
  if (loading) {
    console.log(loading);
    return (
      <div>
        <Appbar onSearch={handleSearch} />
        <div className="flex justify-center items-center h-full">
          <div className="flex  items-center flex-wrap gap-4">
            <BookmarkmyblogsSkeleton />
            <BookmarkmyblogsSkeleton />
            <BookmarkmyblogsSkeleton />
            <BookmarkmyblogsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${isModalOpen || isEditModalOpen ? "opacity-50 pointer-events-none" : ""}`}
    >
      <Appbar onSearch={handleSearch} />
      <div className="flex flex-wrap">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content.slice(0, 90) + "..."}
              onDelete={openDeleteModal}
              onEdit={openEditModal}
            />
          ))
        ) : (
          <div className="w-full h-screen">
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-8">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="300.000000pt"
                height="300.000000pt"
                viewBox="0 0 300.000000 300.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M330 1500 c0 -1327 2 -1500 15 -1500 18 0 16 -44 17 605 0 338 4 484
12 494 8 11 8 13 0 8 -15 -9 -15 625 1 635 7 5 7 8 -1 8 -8 0 -11 181 -10 625
1 589 0 625 -16 625 -17 0 -18 -78 -18 -1500z"
                  />
                  <path
                    d="M1890 2985 c0 -3 18 -16 39 -30 51 -32 666 -646 686 -685 14 -26 15
-156 15 -1072 0 -1080 3 -1198 26 -1198 12 0 14 184 14 1120 0 977 -2 1125
-15 1157 -16 38 -624 657 -681 693 -28 18 -84 28 -84 15z"
                  />
                  <path
                    d="M416 2927 c-10 -7 -21 -31 -25 -53 -3 -21 -6 -238 -5 -481 1 -323 -2
-441 -10 -436 -7 5 -7 2 1 -8 8 -10 11 -247 12 -909 0 -492 0 -905 1 -917 0
-13 9 -32 20 -43 18 -18 33 -20 154 -20 188 0 176 -20 176 296 0 156 4 244 10
244 6 0 9 -3 9 -7 -1 -5 -1 -140 0 -300 1 -286 1 -293 21 -293 20 0 20 7 20
330 l0 330 -50 0 -50 0 0 -285 0 -285 -140 0 -140 0 0 1410 0 1410 741 0 741
0 34 -34 34 -34 0 -274 0 -273 271 3 270 3 35 -35 34 -34 0 -1071 0 -1071
-140 0 -140 0 0 285 0 285 -50 0 -50 0 0 -285 0 -285 -140 0 -140 0 0 285 0
285 -45 0 -45 0 0 -285 0 -285 -140 0 -140 0 0 285 0 285 -50 0 -50 0 0 -285
0 -285 -140 0 -140 0 0 285 0 285 -45 0 -45 0 0 -330 c0 -287 2 -330 15 -330
11 0 15 13 16 53 1 28 2 61 3 72 1 11 3 65 4 119 3 128 13 119 14 -11 0 -111
14 -159 50 -168 13 -3 79 -4 147 -3 171 4 160 -16 161 301 1 146 5 247 11 247
5 0 9 -103 9 -253 0 -318 -13 -297 176 -297 92 0 136 4 148 13 27 19 36 84 35
252 0 250 1 289 6 283 4 -3 6 -79 6 -169 -1 -90 2 -204 5 -253 9 -126 10 -126
178 -126 188 0 176 -20 176 301 0 159 4 249 10 249 6 0 10 -91 10 -253 0 -319
-13 -297 178 -297 119 0 134 2 152 20 11 11 20 26 20 33 1 6 1 485 2 1063 1
1024 1 1053 -18 1085 -39 66 -53 69 -327 70 -221 0 -248 2 -255 17 -5 9 -9
124 -10 254 -1 263 -5 282 -65 318 -31 19 -56 20 -768 20 -590 0 -739 -3 -753
-13z m713 -2449 c-1 -73 -4 -117 -8 -98 -6 37 -3 230 5 230 2 0 3 -60 3 -132z"
                  />
                  <path
                    d="M2043 2750 c-15 -17 -17 -42 -16 -187 3 -221 -11 -207 209 -210 165
-3 165 -3 190 23 24 23 25 27 11 47 -16 25 -315 323 -338 338 -22 14 -38 11
-56 -11z m272 -249 l115 -111 -185 0 -185 0 0 185 0 185 70 -74 c38 -40 122
-123 185 -185z"
                  />
                  <path
                    d="M560 2530 l0 -50 190 0 190 0 0 50 0 50 -190 0 -190 0 0 -50z m320 1
c0 -12 -241 -13 -260 -1 -10 7 28 10 123 10 75 0 137 -4 137 -9z"
                  />
                  <path
                    d="M560 2345 l0 -45 190 0 190 0 0 45 0 45 -190 0 -190 0 0 -45z m325
-5 c-5 -8 -247 -7 -270 1 -17 5 177 14 227 11 27 -2 46 -8 43 -12z"
                  />
                  <path
                    d="M1395 2146 c-144 -28 -245 -85 -343 -192 -175 -190 -208 -445 -91
-683 100 -202 309 -331 539 -331 322 0 585 248 607 573 6 104 -14 202 -63 305
-49 102 -169 223 -266 270 -127 61 -262 81 -383 58z m215 -39 c8 -2 29 -7 45
-11 116 -29 229 -107 304 -210 71 -98 101 -182 108 -306 15 -275 -139 -494
-409 -581 -97 -31 -241 -27 -345 10 -225 80 -366 267 -379 506 -10 173 41 308
161 431 80 81 201 148 295 162 52 8 187 7 220 -1z"
                  />
                  <path
                    d="M1405 2093 c-107 -24 -237 -91 -291 -151 -81 -90 -144 -207 -157
-292 -2 -10 -5 -22 -8 -24 -2 -3 -1 -49 2 -103 21 -305 255 -528 554 -527 183
1 337 83 446 237 116 165 132 372 43 555 -69 141 -190 244 -339 287 -82 24
-190 32 -250 18z m224 -48 c327 -87 485 -461 318 -754 -45 -81 -136 -165 -221
-206 -344 -165 -739 80 -740 460 0 234 156 438 381 500 65 18 196 18 262 0z"
                  />
                  <path
                    d="M1312 1737 l-33 -34 78 -76 78 -76 -78 -79 -79 -79 32 -31 c17 -18
33 -32 35 -32 1 0 37 35 79 78 l76 77 76 -77 c42 -43 78 -78 79 -78 2 0 18 14
35 32 l32 31 -79 79 -78 79 79 76 78 75 -34 35 -34 34 -77 -79 -77 -80 -77 80
-78 79 -33 -34z m306 -85 c-52 -54 -78 -91 -78 -110 0 -7 25 -39 55 -71 70
-74 72 -102 3 -34 -29 28 -63 56 -75 62 -30 15 -53 3 -120 -62 -67 -65 -69
-39 -3 28 28 28 53 58 56 68 7 22 -23 71 -76 122 -23 22 -37 41 -30 43 6 2 37
-21 70 -52 33 -32 68 -56 80 -56 11 0 49 27 86 61 76 70 100 71 32 1z"
                  />
                  <path d="M890 610 l0 -50 50 0 50 0 0 50 0 50 -50 0 -50 0 0 -50z" />
                  <path d="M890 419 l0 -50 48 3 47 3 3 48 3 47 -50 0 -51 0 0 -51z" />
                  <path d="M890 235 l0 -45 50 0 50 0 0 45 0 45 -50 0 -50 0 0 -45z" />
                </g>
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Blogs Found
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                onClick={()=>{navigate("/publish")}}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create New Blog
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Confirmation Modal */}

      <Modal
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
        isOpen={isModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img src={Trash} className="w-10" alt="" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-black text-gray-800">
                  Confirm Delete
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this item?
                </p>
              </div>
              <div className="flex gap-4 mt-4 flexc items-center justify-center">
                <button
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() =>
                    selectedBlog !== null && handleDelete(selectedBlog)
                  }
                >
                  Delete
                </button>
                <button
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit modal */}
      <Modal
        className=" max-w-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Model"
      >
        <div>
          <div>
            <div className="text-center">
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter title"
                  className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus outline-none"
                />
                <div className="max-h-96 overflow-y-auto">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)} // Update state with HTML content
                  />
                </div>
                <div className="flex gap-4 mt-4 flexc items-center justify-center">
                  <button
                    className="bg-slate-900 hover:bg-slate-700 text-white font-bold  rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() =>
                      selectedBlog !== null && handleEditBlog(selectedBlog)
                    }
                  >
                    Update
                  </button>
                  <button
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const Card: React.FC<MyblogsProps> = ({
  title,
  content,
  id,
  onDelete,
  onEdit,
}) => {
  const authorname = localStorage.getItem("name") ?? "";
  return (
    <div className="blog-card w-96 mx-auto my-8 p-6 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="blog-header text-left">
        <h2 className="blog-title text-xl font-semibold text-gray-800 ">
          {/* Code added to open whole blog when clicked on card  */}
          <Link to={`/blog/${id}`}>{title}</Link>
        </h2>
      </div>
      <div className="blog-content mt-4">
        <div
          className="blog-summary text-gray-700 text-left "
          dangerouslySetInnerHTML={{ __html: content.slice(0, 100) + "..." }}
        />
        <p className="blog-author text-gray-600 font-semibold mt-5">
          Author: {authorname}
        </p>
      </div>
      {/* Delete Icon */}
      <div className="flex justify-end mt-4  gap-3">
        <img
          src={Edit}
          className="w-5 cursor-pointer"
          alt="Edit button"
          onClick={() => onEdit(id)}
        />
        <AiOutlineDelete
          className="cursor-pointer"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
};
