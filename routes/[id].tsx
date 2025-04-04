import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { Document, getDocumentById } from "../lib/db.ts";
import { render } from "@deno/gfm";

export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const document = await getDocumentById(id);
    if (document === null) {
      return ctx.renderNotFound();
    }

    return ctx.render(document);
  },
};

export default function Home(props: PageProps<Document>) {
  return (
    <>
      <Head>
        <title>Paste: {props.data.title}</title>
      </Head>
      <div class="p-8 ml-20">
        <header class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {props.data.title}
          </h1>
          <time
            class="text-sm text-gray-500"
            datetime={props.data.timestamp.toString()}
          >
            {new Date(props.data.timestamp).toLocaleString()}
          </time>
        </header>
        <div
          class="prose prose-slate max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: render(props.data.content),
          }}
        >
        </div>
      </div>
    </>
  );
}
