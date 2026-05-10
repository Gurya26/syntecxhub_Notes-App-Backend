import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const signupUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success("Signup Successful 🚀");

      navigate("/");

    } catch (error) {
      toast.error("Signup Failed ❌");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[500px]">

        <h1 className="text-5xl font-bold text-green-400 mb-10 text-center">
          Signup 🚀
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-4 rounded-lg bg-black border text-white mb-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={signupUser}
          className="w-full bg-green-500 p-4 rounded-lg text-2xl font-bold"
        >
          Signup
        </button>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-green-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;