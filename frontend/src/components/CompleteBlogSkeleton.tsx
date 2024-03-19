import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Appbar } from './Appbar'
export const CompleteBlogSkeleton = () => {
  return (
    <div>
    <Appbar onSearch={() => {}} />
    <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                   <Skeleton  width={400}/>
                </div>
                <div className="text-slate-500 pt-2">
                <Skeleton width={60}/>
                </div>
                <div className="pt-4">
                   <Skeleton count={10} width={700}/>
                </div>
            </div>
            <div className="col-span-4">
                <div className="text-slate-600 text-lg">
                    <Skeleton/>
                </div>
                <div className="flex w-full">
                    <div className="pr-4 flex flex-col justify-center">
                    <Skeleton circle width={50} height={32}/>
                    </div>
                    <div>
                        <div className="text-xl font-bold">
                        <Skeleton width={45}/>
                        </div>
                        <div className="pt-2 text-slate-500">
                        <Skeleton width={90}/>
                        </div>
                    </div>
                </div>  
            </div>
            
        </div>
    </div>
</div>
  )
}
