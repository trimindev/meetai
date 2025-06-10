"use client";

import ErrorState from "@/components/ErrorState";

const Error = ({ error }: { error: Error }) => {
  console.error("Error in agents page:", error);

  return (
    <ErrorState
      title="Error Loading Agents"
      message="An error occurred while loading the agents. Please try again later."
    />
  );
};
export default Error;
