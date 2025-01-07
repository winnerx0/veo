import HomeFeature from "@/components/home/HomeFeature";
import HomeTitle from "@/components/home/HomeTitle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen w-full px-2 flex flex-col gap-5 items-center">
    <HomeTitle/>
    <HomeFeature/>
    </div>
  );
};

export default page;
