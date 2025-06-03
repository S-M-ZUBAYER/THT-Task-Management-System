import { useUserStore } from "@/Zustand/useUserStore";
import { useEffect } from "react";

export const useUserData = () => {
  const { admin, setAdmin, user, setUser } = useUserStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.role === "Admin") {
        setAdmin(true);
      }
    }
  }, [setUser, setAdmin]);

  return {
    admin,
    user,
  };
};
