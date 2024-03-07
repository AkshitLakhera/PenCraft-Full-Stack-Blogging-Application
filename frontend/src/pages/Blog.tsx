import { useParams } from "react-router-dom"
import { useBlog } from "@/hooks"
import { CompleteBlog } from "@/components/CompleteBlog";
export const Blog = () => {
  //define type<> format of output
  // Here we will be using userparams to extract data from query params
  // Then using that id to pass in our  hook useBlog 
  const { id } = useParams<{ id: string }>()
  const {blog ,loading } = useBlog({ id: id || ""}); // passed id in this way
  if(loading){
    return <div>
      Loading......
    </div>
  }
  if (blog === undefined) {
    return <div>Loading...</div>;
}

return <CompleteBlog blog={blog}/>;

}
