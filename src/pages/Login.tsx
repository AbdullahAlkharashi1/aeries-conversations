
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import wingLogo from "@/assets/aeries-wing.png";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { createNewSession, getCurrentSessionId } from "@/lib/chat-storage";
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Aeries – Log in";
  }, []);

  const handleLogin = () => {
    localStorage.setItem("aeries_authed", "1");
    const current = getCurrentSessionId();
    if (current) {
      navigate(`/chat/${current}`);
    } else {
      const id = createNewSession();
      navigate(`/chat/${id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-6">
        {/* Logo and title */}
        <div className="flex flex-col items-center space-y-2">
          <img src={wingLogo} alt="Aeries logo" width={48} height={48} />
          <h1 className="text-2xl font-bold">Welcome to Aeries</h1>
          <p className="text-muted-foreground text-center">Your falcon-wing AI chat assistant</p>
        </div>

        {/* Login form */}
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button onClick={handleLogin} className="w-full" variant="hero">
              Log in
            </Button>
            <div className="text-sm text-center space-y-2">
              <Link to="#" className="text-primary hover:underline">
                Forgot your password?
              </Link>
              <div>
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Demo notice */}
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
              This is a demo interface. For secure authentication, connect your Lovable project to Supabase.
            </p>
            <div className="mt-3 flex justify-center">
              <Button variant="outline" size="sm" asChild>
                <a href="https://docs.lovable.dev/integrations/supabase/" target="_blank" rel="noreferrer">
                  Connect Supabase
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
