import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'web-audio-debugger',
  styleUrl: 'web-audio-debugger.scss',
  shadow: true
})

export class WebAudioDebugger {

  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <p>I'm a debugger</p>
    );
  }
}
