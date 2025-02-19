import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { formatDistance, isAfter } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { Poll as PollType } from "lib/types";
import { Menu } from "lucide-react";
import { Suspense, useState } from "react";
import { LuSunMoon } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../lib";

const Poll = () => {
  const navigate = useNavigate();
  const { pollId } = useParams();
  const [option, setOption] = useState<string>("");

  const { sub } = jwtDecode(localStorage.getItem("token") as string);

  const { data, isLoading } = useQuery({
    queryKey: ["poll"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/polls/${pollId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const ans = res.data as PollType;

      const [year, month, day, hour, minute] = ans.ending;
      const endingDate = new Date(year, month - 1, day, hour, minute);

      return { ...ans, ending: endingDate };
    },
  });

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/v1/polls/delete/${pollId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error(res.data);
      }

      const ans = res.data;

      toast(ans);
      navigate("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data);
      }
    }
  };

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

      if (res.status !== 200) {
        throw new Error(res.data);
      }

      const ans = res.data;

      toast(ans);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data);
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["vote"],
    mutationFn: handleVote,
  });

  return (
    <Suspense fallback={<Loading />}>
      <section className="relative w-full flex justify-center items-center">
        <div className="w-full max-w-5xl flex flex-col">
          {isLoading ? (
            <Loading />
          ) : !data ? (
            <div className="flex w-full justify-center items-center flex-col">
              <LuSunMoon size={40} className="text-primary" />
              <h2 className="font-bold text-3xl">No data found</h2>
            </div>
          ) : isAfter(new Date(data.ending), new Date()) ? (
            <section className=" flex flex-col gap-6">
              <div className="absolute top-0 flex gap-2 justify-between items-center w-full max-w-5xl">
                <h2 className="font-bold text-xl md:text-3xl">{data.title}</h2>
                <div className="flex gap-4 items-center">
                  <p className="text-sm sm:text-md md:text-xl">
                    Ends In{" "}
                    <span>
                      {formatDistance(new Date(data.ending), new Date())}
                    </span>
                  </p>
                  {sub === data.user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none">
                        <Menu />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => navigate(`/polls/edit/${pollId}`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => navigate(`/polls/admin/${pollId}`)}
                        >
                          Admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete()}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              <RadioGroup onValueChange={(e) => setOption(e)} className="mt-24">
                {data.options.map((option) => (
                  <Button
                    className="w-full h-10"
                    variant={"outline"}
                    key={option.id}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.name}
                    ></RadioGroupItem>
                    <Label htmlFor={option.name} className="w-full">
                      Vote {option.name}
                    </Label>
                  </Button>
                ))}
              </RadioGroup>
              <Button onClick={() => mutate(option)} disabled={isPending}>
                Vote
              </Button>
            </section>
          ) : (
            <div className="flex h-[calc(100dvh-200px)] justify-center items-center flex-col">
              <div className="w-full relative">
                {sub === data.user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none absolute right-0 top-0">
                      <Menu />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => navigate(`/polls/edit/${pollId}`)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/polls/admin/${pollId}`)}
                      >
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete()}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <LuSunMoon size={40} className="text-primary" />
              <h2 className="font-bold text-3xl">Poll Ended</h2>

              <div className="mt-24 space-y-2">
                {data.options.map((option) => (
                  <Button
                    className="w-[400px] h-10 flex gap-2"
                    variant={"outline"}
                    disabled
                    key={option.id}
                  >
                    <Label className="">{option.name}</Label>
                    <div className="flex w-full gap-2 items-center justify-end">
                      <h6>
                        {option.votes.length}{" "}
                        {option.votes.length === 1 ? "Vote" : "Votes"}
                      </h6>
                      <Progress
                        value={
                          option.votes.length > 0
                            ? (option.votes.length /
                                data.options
                                  .map((option) => option.votes)
                                  .map((vote) => vote.length)
                                  .reduce((acc, curr) => acc + curr, 0)) *
                              100
                            : 0
                        }
                        className="w-[60%]"
                      />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Suspense>
  );
};

export default Poll;
