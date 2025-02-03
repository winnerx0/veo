import { Suspense } from "react";
import HomePolls from "../components/home/HomePolls";
import HomeTopBar from "../components/home/HomeTopBar";
import Loading from "@/components/Loading";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-2 w-full max-w-6xl mx-auto">
        <HomeTopBar />
        <HomePolls />
      </div>
    </Suspense>
  );
};

export default Home;
