import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h1 className="text-5xl font-black text-[var(--fg)] tracking-tight mb-3">404</h1>
      <h2 className="text-xl font-bold text-[var(--fg)] mb-2">Бет табылмады</h2>
      <p className="text-sm text-[var(--muted-fg)] max-w-md mb-8">
        Сіз іздеген бет жойылған, мекенжайы өзгертілген немесе бұл сілтемеге рұқсат берілмеген.
      </p>
      <Link
        href="/"
        className="btn btn-primary px-6 py-3 rounded-2xl font-bold text-sm inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Басты бетке оралу</span>
      </Link>
    </div>
  );
}
