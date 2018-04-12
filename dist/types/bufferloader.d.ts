export declare class BufferLoader {
    context: AudioContext;
    urlList: Array<string>;
    onload: Function;
    bufferList: Array<string>;
    loadCount: Number;
    constructor(context: AudioContext, urlList: Array<string>, callback: Function);
    loadBuffer: (url: any, index: any) => void;
    load: () => void;
}
