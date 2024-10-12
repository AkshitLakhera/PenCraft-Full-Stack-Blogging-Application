import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { BACKEND_URL } from "../config";

export interface Blog {
  publishedDate: Date;
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlog(response.data.blog);
      } catch (err: any) { 
        if (err.response?.status === 401) {
          alert("Unauthorized access. Please log in."); // Show alert for unauthorized access
          navigate("/signin");
        } else {
          setError("Failed to fetch the blog. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]); 

  return {
    loading,
    blog,
    error,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlogs(response.data.blogs);
      } catch (err: any) { 
        if (err.response?.status === 401) {
          alert("Unauthorized access. Please log in."); // Show alert for unauthorized access
          navigate("/signin");
        } else {
          setError("Failed to fetch blogs. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]); 

  return {
    loading,
    blogs,
    error,
  };
};