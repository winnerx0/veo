import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { features } from "../../../lib";

const HeroFeature = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-col gap-8 w-full max-w-5xl"
    >
      <h3 className="text-3xl font-bold text-center">Features</h3>
      <section className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2">
        {features.map((feature, index) => (
          <Card className="w-full h-16 flex items-center" key={index}>
            <CardHeader>
              <CardTitle className="text-[clamp(15px,2vw,1.5rem)] flex items-center">
                {index + 1}. {feature.title}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>
    </motion.div>
  );
};

export default HeroFeature;
