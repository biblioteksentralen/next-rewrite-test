import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next).*)", "/"],
};

export default async function middleware(req: NextRequest) {
  const currentDomain =
    req.headers.get("current-domain") ?? "domain not found in middleware";

  const newUrl = req.nextUrl.clone();
  newUrl.pathname = `/sites/${currentDomain}${req.nextUrl.pathname}`;

  // Rewriting path so we can get the current domain as query-param in getStaticProps
  return NextResponse.rewrite(newUrl);
}
