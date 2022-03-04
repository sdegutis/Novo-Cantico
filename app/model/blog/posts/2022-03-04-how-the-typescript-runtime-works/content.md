---
title: How the TypeScript runtime works
image: Photo by <a href="https://unsplash.com/@marius?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marius Masalar</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

I accidentally created a "lightweight TypeScript runtime" inside Node.js as part of Novo Cantico. Like the rest of the project, it's a lot simpler than it seems:

1. All nodes under under `app/*` are created as [FsFile](https://github.com/sdegutis/Novo-Cantico/blob/main/src/filesys.ts#L109-L128) and [FsDir](https://github.com/sdegutis/Novo-Cantico/blob/main/src/filesys.ts#L44-L107) objects
2. All FsFile objects have a `Buffer` object
3. For any file ending in `.ts` or `.tsx`:
   1. Its buffer is read as UTF8
   2. [Transformed into JavaScript](https://github.com/sdegutis/Novo-Cantico/blob/main/src/runtime.ts#L86-L96) via [sucrase](https://sucrase.io/) with full import/export syntax, JSX support, and TypeScript support
   3. And [turned into a JS function](https://github.com/sdegutis/Novo-Cantico/blob/main/src/runtime.ts#L100) via [vm.compileFunction](https://nodejs.org/api/vm.html#vmcompilefunctioncode-params-options)

A tiny bit of wiring is needed to make `require` work (which sucrase transforms imports into), which is entirely the purpose of the small [Module](https://github.com/sdegutis/Novo-Cantico/blob/main/src/runtime.ts#L58-L124) class.

The [Runtime](https://github.com/sdegutis/Novo-Cantico/blob/main/src/runtime.ts#L7-L56) class just glues this all together, provides an entry point, and has (currently incomplete) shims for timeouts/intervals.

That's the whole runtime.

The benefit is that I can now completely load up an entire tree of TypeScript code, run it, and shut it down, instantly, all in a normal Node.js program, without needing the official TypeScript compiler or Babel installed; and sucrase is *very* fast.

This is the basis of both TypeScript support and hot-reloading support in Novo Cantico apps.
