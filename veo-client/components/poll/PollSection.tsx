"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDistance } from "date-fns";

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
  //   const [ending, setEnding] = useState<Date>(data?.ending!);

  //   useEffect(() => {
  //     if (!data) {
  //       return;
  //     }
  //     const interval = setInterval(() => {}, 1000);
  //     return () => clearInterval(interval);
  //   }, []);

  const formatRelativeLocale = {
    lastWeek: "'letzten' dddd 'um' LT",
    yesterday: "'gestern um' LT",
    today: "'heute um' LT",
    tomorrow: "'morgen um' LT",
    nextWeek: "dddd 'um' LT",
    other: "L LT", // Difference: Add time to the date
  };

  return (
    <div>
      {isLoading && !data ? (
        <p>Loading</p>
      ) : (
        <div>
          <div className="flex gap-2 justify-between items-center">
            <h2 className="font-bold text-3xl mt-4 ">{data?.title}</h2>
            <p>
              Ends In{" "}
              <span>
                {data && formatDistance(new Date(data.ending), new Date())}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollSection;
