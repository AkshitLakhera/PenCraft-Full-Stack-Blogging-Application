
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import Image from '../public/file.png'
const NotFound = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full">
          {/* Main Grid Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Search size={16} className="text-blue-500" />
                <span className="text-sm text-blue-500">Page Not Found</span>
              </div>

              {/* Main Error Message */}
              <div className="space-y-4">
                <h1 className="text-6xl font-serif text-white">
                  404
                </h1>
                <h2 className="text-3xl font-serif text-white">
                  This chapter seems to be missing
                </h2>
              </div>

              {/* Literary-themed Message */}
              <div className="space-y-6">
                <p className="text-lg text-gray-400 leading-relaxed">
                  Like an unwritten page in a story, this destination remains blank. 
                  Perhaps the author is still crafting this section, or maybe it's 
                  been lost to the depths of digital archives.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/">
                    <button className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                      <BookOpen size={20} />
                      Return to Homepage
                      <ChevronRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side Editorial Design */}
            <div className="relative hidden md:block">
              <img src={Image} alt='test' height={400} width={400} />
            </div>
          </div>

          {/* Footer Quote */}
          <div className="mt-12 pt-8 border-t border-blue-500/20">
            <blockquote className="text-gray-500 text-sm font-serif italic">
              "Every story has its missing pages, every writer their unwritten words."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;