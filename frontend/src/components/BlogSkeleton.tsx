import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import { Avatar, Circle } from './BlogCard'

export const BlogSkeleton = () => {
  return (
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
    <div className="flex">
        <Skeleton circle width={32} height={32}/>
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col"><Skeleton width={45}/></div>
        <div className="flex justify-center flex-col pl-2 ">
            <Skeleton width={70} />
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            <Skeleton/>
        </div>
    </div>
    <div className="text-xl font-semibold pt-2">
    <Skeleton/>
    </div>
    <div className="text-md font-thin">
     <Skeleton/>
    </div>
    <div className="text-slate-500 text-sm font-thin pt-4">
    <Skeleton/>
    </div>
</div>
  )
}
