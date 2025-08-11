import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createNewSession, getCurrentSessionId } from "@/lib/chat-storage";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Aeries – Falcon‑Wing AI Chat Assistant";
    const current = getCurrentSessionId();
    if (current) {
      navigate(`/chat/${current}`, { replace: true });
    } else {
      const id = createNewSession();
      navigate(`/chat/${id}`, { replace: true });
    }
  }, [navigate]);

  return <div className="p-6">Redirecting…</div>;
};

export default Index;
