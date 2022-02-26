---
title: You might not need Express.js
image: Photo by <a href="https://unsplash.com/@flo_stk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Florian Steciuk</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

Node.js came out in 2009. For context, the web was only in its early 20s. C++ and Perl were common for websites in the 90s. PHP and Java were born out of wanting to make Perl and C++ easier and more convenient. But the greater community realized these were not sufficient solutions and kept innovating.

Node's http module itself was an interesting innovation: combine a single-threaded web server with async I/O and callbacks in order to maximize server CPU time, hoping any amortization from this will average out to a net-zero cost for HTTP response time.

Express.js claims to be an "unopinionated" framework, but the whole point of its existence was to create a layer on top of the http module that adds developer convenience as long you follow certain opinionated assumptions.

One opinionated assumption is that helper libraries need a uniform function signature, which Express calls middleware. I'd argue that, as long as we have a top-level entry point function handler for all HTTP requests, we can just put all middleware in that function, in the form of helper functions handling requests or responses. I think the laws of supply and demand will naturally allow libraries to emerge without requiring a uniform function signature.

It's true that sometimes certain logic applies to a group of routes, e.g. running auth on all routes within an admin panel. Because Novo Cantico's routing system is push-based, this is very easily accomplished by ordinary JavaScript patterns, such as creating a class or function that pushes routes with certain handlers already wrapped.

Another opinionated assumption is mounting routes. Even though URLs have the *potential* to be hierarchical, they do not *have to be*. The only time I've ever found this helpful is when pushing auth-middleware onto a "sub-router" for an admin page. Another is by not having sub-routes know the root path of "parent" routes. This is solved in Novo Cantico with the simple JavaScript pattern of parent routeable objects creating child routeable objects and passing their root path to them, which the child can append to and push its own route.

One of the biggest and most opinionated assumptions Express makes is that you'll want to create all your routes at start-up time, by using the `app.[VERB](PATH, handler)` call signature, giving a format as PATH, and parsing it *on every request*, using the parsed parameters in database lookups. This assumption is reasonable when you start with the traditional technique of creating web servers.

But when we start from first principles, and reimagine web server technology from the ground up, it opens up completely new possibilities, where the assumptions Express makes are not as helpful as they were in 2012.

This is what I came up with in Novo Cantico. I wrote a little more about it in the other blog post I wrote today. Check it out and let me know what you think. Thanks for reading.
