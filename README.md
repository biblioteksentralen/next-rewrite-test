# Reproduction repo rewriting between next-apps

We've created a platform with next, vercel and middleware, much like described here: https://vercel.com/templates/next.js/platforms-starter-kit

We are now looking for ways to break down our monolith into micro frontends that are still served under the same domains/urls as in our platform. Forexample we want a microfrontend at XXX.xx/myPage.

A problem we struggled to solve was for the micro frontends to know what domain they were running on. In the child apps middleware the "host" header did not contain the domain of the parent app, but the domain of the child app. We solved this by passing the current domain as a custom header "current-domain" from the parent-middleware. 

```
  // parent middleware.ts
  const currentDomain = req.headers.get("host") || "";

  const newHeaders = new Headers(req.headers);
  newHeaders.set("current-domain", currentDomain);

  if (pathname.startsWith("/child1")) {
    const url = `https://next-rewrite-test-child-1.vercel.app${pathname}`;
    return NextResponse.rewrite(url, { request: { headers: newHeaders } });
  }
```

```
 // children middleware
 const currentDomain =
    req.headers.get("current-domain") ?? "domain not found in middleware";

  const newUrl = req.nextUrl.clone();
  newUrl.pathname = `/sites/${currentDomain}${req.nextUrl.pathname}`;

  // Rewriting path so we can get the current domain as query-param in getStaticProps
  return NextResponse.rewrite(newUrl);
```

This seems to work quite well in development, but there is one strange bug that shows up in production, and only for certain folder-structures:

Child app 1: `src/pages/sites/[currentDomain]/[[...supbpages]].tsx` Here be trouble
Child app 2: `src/pages/[[...supbpages]].tsx` This seems to work

When navigating to `https://next-rewrite-test-parent.vercel.app/child1` the url is redirected to `https://next-rewrite-test-parent.vercel.app/child1?currentDomain=next-rewrite-test-parent.vercel.app` after a short while.
 
## To reproduce

### Deploy all three app to vercel
I've allready deployed them here: 
- https://next-rewrite-test-parent.vercel.app/
- https://next-rewrite-test-child-1.vercel.app/child1
- https://next-rewrite-test-child-2.vercel.app/child2

If you want to deploy them yourself you have to update the domains in apps/parent/src/middleware.ts

Visist parent app and navigate to child 1 app. Watch the url update in the browser

### Local reproduction
When run locally everything seems to work. You can try this by running:
```
npm i
npm run build
npm run start
```