<br>

<p> <a href="https://playwright.dev/">Playwright</a> was used to execute automated test cases in the application's first window</p>
<p>

  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
  
</p>

<br>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/Fjy3vfgy5q)

[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/sponsors/badge.svg)](#sponsors)
[![StackOverflow][stackoverflow-img]][stackoverflow-url]

</div>

## Install the electron project

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/IsaSih/tests_suse your-project-name
cd your-project-name
npm install
```

**Having issues installing? See the <a href="https://github.com/electron-react-boilerplate">Electron-react-boilerplate</a> [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Install playwright in your project dependencies

```bash
npm i -D playwright @playwright/test
```

## Install Playwright extensions for VS Code

<a href="https://github.com/microsoft/playwright-vscode">Playwright Test for VS Code</a>

## Save your test files as [example.test.ts]

## Initialize playwright in your project

```bash
# Run from your project's root directory
npm init playwright@latest
```

## Starting Development - (not needed for executing Playwright tests as the test suit tests the application launch)

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

See the [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)


## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
