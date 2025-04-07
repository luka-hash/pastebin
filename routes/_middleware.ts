import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  // console.log(ctx.destination);
  console.log(`${req.method}: ${req.url}`);
  return await ctx.next();
}
