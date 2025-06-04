"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

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
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Logo from "@/components/icons/Logo";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignIn() {
  // State for capturing and displaying server-side errors
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);

  // Initialize react-hook-form with validation schema using zodResolver
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler with authClient integration
  const onSubmit = async (data: SignInData) => {
    setServerError(null); // Clear previous errors before submission
    setIsSubmitting(true);

    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/", // Redirect after successful login
        },
        {
          onRequest: () => {
            // Loading state is already handled by setIsSubmitting
          },
          onSuccess: () => {
            console.log("Sign in successful");
            // You can add additional success handling here
            // The redirect will be handled automatically by callbackURL
          },
          onError: (ctx) => {
            setServerError(ctx.error.message || "Sign in failed");
          },
        }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    setServerError(null);
    setIsSocialLoading("google");

    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            // Loading state handled by setIsSocialLoading
          },
          onSuccess: () => {
            console.log("Google sign in successful");
          },
          onError: (ctx) => {
            setServerError(ctx.error.message || "Google sign in failed");
          },
        }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Google sign in failed";
      setServerError(errorMessage);
    } finally {
      setIsSocialLoading(null);
    }
  };

  // GitHub sign-in handler
  const handleGitHubSignIn = async () => {
    setServerError(null);
    setIsSocialLoading("github");

    try {
      await authClient.signIn.social(
        {
          provider: "github",
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            // Loading state handled by setIsSocialLoading
          },
          onSuccess: () => {
            console.log("GitHub sign in successful");
          },
          onError: (ctx) => {
            setServerError(ctx.error.message || "GitHub sign in failed");
          },
        }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "GitHub sign in failed";
      setServerError(errorMessage);
    } finally {
      setIsSocialLoading(null);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-3xl min-h-80 grid md:grid-cols-2 gap-0 overflow-hidden shadow-2xl py-0 mb-4">
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
                        <Input
                          placeholder="you@example.com"
                          disabled={isSubmitting}
                          {...field}
                        />
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
                          disabled={isSubmitting}
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
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
                disabled={isSocialLoading !== null || isSubmitting}
                className="flex items-center justify-center gap-2"
              >
                {isSocialLoading === "google" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                )}
                Google
              </Button>
              <Button
                variant="outline"
                onClick={handleGitHubSignIn}
                type="button"
                disabled={isSocialLoading !== null || isSubmitting}
                className="flex items-center justify-center gap-2"
              >
                {isSocialLoading === "github" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Image
                    src="/github.svg"
                    alt="Github"
                    width={20}
                    height={20}
                  />
                )}
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
          <Logo />
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
