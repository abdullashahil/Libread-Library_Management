"use client";

import React, { useState } from "react";

interface AuthProps {}

export default function AuthPage({}: AuthProps) {
  const [isSignup, setIsSignup] = useState(false);

  const toggleMode = () => setIsSignup((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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
  );
}

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://libread-server.vercel.app/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        alert("Signed up successfully!");
        // Possibly redirect or update UI
      } else {
        alert(data.error || data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. See console for details.");
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
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://libread-server.vercel.app/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        alert("Logged in successfully!");
        // Possibly redirect or update UI
      } else {
        alert(data.error || data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. See console for details.");
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
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
      >
        Log In
      </button>
    </form>
  );
}
