import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatMessage, { type ChatMessageModel } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSession, saveMessage, setCurrentSessionId } from "@/lib/chat-storage";

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "Aeries – Chat";
  }, []);

  useEffect(() => {
    if (!chatId) return;
    setCurrentSessionId(chatId);
    const session = getSession(chatId);
    if (!session) {
      navigate("/", { replace: true });
      return;
    }
    setIsTyping(false);
    setMessages(
      session.messages.map((m, idx) => ({
        id: `${idx}`,
        role: m.role,
        content: m.content,
      }))
    );
  }, [chatId, navigate]);

  const handleSend = async (text: string) => {
    if (!chatId) return;
    const userMsg: ChatMessageModel = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    saveMessage(chatId, "user", text);

    setIsTyping(true);
    const reply = `Here’s a quick take: ${text}\n\nI’m Aeries — this session is stored locally. Connect Supabase to enable cloud history and real AI responses.`;
    await new Promise((r) => setTimeout(r, 500));
    const botMsg: ChatMessageModel = { id: crypto.randomUUID(), role: "assistant", content: reply };
    setMessages((prev) => [...prev, botMsg]);
    saveMessage(chatId, "assistant", reply);
    setIsTyping(false);
  };

  const typingMessage = useMemo<ChatMessageModel | null>(() =>
    isTyping ? { id: "typing", role: "assistant", content: "Aeries is typing…" } : null,
  [isTyping]);

  return (
    <div ref={containerRef} className="container mx-auto p-4">
      <h1 className="sr-only">Aeries AI chat assistant</h1>
      <ScrollArea className="h-[60vh] md:h-[65vh] rounded-lg border border-border p-4 bg-card/50">
        <div className="space-y-4">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          {typingMessage && (
            <div className="opacity-70">
              <ChatMessage message={typingMessage} />
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="mt-4 rounded-lg border border-border p-3 bg-card/80">
        <ChatInput onSend={handleSend} disabled={isTyping} />
        <p className="mt-2 text-xs text-muted-foreground">Aeries can make mistakes. Consider checking important information.</p>
      </div>
    </div>
  );
};

export default ChatPage;
