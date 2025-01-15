import HomePolls from "@/components/home/HomePolls"
import HomeTopBar from "@/components/home/HomeTopBar"
import { Button } from "@/components/ui/button"

const page = () => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-6xl mx-auto">
     <HomeTopBar/> 
     <HomePolls/>
    </div>
  )
}

export default page
