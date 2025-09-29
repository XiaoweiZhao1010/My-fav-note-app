import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    try {
      const parsed = JSON.parse(savedUser);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  });

  const login = (userObj) => {
    sessionStorage.setItem("currentUser", JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = () => {
    sessionStorage.removeItem("currentUser");
    setUser(null);
  };

  return { user, login, logout };
}
