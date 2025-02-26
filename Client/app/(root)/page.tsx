"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

interface AuthProps {}

export default function AuthPage({}: AuthProps) {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token is found, redirect to dashboard
      router.push("/dashboard");
    }
  }, [router]);

  const toggleMode = () => setIsSignup((prev) => !prev);

  return (
    <>
      <Toaster richColors position="top-center" />

      <header className="flex flex-col justify-between items-center border border-none">
        {/* Logo Section */}
        <div className="w-full px-4 py-4 flex items-center justify-center gap-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold whitespace-nowrap">
              <span className="text-gray-900">LIB</span>
              <span className="text-orange-600">READ</span>
            </h1>
          </Link>
        </div>
      </header>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 ">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl border border-gray-300">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {isSignup ? "Sign Up" : "Log In"}
          </h1>
          {isSignup ? <SignupForm /> : <LoginForm />}
          <p className="mt-4 text-center">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-orange-600 hover:underline font-semibold"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // <-- loading state
  const router = useRouter(); 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const res = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Signed up successfully!");
        router.push("/dashboard");
      } else {
        toast.error(data.error || data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label htmlFor="signupUsername" className="block text-gray-700 mb-1">
          Username
        </label>
        <input
          id="signupUsername"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label htmlFor="signupPassword" className="block text-gray-700 mb-1">
          Password
        </label>
        <input
          id="signupPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // <-- loading state
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        toast.error(data.error || data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="loginUsername" className="block text-gray-700 mb-1">
          Username
        </label>
        <input
          id="loginUsername"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label htmlFor="loginPassword" className="block text-gray-700 mb-1">
          Password
        </label>
        <input
          id="loginPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          "Log In"
        )}
      </button>
    </form>
  );
}

/**
 * A simple spinner component
 */
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading..."
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  );
}
