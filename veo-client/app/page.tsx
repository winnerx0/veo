import HeroFeature from "@/components/hero/HeroFeature";
import HeroTitle from "@/components/hero/HeroTitle";

const page = () => {
  return (
    <div className="min-h-screen w-full px-2 flex flex-col gap-5 items-center justify-center">
    <HeroTitle/>
    <HeroFeature/>
    </div>
  );
};

export default page;
