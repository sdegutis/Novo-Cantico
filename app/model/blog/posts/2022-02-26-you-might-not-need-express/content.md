---
title: You might not need Express.js
image: Photo by <a href="https://unsplash.com/@flo_stk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Florian Steciuk</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

Node.js came out in 2009. For context, the web was only in its early 20s. C++ and Perl were common for websites in the 90s. PHP and Java were born out of wanting to make Perl and C++ easier and more convenient. But the greater community realized these were not sufficient solutions and kept innovating.

Node's http module itself was an interesting innovation: combine a single-threaded web server with async I/O and callbacks in order to maximize server CPU time, hoping any amortization from this will average out to a net-zero cost for HTTP response time.

Express.js was mostly a convenience layer on top of the http module. The most innovative thing it brought was the concept of middleware as a fixed, uniform function signature in order to ensure libraries could be compatible with each other. I'd argue that simple laws of supply and demand would have done the same.

React and create-react-app epitomized the movement to front-end frameworks. I think the biggest reason for this was a dissatisfaction with back-end servers and the extreme amount of boilerplate and hassle that came with basically every framework in any language, whether explicit or implicitly hid by framework "magic".

It's true there are other advantages to having the back-end be a simple data-server to feed the front-end, which completely handles views. There are also serious downsides still being worked out, such as loss of SEO, unification of rendering logic in both front-end and back-end, size of the front-end bundle, caching the front-end properly, and probably others I forgot. Overall I don't think the amortization worked out as well as the overall software community hoped.

I have to mention briefly that software developers are modern philosophers: by virtue of our very paycheck, we are forced to create in pure imagination entire working systems with extreme semantic precision and distinction, create them out of nothing, and hope that they act just as we predicted.

But philosophy must start with *correct* first principles. Whenever a philosopher starts on the wrong principles, they have no way of getting to a good point, because they've started away from it, and facing away from it they walked forward. Anyone who had to rewrite entire files *because it was the wrong code* knows exactly what I mean.

That's not to say there's *one right way* to do software. In all software, as in everything in life, there are two points: where are you coming from, and where are you heading. We have to connect these with the right bridge if we want to successfully get from point A to point B.

Now, look at web software as a whole.

What are we starting with? Data. Half the data comes from us or those we pay. The other half comes from users and APIs. And these two halves are not always 50/50.

And what do we want at the end of the day? DOM objects to show up in a browser. That's it. Mobile or desktop, HTML or JS, doesn't matter. It's all the DOM.

So these are our two starting points. Now, what are the bridge rails we have no control over? HTTP verbs and HTTP paths. We have to use these no matter what.

Which means, really all we need to think of are how to take data as input, use HTTP as the bridge, and produce DOM as output. This doesn't require the concept of middleware, or a router, or request and response objects. What's the simplest way to do this? A function.

This is where http starts off well, although it's strange to have a response object that you can only call certain methods on once (or it *will* throw an exception); functions have parameters and returns results, and this fits our model perfectly.

So why did http and Express use the response object instead of a return result? Because they expect you're going to do a bunch of async calls during your handler, and they wanted to make it async. Node didn't yet have Promises, which would have made this *a little* cleaner, but using async HTTP handlers *is still the wrong solution*.

The question really should be, why do we need to load everything *in every request*? Ostensibly this is because we already needed to scale to multiple web servers, and user data may have changed since the last request, so we must always get the freshest data. Right? But then we have to deal with caching layers, because too can get slow.

Now, assume for a minute that somehow I was magically able to make your HTTP responses *lightning fast*. Do you actually still *need* multiple web servers with the traffic load you're getting? If your reason was solely for performance, then scaling to multiple servers is only *one* performance solution, among other incompatible ones.

Taking that solution off the table, and assuming a single other web server as one of the first principles, what other possibilities open up?

For one thing, we no longer need data to live separately from the server. There are two reasons to keep them separate: in case the server is destroyed, either by accident or as part of a deployment strategy; and if you're already scaling to multiple servers which each need fresh access to any data at all times.

But I've been running web servers with low-to-medium traffic for decades, on Linode, AWS, Heroku, and DigitalOcean, always less than $20/month, and not a single server has ever been deleted or destroyed by accident, and I've never needed to scale to more than one, or to have a deployment strategy that involved server recreation.

