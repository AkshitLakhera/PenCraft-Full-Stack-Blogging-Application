import Auth from "@/components/Auth"
import { Quote } from "../components/Quote"


export const Signin = () => {
  return (
    <div className="grid grid-cols-2">
        <div className="img "><Auth/></div>
        {/* Making it invisible in small screen size */}
        <div className="invisible lg:visible"><Quote/></div>
    </div>
  )
}
