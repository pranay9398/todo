import { Sparkles } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import TodoList from "@/components/todo-list";

const heroCards = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Organize",
    description: "Keep your tasks in order",
    date: "Always",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-violet-300" />,
    title: "Focus",
    description: "One task at a time",
    date: "Today",
    iconClassName: "text-violet-500",
    titleClassName: "text-violet-400",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-emerald-300" />,
    title: "Achieve",
    description: "Complete your goals",
    date: "Every day",
    iconClassName: "text-emerald-500",
    titleClassName: "text-emerald-400",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

function App() {
  return (
    <div className="bg-mesh relative min-h-screen overflow-hidden">
      {/* Floating ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-20 right-1/3 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/20 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 shadow-lg shadow-primary/10">
                <Sparkles className="size-4.5 text-primary" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-primary">Todo</span>
                <span className="text-muted-foreground font-normal">.app</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
          </div>
        </header>

        {/* Hero section with DisplayCards */}
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground mb-6 backdrop-blur-sm">
                <Sparkles className="size-3 text-primary" />
                Minimal & Powerful
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Stay on top of
                <br />
                <span className="bg-gradient-to-r from-primary via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  everything
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground/80 max-w-md mx-auto lg:mx-0">
                A beautifully crafted todo app that helps you focus on what matters most.
              </p>
            </div>

            {/* DisplayCards */}
            <div className="flex-shrink-0 animate-float">
              <DisplayCards cards={heroCards} />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>

        {/* Main todo section */}
        <main className="mx-auto max-w-5xl px-6 py-12">
          <TodoList />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/20 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl px-6 py-6 text-center text-xs text-muted-foreground/40">
            Built with React, TypeScript & shadcn/ui
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
