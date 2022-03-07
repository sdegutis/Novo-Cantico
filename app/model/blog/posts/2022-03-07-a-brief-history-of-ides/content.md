---
title: A brief history of IDEs
image: Photo by <a href="https://unsplash.com/@riku?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Riku Lu</a> on <a href="https://unsplash.com/s/photos/ide?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

I'm going to start from the 2000s because that's when I started.

**Early 2000s**: Emacs and Vim had already been around and done a lot of this stuff. But on Windows and Mac, Notepad++ and TextMade had three main features: file tree explorer, syntax highlighting, and basic plugin support.

**Late 2000s**: Sublime Text appeared, worked on every platform, did everything way better and faster than everyone else, and also brought the command palette and multiple cursors.

**Early 2010s**: Atom broke new ground by making doing the whole IDE inside webkit (producing Electron). In 2014, Microsoft took this, and all previous ideas, and made VS Code.

The end. There's just VS Code now. It does everything way better than everyone else, because it has millions of dollars and human-hours poured into it.

I'm pretty sure Microsoft just makes VS Code for itself, and the rest of us just sort of benefit from it, and sometimes give good feedback/PRs that make their editor better.

So how does this have to do with Novo Cantico (the *whole purpose* of this site)? Well it doesn't, but I wanted to write this blog post. But to jimmy-rig a purpose in:

Because an IDE is an integral part of a frictionless developer experience. When I designed Novo Cantico, I wanted to make sure that it would work seamlessly in VS Code, despite having its [own unique runtime](https://www.novocantico.org/blog/2022-03-04-how-the-typescript-runtime-works). In fact, VS Code makes runtime features even easier, such as making it super easy to use `__dir` and `__file` via completion-suggestions.

Like any good blog post, I'm sure this one is riddled with unimportant innacuracies. But I think it's essentially right.
