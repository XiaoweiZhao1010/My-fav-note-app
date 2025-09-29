import { useState } from "react";
import axios from "../utils/axios";

export default function AuthForm({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const setError = (name, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
    return;
  };
  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isSignUp ? "/auth/register" : "/auth/login";
      const response = await axios.post(endpoint, {
        email,
        password,
      });
      const token = response.data.token; // Get the JWT token from the response
      // Store the token in sessionStorage
      sessionStorage.setItem("jwtToken", token);
      console.log("Logged in successfully");
      const user = { email }; // Assuming the user data is returned in the response
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      onLogin(user);
    } catch (error) {
      console.error("Error during authentication", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError("email", error.response.data.message);
      } else {
        setError("email", "An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgb(241, 236, 236)",
      }}
    >
      <form
        onSubmit={handleAuth}
        style={{
          padding: "30px",
          maxWidth: "350px",
          width: "100%",
          height: "360px",
          backgroundColor: "rgb(241, 236, 236)",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            color: "#333",
          }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <input
          autoFocus
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s ease",
          }}
        />
        {errors.email && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            {errors.email}
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s ease",
          }}
        />
        {errors.password && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            {errors.password}
          </p>
        )}
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            textAlign: "center",
            marginTop: "15px",
            cursor: "pointer",
            color: "#0066cc",
            fontSize: "14px",
          }}
        >
          {isSignUp ? "Already have an account? Sign In" : "New user? Sign Up"}
        </p>
      </form>
    </div>
  );
}
