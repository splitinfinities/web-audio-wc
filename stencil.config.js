exports.config = {
  namespace: 'webaudio',
  generateDistribution: true,
  bundles: [
    {
      components: [
        'web-audio-visualizer',
        'web-audio-visualizer-shader',
        'web-audio',
        'web-audio-source',
        'web-audio-effect',
        'web-audio-sequencer',
        'web-audio-debugger'
      ]
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
