import Login from "@/components/Login";
import { cookies } from "next/headers";

const page = async () => {


  
  return (
    <section className="min-h-screen flex items-center justify-center">
      <h4>{(await cookies()).get("jwt")?.value}</h4>
      <Login />
    </section>
  );
};

export default page;
