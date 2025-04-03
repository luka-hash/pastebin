import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    return ctx.render()
  },
  async POST(req) {
    const form = await req.formData();
    console.log(form.get("title"), form.get("content"))
    return new Response("", {
      status: 302,
      headers: {
        Location: "/",
      }
    })
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Pastebin</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac] h-screen">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">Welcome to Pastebin</h1>
          <form action="/" method="post" class="mt-8 flex flex-col gap-2">
            <input
              type="text"
              name="title"
              placeholder="Enter paste title..."
            />
            <textarea name="content">Enter paste content here</textarea>
            <button type="submit" class="bg-[#aaaaaa]">Submit paste</button>
          </form>
        </div>
      </div>
    </>
  );
}
