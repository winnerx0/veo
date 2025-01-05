import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen w-full px-2 flex flex-col gap-5 items-center">
      <div className="self-center mt-36 flex flex-col gap-4 items-center">
        <h3 className="font-bold text-orange-400 text-center">THE PROPER WAY TO VOTE</h3>
        <h5 className="font-medium">Making polls made easy</h5>
        <Link href={'/register'} className={buttonVariants({className: "shadow-md"})}>
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

export default page;
