export type StoredMessage = { role: "user" | "assistant"; content: string };
export type ChatSession = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: StoredMessage[];
};

const KEY = "aeries:sessions";
const CURRENT_KEY = "aeries:current";

function read(): ChatSession[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ChatSession[]) : [];
  } catch {
    return [];
  }
}
function write(sessions: ChatSession[]) {
  localStorage.setItem(KEY, JSON.stringify(sessions));
}

export function getSessions(): ChatSession[] {
  const list = read();
  if (list.length === 0) {
    const id = createNewSession();
    return read();
  }
  return list.sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getCurrentSessionId(): string | null {
  return localStorage.getItem(CURRENT_KEY);
}
export function setCurrentSessionId(id: string) {
  localStorage.setItem(CURRENT_KEY, id);
}

export function createNewSession(): string {
  const sessions = read();
  const id = crypto.randomUUID();
  const now = Date.now();
  const session: ChatSession = {
    id,
    title: "New chat",
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        role: "assistant",
        content:
          "Hi, I’m Aeries. Start a conversation and I’ll help as best as I can.",
      },
    ],
  };
  sessions.unshift(session);
  write(sessions);
  setCurrentSessionId(id);
  return id;
}

export function getSession(id: string): ChatSession | null {
  return read().find((s) => s.id === id) ?? null;
}

export function saveMessage(id: string, role: "user" | "assistant", content: string) {
  const sessions = read();
  const idx = sessions.findIndex((s) => s.id === id);
  if (idx === -1) return;
  sessions[idx].messages.push({ role, content });
  if (role === "user" && sessions[idx].title === "New chat") {
    sessions[idx].title = content.slice(0, 30) + (content.length > 30 ? "…" : "");
  }
  sessions[idx].updatedAt = Date.now();
  write(sessions);
}
