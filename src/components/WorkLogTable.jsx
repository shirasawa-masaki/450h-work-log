import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, List } from "lucide-react";

export default function WorkLogTable({ logs, onDelete }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <List className="h-5 w-5 text-primary" />
        </div>
        稼働記録一覧
      </h2>

      {logs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          まだ記録がありません。上のフォームから追加してください。
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[130px]">日付</TableHead>
                <TableHead>業務内容</TableHead>
                <TableHead className="w-[100px] text-right">時間</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.date}</TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell className="text-right font-mono">{log.hours}h</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onDelete(log.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
