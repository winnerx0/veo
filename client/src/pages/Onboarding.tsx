import HeroFeature from "@/components/hero/HeroFeature";
import HeroTitle from "@/components/hero/HeroTitle";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
const Onboarding = () => {
  return (
    <main className="flex flex-col w-full items-center justify-center">
      <div className="w-full shrink min-h-screen max-w-5xl px-2 flex flex-col gap-5 items-center justify-center self-center">
        <HeroTitle />
        <HeroFeature />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8 justify-between w-full mt-24"
        >
          <div className="w-full rounded-md px-2 space-y-2">
            <h2 className="font-bold text-4xl md:w-[500px] ">
              Share your polls and watch the votes grow
            </h2>
            <h4 className="w-full text-zinc-500">
              Create polls and share it around with ease. 100% free to use.{" "}
            </h4>
          </div>
          <div className="grid h-10 grid-cols-1 md:grid-cols-3 gap-2 w-full">
            <Card className="bg-primary text-white hover:shadow-2xl hover:bg-primary/90">
              <CardContent className="flex items-center justify-center px-12 py-8">
                <h2 className="font-semibold text-md text-nowrap  text-center">
                  {" "}
                  Unlimited Use
                </h2>
              </CardContent>
            </Card>
            <Card className="text-foreground hover:shadow-2xl hover:bg-background/90 ">
              <CardContent className="flex items-center justify-center px-12 py-8">
                <h2 className="font-semibold text-sm text-nowrap text-center">
                  {" "}
                  Real-Time View
                </h2>
              </CardContent>
            </Card>
            <Card className="bg-primary text-white hover:shadow-2xl hover:bg-primary/90">
              <CardContent className="flex items-center justify-center px-12 py-8">
                <h2 className="font-semibold text-md text-nowrap  text-center">
                  {" "}
                  One Time Voting
                </h2>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Onboarding;
