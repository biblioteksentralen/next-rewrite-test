# Reproduction repo rewriting between next-apps
## What we try to solve
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

## The bug
This seems to work in development, but there is one strange bug that shows up when deployed to Vercel, and only for certain folder-structures. We've deployed four apps to Vercel to demonstrate, one "parent" app, and three "child" apps with different folder-structures and routers:

- Parent: 
  
  https://next-rewrite-test-parent.vercel.app/
- Child 1, bug 🐛
  
  `src/pages/sites/[currentDomain]/[[...supbpage]].tsx`
  
  Nested routes in pages-folder. This causes a strange redirect and error in console 🐛

  Deployed at: https://next-rewrite-test-child-1.vercel.app/child1
  
  You can see the bug by navigating to our deployed parent app at https://next-rewrite-test-parent.vercel.app/child1 and watch the url change to https://next-rewrite-test-parent.vercel.app/child1?currentDomain=next-rewrite-test-parent.vercel.app after a short while.
  
  Also get this error in the console:
  ```
  Uncaught (in promise) Error: Invariant: attempted to hard navigate to the same URL /child1?currentDomain=next-rewrite-test-parent.vercel.app
  ```

- Child 2, works ✅
  
  `src/pages/[[...supbpage]].tsx`

  Deployed at: https://next-rewrite-test-child-2.vercel.app/child2
  
  Visit through parent rewrite: https://next-rewrite-test-parent.vercel.app/child2
  

- Child 3, works ✅
  
  `src/app/sites/[currentDomain]/[[...supbpage]]/page.tsx`

  Deployed at: https://next-rewrite-test-child-3.vercel.app/child3
  
  Visit through parent rewrite: https://next-rewrite-test-parent.vercel.app/child3
  

## To reproduce

### Deploy apps to vercel
If you want to deploy them yourself you have to update the domains in apps/parent/src/middleware.ts. To watch the bug you only need to deploy the parent and child app 1.

Visist parent app and navigate to child 1 app. Watch the url update in the browser

### Local reproduction
I was not able to reproduce this error locally. You can try this by running:
```
npm i
npm run build
npm run start
```

### Update 15.05.2023
Got answer from Vercel customer support: 

Turned on 
```
  // next.config.js
  experimental: {
    externalMiddlewareRewritesResolve: true
  }
```

Things now seem to work! 🎉