export declare class WebAudioSequencer {
    name: string;
    autoplay: boolean;
    taps: number;
    tempo: number;
    context: any;
    iterations: number;
    startTime: number;
    noteTime: number;
    currentTap: number;
    totalPlayTime: number;
    custom: Function;
    timer: any;
    componentDidLoad(): void;
    schedule(): void;
    advance(): void;
    play(): void;
    stop(): void;
}
