"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SignIn() {
  return (
    <Card className="w-full max-w-2xl min-h-80 grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl py-0">
      {/* Left: Sign-in Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            sign in page
            {/* Your form goes here */}
          </CardContent>
        </div>
      </div>

      {/* Right: Full-width Image Section */}
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
  );
}

export default SignIn;
