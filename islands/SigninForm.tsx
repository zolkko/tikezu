import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Button } from "$components/Button.tsx";

export default function SigninForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("token", data.token);

      globalThis.location.href = "/";
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div className="mt-6">
        <label htmlFor="username" className="lbl">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          className="inp"
          placeholder="Enter your username"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="password" className="lbl">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="inp"
          placeholder="Enter your password"
        />
      </div>

      <div className="mt-6">
        <Button type="submit" className="btn">Sign In</Button>
      </div>

      <div className="mt-6 text-center">
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </div>
    </form>
  );
}
