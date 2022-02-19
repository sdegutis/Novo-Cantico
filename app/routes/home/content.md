

# Novo Cantico

*Finding a new harmony for web software from first principles.*

---

"Novo Cantico" is taken from the chorus of [Puer natus in Bethlehem](https://www.youtube.com/watch?v=A1k5YTmxIVc&t=2573s) and means "a new song". Software and music are both rooted in principles and patterns; both are arts and sciences; both reflect a beauty, harmony, and order that's visible only to the mind, but which have a very real effect on our lives.

Humanity develops the arts and sciences by distilling lessons learned from the past, and solidifying them into a new foundation; we all stand on the shoulders of giants. Novo Cantico is a project that aims to take lessons learned from the difficulties of modern web development, start from first principles, and find a new harmony.


This site serves three purposes:

1. **Share what I have:** In early December 2021, I began to rewrite my website using brand new techniques, trying to solve many problems with modern web development. I finally ended up with code I think will be valuable to the greater software community, so I'm gradually open sourcing it in this [GitHub repo](https://github.com/sdegutis/Novo-Cantico).

2. **Explain how it works:** Many of the concepts are so new or different that their implications are not always self-evident. And some of them are so counter to conventional wisdom that I am sure to receive critical feedback. I intend to explain and justify each of my technical decisions on this page, so that anyone can reuse the same principles and patterns, and feel confident in doing so.

3. **Offer my services:** My name is Steven Degutis, and I'm an independent software consultant with 10 years of professional experience, and another 10 of hobbyist software experience before that. I'm available for hire for consulting work, [send me an email](mailto:sbdegutis+novocantico@gmail.com) to discuss this with me.

## What is Novo Cantico concretely?

Everything has a beginning and an end, a source and a destination. So I'll start by telling you what I ended up with for Novo Cantico, then I'll explain how I got there.

### A new TypeScript runtime

You could say, the base layer of Novo Cantico is an unopinionated TypeScript runtime, with hot-reloading built in. But this only describes the 300 lines of code under [src/](https://github.com/sdegutis/Novo-Cantico/tree/main/src).

* **TypeScript compiler:** TypeScript code under `app/` is translated by [sucrase](https://sucrase.io/), and compiled into JavaScript functions by Node's own [vm module](https://nodejs.org/api/vm.html).

* **Custom runtime:** This required a custom runtime, so I wrote one in [src/runtime.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/src/runtime.ts). It also adds extremely convenient `__dir` and `__file` objects to each TypeScript module, provided by [src/filesys.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/src/filesys.ts).

* **Hot-reloading:** The [chokidar](https://www.npmjs.com/package/chokidar) library lets me know when files changed under `app/`. If it was a TypeScript file, then the whole runtime should be reloaded. But if it was just a data file (like a Markdown file), it's overkill to reload the whole runtime.

* **IDE support:** Configuration files were set up to make sure it plays extremely nicely with VS Code, including full type checking, working auto-imports, and full VS Code debugging support.

The runtime simply calls `app/main.ts` or `app/main.tsx` and lets you do whatever you want from there. Typically this file would start a server (if not already started), and add new routes to it.

When a Novo Cantico web app is deployed, this base layer never changes, but when any files under `app/` change, the runtime can be reloaded from scratch, with in a fresh (globals) context. As a byproduct, this allows 0-downtime deployments.

### A new router

There were several problems with existing routing techniques:

1. I don't want my public routes to have to be tied to where my source code is stored in the local filesystem. That makes it hard for me to organize my project.

2. When code hard-codes paths, it becomes brittle. Especially when some parts of the paths are dynamic, which makes finding them even harder.

3. It's strange to have *any input* be valid for a dynamic part of a route. If you only have `/posts/{1-10}/view`, why do a database lookup for `/posts/not-even-a-number/view`?

So I thought of what are the purposes of routes:

1. To tie one of my TypeScript functions to a unique handle accessible from the outside world.
2. To give the user (or more likely SEO and crawlers) some basic indication of what what function does.

Because of this, Novo Cantico uses a *push-based* technique for routing, similar to static site generators. The router is just a map of method & path (e.g. `GET /`) to a function.

If you have a blog website with a bunch of blog posts, you can load them (via `__dir` if you want), create routes from them, and push these routes into the route map.

If you're concerned about performance, I can give a bit of anecdotal comfort here: My personal website has thousands of such data files, each of which loads from disk pretty much instantly. Hot-reloads of my site take less than a second.

Check out [app/core/](https://github.com/sdegutis/Novo-Cantico/tree/main/app/core) to see how I implemented the router and server.


