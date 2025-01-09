"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const router = useRouter();

  const handleRegister = async () => {
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/signup",
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const ans = res.data;

    console.log(ans);
    router.push('/login')
  };
  const { mutate, isPending } = useMutation({ 
    mutationFn: handleRegister,
    mutationKey: ["register"],
    onError(error) {
      if(error instanceof AxiosError){
          setError(error.response?.data)

        }
    },
  })
  console.log(error);
  return (
    <div className="flex flex-col py-6 px-4 gap-4 border w-[400px] rounded-2xl">
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
      <span className="text-destructive text-center">{error}</span>
      <p>
        Have an account ?{" "}
        <Link className="text-primary" href={"/login"}>
          Login
        </Link>
      </p>
      <Button disabled={isPending || Object.values(data).some((value: string) => value.trim() === "")} onClick={() => mutate()}>
        
      {
        isPending ? <span className="loader"></span> : "Register"
      } 
        </Button>
  </div>
  );
};

export default Register;
