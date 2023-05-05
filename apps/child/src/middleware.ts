import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next).*)", "/"],
};

export default async function middleware(req: NextRequest) {
  const currentDomain = req.headers.get("current-domain") ?? "domain not found in middleware";
  const rewriteUrl = getRewriteUrl(req, currentDomain);
  
  console.log(`🏛 Domain: ${currentDomain} 🚚 Rewrite: ${req.url} → ${rewriteUrl.toString()}`);
  
  return NextResponse.rewrite(rewriteUrl);
}

// Rewriting path so we can get the current domain as query-param in getStaticProps
const getRewriteUrl = (req: NextRequest, domain: string) => {
  const { pathname } = req.nextUrl;

  const newPath = `/sites/${domain}${pathname}`;
  const url = req.nextUrl.clone();
  url.pathname = newPath; // https://nextjs.org/docs/messages/middleware-relative-urls#possible-ways-to-fix-it
  return url;
};
