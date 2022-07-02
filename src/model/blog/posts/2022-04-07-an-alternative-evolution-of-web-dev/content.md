---
title: An alternative evolution of web development
image: Bowser, from the amazing Super Mario Bros. movie
---

Dear bored reader, I have a theory that might help you spend like 5 minutes thinking and then 20 minutes arguing with strangers on Hacker News or Reddit about the wrong things.

What if a ton of the innovations in the past decade were *branched off the wrong part of the tree*?

Client-side browser frameworks evolved to the point where we now need to bundle and serve *megabytes* of data to every new client. Bundlers had to step in to try to reduce this size. Caching became a necessity, even getting baked into web standards. Someone actually had to abandon their domain because this was so complicated.

Server-side frameworks kept using the same original model: at every request, fetch something from SQL somewhere, do some computering, put the result in an HTML renderer and send the string to the browser. *On every request.* Even identical ones.

Let's say you're running a small online etsy-like shop. Heck, let's say you're Etsy. *How often does your data really change?* Do you need to do a DB lookup every time? The shop-owner changes the data maybe once a day or once a week, if that. Customers basically never change data, except their own cart, or maybe an occasional review.

So first of all, on the server-side, why do we need to do every step as late as possible? Why not pre-render *every page, ahead of time*, so that every GET request is just a lookup into a `Map<string,string>`?

Every time some data changes, literally just re-prerender every route that it touches. If that's too difficult, just re-prerender *everything*. It's V8, it's going to take like less than a second with the right view framework. During that one second, your server will just serve the old copy, so it's not like you have any downtime.

This makes the server-side *excessively fast*. Mere milliseconds to show *any page* on your site. There's *no DB lookups*, rendering is all done *ahead* of time.

Now that the server-side is lightning fast, why do we need client-side JavaScript? You've rendered every page you want to show the user, every possibility. What else do you need to do on your e-shop with front-end JS? Maybe you have a sorter or filterer that you want to do client-side, sure, but those are like 20 lines of plain JavaScript using ordinary DOM methods. (You could also do them server-side, you know. That's still a thing.)

That's exactly how this site works. Except that it uses [sucrase](https://sucrase.io/) to compile TypeScript into JavaScript, and uses the [built-in vm module](https://nodejs.org/api/vm.html) to turn that into a function, so that my views are just JS objects created with JSX syntax.

(Okay not *exactly* how this site's made, but close. Each route is a function, not a pre-rendered string. But I *could* do that... Only reason I didn't is because I only thought of it today.)
