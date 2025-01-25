"use client";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { formatDistance, formatDistanceToNow, formatRelative } from "date-fns";
import { Button } from "../ui/button";
import { BACKEND_URL } from "@/lib";
import { toast } from "react-toastify";
import { LuSunMoon } from "react-icons/lu";

const PollSection = ({ pollId }: { pollId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["poll"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/polls/${pollId}`, {
        withCredentials: true,
      });

      const ans = res.data;

      return ans as Poll | string;
    },
  });

  const handleVote = async (id: string) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/polls/${pollId}/vote/${id}`,null, {
          withCredentials: true
        }
      );

      const ans = res.data;

      toast(ans)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(JSON.stringify(error.response?.data));
      }
    }
  };
  return (
    <div className="w-full max-w-5xl flex flex-col">
      {isLoading ? (
        <div className="flex h-[calc(100vh-48px)] items-center justify-center">
          <p>Loading</p>
        </div>
      ) : typeof data === "string" ? 
        <div className="flex h-[calc(100vh-48px)] justify-center items-center flex-col">
          <LuSunMoon size={40} className="text-primary"/>
          <h2 className="font-bold text-3xl">{data}</h2>
        </div> :
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
          <div
            className={`gap-2 text-center grid grid-cols-1 sm:grid-cols-3 mt-24`}
          >
            {data?.options &&
              data.options.map((option) => (
                <div key={option.id}>
                  <Button
                    className="w-full h-10"
                    onClick={() => handleVote(option.id)}
                  >
                    Vote {option.name}
                  </Button>
                </div>
              ))}
          </div>
        </>
    }
    </div>
  );
};

export default PollSection;
