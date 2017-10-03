import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'web-audio-visualizer',
  styleUrl: 'web-audio-visualizer.scss',
  shadow: true
})

export class WebAudioVisualizer {

  @Prop() for: string = "web_audio";

  @Prop() context: AudioContext;

  @Prop() analyser: AnalyserNode;

  render() {
    return (
      <canvas id="canvas"></canvas>
    );
  }
}
