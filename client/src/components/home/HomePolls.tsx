import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { LuGhost } from "react-icons/lu";
import { BACKEND_URL } from "../../../lib";
import { Poll } from "../../../lib/types/index";

const HomePolls = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["polls"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/polls/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const ans = res.data;
        return ans as Poll[];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });

  return (
    <div className="flex flex-col gap-2 mt-8">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center">
          <span className="text-center">Loading</span>
        </div>
      ) : data && data.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {data.map((poll) => {
            const [year, month, day, hour, minute] = poll.ending;
            const endingDate = new Date(year, month - 1, day, hour, minute);
            return (
              <a href={`/polls/${poll.id}`} key={poll.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{poll.title}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    {<p>{format(endingDate, "MMM d yyyy, h:mm a")}</p>}
                  </CardFooter>
                </Card>
              </a>
            );
          })}
        </div>
      ) : (
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
