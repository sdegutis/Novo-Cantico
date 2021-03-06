import { baseUrl } from "../../core/http-server";
import { Martel } from "../../fonts/martel";
import { staticRouteFor } from "../../util/static";
import { NarrowContainer } from "../narrow-container/container";
import { ViewSourceLink } from "../view-source/view-source";
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

export const Page: JSX.Component<{
  title: string,
  description?: string,
}> = (attrs, children) => <>
  <Html>
    <Head title={attrs.title} description={attrs.description} />
    <body>

      <Martel.load />
      <style>{`html { font-family: ${Martel.fontFamily} }`}</style>

      <script src={staticRouteFor(replaceInFile(fixExternalLinks, {
        'BASE_URL': baseUrl,
      }))} defer />
      <main>
        {children}
        <NarrowContainer style='margin-bottom:3em'>
          <p><ViewSourceLink file={__file}>View Page component's source</ViewSourceLink></p>
        </NarrowContainer>
      </main>
    </body>
  </Html>
</>;

function replaceInFile(file: { buffer: Buffer, name: string }, replacements: Record<string, string>) {
  return {
    name: file.name,
    buffer: Buffer.from(replaceInString(file.buffer.toString('utf8'), replacements), 'utf8'),
  };
}

function replaceInString(string: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce((s, [k, v]) => {
    return s.replace(k, v);
  }, string);
}
