"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/signup",
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
    <div className="flex flex-col py-6 px-4 gap-4 border w-[400px]">
      <h1 className="text-3xl font-bold">Register To Veo</h1>
      <div>
        <Label>Username</Label>
        <Input
          placeholder="michael"
          value={data.username}
          onChange={handleChange}
        />
      </div>

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
        Have an account ?{" "}
        <Link className="text-orange-400" href={"/login"}>
          Login
        </Link>
      </p>
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
