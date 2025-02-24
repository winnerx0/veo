import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "../../lib";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Register {
  username: string;
  email: string;
  password: string;
}

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [data, setData] = useState<Register>(initialState);
  const [error, setError] = useState<string | string[] | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, data);

    if (res.status !== 200) {
      throw new Error(res.data);
    }
    navigate("/login");
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleRegister,
    mutationKey: ["register"],
    onError(error) {
      if (error instanceof AxiosError) {
        setError(
          typeof error.response?.data === "object"
            ? Object.values(error.response?.data)
            : error.response?.data
        );
      }
    },
  });

  return (
    <section className="min-h-full w-full flex items-center justify-center">
      <div className="w-full min-h-full grow flex items-center justify-center">
        <div className="flex flex-col py-6 px-4 gap-4 w-full max-w-[600px]">
          <h1 className="text-3xl font-bold">Register To Veo</h1>
          <div>
            <Label>Username</Label>
            <Input
              placeholder="michael"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              placeholder="michael@gmail.com"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              placeholder="michael1234"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center">
            {error && Array.isArray(error) ? (
              error.map((e) => (
                <span className="text-destructive text-center">{e}</span>
              ))
            ) : (
              <span className="text-destructive text-center">{error}</span>
            )}
          </div>
          <p>
            Have an account ?{" "}
            <a
              className="text-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </a>
          </p>
          <Button
            disabled={
              isPending ||
              Object.values(data).some((value: string) => value.trim() === "")
            }
            onClick={() => mutate()}
          >
            {isPending ? <span className="loader"></span> : "Register"}
          </Button>
        </div>
      </div>
      <div className="w-full min-h-full items-center justify-center hidden lg:flex">
        <section className="text-center">
          <h1 className="font-bold text-4xl lg:text-6xl">Veo</h1>
          <h2 className="font-bold text-2xl lg:text-3xl">Easy Voting</h2>
        </section>
      </div>
    </section>
  );
};

export default Register;
