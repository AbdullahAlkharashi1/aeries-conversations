import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Login = () => {
  useEffect(() => {
    document.title = "Aeries – Log in";
  }, []);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Log in</h1>
      <p className="text-sm text-muted-foreground mb-6">
        To enable secure authentication, connect your Lovable project to Supabase using the native integration (recommended).
      </p>
      <div className="flex flex-col gap-3 max-w-sm">
        <Button variant="hero" disabled>Continue with email (disabled in demo)</Button>
        <Button variant="outline" asChild>
          <a href="https://docs.lovable.dev/integrations/supabase/" target="_blank" rel="noreferrer">Connect Supabase</a>
        </Button>
      </div>
    </main>
  );
};

export default Login;
