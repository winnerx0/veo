import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../../lib/index";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Vote } from "lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Admin = () => {
  const { pollId } = useParams();

  const navigate = useNavigate()

    const { sub } = jwtDecode(localStorage.getItem("token") as string);
  

      const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
          const res = await axios.get(`${BACKEND_URL}/api/v1/users/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
    
          const ans = res.data as User;
    
          return ans
        },
      });

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["votes"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/polls/votes/${pollId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status !== 200) {
          throw new Error(res.data);
        }
        const ans = res.data;
        return ans as Vote[];
      } catch (error) {
        if (error instanceof AxiosError) {
          toast(error.message);
        }
        return;
      }
    },
  });

  useEffect(() => {
    if (!isRefetching) {
      setTimeout(() => refetch(), 3000);
    }
  }, [isRefetching, refetch]);
  if (isLoading) return <Loading />;

  const votes = data?.reduce<Record<string, number>>((acc, item) => {
    const optionName = item.option.name;

    if (!acc[optionName]) {
      acc[optionName] = 0;
    }

    acc[optionName]++;
    return acc;
  }, {});

  if(user?.username !== sub){
    navigate(-1)
  }
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full grid place-items-center max-w-5xl">
        <h1 className="text-[clamp(30px,5vw,5rem)]">Live Votes View</h1>

        {data && votes ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
            {Object.entries(votes).map(([key, value]) => (
              <Card key={key} className="w-full">
                <CardHeader>
                  <CardTitle className="text-[clamp(20px,2.5vw,2rem)]">
                    {key}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[clamp(15px,2vw,1rem)]">
                  <h1> Vote Count: {value}</h1>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
