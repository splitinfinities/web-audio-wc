import { Component, Prop, State, Method, Element } from '@stencil/core';
import { WebAudio } from '../web-audio/web-audio';
import { WebAudioEffect } from '../web-audio-effect/web-audio-effect';

@Component({
  tag: 'web-audio-source',
  styleUrl: 'web-audio-source.scss',
  shadow: true
})

export class WebAudioSource {

  @Element() element: HTMLElement;

  @Prop() src: string;
  @Prop() name: string;

  @Prop() midiKey: number;
  @Prop() midiChannel: number;

  @State() status: string = "paused";

  @State() context: AudioContext;
  @State() masterGain: GainNode;
  @State() preGain: GainNode;
  @State() postGain: GainNode;
  @State() effects: Array<object> = [];

  @State() source: AudioBufferSourceNode;
  @State() buffer: AudioBuffer;
  @State() entry: string;

  @Method()
  play() {
    this.source = this.context.createBufferSource();

    this.source.buffer = this.buffer;

    if (Object.keys(this.effects).length > 0) {
      this.source.connect(this.preGain);
    } else {
      this.source.connect(this.postGain);
    }

    this.source.start(0);
  }

  @Method()
  assignBuffer (context, masterGain, buffer) {
    console.log(this.context);
    this.context = context;
    this.masterGain = masterGain;
    this.buffer = buffer;

    this.prepareEffects();

    if (Object.keys(this.effects).length > 0) {
      // Make the source and gain
      this.preGain = this.context.createGain();
      let previous = "";

      Object.keys(this.effects).reverse().forEach((element, index) => {
        if (index === 0) {
          this.preGain.connect(this.effects[element]);
        } else {
          this.effects[previous].connect(this.effects[element]);
        }

        previous = element;
      });

      this.postGain = this.context.createGain();
      this.effects[previous].connect(this.postGain)
      this.postGain.connect(this.masterGain);
    } else {
      this.postGain = this.context.createGain();
      this.postGain.connect(this.masterGain);
    }
  }

  prepareEffects () {
    if (this.element.parentElement.nodeName !== "WEB-AUDIO") {
      let element: any = this.element.parentElement;

      while (element.nodeName !== "WEB-AUDIO") {
        console.log(element.getAttribute("name"));
        this.effects[element.getAttribute("name")] = element.attachEffect(this.context);
        element = element.parentElement;
      }
    }
  }

  render() {
    return (
      <p>I'm an source</p>
    );
  }
}
