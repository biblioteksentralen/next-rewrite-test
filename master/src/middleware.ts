import { NextRequest, NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === "development";

export const config = {
  matcher: [
    "/((?!_next).*)",
    /**
     * Was not able to write the above regex while catching the root path "/",
     * so we do this in a separate matcher
     */
    "/",
  ],
};

export default async function middleware(req: NextRequest) {
  const { pathname, locale: originalLocale } = req.nextUrl;

  const currentDomain = getCurrentDomain(req);

  if (pathname.startsWith("/child")) {
    const url = isDevelopment
      ? `http://localhost:3001${pathname}`
      : `https://next-rewrite-test-child.bibliotek.io${pathname}`;
    const headers = new Headers(req.headers);
    headers.set("current-domain", currentDomain);
    console.log(`👤 Domain: ${currentDomain} 🚚 Rewrite: ${req.url} → ${url}`);
    return NextResponse.rewrite(url, { request: { headers } });
  }
  
  const url = req.nextUrl.clone();
  url.pathname = `/sites/${currentDomain}${pathname}`;
  console.log(`🏛 Domain: ${currentDomain} 🚚 Rewrite: ${req.url} → ${url.toString()}`);
  return NextResponse.rewrite(url);
}

const getCurrentDomain = (req: NextRequest) => {
  // The host header should generally be considered unsafe user input, remove all characters we don't need just in case.
  const hostHeader = (req.headers.get("host") || "").replace(
    /[^a-z0-9:._-]/g,
    ""
  );

  // ":" for localhost
  const rawDomain = hostHeader.split(":")[0];
  if (!rawDomain)
    throw new Error(
      `Could not find sitedomain for host header ${JSON.stringify(hostHeader)}`
    );
  // To support internationalized domain names (IDN) with non-ascii characters like æøå,
  // we need to convert the Punycode representation to Unicode.
  return rawDomain;
};
