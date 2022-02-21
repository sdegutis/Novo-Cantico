## What is Novo Cantico concretely?

Novo Cantico is a new set of backend TypeScript web technologies, including:

* [A new TypeScript runtime](#a-new-typescript-runtime)

* [A new HTTP router](#a-new-http-router)

* [A new JSX view layer](#a-new-jsx-view-layer)

* [A new (old) database layer](#a-new-old-database-layer)

* [A new (old) model layer](#a-new-old-model-layer)



### A new TypeScript runtime

The very base layer of Novo Cantico is an unopinionated TypeScript runtime, with hot-reloading built in. This only describes the 300 lines of code under [src/](https://github.com/sdegutis/Novo-Cantico/tree/main/src).

* **TypeScript** code in `app/` is compiled in-memory, using [sucrase](https://sucrase.io/) and [vm](https://nodejs.org/api/vm.html).

* **Runtime** is just a VM object, with the convenient globals `__dir` and `__file`.

* **Hot-reloading** is done by [chokidar](https://www.npmjs.com/package/chokidar) watching `app/**` and reloading the VM.

* **VS Code support**, including full type checking, working auto-imports, and full VS Code debugging support, is gained through carefully crafted config files.

The runtime simply calls `app/main.{ts,tsx}` and lets you do whatever you want from there. Typically this file would start a server (if not already started), and add new routes to it.



### A new HTTP router

Novo Cantico uses a push-based router, which maps routes (method & path) to TypeScript functions which provide a consistent response.

For example, you might set the key `GET /` to the landing page handler. Or you might loop through blog posts, and set `GET /posts/${post.date}/${post.slug}` to the `viewPost(this)` handler. If you wanted to edit your post live from your site, you might also add the same path but with `POST` at the front, with the handler `editPost(this)`.

Because routes in Novo Cantico are push-based, and independent of model objects or anything else, you have the freedom to decide how you want to generate routes. One technique I found helpful has been to create model objects, and store route handler objects on them, so that you can access the route's path directly and use it in links.

The server and router are implemented in the various files in [app/core](https://github.com/sdegutis/Novo-Cantico/tree/main/app/core). Two sample usages are [app/routes/home/index.tsx](https://github.com/sdegutis/Novo-Cantico/blob/main/app/routes/home/index.tsx) containing the source code to the page you're reading, and [app/util/static.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/app/util/static.ts) which serves cached static files (including ones used by this page---check the Network tab in your browser's dev tools).



### A new JSX view layer

All the previous view libraries seemed to be pointing to JSX: a natural expression of hierarchical data in native TypeScript. Because it *is* TypeScript, it does not have to reimplement any wheels.

Novo Cantico compiles JSX to `{ tag: string, attrs: object, children: any[] }`, so that you can do whatever you'd like with it. It's natural and simple to just render to a string, but there's also the freedom to render to server-side React or anything needed.

One technique I found helpful is to create a function that scans a JSX tree for stylesheets and `<script`> tags, hoists them up to the `<head>` element before sending to the browser, and uniques them by rendered string.

This allows you to use the same component in any number of other components, knowing that any CSS or JS it includes will only be seen once by the browser.

Check out the runtime-side implementation of JSX functionality at [app/core/jsx.tsx](https://github.com/sdegutis/Novo-Cantico/blob/main/app/core/jsx.tsx). (The lower level does nothing but ask `sucrase` to translate it into simple JavaScript objects).



### A new (old) database layer

Most sites have extremely static data: it only changes when the site owner changes it, either through source code (for devs) or an admin panel (non-devs).

When we have data that changes so seldom, we can load it into memory once, either on site-boot or when some of the data changes, and keep it in memory.

Even when a site has many big images and hundreds of blog posts, this will usually not be too much memory for Node.js to handle.

So the technique Novo Cantico adopted is to prefer using files from the repo itself (images, blog post Markdown files, whatever); to load them into memory when the runtime boots, parse them (if needed), and generate routes from them.

My personal site loads over a thousand Markdown files totaling less than 1kb, and over a hundred image files totaling ~20kb, and Node.js can hold it all in memory just fine.

There's nothing preventing you from calling out to a Postgres database, or a SQLite file, or an S3 bucket, and reading/writing any data as needed. For sites more dynamic than a personal site or blog, you'll probably still need to do this.



### A new (old) model layer

I should note here that this layer is not inherently a part of Novo Cantico per se, at least not yet. What I've written in this section is only what I've so far developed on my own personal website (which is basically a blog) per my needs.

The simplest way to model anything is with a plain old JavaScript (TypeScript) object. This is the approach I've taken with my personal website. I'm still evolving this layer for my own needs, but so far, I have model objects which:

1. Can handle loading/saving data to a file on disk
2. Houses the "view" route for viewing this object in a public HTTP route
3. Sometimes houses an "edit" route, if the model is editable from the site
