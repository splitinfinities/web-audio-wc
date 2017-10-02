import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'web-audio-visualizer-shader',
  styleUrl: 'web-audio-visualizer-shader.scss',
  shadow: true
})

export class WebAudioVisualizerShader {

  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <p>I'm a shader</p>
    );
  }
}
