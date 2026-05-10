import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://syntecxhub-notes-app-backend.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success("Login Successful 🚀");

      navigate("/dashboard");

    } catch (error) {

      toast.error("Login Failed ❌");

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={loginUser}
        style={{
          background: "#07153a",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "50px",
          }}
        >
          Login 🚀
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            background: "black",
            color: "white",
            fontSize: "18px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            background: "black",
            color: "white",
            fontSize: "18px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "10px",
            background: "#00cc44",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            color: "white",
            marginTop: "20px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#00ff88",
              textDecoration: "none",
            }}
          >
            Signup
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;;