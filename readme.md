# Fly Web Starter Kit [![Build Status](https://travis-ci.org/lukeed/fly-kit-web.svg?branch=master)](https://travis-ci.org/lukeed/fly-kit-web)

> Starter Kit for scaffolding a Web App with [Fly](https://git.io/fly) as the task runner.

## Install
### [Yeoman](http://yeoman.io)
If you are looking for speed, convenience, and automation, there is a [Yeoman generator](https://github.com/lukeed/generator-fly-starter) generator to help you get started with Fly.

### Manually
```
$ git clone --depth=1 https://github.com/lukeed/fly-kit-web.git
$ cd fly-kit-web
$ rm -rf .git && git init
$ npm install
```

You now have a fresh copy of this repo.

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

**Test** -- Run tests (todo)
```
# todo
```

## Features
* Asset Versioning
* BrowserSync
* Browserify (Common JS)
* CSS Autoprefixer
* ES5, ES6, and ES7 support via Babel
* ESLint 
* HTML Minification
* **Offline** Caching (Service Worker)
* SASS pre-processor
* Uglify JS

## License

MIT © [Luke Edwards](https://github.com/lukeed)