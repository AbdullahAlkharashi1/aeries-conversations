import { useEffect, useMemo, useRef, useState } from "react";
import ChatMessage, { type ChatMessageModel } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import wingLogo from "@/assets/aeries-wing.png";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [messages, setMessages] = useState<ChatMessageModel[]>(() => [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi, I’m Aeries. Think of me as a falcon‑winged ChatGPT — fast, precise, and here to help. What can I do for you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--x", `${x}%`);
      el.style.setProperty("--y", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const handleSend = async (text: string) => {
    const userMsg: ChatMessageModel = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulated assistant reply
    const reply = `Here’s a quick take: ${text}\n\nI’m Aeries — a focused AI chat assistant. I don’t call external APIs yet in this demo, but I can help structure your thoughts, outline steps, or summarize.`;
    await new Promise((r) => setTimeout(r, 550));

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "assistant", content: reply },
    ]);
    setIsTyping(false);
  };

  const typingMessage = useMemo<ChatMessageModel | null>(
    () => (isTyping ? { id: "typing", role: "assistant", content: "Aeries is typing…" } : null),
    [isTyping]
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground relative"
      style={{ backgroundImage: "var(--gradient-surface)" }}
    >
      <header className="border-b border-border sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex items-center gap-3 py-3">
          <img
            src={wingLogo}
            alt="Aeries falcon left wing logo"
            width={32}
            height={32}
            loading="lazy"
            className="select-none animate-float"
          />
          <span className="text-xl font-semibold tracking-tight">Aeries</span>
          <span className="ml-1 text-sm text-muted-foreground">Falcon‑Wing AI Chat Assistant</span>
        </div>
      </header>

      <main className="container mx-auto grid md:grid-cols-12 gap-6 py-8" role="main">
        <aside className="hidden md:block md:col-span-4 lg:col-span-3">
          <article className="rounded-lg border border-border p-4 bg-card/60">
            <h2 className="text-sm font-medium mb-2">Quick prompts</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Brainstorm 5 product names</li>
              <li>• Summarize this paragraph</li>
              <li>• Outline steps for a project</li>
              <li>• Write a friendly email reply</li>
            </ul>
          </article>
        </aside>

        <section className="md:col-span-8 lg:col-span-9 flex flex-col min-h-[70vh]">
          <h1 className="sr-only">Aeries AI chat assistant</h1>
          <div className="flex-1">
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
          </div>

          <div className="mt-4 rounded-lg border border-border p-3 bg-card/80">
            <ChatInput onSend={handleSend} disabled={isTyping} />
            <p className="mt-2 text-xs text-muted-foreground">
              Aeries can make mistakes. Consider checking important information.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border">
        <div className="container mx-auto text-xs text-muted-foreground flex items-center gap-2">
          <img src={wingLogo} alt="Aeries logo small" width={16} height={16} loading="lazy" />
          <span>© {new Date().getFullYear()} Aeries</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
