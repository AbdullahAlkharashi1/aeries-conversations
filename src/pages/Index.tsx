
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNewSession, getCurrentSessionId } from "@/lib/chat-storage";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Aeries – Falcon‑Wing AI Chat Assistant";
    
    // Check if user should be logged in (you can add your own logic here)
    // For now, always redirect to chat since login buttons handle the flow
    const current = getCurrentSessionId();
    if (current) {
      navigate(`/chat/${current}`, { replace: true });
    } else {
      const id = createNewSession();
      navigate(`/chat/${id}`, { replace: true });
    }
  }, [navigate]);

  return <div className="p-6">Loading...</div>;
};

export default Index;
