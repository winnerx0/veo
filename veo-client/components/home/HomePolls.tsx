"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuGhost } from "react-icons/lu";

const HomePolls = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["polls"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/api/v1/poll/", {
        withCredentials: true,
      });
      const ans = res.data;
      return ans as any[];
    },
  });
  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        "Loading"
      ) : data && data.length !== 0 ? 
       (
        data.map((poll, index) => (
          <Card key={poll.id}>
        <CardHeader>
          <CardTitle>{poll.title}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>{poll.ending}</p>
        </CardFooter>
      </Card>
        ))
       )
       : (
        <div className="h-[400px] w-full flex items-center justify-center">
          {error ? (
            <span>{error.message}</span>
          ) : (
            <div className="flex items-center justify-center flex-col gap-4">
              <LuGhost size={30} />
              <span className="font-semibold text-2xl text-center">
                No Polls Created
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePolls;
