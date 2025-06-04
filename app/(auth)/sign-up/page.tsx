import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function page() {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Welcome
        </CardTitle>
      </CardHeader>
      <CardContent>sign up page</CardContent>
    </Card>
  );
}

export default page;
