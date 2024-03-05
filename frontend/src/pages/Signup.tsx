import Auth from "@/components/Auth"
import { Quote } from "../components/Quote"


export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="img "><Auth type="signup"/></div>
        {/* Making it invisible in small screen size */}
        <div className="hidden lg:block"><Quote/></div>
    </div>
  )
}
