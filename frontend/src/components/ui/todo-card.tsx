import { cn } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react";
import type { Todo } from "@/types/todo";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  const formattedDate = new Date(todo.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-md px-5 py-4 transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5",
        todo.completed && "opacity-60"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo._id)}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer",
          todo.completed
            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
            : "border-muted-foreground/30 hover:border-primary/60 hover:bg-primary/10"
        )}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && <Check className="size-3.5" strokeWidth={3} />}
      </button>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-base font-medium transition-all duration-300",
            todo.completed
              ? "text-muted-foreground line-through decoration-muted-foreground/50"
              : "text-foreground"
          )}
        >
          {todo.text}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground/70">{formattedDate}</p>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo._id)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground/40 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive cursor-pointer opacity-0 group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <Trash2 className="size-4" />
      </button>

      {/* Subtle left accent */}
      <div
        className={cn(
          "absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full transition-all duration-300",
          todo.completed ? "bg-emerald-500/60" : "bg-primary/40 group-hover:bg-primary/80 group-hover:h-10"
        )}
      />
    </div>
  );
}
