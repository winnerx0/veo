import Create from "@/components/create-poll/Create";
import React from "react";

const page = () => {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 space-y-4">
      <h1 className="text-3xl font-bold"> Create Poll</h1>
      <Create />
    </div>
  );
};

export default page;
