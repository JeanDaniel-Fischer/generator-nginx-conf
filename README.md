# generator-nginx-conf [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Yeoman generator for easy bootstraping of nginx config file.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-nginx-conf using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-nginx-conf
```

Then generate your nginx conf:

```bash
yo nginx-conf
```

You can also use the set of sub generator according to your need :
* yo nginx-conf:server allow to only create a server section.
* yo nginx-conf:angular allow to create a nginx conf made for an Angular app. The same as main generator but with a lot of presets.

## Contributing
Feel free to open issues, send merge request and ask for improvements.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Jean-Daniel Fischer]()


[npm-image]: https://badge.fury.io/js/generator-nginx-conf.svg
[npm-url]: https://npmjs.org/package/generator-nginx-conf
[travis-image]: https://travis-ci.org/JeanDaniel-Fischer/generator-nginx-conf.svg?branch=master
[travis-url]: https://travis-ci.org/JeanDaniel-Fischer/generator-nginx-conf
[daviddm-image]: https://david-dm.org/JeanDaniel-Fischer/generator-nginx-conf.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/JeanDaniel-Fischer/generator-nginx-conf
