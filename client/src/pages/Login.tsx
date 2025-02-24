import { Label } from "../components/ui/label";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../../lib";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Login {
  email: string;
  password: string;
}

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState<Login>(initialState);
  const [error, setError] = useState<string | string[] | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleLogin = async () => {
    const res = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const { token } = res.data;
    localStorage.setItem("token", token);
    toast("Login Successful");

    navigate("/home");
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin,
    mutationKey: ["login"],
    onError(error) {
      if (error instanceof AxiosError) {
        setError(typeof error.response?.data === "object" ? Object.values(error.response?.data) : error.response?.data);
      }
    },
  });
  return (
    <section className="min-h-full w-full flex items-center justify-center">
     <div className="w-full min-h-full grow flex items-center justify-center">
     <div className="flex flex-col py-6 px-4 gap-4 w-full max-w-[600px]">
        <h1 className="text-3xl font-bold">Login To Veo</h1>

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
          Don&apos;t have an account ?{" "}
          <a
            className="text-primary cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </a>
        </p>
        <Button
          disabled={
            isPending ||
            Object.values(data).some((value: string) => value.trim() === "")
          }
          onClick={() => mutate()}
        >
          {isPending ? <span className="loader"></span> : "Login"}
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

export default Login;
