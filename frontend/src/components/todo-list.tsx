import { useState, useEffect, useCallback } from "react";
import { Plus, ListChecks, Loader2, Sparkles, ClipboardList, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from "@/lib/api";
import TodoCard from "@/components/ui/todo-card";
import type { Todo } from "@/types/todo";

type Filter = "all" | "active" | "completed";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch {
      setError("Could not connect to the server. Make sure the backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = newTodoText.trim();
    if (!text || adding) return;

    setAdding(true);
    try {
      const created = await createTodo(text);
      setTodos((prev) => [created, ...prev]);
      setNewTodoText("");
    } catch {
      setError("Failed to add todo");
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch {
      setError("Failed to update todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete todo");
    }
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const filters: { key: Filter; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "all", label: "All", icon: <ListChecks className="size-3.5" />, count: todos.length },
    { key: "active", label: "Active", icon: <ClipboardList className="size-3.5" />, count: activeCount },
    { key: "completed", label: "Done", icon: <CheckCircle2 className="size-3.5" />, count: completedCount },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Error banner */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Add todo form */}
      <form onSubmit={handleAdd} className="mb-8">
        <div className="relative flex items-center gap-3 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md px-4 py-3 transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/10">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Plus className="size-4 text-primary" />
          </div>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 outline-none"
            disabled={adding}
            id="new-todo-input"
          />
          <button
            type="submit"
            disabled={!newTodoText.trim() || adding}
            className={cn(
              "flex h-9 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-all duration-300 cursor-pointer",
              newTodoText.trim()
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {adding ? <Loader2 className="size-4 animate-spin" /> : "Add"}
          </button>
        </div>
      </form>

      {/* Filter tabs */}
      <div className="mb-6 flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-300 cursor-pointer",
              filter === f.key
                ? "bg-primary/15 text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {f.icon}
            {f.label}
            <span
              className={cn(
                "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                filter === f.key ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Todo list */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-primary/50" />
          <p className="mt-3 text-sm text-muted-foreground">Loading your todos...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
            <Sparkles className="size-7 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-medium text-muted-foreground/70">
            {filter === "all" ? "No todos yet" : filter === "active" ? "All done!" : "Nothing completed yet"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground/50">
            {filter === "all" ? "Add your first todo above to get started" : filter === "active" ? "You've completed everything 🎉" : "Start checking off your tasks"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filteredTodos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Footer stats */}
      {todos.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-4 text-xs text-muted-foreground/60">
          <span>
            {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
          </span>
          <span>
            {completedCount} completed
          </span>
        </div>
      )}
    </div>
  );
}