So let's assume we can make the web server the *central source of truth* for our data. Where's the best place to store data? In memory! Node.js has a reasonably large default memory, and you can increase it with a simple CLI flag.

My personal website stores dozens of MB worth of images, and thousands of text-based items ranging from 5-10 minutes in average reading time, *all in Node's memory*, particularly in strings and Buffer objects. And it does this very comfortably.

I'm convinced pretty much all independent web stores would fit this model, which list a few hundred products, each with a description and a few pictures, and get a few hundred or few thousand visitors per day.

We'd still need to back all this data up somehow, in case the server crashes or gets deleted. And we can still use a database for this, like Postgres, SQLite, or even S3 or GitHub. The point is that the server *now is* the souce of data-truth, and the database is simply a place to back it up to *as it changes*, and to load it from *whenever the server restarts*. That's all it becomes, essentially a backup.

Where are we so far? A single web server that has the entire DB in memory. This innovation opens up important new possibilities.

For one thing, we can generate our routes ahead of time. I touched on this in more depth in my recent blog post, but in short, we no longer have to create a route for `/posts/:date-:slug.html`, parse `params.date` to make sure it's in `yyyy-mm-dd` format, and do a DB lookup for `{ where: { date, slug }}` using something like Prisma.

Instead, we now have a post object *in memory already*, and we can *push* a route with the method GET, the path `/posts/${post.date.toISODate()}-${post.slug}.html`, and a request handler that has this `BlogPost` object in lexical scope, already pre-rendered as much HTML as it can, and just renders the rest and returns the HTML.

So what do you have now? A robust web server that runs a very small amount of JavaScript code in the extremely fast V8 engine on each HTTP request, without doing a single DB lookup or file IO or actually *anything async at all*.

Since this is orthogonal to what you actually *deliver* to the front-end, if you use proper front-end techniques and optimizations, such as the static-route-generating helper function I mentioned in the last blog post (used to serve the image below), you can create extremely fast-loading websites. For example, this is the Lighthouse score my own personal website got:

![score.png](score.png)

This is just one of the many innovations that I came up with in Novo Cantico over the past couple months. I'll write about more of them in future blog posts, and I hope you found this interesting, and would love to hear your thoughts in some third party comment system like HN or reddit. Thanks for reading.





<!-- 




But these weren't enough. Other frameworks were born practically every year to try to innovate web server technology, and sometimes even entire languages were created specialized for the web, either front-end or back-end.











Node.js itself came out in 2009, and Express.js came out only a year later, picking up where Node.js's builtin "http" module left off, and only adding convenience layers.

And Express.js should not describe itself as "unopinionated." By its nature, a software framework is *very* opinionated. It assumes a lot about how you ought to structure your code.

In particular, Express assumes that:

* Your data is so dynamic that you only know the shape of your routes (HTTP method and a generic route format) but not the full paths themselves

* Your data is so perfectly hierarchical that you can "mount" routes on top of other routes

* Your routes require some kind of view framework like in the days of Java to render HTML for the front-end

* Composability that allows compatible libraries to emerge requires the concept of middleware

These were all good assumptions coming from Rails and Java. They don't 

Other Node.js frameworks have the same issue: they're either trying to copy Express, or Rails, or some other existing server framework.



But these layers are only useful if the assumptions they're based on are really true. And software frameworks are about assumptions of how code should be structured.


As a software community, we're *stuck*. What we need is *real innovation*. Something *new*, something *different*.









Express.js came out in 2010. That's 12 years ago. It reached version 1 in 2010, version 2 in 2011, version 3 in 2012, version 4 in 2014, and 8 years later version 5 is *still in beta*.

For context, Node.js came out in 2009, and was 1 years old when Express.js was first written. Nobody really knew how to write Node.js apps. The special feature of Node.js was how it handled I/O, being callback based and single-threaded.

The built-in http module takes a single "request handler" of type `(req: object, res: object) => void` and Express.js adopts the same pattern and just adds extra functionality to the Request object, the Response object, and the Application object that adds more convenience methods that wrap this request handler.

 -->
