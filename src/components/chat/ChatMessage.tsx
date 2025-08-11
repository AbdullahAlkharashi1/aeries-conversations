import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ChatMessageModel = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface ChatMessageProps {
  message: ChatMessageModel;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";
  return (
    <div
      className={cn(
        "flex w-full gap-3", 
        isAssistant ? "justify-start" : "justify-end"
      )}
      aria-live="polite"
    >
      {isAssistant && (
        <Avatar className="size-8">
          <AvatarImage src="/src/assets/aeries-wing.png" alt="Aeries falcon left wing logo" loading="lazy" />
          <AvatarFallback>AE</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed shadow-sm",
          isAssistant
            ? "bg-accent text-foreground border border-border"
            : "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
        )}
      >
        {message.content}
      </div>
      {!isAssistant && (
        <Avatar className="size-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
