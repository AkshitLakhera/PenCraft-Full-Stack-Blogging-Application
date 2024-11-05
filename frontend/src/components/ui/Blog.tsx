import { FC, useState, useCallback } from 'react';
import { Clock, MessageCircle, ChevronRight, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface BlogProps {
  imgSrc: string;
  heading: string;
  description: string;
  time: string;
  comments: number;
  tag: string;
  featured?: boolean;
}

const Blog: FC<BlogProps> = ({
  imgSrc,
  heading,
  description,
  time,
  comments,
  tag,
  featured = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const DESCRIPTION_LENGTH = 150; // Character limit for description preview
  
  const shouldShowReadMore = description.length > DESCRIPTION_LENGTH;
  
  const truncatedDescription = useCallback(() => {
    if (!shouldShowReadMore || isExpanded) return description;
    return `${description.slice(0, DESCRIPTION_LENGTH)}...`;
  }, [description, isExpanded, shouldShowReadMore]);

  return (
    <div className={`h-full transform transition-all duration-300 hover:scale-102 hover:-translate-y-1 ${
      featured ? 'md:col-span-2 md:row-span-2' : ''
    }`}>
      <div className={`rounded-xl overflow-hidden shadow-2xl flex flex-col bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-[#11A2E9]/50 transition-all duration-300 ${
        featured ? 'h-full' : 'h-[32rem]'
      }`}>
        <div className="relative group">
          <a href="#" className="block overflow-hidden">
            <img
              className={`w-full ${featured ? 'h-96' : 'h-64'} object-cover transform transition-transform duration-700 group-hover:scale-110`}
              src={imgSrc}
              alt={heading}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="px-3 py-1 text-xs font-medium bg-[#11A2E9] text-white rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-[#11A2E9]">
              {tag}
            </span>
            {featured && (
              <span className="px-3 py-1 text-xs font-medium bg-amber-500 text-white rounded-full shadow-lg flex items-center gap-1">
                <TrendingUp size={12} />
                Featured
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6 flex-grow">
          <a href="#" className="group inline-block mb-3">
            <h2 className={`${featured ? 'text-2xl' : 'text-lg'} font-bold text-white group-hover:text-[#11A2E9] transition-colors duration-300`}>
              {heading}
            </h2>
          </a>
          
          <div className="relative">
            <p className="text-gray-400 text-sm leading-relaxed">
              {truncatedDescription()}
            </p>
            
            {shouldShowReadMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-[#11A2E9] text-sm flex items-center gap-1 hover:text-white transition-colors duration-300"
              >
                {isExpanded ? (
                  <>
                    Show Less
                    <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="px-6 py-4 mt-auto flex items-center justify-between bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/30">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Clock size={14} className="text-[#11A2E9]" />
              <span>{time} mins ago</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <MessageCircle size={14} className="text-[#11A2E9]" />
              <span>{comments} Comments</span>
            </span>
          </div>
          <button className="text-[#11A2E9] hover:text-white transition-colors duration-300 p-1.5 rounded-full hover:bg-[#11A2E9]/20">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;