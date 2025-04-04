import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Document, getRecentDocuments } from "../lib/db.ts";

export const handler: Handlers<Document[]> = {
  async GET(_, ctx) {
    const documents = await getRecentDocuments();
    if (documents === null) {
      return ctx.renderNotFound();
    }
    return ctx.render(documents);
  },
};

export default function Home(props: PageProps<Document[]>) {
  return (
    <>
      <Head>
        <title>
          Pastebin: Explore
        </title>
      </Head>
      <div>
        <h1>
          <a href="/">
            Pastebin
          </a>
        </h1>
        <div class="flex flex-col gap-10 p-10">
          {props.data.map((doc) => (
            <div key={doc.id} class="flex flex-row gap-4">
              <a
                href={`/${doc.id}`}
                class="text-3xl font-bold text-gray-900 underline"
              >
                {doc.title}
              </a>
              <time
                class="text-sm text-gray-500"
                datetime={doc.timestamp.toString()}
              >
                {new Date(doc.timestamp).toLocaleString()}
              </time>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
