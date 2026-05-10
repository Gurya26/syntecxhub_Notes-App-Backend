import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success("Login Successful 😎");

      navigate("/dashboard");

    } catch (error) {
      toast.error("Login Failed ❌");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[500px]">

        <h1 className="text-5xl font-bold text-white mb-10 text-center">
          Login 🚀
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-4 rounded-lg bg-black border text-white mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-4 rounded-lg bg-black border text-white mb-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          className="w-full bg-green-500 p-4 rounded-lg text-2xl font-bold"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-6">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-green-400"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;