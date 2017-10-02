import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'web-audio-effect',
  styleUrl: 'web-audio-effect.scss',
  shadow: true
})

export class WebAudioEffect {

  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <p>I'm an effect</p>
    );
  }
}
