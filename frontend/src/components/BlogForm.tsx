import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({ existingBlog }) => {
  const [title, setTitle] = useState(existingBlog ? existingBlog.title : '');
  const [content, setContent] = useState(existingBlog ? existingBlog.content : '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = existingBlog
        ? await axios.put('/api/v1/blog', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${your_jwt_token}`,
            },
          })
        : await axios.post('/api/v1/blog', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${your_jwt_token}`,
            },
          });

      console.log(response.data);
      // Redirect or reset form as needed
    } catch (error) {
      console.error('Error creating/updating blog:', error);
      setError('Error creating/updating blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-5">{existingBlog ? 'Update Blog' : 'Create Blog'}</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            placeholder="Enter blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Image Preview"
              className="h-32 w-full object-cover rounded border border-gray-300"
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 mt-4 text-white font-semibold rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={loading}
        >
          {loading ? 'Saving...' : existingBlog ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
