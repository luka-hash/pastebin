import { nanoid } from "@sitnik/nanoid";

const kv = await Deno.openKv();

export interface Document {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  username: string;
  cookie: string;
}

export async function saveDocument(
  title: string,
  content: string,
): Promise<string> {
  const id = nanoid();
  const document: Document = {
    id: id,
    title: title,
    content: content,
    timestamp: Date.now(),
  };
  await kv.set(["documents", id], document);
  const recent = await kv.get<Document[]>(["recent_documents"]);
  const recentDocuments = recent.value || [];
  await kv.atomic()
    .check(recent)
    .set(["recent_documents"], [document, ...recentDocuments].slice(0, 20))
    .commit();
  return id;
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const document = await kv.get<Document>(["documents", id]);
  return document.value;
}

export async function getRecentDocuments(): Promise<Document[]> {
  const documents = (await kv.get<Document[]>(["recent_documents"])).value ||
    [];
  return documents;
}

export async function saveSession(username: string) {
  const id = nanoid();
  const token = crypto.randomUUID();
  const session: Session = {
    id: id,
    username: username,
    cookie: token,
  };
  await kv.set(["sessions", username], session);
}

export async function getSession(username: string): Promise<Session | null> {
  const session = await kv.get<Session>(["sessions", username]);
  return session.value;
}
