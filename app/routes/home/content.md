
*Finding a new harmony for web software from first principles.*

---

"Novo Cantico" is taken from the chorus of [Puer natus in Bethlehem](https://www.youtube.com/watch?v=A1k5YTmxIVc&t=2573s) and means "a new song". Software and music are both rooted in principles and patterns; both are arts and sciences; both reflect a beauty, harmony, and order that's visible only to the mind, but which have a very real effect on our lives.

Humanity develops the arts and sciences by distilling lessons learned from the past, and solidifying them into a new foundation; we all stand on the shoulders of giants. Novo Cantico is a project that aims to take lessons learned from the difficulties of modern web development, start from first principles, and find a new harmony.



## This site's three purposes:

1. **Share what I made:** In early December 2021, I began to rewrite my website using brand new techniques, trying to solve many problems with modern web development. I finally ended up with code I think will be valuable to the greater software community, so I'm gradually open sourcing it in this [GitHub repo](https://github.com/sdegutis/Novo-Cantico), which is also the source code to the site you're on right now.

2. **Explain how it works:** Many of the concepts are so new or different that their implications are not always self-evident. And some of them are so counter to conventional wisdom that I am sure to receive critical feedback. I intend to explain and justify each of my technical decisions on this page, so that anyone can reuse the same principles and patterns, and feel confident in doing so.

3. **Offer my services:** My name is [Steven Degutis](https://sdegutis.github.io/), and I'm an independent software consultant with 10 years of professional software engineering experience, and another 10 of hobbyist software experience before that. I'm available for hire, feel free to [send me an email](mailto:sbdegutis+novocantico@gmail.com). You can also [sponsor me on GitHub](https://github.com/sdegutis/Novo-Cantico) to enable me to spend more time developing Novo Cantico.



## What is Novo Cantico concretely?

Novo Cantico is a new layer just on top of Node.js, including:

* A new TypeScript runtime
* A new HTTP router
* A new JSX view layer
* A new (old) database layer
* A new (old) model layer

The orthogonality of these layers has several interesting implications:

* Zero-downtime deployment
* Userland asset pipelines
* Free eternal-file-caching
* Data can live next to code
* No markup language lock-in
* Pre-rendering is the default



### A new TypeScript runtime

The very base layer of Novo Cantico is an unopinionated TypeScript runtime, with hot-reloading built in. This describes the 300 lines of code under [src/](https://github.com/sdegutis/Novo-Cantico/tree/main/src).

* **TypeScript** code in `app/` is translated by [sucrase](https://sucrase.io/) and compiled with [vm](https://nodejs.org/api/vm.html).

* **Runtime** support, implemented in [src/runtime.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/src/runtime.ts) and [src/filesys.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/src/filesys.ts)) makes this not only possible but also convenient (by adding globals `__dir` and `__file`).

* **Hot-reloading** is done by [chokidar](https://www.npmjs.com/package/chokidar) which watches the whole `app/` tree.

* **VS Code support**, including full type checking, working auto-imports, and full VS Code debugging support, is gained through carefully crafted config files.

The runtime simply calls `app/main.{ts,tsx}` and lets you do whatever you want from there. Typically this file would start a server (if not already started), and add new routes to it.



### A new HTTP router

Novo Cantico uses a push-based router, which maps routes (method & path) to TypeScript functions which provide a consistent response.

For example, you might set the key `GET /` to the landing page handler. Or you might loop through blog posts, and set `GET /posts/${post.date}/${post.slug}` to the `viewPost(this)` handler. If you wanted to edit your post live from your site, you might also add the same path but with `POST` at the front, with the handler `editPost(this)`.

Because routes in Novo Cantico are push-based, and independent of model objects or anything else, you have the freedom to decide how you want to generate routes. One technique I found helpful has been to create model objects, and store route handler objects on them, so that you can access the route's path directly and use it in links.

Check out [app/core/](https://github.com/sdegutis/Novo-Cantico/tree/main/app/core) to see how I implemented the router and server.



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



## Implications of this new design

Because the above layers are all orthogonal, they have many inherent advantages, but some of them are not very obvious or self-evident:



### Zero-downtime deployment

When a Novo Cantico web app is deployed, the base layer watches files under `app/` for changes. When it sees any change that can't be handled by the runtime itself, it shuts down the runtime and creates a new one. This essentially allows 0-downtime deployments.



### Userland asset pipelines

Because the server lives in userland, and all our responses always have a body of type `Buffer`, the concept of "asset pipelines" is moved into `app/` where we have complete control over integration with the rest of the site.



### Free eternal-file-caching

Because of our push-based approach, combined with a runtime that refreshes when data changes on disk, we can take our data files (images, fonts, etc), and create eternally-cached routes for them, getting the route back while still having access to our view-layer where we can use them. See [app/util/static.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/app/util/static.ts) for how this is implemented in Novo Cantico. See also [app/util/css.tsx](https://github.com/sdegutis/Novo-Cantico/blob/main/app/util/css.tsx) and [app/fonts](https://github.com/sdegutis/Novo-Cantico/tree/main/app/fonts) for how this is implemented to serve web fonts efficiently.



### Data can live next to code

For example, static images for a page do not need to be in a far away directory, only implicitly connected by having similar paths after a certain diversion in the path ancestry. They can live in the same directory. And you can even get access to the image file using `__dir.filesByName['image-big.jpg']`, and generate a static route for the image (see above), which you can place directly in the view for this page.

And since code and data can live side by side, you can create helper functions to access this data. This is what Novo Cantico currently does to make it easy to use a custom web font in any component: see [app/fonts/martel/index.tsx](https://github.com/sdegutis/Novo-Cantico/blob/main/app/fonts/martel/index.tsx) for the creation of the Martel font, and [app/components/page/page.tsx](https://github.com/sdegutis/Novo-Cantico/blob/main/app/components/page/page.tsx#L40-L41) for where and how it's used.



### No markup language lock-in

Traditionally static site generators either have a fixed markup language, or allow only a few choices via arcane configuration, which results in lock-in and limited flexibility.

Novo Cantico has no knowledge of your markup languages. But the pseudo-global `__dir` allows easy traversal of the current file's directory, and from there the whole app tree. From this special runtime addition, you can get access to file objects, which includes the file name, path, and a `Buffer` object.

This allows you to grab the contents of your file, parse it in any language you want (I personally usually use MarkdownIt and js-yaml), and do whatever you want with the loaded data, including pre-rendering any pages or creating model objects to house and manage this data.



### Pre-rendering is the default

Because the runtime loads your `main` module, and lets you set up your own server and its routes, this enables and even encourages you to do as much data-processing ahead of time as you can.

One technique which I use, and will implement shortly in the Novo Cantico site (when the blog is set up) is to create an array of blog posts on boot, populate it with BlogPost objects which each have their own route, render the markdown and the excerpt, and create the static routes for the big and small blog post images; all of this happening before a single route is even requested by a user.
