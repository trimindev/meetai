"use client";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

function Page() {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agent.getMany.queryOptions()
  );

  if (isLoading) {
    return (
      <LoadingState
        title="Loading Agents"
        describtion="Please wait while we fetch the latest list of agents."
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to Load Agents"
        description="We encountered an error while trying to fetch the list of agents. Please check your internet connection or try again later."
      />
    );
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export default Page;
