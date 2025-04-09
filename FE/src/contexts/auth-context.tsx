"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        // Here you would typically validate the token with your backend
        // For now, we'll just simulate a logged-in user
        setUser({
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store the token
      localStorage.setItem("authToken", "dummy-token");

      // Set the user
      setUser({
        id: "1",
        name: "John Doe",
        email: email,
        role: "user",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    // Remove the token
    localStorage.removeItem("authToken");

    // Clear the user
    setUser(null);

    // Redirect to login page
    router.push("/login");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
