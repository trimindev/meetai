import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import AgentPage, { AgentLoadingState } from "@/components/agent/AgentPage";
import { Suspense } from "react";

function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agent.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentLoadingState />}>
        <AgentPage />
      </Suspense>
    </HydrationBoundary>
  );
}

export default Page;
