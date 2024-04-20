import React, {  useState } from 'react';
import { Appbar } from '@/components/Appbar';
import { BlogCard } from '@/components/BlogCard';
import { BlogSkeleton } from '@/components/BlogSkeleton';
import { useBlogs } from '@/hooks/index';
// import { useRecoilState } from 'recoil';
// import { authorNameState } from '@/atom/atom';
export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  // const [authorName, setAuthorName] = useRecoilState<string>(authorNameState);
  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };
   // Update author's name when new blogs are loaded
  // useEffect(() => {
  //   if (blogs.length > 0) {
  //     console.log('Blogs:', blogs[16]); // Log the blogs array
  //     setAuthorName(blogs[16].author ? blogs[16].author.name : 'Anonymous');
  //   }
  // }, [blogs, setAuthorName]);
  const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString(undefined, options);
  };
  

  if (loading) {
    return (
      <div>
         <Appbar onSearch={handleSearch} />
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
     <Appbar onSearch={handleSearch} />
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author ? blog.author.name || 'Anonymous' : 'Anonymous'}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate ? formatDate(blog.publishedDate.toLocaleString()) : "2 March 2024"}
                
              />
            ))
          ) : (
            <div>No blogs found</div>
          )}
        </div>
      </div>
    </div>
  );
};
