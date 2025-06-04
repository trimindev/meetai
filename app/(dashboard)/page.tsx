"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Separate state for each input
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Auth session
  const { data: session } = authClient.useSession();

  const handleCreateUser = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          // show loading
        },
        onSuccess: () => {
          alert("User created successfully!");
          // redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };
  const handleLogin = async () => {
    await authClient.signIn.email(
      {
        email: loginEmail,
        password: loginPassword,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          // show loading
        },
        onSuccess: () => {
          alert("Logged in successfully!");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  // Render authenticated view
  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-6 text-center space-y-4">
          <div>Logged in as {session.user?.name}</div>
          <Button onClick={() => authClient.signOut()} variant="outline">
            Sign Out
          </Button>
        </Card>
      </div>
    );
  }

  // Render login and signup cards
  return (
    <div className="flex gap-4 w-full max-w-4xl px-4">
      {/* Login Card */}
      <Card className="w-full max-w-md p-6 space-y-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div className="space-y-4">
          <Input
            type="email"
            name="loginEmail"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <Input
            type="password"
            name="loginPassword"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </Card>

      {/* Sign Up Card */}
      <Card className="w-full max-w-md p-6 space-y-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleCreateUser} className="w-full">
            Create User
          </Button>
        </div>
      </Card>
    </div>
  );
}
