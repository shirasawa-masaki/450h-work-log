import { motion } from "framer-motion";
import { Target, Clock, TrendingUp } from "lucide-react";

const TARGET_HOURS = 450;

export default function ProgressDashboard({ totalHours }) {
  const remaining = Math.max(0, TARGET_HOURS - totalHours);
  const percentage = Math.min(100, (totalHours / TARGET_HOURS) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">進捗ダッシュボード</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Target} label="目標時間" value={`${TARGET_HOURS}h`} />
        <StatCard icon={Clock} label="合計稼働" value={`${totalHours.toFixed(1)}h`} highlight />
        <StatCard icon={Clock} label="残り時間" value={`${remaining.toFixed(1)}h`} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>進捗状況</span>
          <span className="font-medium text-foreground">{percentage.toFixed(1)}%</span>
        </div>
        <div className="h-4 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, highlight }) {
  return (
    <div className={`rounded-xl border p-4 text-center space-y-1 ${highlight ? "bg-primary/5 border-primary/20" : "bg-card"}`}>
      <Icon className="h-4 w-4 mx-auto text-muted-foreground" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold tracking-tight ${highlight ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}
