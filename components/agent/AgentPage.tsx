"use client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import LoadingState from "../LoadingState";

function AgentPage() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agent.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export default AgentPage;

export const AgentLoadingState = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we fetch the agents."
    />
  );
};
