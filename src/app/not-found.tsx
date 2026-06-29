import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="bg">
      <body className="flex min-h-screen flex-col items-center justify-center bg-ink-900 p-6 text-center text-white">
        <div className="bg-grid-dark">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-400">
            404
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Страницата не е намерена
          </h1>
          <p className="mt-3 text-ink-200">
            Страницата, която търсите, не съществува или е преместена.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Към началната страница
          </Link>
        </div>
      </body>
    </html>
  );
}
