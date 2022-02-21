## The Philosophy of Novo Cantico

"Novo Cantico" is taken from the 13th century hymn, [Puer natus in Bethlehem](https://www.youtube.com/watch?v=A1k5YTmxIVc&t=2573s), and means "a new song". Software and music are both rooted in principles and patterns; both are arts and sciences; both reflect a beauty, harmony, and order that's visible only to the mind, but which have a very real effect on our lives.

Humanity develops the arts and sciences by distilling lessons learned from the past, and solidifying them into a new foundation; we all stand on the shoulders of giants. Novo Cantico is a project that aims to take lessons learned from the difficulties of modern web development, start from first principles, and find a new harmony.



## This site's three purposes

1. **Share what I made:** Around December 8, 2021, I began to rewrite my personal website using brand new techniques. I ended up with code I'm convinced is truly innovative, so I'm gradually open sourcing it in the form of this very website's source code, located in this [GitHub repo](https://github.com/sdegutis/Novo-Cantico).

2. **Explain how it works:** Many of the concepts developed in Novo Cantico have very useful implications, but which are not always obvious. On this site I will explain how the new web software techniques of Novo Cantico work, and their various practical benefits.

3. **Offer my services:** I'm Steven, an independent software consultant with over a decade of experience. I'm currently available for hire, [email me](mailto:sbdegutis+novocantico@gmail.com) and let's talk. You can also sponsor me on GitHub to enable me to spend more time developing Novo Cantico.



## Principles behind Novo Cantico

### Use existing ecosystem

TypeScript and VS Code already provide a phenomenal development experience. Novo Cantico builds on this by creating a new runtime with deeply integrated TypeScript and VS Code support, to make local development extremely fast and easy.

### Use fundamental inputs/outputs in APIs

When APIs are designed with very clear and minimal inputs and outputs, they become very easy to write helper functions against, and even libraries, while ensuring that they all work well with each other.

For example, the only `body` type allowed by Novo Cantico is `Buffer`, which is the lowest common denominator. Because of this, helper functions can be written that take a buffer and can transform it, or which transform higher data types (like JSX or strings) into buffers. This enables a very stable ecosystem.
