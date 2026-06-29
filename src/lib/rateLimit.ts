import { NextRequest, NextResponse } from "next/server";

/**
 * Прост in-memory rate limiter (за single-instance deploy като Vercel serverless).
 * За multi-instance production замени с Redis/Upstash.
 *
 * Лимитира броя заявки от един IP в прозорец от време.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Почистване на изтекли bucket-и на всеки 5 минути
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

/**
 * Проверява дали заявката е в рамките на лимита.
 * @returns null ако е разрешена, иначе NextResponse с 429.
 */
export function rateLimit(
  req: NextRequest,
  opts: {
    limit: number; // брой заявки
    windowMs: number; // прозорец в ms
    keyPrefix?: string; // за разделяне на различни endpoints
  }
): NextResponse | null {
  cleanup();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const key = `${opts.keyPrefix || "default"}:${ip}`;
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    // Нов или изтекъл bucket
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return null;
  }

  bucket.count++;
  if (bucket.count > opts.limit) {
    // Превишен лимит
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Твърде много заявки. Опитайте отново след малко." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(opts.limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  return null;
}

/** Често използвани лимити. */
export const LIMITS = {
  AUTH: { limit: 10, windowMs: 60 * 1000 }, // 10 login/min
  FORM: { limit: 5, windowMs: 60 * 1000 }, // 5 форми/min
  API: { limit: 60, windowMs: 60 * 1000 }, // 60 общо/min
};
