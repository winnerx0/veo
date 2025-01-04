import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }, withCredentials: true
        }
      );
      const ans = res.data;
      if(res.status !== 200){
        console.log(ans)
        return
      }
      if(ans){
        navigate('/home')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { mutate, isPending } = useMutation({ mutationFn: handleLogin })
  return (
    <div className="shadow-sm relative border w-full max-w-[500px] h-[300px] gap-4 rounded-md p-6 flex flex-col items-center justify-center">
      <h3 className="font-semibold text-2xl absolute top-4 left-4">
        Login to Veo
      </h3>
      <div className="w-full flex flex-col gap-4 self-center">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="michael@gmail.com"
              className="border border-zinc-100 w-full h-8 p-2 rounded-md outline-none focus:border focus:border-orange-400"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="password" className="font-semibold tracking-wide">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-zinc-100 w-full h-8 p-2 rounded-md outline-none focus:border focus:border-orange-400"
            placeholder="michael1234"
            value={data.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <p>
        No an account ?{" "}
        <Link to={"/auth/register"} className="text-orange-300">
          Register
        </Link>
      </p>
      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="bg-orange-400 text-white w-36 rounded-md h-8 absolute bottom-4 disabled:opacity-70"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
