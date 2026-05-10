import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const signupUser = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://syntecxhub-notes-app-backend.onrender.com/api/users/register",
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
        onSubmit={signupUser}
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
            color: "#00ff88",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "50px",
          }}
        >
          Signup 🚀
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
          Signup
        </button>

        <p
          style={{
            color: "white",
            marginTop: "20px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#00ff88",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Signup;