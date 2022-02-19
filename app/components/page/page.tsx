import { staticRouteFor } from "../../util/static";
import fixExternalLinks from './fix-external-links.js';

const Html: JSX.Component<{}> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">
    {children}
  </html>
</>;

export const Stylesheet: JSX.Component<{ src: string }> = (attrs, children) => <>
  <link rel="stylesheet" href={attrs.src} />
</>;

const Head: JSX.Component<{ imagePath?: string, title?: string, description?: string | undefined }> = (attrs, children) => <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{attrs.title && `${attrs.title} - `}Novo Cantico</title>
    <meta property="og:title" content={'Novo Cantico' + (attrs.title ? `: ${attrs.title}` : '')} />
    <meta property="og:locale" content="en_US" />
    <meta name="description" content={attrs.description ?? "Finding a new harmony for web software from first principles"} />

    <Stylesheet src={staticRouteFor(__dir.filesByName['page.css']!)} />

    {children}
  </head>
</>;

const SiteFooter: JSX.Component<{}> = (attrs, children) => <>
  <footer style='color:#999; text-align:center; margin:3em 1em'>
    <a href="https://github.com/sdegutis/Novo-Cantico">GitHub Project Page</a>
  </footer>
</>;

export const Page: JSX.Component<{
  title: string,
  description?: string,
}> = (attrs, children) => <>
  <Html>
    <Head title={attrs.title} description={attrs.description} />
    <body>
      <script src={staticRouteFor(fixExternalLinks)} defer />
      <main>
        {children}
      </main>
      <SiteFooter />
    </body>
  </Html>
</>;