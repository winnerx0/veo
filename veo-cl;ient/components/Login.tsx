"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { ChangeEvent, useState } from "react";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      const ans = res.data;
      console.log(ans);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col py-6 px-4 gap-4 border w-[400px] rounded-2xl">
      <h1 className="text-3xl font-bold">Login To Veo</h1>

      <div>
        <Label>Email</Label>
        <Input
          placeholder="michael@gmail.com"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          placeholder="michael1234"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <p>
        Don&apos;t have an account ?{" "}
        <Link className="text-orange-400" href={"/register"}>
          Register
        </Link>
      </p>
      <Button onClick={handleRegister}>Login</Button>
    </div>
  );
};

export default Login;
