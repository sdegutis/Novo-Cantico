## Implications of this new design

The design and interaction of these layers has several interesting implications:

* [Zero-downtime deployment](#zero-downtime-deployment)

* [Userland asset pipelines](#userland-asset-pipelines)

* [Free eternal-file-caching](#free-eternal-file-caching)

* [Data can live next to code](#data-can-live-next-to-code)

* [No markup language lock-in](#no-markup-language-lock-in)

* [Pre-rendering is the default](#pre-rendering-is-the-default)

Some more advantages of developing a site with Novo Cantico:

* Edit in VS Code, with type checking, hot-reloading, and debugger support

* Loading over 1,000 Markdown files and 20kb of images is instantaneous

* Pushing changes via git takes 1-2 seconds to go live, with 0-downtime



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
