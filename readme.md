# Fly Kit: Ghost Theme [![Build Status](https://travis-ci.org/lukeed/fly-kit-web.svg?branch=master)](https://travis-ci.org/lukeed/fly-kit-web)

> A Ghost Theme starter kit built with Fly for AMAZINGLY FAST development!

The starter pack will "rebuild" the [Casper theme](https://github.com/TryGhost/Casper) as a demo to help you get started.

## Install

(Yeoman generator coming soon!)

```bash
cd path/to/ghost/content/themes
git clone --depth=1 https://github.com/lukeed/fly-kit-ghost.git theme-name
cd theme-name
rm -rf .git && git init 
npm install
```

You now have a fresh copy of this repo.

#### Important!

You will then need to update the `name` and `version` of your `package.json` file. Your theme's `name` _should_ match the directory's name.

If your development URL is **not** `http://localhost:2368`, you will need to update the `proxy` variable at the top of the `flyfile.js`.

## Usage

**Default** -- build development files & recompile on file changes
```
npm run fly
```

**Watch** -- build development files & start a server. Recompiles & refreshes server on file changes
```
npm run watch
```

**Build** -- build production-ready assets
```
npm run build
```

**Serve** -- build production-ready assets & start a server
```
npm run serve
```

## Features
* Babel (for ES6 and ES7 support)
* Browserify Bundles (Common JS)
* BrowserSync (Live-Reload)
* CSS Autoprefixer
* Javascript Linting via [XO](https://github.com/sindresorhus/xo), supports ES6 and ES7
* **Offline Support** (Service Worker Caching)
* SASS
* Uglify JS

## License

MIT © [Luke Edwards](https://github.com/lukeed)
