import HeroFeature from "@/components/hero/HeroFeature";
import HeroTitle from "@/components/hero/HeroTitle";

const Onboarding = () => {
  return (
    <div className="min-h-screen w-full px-2 flex flex-col gap-5 items-center justify-center">
      <HeroTitle />
      <HeroFeature />
      <div className="flex justify-center">
        <p className="fixed bottom-4 self-center">Built by Winner </p>
      </div>
    </div>
  );
};

export default Onboarding;
