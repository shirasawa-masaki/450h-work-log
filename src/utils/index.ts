import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import ProgressDashboard from "../components/ProgressDashboard";
import WorkLogForm from "../components/WorkLogForm";
import WorkLogTable from "../components/WorkLogTable";

export default function Home() {
  const queryClient = useQueryClient();

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["workLogs"],
    queryFn: () => base44.entities.WorkLogs.list("-date"),
  });

  const createLog = useMutation({
    mutationFn: (data) => base44.entities.WorkLogs.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workLogs"] }),
  });

  const deleteLog = useMutation({
    mutationFn: (id) => base44.entities.WorkLogs.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workLogs"] }),
  });

  const totalHours = logs.reduce((sum, l) => sum + (l.hours || 0), 0);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">⏱ 実習時間トラッカー</h1>
          <p className="text-sm text-muted-foreground">インターンシップ稼働時間管理</p>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <ProgressDashboard totalHours={totalHours} />
        </section>
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <WorkLogForm onSubmit={(data) => createLog.mutate(data)} isSubmitting={createLog.isPending} />
        </section>
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <WorkLogTable logs={logs} onDelete={(id) => deleteLog.mutate(id)} />
        </section>
      </main>
    </div>
  );
}
