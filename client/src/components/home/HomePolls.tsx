import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "../../../lib";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { LuGhost } from "react-icons/lu";
import { Poll } from "../../../lib/types/index";
import axios from "axios";


const HomePolls = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["polls"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/polls/`, {
       headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
       },
      });
      const ans = res.data;
      return ans as Poll[];
    },
  });
  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <span className="flex items-center justify-center">Loading</span>
      ) : data && data.length !== 0 ? (
        data.map((poll) => (
          <a href={`/polls/${poll.id}`} key={poll.id}>
            <Card>
              <CardHeader>
                <CardTitle>{poll.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <p>{formatDate(new Date(poll.ending), "LLL E yyyy")}</p>
              </CardFooter>
            </Card>
          </a>
        ))
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
