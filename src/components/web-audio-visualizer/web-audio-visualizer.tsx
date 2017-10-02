import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'web-audio-visualizer',
  styleUrl: 'web-audio-visualizer.scss',
  shadow: true
})

export class WebAudioVisualizer {

  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <p>I'm a visualizer</p>
    );
  }
}
