import { Component, Prop } from '@stencil/core';
import { BufferLoader } from '../../bufferloader';

@Component({
  tag: 'web-audio',
  styleUrl: 'web-audio.scss',
  shadow: true
})

export class WebAudio {

  @Prop() first: string;

  @Prop() last: string;
}
