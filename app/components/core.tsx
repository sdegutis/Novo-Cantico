const Html: JSX.Component<{}> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">
    {children}
  </html>
</>

const Head: JSX.Component<{ imagePath?: string, title?: string, description?: string | undefined }> = (attrs, children) => <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{attrs.title && `${attrs.title} - `}Novo Cantico</title>
    <meta property="og:title" content={'Novo Cantico' + (attrs.title ? `: ${attrs.title}` : '')} />
    <meta property="og:locale" content="en_US" />
    <meta name="description" content={attrs.description ?? "Rethinking a new harmony for software from first principles"} />

    {children}
  </head>
</>;

const SiteFooter: JSX.Component<{}> = (attrs, children) => <>
  <footer style='color:#999; text-align:center; margin:3em 1em'>
    <p>
      {new Date().getFullYear()} Steven Degutis &copy; All Rights Reserved
      {' | '}
      <a href="mailto:sbdegutis@gmail.com">Contact</a>
      {' | '}
    </p>
  </footer>
</>;

export const Page: JSX.Component<{
  title: string,
  description?: string,
}> = (attrs, children) => <>
  <Html>
    <Head title={attrs.title} description={attrs.description} />
    <body>
      <main>
        {children}
      </main>
      <SiteFooter />
    </body>
  </Html>
</>;