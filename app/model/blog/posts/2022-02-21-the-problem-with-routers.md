---
title: The problem with routers
---

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
