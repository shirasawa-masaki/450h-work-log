import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function WorkLogForm({ onSubmit, isSubmitting }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !hours) return;
    onSubmit({ date, description, hours: parseFloat(hours) });
    setDescription("");
    setHours("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Plus className="h-5 w-5 text-primary" />
        </div>
        記録を追加
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_2fr_1fr_auto] items-end">
        <div className="space-y-1.5">
          <Label htmlFor="date">日付</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="desc">業務内容</Label>
          <Input id="desc" placeholder="例: ドキュメント作成" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hours">稼働時間</Label>
          <Input id="hours" type="number" step="0.5" min="0" max="24" placeholder="8" value={hours} onChange={(e) => setHours(e.target.value)} required />
        </div>
        <Button type="submit" disabled={isSubmitting} className="h-10">
          <Plus className="h-4 w-4 mr-1" /> 追加
        </Button>
      </form>
    </div>
  );
}
