
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNewSession, getCurrentSessionId } from "@/lib/chat-storage";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Aeries – Log in";
    navigate("/login", { replace: true });
  }, [navigate]);

  return <div className="p-6">Loading...</div>;
};

export default Index;
