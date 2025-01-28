import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { formatDistance, isAfter } from "date-fns";
import { Poll as PollType } from "lib/types";
import { LuSunMoon } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../lib";

const Poll = () => {
  const { pollId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["poll"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/polls/${pollId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
 

      return  res.data as PollType
    },
  });

  const handleVote = async (id: string) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/polls/${pollId}/vote/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const ans = res.data;

      toast(ans);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(JSON.stringify(error.response?.data));
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["vote"],
    mutationFn: handleVote
  })

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col">
        {isLoading ? (
          <div className="flex h-[calc(100vh-48px)] items-center justify-center">
            <p>Loading</p>
          </div>
        ) : !data ? (
          <div className="flex h-[calc(100vh-48px)] justify-center items-center flex-col">
            <LuSunMoon size={40} className="text-primary" />
            <h2 className="font-bold text-3xl">No data found</h2>
          </div>
        ) :  isAfter(new Date(data.ending), new Date())? (
          <>
            <div className="flex gap-2 justify-between items-center mt-4">
              <h2 className="font-bold text-3xl ">{data.title}</h2>
              <p>
                Ends In{" "}
                <span>{formatDistance(new Date(data.ending), new Date())}</span>
              </p>
            </div>
            <div className={`gap-2 text-center grid mt-24`}>
              {data.options.map((option) => (
                <div key={option.id}>
                  <Button
                    className="w-full h-10"
                    onClick={() => mutate(option.id)}
                    disabled={isPending}
                  >
                    Vote {option.name}
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-[calc(100vh-48px)] justify-center items-center flex-col">
            <LuSunMoon size={40} className="text-primary" />
            <h2 className="font-bold text-3xl">Poll Ended</h2>

            <div>
              {
                data.options.map((option) => (
                  <section>
                    <h4>{option.name}</h4>
                    <h5>{option.votes}</h5>
                  </section>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Poll;
