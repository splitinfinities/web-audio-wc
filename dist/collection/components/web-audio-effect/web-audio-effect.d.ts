import { WebAudio } from '../web-audio/web-audio';
import { WebAudioSource } from '../web-audio-source/web-audio-source';
export declare class WebAudioEffect {
    element: HTMLElement;
    type: string;
    use: string;
    _use: HTMLElement;
    method: string;
    effect: string;
    value: number;
    responds: string;
    midicontroller: number;
    axis: string;
    context: AudioContext;
    source: WebAudioSource;
    parent: WebAudioEffect | WebAudio;
    attachEffect(context: any, source: any): string;
    effects(): string[];
}
