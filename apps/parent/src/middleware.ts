import { NextRequest, NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === "development";

export const config = {
  matcher: ["/((?!_next).*)", "/"],
};

export default async function middleware(req: NextRequest) {
  const { pathname, locale: originalLocale } = req.nextUrl;

  if (pathname.startsWith("/child1")) {
    const url = isDevelopment
      ? `http://localhost:3001${pathname}`
      : `https://next-rewrite-test-child-1.vercel.app${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/child2")) {
    const url = isDevelopment
      ? `http://localhost:3002${pathname}`
      : `https://next-rewrite-test-child-2.vercel.app${pathname}`;
    return NextResponse.rewrite(url);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/sites/${"currentDomain"}${pathname}`;
  console.log(
    `🏛 Domain: ${"currentDomain"} 🚚 Rewrite: ${req.url} → ${url.toString()}`
  );
  return NextResponse.rewrite(url);
}
