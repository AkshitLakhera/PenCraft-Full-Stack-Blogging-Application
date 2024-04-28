import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const BookmarkmyblogsSkeleton = () => {
    return (
        <div className="blog-card w-96 mx-auto my-8 p-6 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out">
          <div className="blog-header text-left">
            <h2 className="blog-title text-xl font-semibold text-gray-800">
              <Skeleton width={200} />
            </h2>
          </div>
          <div className="blog-content mt-4">
            <p className="blog-summary text-gray-700">
              <Skeleton count={3} />
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <Skeleton width={40} height={40} circle={true} />
          </div>
        </div>
      );}

