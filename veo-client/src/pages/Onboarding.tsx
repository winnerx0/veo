import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <div className="h-full w-full px-2 flex flex-col gap-5 items-center">
      <div className="self-center mt-36 flex flex-col gap-4 items-center">
        <h3 className="font-bold text-orange-400">THE PROPER WAY TO VOTE</h3>
        <h5 className="font-medium">Making polls made easy</h5>
        <Link to={'/auth/register'} className="font-semibold bg-orange-400 max-w-36 w-full h-8 rounded-full text-white grid place-items-center shadow-md">
          Get Started
        </Link>
      </div>
      <section>
        <div className="flex flex-col gap-2">
          <h5 className="font-bold underline">How To Use</h5>
        </div>
      </section>
    </div>
  );
};

export default Onboarding;
