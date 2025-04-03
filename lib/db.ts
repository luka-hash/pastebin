import { nanoid } from "@sitnik/nanoid";

const kv = await Deno.openKv();

export interface Document {
  title: string;
  content: string;
  timestamp: number;
}

export async function saveDocument(
  title: string,
  content: string,
): Promise<string> {
  const id = nanoid();
  await kv.set(["documents", id], { title: title, content: content, timestamp: Date.now() });
  return id;
}

export async function getDocumentById(id: string): Promise<Document | null> {
  console.log(id);
  const document = await kv.get<Document>(["documents", id]);
  return document.value;
}
