import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [compact, setCompact] = useState(localStorage.getItem("aeries:compact") === "1");
  const [model, setModel] = useState(localStorage.getItem("aeries:model") || "fast");

  useEffect(() => {
    document.title = "Aeries – Settings";
  }, []);

  useEffect(() => {
    localStorage.setItem("aeries:compact", compact ? "1" : "0");
  }, [compact]);

  useEffect(() => {
    localStorage.setItem("aeries:model", model);
  }, [model]);

  const clearLocal = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <section className="space-y-6 max-w-xl">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="compact">Compact mode</Label>
            <p className="text-sm text-muted-foreground">Tighter spacing in chat messages.</p>
          </div>
          <Switch id="compact" checked={compact} onCheckedChange={setCompact} />
        </div>

        <div className="grid gap-2">
          <Label>Default model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Pick a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fast">Aeries Fast</SelectItem>
              <SelectItem value="precise">Aeries Precise</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Models are illustrative in this demo.</p>
        </div>

        <div className="pt-2">
          <Button variant="outline" onClick={clearLocal}>Clear local data</Button>
        </div>
      </section>
    </main>
  );
};

export default Settings;
