import { Component, Prop, State, Method } from '@stencil/core';
import { assert } from '../../helpers'

import { buildBiquadFilterNode, buildDelayNode, buildReverbNode } from '../../effects'
import { WebAudio } from '../web-audio/web-audio'
import { WebAudioSource } from '../web-audio-source/web-audio-source'

@Component({
  tag: 'web-audio-effect',
  styleUrl: 'web-audio-effect.scss',
  shadow: true
})

export class WebAudioEffect {

  @Prop() type: string;
  @Prop() method: string = "lowshelf";
  @State() effect: string;
  @Prop() value: number = 1.0;

  @State() context: AudioContext;
  @State() child: WebAudioSource;
  @State() parent: WebAudioEffect | WebAudio;

  @Method()
  attachEffect (context) {
    this.context = context;

    if (assert(this.type, `"${this.type}" is not a valid effect - Routing around to masterGain."`)) {
      if (this.type === "panner") {
        // make a PannerNode
      } else if (this.type === "listener") {
        // make a AudioListener
      } else if (this.type === "reverb") {
        // make a ConvolverNode
        this.effect = buildReverbNode(this.context, this);
      } else if (this.type === "filter") {
        // make a BiquadFilterNode
        this.effect = buildBiquadFilterNode(this.context, this);
      } else if (this.type === "delay") {
        // make a DelayNode
        this.effect = buildDelayNode(this.context, this);
      } else if (this.type === "compression") {
        // make a DynamicsCompressorNode
      } else if (this.type === "distortion") {
        // make a WaveShaperNode
      }
    }

    return this.effect;
  }

  effects () {
     return ["panner", "listener", "reverb", "delay", "compression", "distortion", "filter"];
  }

  render() {
    return (
      <p>I'm an effect of {this.type}</p>
    );
  }
}
