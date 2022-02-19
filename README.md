# Novo Cantico

*Finding a new harmony for web software from first principles.*

Learn more at [NovoCantico.org](https://www.NovoCantico.org)

## Setting up local project

1. Clone this repo
2. Run `npm install`
3. In VS Code, run task "Tasks: Manage Automatic Tasks in Folder" and Allow it
4. Reload window

Now VS Code will automatically watch, build, and type-check your TypeScript code.

## Trying it out

1. Open terminal in project dir
2. Run `node out/main.js`
3. Output should have a URL you can open
4. Visit `http://localhost:8080/test`
5. It should say hello world as HTML
6. Change the response body in `app/routes/test/index.tsx` and save
7. Refresh browser, it should reflect your changes
