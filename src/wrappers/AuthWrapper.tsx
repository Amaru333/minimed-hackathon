"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser } from "@/redux/slices/userSlice"; // Import actions and selectors
import axiosInstance from "@/lib/axiosInstance"; // Axios instance with interceptors

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(getUser); // Get user state from Redux

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // No token, redirect to login
        router.push("/login");
        return;
      }

      try {
        // Verify the token by calling the verify endpoint
        const response = await axiosInstance.get("/auth/verify-token", {
          headers: { "is-protected": "true" },
        });

        // Dispatch the user data to Redux if authentication succeeds
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.error("Authentication failed:", error);

        router.push("/login");
      }
    };

    if (!user || Object.keys(user).length === 0) {
      checkAuth();
    }
  }, [dispatch, router, user]);

  if (!user || Object.keys(user).length === 0) {
    return null; // Show nothing while checking authentication
  }

  return <>{children}</>;
};

export default AuthWrapper;
