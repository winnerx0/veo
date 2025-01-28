
import { RainbowButton } from "@/components/ui/rainbow-button";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const HeroTitle = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="self-center flex flex-col gap-4 items-center">
        <h3 className="font-bold text-center max-w-5xl">
          VOTING MADE <span className="text-primary">EASIER</span> AND{" "}
          <span className="text-primary">FASTER</span>{" "}
        </h3>
        <h5 className="font-medium">Making polls made easy</h5>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <RainbowButton
            className="bg-primary"
            onClick={() => navigate("/register")}
          >
            Get Started
          </RainbowButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroTitle;
