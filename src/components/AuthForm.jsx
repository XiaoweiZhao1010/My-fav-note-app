import { useState } from "react";
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
  const handleAuth = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!email) {
      setError("email", "Email is required");
      return;
    }
    if (!password) {
      setError("password", "Password is required");
      return;
    }

    if (isSignUp) {
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        setError("email", "User already exists");
        return;
      }
      if (password?.length < 6) {
        setError("password", "Password must be at least 6 characters long");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("email", "Please enter a valid email address");
        return;
      }
      if (password === email) {
        setError("password", "Password cannot be the same as email");
        return;
      }
      if (password.includes(" ")) {
        setError("password", "Password cannot contain spaces");
        return;
      }

      const newUser = { email, password, uid: Date.now().toString() };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      onLogin(newUser);
    } else {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        setError("email", "Invalid credentials");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin(user);
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
