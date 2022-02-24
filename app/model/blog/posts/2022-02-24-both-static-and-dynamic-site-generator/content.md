---
title: Both static and dynamic site generator
image: Photo by <a href="https://unsplash.com/@rtrkchtr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Artur Kechter</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

Novo Cantico was born out of frustration.

As a little background: My personal website is basically a complex blog, but with several collection types, each of which have anywhere from dozens to hundreds of items, and which each can link to each other.

For about a year, the site used Jekyll. But more and more often, I found myself neglecting to fix bugs, add features, or even update layout or style, because it was honestly just too difficult. Liquid was hard to use for modeling the site's layout. I could only access and transform data through Liquid functions. If I wanted to edit anything at all on the site, I had to open up my local dev tools. And site-regeneration time was always at least 3-4 seconds. Even trying alternative SSGs did not reduce this by much.

Then I rewrote the site using Express.js, Postgres, Prisma, and Handlebars. This was barely an improvement on the modeling system. Data management actually became much harder and much worse, with the one exception that I could at least build an admin panel for editing it from the site. And while Jekyll went too far with implicit routes, Express.js went too far with explicit routes, making me have to double-check all input URL patterns against every possible combination of data, even nonsense data.

Finally, I decided to rewrite it using static site generator techniques, while still being a live web server. This had a few benefits:

* **Routing:** I can generate routes from my data models directly, making them "push" based, rather than "pull" based. This completely solved the issue of having to check URL patterns against nonsense data; if a route isn't generated on site-startup, it will automatically be a 404.

* **Routeable:** The new push-based router naturally leads to an interesting new interface, `Routeable`, which simply has a path, an HTTP method, and a function handler. Because it's an interface, it can be a simple object literal, or a class like [ViewBlogPage](https://github.com/sdegutis/Novo-Cantico/blob/main/app/routes/blog/blog-view.tsx) that can be stored on a model object [like in BlogPost's constructor](https://github.com/sdegutis/Novo-Cantico/blob/main/app/model/blog/post.ts#L31). It also means we can easily access an object's route's path like in the [LatestPosts](https://github.com/sdegutis/Novo-Cantico/blob/main/app/components/latest-posts/latest-posts.tsx#L11) component.

* **View:** I ended up with using JSX to do views server-side. This ends up with much of the same DX convenience that we get when writing client-side React apps: you just import your component and use it where you want. That's it.

* **Hot-reloading:** I wanted the site to regenerate every time I updated a file. So I built a new lightweight in-memory TypeScript runtime, which uses the sucrase library and the built-in vm module to compile source code under `app/` into an in-memory site. The chokidar library reloads this whenever a file beeps.

* **Deploying:** I tried to find a simple way to unify production and development, and the hot-reloading concept fit perfectly: production works identically to development, except that files are reloaded by pulling from git instead of by saving in an IDE. The site updates instantly in either case.

* **Zero-downtime:** Because of the way hot-reloading works, by simply replacing a JavaScript function handler with another one, there's effectively no downtime when deploying; the site simply responds with a new function instead of an old one, as soon as it's (instantaneously) compiled.

* **Model:** There is no official data layer for Novo Cantico. It can pull data from disk, or from S3, or anywhere. Because of this, the model layer is typically just a TypeScript object that can store objects which know how to create routes and render them.

* **Professional-grade:** Since routes are push-based, created on site-load, and generated in user-land code, it's very easy to add professional-grade touches to the site with simple helper functions. For example, [app/util/static.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/app/util/static.ts) contains the entire source code to take a Buffer (e.g. CSS, JS, or JPG files) and create a hashed route with a long cache time, returning this to the component to be used in a `href` or `src` tag.

All of these concepts are orthogonal and work together to create a very convenient development experience, a surprisingly fast and professional-grade website, and honestly they make web development enjoyable for me again, both as a software engineer and web developer.
