const sass = require('@stencil/sass');

exports.config = {
  namespace: 'webaudio',
  outputTargets: [
    { type: 'www' },
    { type: 'dist' }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
