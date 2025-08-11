import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const text = value.trim();
      if (!text) return;
      onSend(text);
      setValue("");
    },
    [onSend, value]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const text = value.trim();
      if (!text) return;
      onSend(text);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-end gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Aeries anything…"
        className="min-h-[56px] max-h-40 resize-y"
        aria-label="Message Aeries"
      />
      <Button type="submit" variant="hero" size="icon" disabled={disabled || value.trim().length === 0} aria-label="Send message">
        <Send className="size-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
