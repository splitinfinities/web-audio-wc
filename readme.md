![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Web Audio as HTML

Web Audio's API can often get a little daunting. This package provides HTML tags that simplify web audio and make wrapping sources in effects super simple! 

## API
#### `<web-audio>`
More to come...

#### `<web-audio-source>`
More to come...

#### `<web-audio-effect>`
More to come...

#### `<web-audio-visualizer>`
More to come...

#### `<web-audio-visualizer-shader>`
More to come...

#### `<web-audio-sequencer>`
More to come...

#### `<web-audio-debugger>`
More to come...

#### `Midi controller support`
More to come...


## Examples
- Simplest "click to play" example https://codepen.io/splitinfinities/pen/pWpvbe
- Creating a sequencer https://codepen.io/splitinfinities/pen/Ewoaoe
- Effects and contextual hooks https://codepen.io/splitinfinities/pen/qPpEYv
- Midi controllers: https://codepen.io/splitinfinities/pen/VMyYoY
- Sequencer and callbacks with GSAP https://codepen.io/splitinfinities/pen/zEjKPN

## Developing

To start building on to this package, clone this repo to a new directory:

```bash
git clone https://github.com/splitinfinities/web-audio-wc.git web-audio-wc
cd web-audio-wc
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To watch for file changes during develop, run:

```bash
npm run dev
```

To build the component for production, run:

```bash
npm run build
```

Need help? Check out Stencil's docs [here](https://stenciljs.com/docs/my-first-component).


## Using this component

### Script tag

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- Put a script tag similar to this `<script src='https://unpkg.com/web-audio-wc/dist/webaudio.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install web-audio-wc --save`
- Put a script tag similar to this `<script src='node_modules/web-audio-wc/dist/webaudio.js></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install web-audio-wc --save`
- Add `{ name: 'web-audio-wc' }` to your [collections](https://github.com/ionic-team/stencil-starter/blob/master/stencil.config.js#L5)
- Then you can use the element anywhere in your template, JSX, html etc
