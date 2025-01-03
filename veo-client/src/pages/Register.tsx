import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

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
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const ans = res.data;
    console.log(ans);
  } catch (error) {
   console.log(error) 
  }
};
  return (
    <div className="shadow-sm relative border w-full max-w-[500px] h-[450px] gap-4 rounded-md p-6 flex flex-col items-center justify-center">
      <h3 className="font-semibold text-2xl absolute top-4 left-4">
        Register to Veo
      </h3>
      <div className="w-full flex flex-col gap-4 self-center">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold tracking-wide">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="michael"
              className="border border-zinc-100 w-full h-8 p-2 rounded-md outline-none focus:border focus:border-orange-400"
            value={data.username}
            onChange={handleChange}
          />
        </div>
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
        Have an account ?{" "}
        <Link to={"/auth/login"} className="text-orange-300">
          Login
        </Link>
      </p>
      <button
        className="bg-orange-400 text-white w-36 rounded-md h-8 absolute bottom-4"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
