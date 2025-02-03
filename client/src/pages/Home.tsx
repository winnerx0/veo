import { Suspense } from "react";
import HomePolls from "../components/home/HomePolls";
import HomeTopBar from "../components/home/HomeTopBar";

const Home = () => {
  return (
    <Suspense >
      <div className="flex flex-col gap-2 w-full max-w-6xl mx-auto h-full">
    
        <HomeTopBar />
        <HomePolls />
      </div>
    </Suspense>
  );
};

export default Home;
