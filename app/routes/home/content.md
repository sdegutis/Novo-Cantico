

# Novo Cantico

*Finding a new harmony for web software from first principles.*

---

"Novo Cantico" is taken from the chorus of [Puer natus in Bethlehem](https://www.youtube.com/watch?v=A1k5YTmxIVc&t=2573s) and means "a new song". Software and music are both rooted in principles and patterns; both are arts and sciences; both reflect a beauty, harmony, and order that's visible only to the mind, but which have a very real effect on our lives.

Humanity develops the arts and sciences by distilling lessons learned from the past, and solidifying them into a new foundation; we all stand on the shoulders of giants. Novo Cantico is a project that aims to take lessons learned from the difficulties of modern web development, start from first principles, and find a new harmony.


This site serves three purposes:

1. **Share what I have:** In early December 2021, I began to rewrite my website using brand new techniques, trying to solve many problems with modern web development. I finally ended up with code I think will be valuable to the greater software community, so I'm gradually open sourcing it in this [GitHub repo](https://github.com/sdegutis/Novo-Cantico).

2. **Explain how it works:** Many of the concepts are so new or different that their implications are not always self-evident. And some of them are so counter to conventional wisdom that I am sure to receive critical feedback. I intend to explain and justify each of my technical decisions on this page, so that anyone can reuse the same principles and patterns, and feel confident in doing so.

3. **Offer my services:** My name is Steven Degutis, and I'm an independent software consultant with 10 years of professional experience, and another 10 of hobbyist software experience before that. I'm available for hire, [send me an email](mailto:sbdegutis+novocantico@gmail.com).

## What is Novo Cantico concretely?

Everything has a beginning and an end, a source and a destination. So I'll start by telling you what I ended up with for Novo Cantico, then I'll explain how I got there.

### A new TypeScript runtime

You could say, the base layer of Novo Cantico is an unopinionated TypeScript runtime, with hot-reloading built in. But this only describes the 300 lines of code under [src/](https://github.com/sdegutis/Novo-Cantico/tree/main/src).

* TypeScript code under `app/` is translated by [sucrase](https://sucrase.io/), and compiled into JavaScript functions by Node's own [vm module](https://nodejs.org/api/vm.html).
* This required a custom runtime, so I wrote one in [src/runtime.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/src/runtime.ts). It also adds `__dir` and `__file` objects to each TypeScript file, provided by [src/filesys.ts](https://github.com/sdegutis/Novo-Cantico/blob/main/src/filesys.ts).
* The [chokidar](https://www.npmjs.com/package/chokidar) library provides support for hot-reloading the runtime.
* Configuration files were set up to make sure it plays extremely nicely with VS Code, including full type checking, working auto-imports, and full VS Code debugging support.

When a Novo Cantico web app is deployed, this base layer never changes, but when any files under `app/` change, the runtime can be reloaded from scratch, with in a fresh (globals) context. As a byproduct, this allows 0-downtime deployments.

### A new router


