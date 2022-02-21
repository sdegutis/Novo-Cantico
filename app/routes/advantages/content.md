## Implications of this new design

The design and interaction of these layers has several interesting implications:

* [Zero-downtime deployment](#zero-downtime-deployment)

* [Userland asset pipelines](#userland-asset-pipelines)

* [Free eternal-file-caching](#free-eternal-file-caching)

* [Data can live next to code](#data-can-live-next-to-code)

* [No markup language lock-in](#no-markup-language-lock-in)

* [Pre-rendering is the default](#pre-rendering-is-the-default)

* [Deeply integrated IDE support](#deeply-integrated-ide-support)

* [Hot-reloading is practicaly instant](#hot-reloading-is-practicaly-instant)

* [Deploying is practically instant](#deploying-is-practically-instant)



### Zero-downtime deployment

Because a Novo Cantico production site is exactly the same as a local development site, the same hot-reloading principle applies for deploying to production: simply make the source code files change on the production server however you want, e.g. pushing from GitHub, or directly via ssh.

Using the `??=` operator, the HTTP server is created only once when your app starts up. During any hot-reloads, only the request handler is recreated. This effectively means 0-downtime deployments whenever source files change on your production server.



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

One technique which I use is to create an array of blog posts on boot, populate it with BlogPost objects which each have their own route, render the markdown and the excerpt, and create the static routes for the big and small blog post images; all of this happening before a single route is even requested by a user.

This site's blog post system is an example of this: in [app/model/blog/post.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/app/model/blog/post.ts), Markdown content is rendered immediately when the object is constructed, which happens during the runtime reload.



### Deeply integrated IDE support

Because the runtime lives entirely in memory, and is under our control, it only took a little while to come up with configuration files that made it play perfectly well with VS Code and the TypeScript compiler. This means you get tons of typical TypeScript + VS Code features for free:

* Complete type-checking with comprehensive IDE support
* Full debugger support with ordinary breakpoints
* Use the IDE to organize your files even though they live in memory
* All file changes are reflected instantly during hot-reloading



### Hot-reloading is practicaly instant

On my personal website (which is basically a complex blog), loading over 1,000 Markdown files and 20kb of images is nearly instantaneous. I can't refresh the browser as fast as it loads when I save a file during local development. It seems to take 1-2 seconds *at most*.

This is gained by having the runtime live in a simple VM object using Node's own built-in vm module, and recreating a new one whenever the file watcher sees your changes. Apparently loading a thousand files from disk, parsing them as YAML and Markdown, and creating a new VM, is not actually very expensive.



### Deploying is practically instant

Because the production website is *exactly the same* as the local development website (the only exception being the ENV variable `BASE_URL`), all the advantages of hot-reloading work in production also.

Which means, if you set up your deployment strategy to somehow push or pull changes from GitHub into your production site, deployment takes 1-2 seconds *at most*, just like in local development.
