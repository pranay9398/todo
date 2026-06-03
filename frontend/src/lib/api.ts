import type { Todo } from "@/types/todo";

// In production, use the deployed backend URL from env variable
// In development, falls back to localhost
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/todo";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(text: string): Promise<Todo> {
  const res = await fetch(`${API_BASE}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function toggleTodo(id: string): Promise<Todo> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to toggle todo");
  return res.json();
}

export async function deleteTodo(id: string): Promise<Todo> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
}
