"use client";
import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignIn() {
  // State for capturing and displaying server-side errors
  const [serverError, setServerError] = useState<string | null>(null);

  // Initialize react-hook-form with validation schema using zodResolver
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: SignInData) => {
    setServerError(null); // Clear previous errors before submission
    try {
      // Simulate API call to sign in
      const res = await fakeSignInApi(data);
      if (!res.ok) {
        throw new Error(res.message || "Unknown server error");
      }
      console.log("Submitted:", data);
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Server error occurred";
      setServerError(errorMessage);
    }
  };

  // Fake API function to simulate server response
  async function fakeSignInApi(data: SignInData) {
    return new Promise<{ ok: boolean; message?: string }>((resolve) =>
      setTimeout(
        () =>
          data.email === "test@example.com" && data.password === "password123"
            ? resolve({ ok: true })
            : resolve({ ok: false, message: "Invalid credentials" }),
        1000
      )
    );
  }

  // Handlers for social login buttons
  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  const handleGitHubSignIn = () => {
    console.log("GitHub sign in clicked");
  };

  return (
    <div>
      <Card className="w-full max-w-2xl min-h-80 grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl py-0 mb-4">
        {/* Left: Sign-in Form */}
        <div className="p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-center text-2xl font-bold">
              Welcome Back
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              {/* React Hook Form wrapper with validation */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email input field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password input field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Server error alert */}
                {serverError && (
                  <Alert variant="destructive">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>{serverError}</AlertTitle>
                  </Alert>
                )}

                {/* Submit button */}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid md:grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center gap-2"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={handleGitHubSignIn}
                type="button"
                className="flex items-center justify-center gap-2"
              >
                <Image src="/github.svg" alt="Github" width={20} height={20} />
                GitHub
              </Button>
            </div>

            {/* Link to sign up page */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>
                Don&apos;t have an account?{" "}
                <a
                  href="/sign-up"
                  className="text-primary underline hover:text-primary/80"
                >
                  Sign up
                </a>
              </p>
            </div>
          </CardContent>
        </div>

        {/* Right: Branding / Image */}
        <div className="w-full h-full hidden md:flex flex-col gap-y-2 bg-neutral-900 items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Meet AI"
            width={80}
            height={80}
            className="object-contain"
          />
          <h2 className="text-white text-3xl font-semibold">Meet AI</h2>
        </div>
      </Card>

      {/* Terms and Privacy Policy disclaimer */}
      <div className="text-sm text-center text-muted-foreground">
        By clicking, you agree to our{" "}
        <a
          href="/terms"
          className="text-primary underline hover:text-primary/80"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="text-primary underline hover:text-primary/80"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
