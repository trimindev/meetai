import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
// import { TRPCError } from "@trpc/server";

export const agentRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // Uncomment the following lines to simulate a delay or throw an error for testing purposes
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new TRPCError({
    //   code: "BAD_REQUEST",
    //   message: "This is a test error",
    // });
    return data;
  }),
});
