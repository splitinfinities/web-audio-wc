import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'web-audio-sequencer',
  styleUrl: 'web-audio-sequencer.scss',
  shadow: true
})

export class WebAudioSequencer {

  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <p>I'm an sequencer</p>
    );
  }
}
