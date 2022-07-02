---
title: Why isn't this on NPM?
image: Photo by <a href="https://unsplash.com/@chuttersnap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">CHUTTERSNAP</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

A framework is an app that calls into your code, and gives you a few functions to access it with. A library is a bunch of functions that you can start calling from within your app. Currently, Novo Cantico is literally just an app stored in a GitHub repo.

This is very important in the development of Novo Cantico. Over the course of 3 months, it evolved slowly but very carefully and intentionally, to meet specific concrete needs. I fully believe this is the best way to innovate the web software industry.

I could easily start extracting functions out of Novo Cantico and put it on NPM as a bunch of libraries, or even a framework, build up some API docs on this site, and probably start getting medium traffic to it. But that misses the entire point of Novo Cantico completely.

We have stagnated in the field of web development. Each year, new techniques come out that are simply further refinements of existing techniques. The very etymology of the word innovation requires that we start with a completely new essence, and not just add attributes to an existing thing.

If you read the source code to this website, which currently comprises the entirety of Novo Cantico, you'll see that in one respect it's nothing special: it's just a bunch of Node.js functions. But I hope experienced developers will also notice an orthogonality of certain patterns that have brand new implications, which I believe are true innovations in the web software field.

My ideal vision for the near future of Novo Cantico is to continue to solve concrete web development problems, either independently or with the help of other experienced software engineers and web developers, so that it continues to be actively useful.

This in no way implies a need to use NPM to package any of it; for now it's probably sufficient for us all to clone the GitHub repo, experiment with solutions to concrete problems in this website, and send PRs as places to have discussions and merge solutions.

Once such a solution seems completely solid, both in itself and in the overall source code, and seems like it won't change for a long time and hasn't changed for a reasonable amount of time, then it would seem reasonable to begin extracting Node.js libraries and putting them on NPM.
