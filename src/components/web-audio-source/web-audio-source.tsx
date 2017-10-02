import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'web-audio-source',
  styleUrl: 'web-audio-source.scss',
  shadow: true
})

export class WebAudioSource {

  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <p>I'm an source</p>
    );
  }
}
