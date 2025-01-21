"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDistance, formatDistanceToNow, formatRelative } from "date-fns";
import { Button } from "../ui/button";

const PollSection = ({ pollId }: { pollId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["poll"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8080/api/v1/polls/${pollId}`,
        {
          withCredentials: true,
        }
      );

      const poll = res.data;

      return poll as Poll;
    },
  });

  return (
    <div className="w-full min-h-screen max-w-5xl flex flex-col">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        data ? (
          <>
          <div className="flex gap-2 justify-between items-center">
            <h2 className="font-bold text-3xl mt-4 ">{data?.title}</h2>
            <p>
              Ends In{" "}
              <span>
                {data && formatDistance(new Date(data.ending), new Date())}
              </span>
            </p>
          </div>
          <div className={`gap-2 text-center grid grid-cols-1 sm:grid-cols-3  items-center justify-between`}>
            {
              data.options && data.options.map(option => (
                <div key={option.id}>
              <h2>{ option.name }</h2>
              <Button className="w-full">Vote</Button>
            </div>
              ))
            }
      
          </div>
        </>
        ) : ""
      )}
    </div>
  );
};

export default PollSection;
