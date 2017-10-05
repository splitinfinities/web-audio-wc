import { Component, Prop, State, Method, Element } from '@stencil/core'
import { WebAudioVisualizer } from '../web-audio-visualizer/web-audio-visualizer'
import { WebAudioSource } from '../web-audio-source/web-audio-source'
import { BufferLoader } from '../../bufferloader'
import { forEach, delay } from '../../helpers'
import webmidi from 'webmidi';

interface MyCustomEvent extends CustomEvent {
  note: {
    number: number
  },
  data: object
}

interface MyWindow extends Window {
  myFunction(): void
}

declare var window


@Component({
  tag: 'web-audio',
  styleUrl: 'web-audio.scss',
  shadow: true
})

export class WebAudio {
  // This instance of the element
  @Element() element: HTMLElement

  @Prop() name: string = "web_audio"

  @State() prepared: Boolean = false

  @Prop() autoplay: Boolean
  @Prop() midi: Boolean = false

  @State() context: AudioContext
  @State() gain: GainNode

  @State() sources: Array<string> = []
  @State() _sources: NodeList
  @State() _currentSource: WebAudioSource

  @State() keys: Object = {}

  @State() externalFiles: Array<string>

  @State() visualizers: NodeListOf<Element>
  @State() previousVisualizer: WebAudioVisualizer
  @State() visualizerNodes: Array<string>

  @Method()
  source (name) {
    return this.sources[name];
  }

  @Method()
  is_prepared () {
    return this.prepared;
  }

  /******************
   * Private behavior
   **/
  componentDidLoad() {
    this.connect_context()

    this.gain = this.context.createGain()

    this.connect_visualizers();
    this.connect_sources()
    this.connect_debugger()
    this.connect_midi()
  }

  connect_context () {
    var AudioContext = window.AudioContext // Default
        || window.webkitAudioContext // Safari and old versions of Chrome
        || window.audio_context

    if (AudioContext) {
        // Do whatever you want using the Web Audio API
        window.audio_context = new AudioContext
        // ...
    } else {
        // Web Audio API is not supported
        // Alert the user
        console.error("The Web Audio API is not supported by your browser. ")
    }

    this.context = window.audio_context
  }

  connect_sources () {
    this.build_sources()
  }

  build_sources () {
    this._sources = this.element.querySelectorAll('web-audio-source')

    this.externalFiles = []

    forEach(this._sources, (index, source) => {
      this.sources[source.name] = source

      let bufferLoader = new BufferLoader( this.context, [source.src], (bufferList) => {
        this.cache_sources(bufferList, source)
      })

      bufferLoader.load()
    }, this)
  }

  async cache_sources (bufferList, source) {
    await delay(50)
    bufferList.forEach((item) => {

      if (this.midi) {
        this.keys[source.midikey] = source
      }

      this._currentSource = source
      this._currentSource.assignBuffer(this, item)
    })

    this._currentSource = null

    this.prepared = true
  }

  async connect_visualizers () {
    await delay(50)

    this.visualizers = document.querySelectorAll(`web-audio-visualizer[for="${this.name}"]`)

    if (this.visualizers) {
      forEach(this.visualizers, (index, visualizer) => {
        if (index === 0) {
          visualizer = visualizer.connect(this.context, this.context.destination)
        } else {
          visualizer = visualizer.connect(this.context, this.previousVisualizer.analyser)
        }

        this.previousVisualizer = visualizer
      }, this)
    } else {
      console.info('No visualizers bound to this web-audio instance')
    }

    if (this.visualizers.length >= 1) {
      this.gain.connect(this.previousVisualizer.analyser)
    } else {
      this.gain.connect(this.context.destination)
    }
  }

  connect_debugger () {
    console.log("connect_debugger")
  }

  connect_midi () {
    if (this.midi) {
      webmidi.enable((err) => {
        var input = webmidi.inputs[0];
        if (input) {
          input.addListener('noteon', 'all', (e: MyCustomEvent) => {
            if (this.keys[e.note.number]) {
              this.keys[e.note.number].gain().value = (e.data[2] / 175);
              this.keys[e.note.number].play();
            }
          });

          input.addListener('pitchbend', 'all', function(e) {
              console.log('Pitch value: ' + e.value);
          });

          // Listen to control change message on all channels
          input.addListener('controlchange', "all",
            function (e) {
              console.log("Received 'controlchange' message.", e);
            }
          );
        }
      });
    }
  }
}
