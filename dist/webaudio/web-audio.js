/*! Built with http://stenciljs.com */
webaudio.loadComponents(

/**** module id (dev mode) ****/
"web-audio",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var BufferLoader = /** @class */ (function () {
    function BufferLoader(context, urlList, callback) {
        this.loadBuffer = function (url, index) {
            // Load buffer asynchronously
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            var loader = this;
            request.onload = function () {
                // Asynchronously decode the audio file data in request.response
                loader.context.decodeAudioData(request.response, function (buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount == loader.urlList.length)
                        loader.onload(loader.bufferList);
                }, function (error) {
                    console.error('decodeAudioData error', error);
                });
            };
            request.onerror = function () {
                alert('BufferLoader: XHR error');
            };
            request.send();
        };
        this.load = function () {
            for (var i = 0; i < this.urlList.length; ++i) {
                this.loadBuffer(this.urlList[i], i);
            }
        };
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = new Array();
        this.loadCount = 0;
    }
    return BufferLoader;
}());

// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};
// assert for testing
var assert = function (condition, message) {
    if (!condition) {
        throw message || "Assertion failed!";
    }
    return (condition);
};
var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var webmidi_min = createCommonjsModule(function (module) {
/*

WebMidi v2.0.0-rc.9

WebMidi.js helps you tame the Web MIDI API. Send and receive MIDI messages with ease. Control instruments with user-friendly functions (playNote, sendPitchBend, etc.). React to MIDI input with simple event listeners (noteon, pitchbend, controlchange, etc.).
https://github.com/cotejp/webmidi


The MIT License (MIT)

Copyright (c) 2015-2016, Jean-Philippe Côté

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

!function(scope){"use strict";function WebMidi(){if(WebMidi.prototype._singleton)throw new Error("WebMidi is a singleton, it cannot be instantiated directly.");WebMidi.prototype._singleton=this,this._inputs=[],this._outputs=[],this._userHandlers={},this._stateChangeQueue=[],this._processingStateChange=!1,this._midiInterfaceEvents=["connected","disconnected"],this._notes=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],this._semitones={C:0,D:2,E:4,F:5,G:7,A:9,B:11},Object.defineProperties(this,{MIDI_SYSTEM_MESSAGES:{value:{sysex:240,timecode:241,songposition:242,songselect:243,tuningrequest:246,sysexend:247,clock:248,start:250,"continue":251,stop:252,activesensing:254,reset:255,unknownsystemmessage:-1},writable:!1,enumerable:!0,configurable:!1},MIDI_CHANNEL_MESSAGES:{value:{noteoff:8,noteon:9,keyaftertouch:10,controlchange:11,channelmode:11,programchange:12,channelaftertouch:13,pitchbend:14},writable:!1,enumerable:!0,configurable:!1},MIDI_REGISTERED_PARAMETER:{value:{pitchbendrange:[0,0],channelfinetuning:[0,1],channelcoarsetuning:[0,2],tuningprogram:[0,3],tuningbank:[0,4],modulationrange:[0,5],azimuthangle:[61,0],elevationangle:[61,1],gain:[61,2],distanceratio:[61,3],maximumdistance:[61,4],maximumdistancegain:[61,5],referencedistanceratio:[61,6],panspreadangle:[61,7],rollangle:[61,8]},writable:!1,enumerable:!0,configurable:!1},MIDI_CONTROL_CHANGE_MESSAGES:{value:{bankselectcoarse:0,modulationwheelcoarse:1,breathcontrollercoarse:2,footcontrollercoarse:4,portamentotimecoarse:5,dataentrycoarse:6,volumecoarse:7,balancecoarse:8,pancoarse:10,expressioncoarse:11,effectcontrol1coarse:12,effectcontrol2coarse:13,generalpurposeslider1:16,generalpurposeslider2:17,generalpurposeslider3:18,generalpurposeslider4:19,bankselectfine:32,modulationwheelfine:33,breathcontrollerfine:34,footcontrollerfine:36,portamentotimefine:37,dataentryfine:38,volumefine:39,balancefine:40,panfine:42,expressionfine:43,effectcontrol1fine:44,effectcontrol2fine:45,holdpedal:64,portamento:65,sustenutopedal:66,softpedal:67,legatopedal:68,hold2pedal:69,soundvariation:70,resonance:71,soundreleasetime:72,soundattacktime:73,brightness:74,soundcontrol6:75,soundcontrol7:76,soundcontrol8:77,soundcontrol9:78,soundcontrol10:79,generalpurposebutton1:80,generalpurposebutton2:81,generalpurposebutton3:82,generalpurposebutton4:83,reverblevel:91,tremololevel:92,choruslevel:93,celestelevel:94,phaserlevel:95,databuttonincrement:96,databuttondecrement:97,nonregisteredparametercoarse:98,nonregisteredparameterfine:99,registeredparametercoarse:100,registeredparameterfine:101},writable:!1,enumerable:!0,configurable:!1},MIDI_CHANNEL_MODE_MESSAGES:{value:{allsoundoff:120,resetallcontrollers:121,localcontrol:122,allnotesoff:123,omnimodeoff:124,omnimodeon:125,monomodeon:126,polymodeon:127},writable:!1,enumerable:!0,configurable:!1}}),Object.defineProperties(this,{supported:{enumerable:!0,get:function(){return"requestMIDIAccess"in navigator}},enabled:{enumerable:!0,get:function(){return void 0!==this["interface"]}.bind(this)},inputs:{enumerable:!0,get:function(){return this._inputs}.bind(this)},outputs:{enumerable:!0,get:function(){return this._outputs}.bind(this)},sysexEnabled:{enumerable:!0,get:function(){return!(!this["interface"]||!this["interface"].sysexEnabled)}.bind(this)},time:{enumerable:!0,get:function(){return performance.now()}}});}function Input(midiInput){var that=this;this._userHandlers={channel:{},system:{}},this._midiInput=midiInput,Object.defineProperties(this,{connection:{enumerable:!0,get:function(){return that._midiInput.connection}},id:{enumerable:!0,get:function(){return that._midiInput.id}},manufacturer:{enumerable:!0,get:function(){return that._midiInput.manufacturer}},name:{enumerable:!0,get:function(){return that._midiInput.name}},state:{enumerable:!0,get:function(){return that._midiInput.state}}}),this._initializeUserHandlers();}function Output(midiOutput){var that=this;this._midiOutput=midiOutput,Object.defineProperties(this,{connection:{enumerable:!0,get:function(){return that._midiOutput.connection}},id:{enumerable:!0,get:function(){return that._midiOutput.id}},manufacturer:{enumerable:!0,get:function(){return that._midiOutput.manufacturer}},name:{enumerable:!0,get:function(){return that._midiOutput.name}},state:{enumerable:!0,get:function(){return that._midiOutput.state}}});}var wm=new WebMidi;WebMidi.prototype.enable=function(callback,sysex){return this.enabled?void 0:this.supported?void navigator.requestMIDIAccess({sysex:sysex}).then(function(midiAccess){this["interface"]=midiAccess,this._resetInterfaceUserHandlers(),this["interface"].onstatechange=this._onInterfaceStateChange.bind(this),this._onInterfaceStateChange(null),"function"==typeof callback&&callback.call(this);}.bind(this),function(err){"function"==typeof callback&&callback.call(this,err);}.bind(this)):void("function"==typeof callback&&callback(new Error("The Web MIDI API is not supported by your browser.")))},WebMidi.prototype.disable=function(){if(!this.supported)throw new Error("The Web MIDI API is not supported by your browser.");this["interface"].onstatechange=void 0,this["interface"]=void 0,this._inputs=[],this._outputs=[],this._resetInterfaceUserHandlers();},WebMidi.prototype.addListener=function(type,listener){if(!this.enabled)throw new Error("WebMidi must be enabled before adding event listeners.");if("function"!=typeof listener)throw new TypeError("The 'listener' parameter must be a function.");if(!(this._midiInterfaceEvents.indexOf(type)>=0))throw new TypeError("The specified event type is not supported.");return this._userHandlers[type].push(listener),this},WebMidi.prototype.hasListener=function(type,listener){if(!this.enabled)throw new Error("WebMidi must be enabled before checking event listeners.");if("function"!=typeof listener)throw new TypeError("The 'listener' parameter must be a function.");if(!(this._midiInterfaceEvents.indexOf(type)>=0))throw new TypeError("The specified event type is not supported.");for(var o=0;o<this._userHandlers[type].length;o++)if(this._userHandlers[type][o]===listener)return!0;return!1},WebMidi.prototype.removeListener=function(type,listener){if(!this.enabled)throw new Error("WebMidi must be enabled before removing event listeners.");if(void 0!==listener&&"function"!=typeof listener)throw new TypeError("The 'listener' parameter must be a function.");if(this._midiInterfaceEvents.indexOf(type)>=0)if(listener)for(var o=0;o<this._userHandlers[type].length;o++)this._userHandlers[type][o]===listener&&this._userHandlers[type].splice(o,1);else this._userHandlers[type]=[];else{if(void 0!==type)throw new TypeError("The specified event type is not supported.");this._resetInterfaceUserHandlers();}return this},WebMidi.prototype.getInputById=function(id){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var i=0;i<this.inputs.length;i++)if(this.inputs[i].id===id)return this.inputs[i];return!1},WebMidi.prototype.getOutputById=function(id){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var i=0;i<this.outputs.length;i++)if(this.outputs[i].id===id)return this.outputs[i];return!1},WebMidi.prototype.getInputByName=function(name){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var i=0;i<this.inputs.length;i++)if(~this.inputs[i].name.indexOf(name))return this.inputs[i];return!1},WebMidi.prototype.getOctave=function(number){return number>=0&&127>=number?Math.floor(parseInt(number)/12-1)-1:void 0},WebMidi.prototype.getOutputByName=function(name){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var i=0;i<this.outputs.length;i++)if(~this.outputs[i].name.indexOf(name))return this.outputs[i];return!1},WebMidi.prototype.guessNoteNumber=function(input){var output=!1;if(input&&input.toFixed&&input>=0&&127>=input?output=Math.round(input):parseInt(input)>=0&&parseInt(input)<=127?output=parseInt(input):("string"==typeof input||input instanceof String)&&(output=this.noteNameToNumber(input)),output===!1)throw new Error("Invalid note number ("+input+").");return output},WebMidi.prototype.noteNameToNumber=function(name){"string"!=typeof name&&(name="");var matches=name.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);if(!matches)throw new RangeError("Invalid note name.");var semitones=wm._semitones[matches[1].toUpperCase()],octave=parseInt(matches[3]),result=12*(octave+2)+semitones;if(matches[2].toLowerCase().indexOf("b")>-1?result-=matches[2].length:matches[2].toLowerCase().indexOf("#")>-1&&(result+=matches[2].length),0>semitones||-2>octave||octave>8||0>result||result>127)throw new RangeError("Invalid note name or note outside valid range.");return result},WebMidi.prototype._updateInputsAndOutputs=function(){this._updateInputs(),this._updateOutputs();},WebMidi.prototype._updateInputs=function(){for(var i=0;i<this._inputs.length;i++){for(var remove=!0,updated=this["interface"].inputs.values(),input=updated.next();input&&!input.done;input=updated.next())if(this._inputs[i]._midiInput===input.value){remove=!1;break}remove&&this._inputs.splice(i,1);}this["interface"].inputs.forEach(function(nInput){for(var add=!0,j=0;j<this._inputs.length;j++)this._inputs[j]._midiInput===nInput&&(add=!1);add&&this._inputs.push(this._createInput(nInput));}.bind(this));},WebMidi.prototype._updateOutputs=function(){for(var i=0;i<this._outputs.length;i++){for(var remove=!0,updated=this["interface"].outputs.values(),output=updated.next();output&&!output.done;output=updated.next())if(this._outputs[i]._midiOutput===output.value){remove=!1;break}remove&&this._outputs.splice(i,1);}this["interface"].outputs.forEach(function(nOutput){for(var add=!0,j=0;j<this._outputs.length;j++)this._outputs[j]._midiOutput===nOutput&&(add=!1);add&&this._outputs.push(this._createOutput(nOutput));}.bind(this));},WebMidi.prototype._createInput=function(midiInput){var input=new Input(midiInput);return input._midiInput.onmidimessage=input._onMidiMessage.bind(input),input},WebMidi.prototype._createOutput=function(midiOutput){var output=new Output(midiOutput);return output._midiOutput.onmidimessage=output._onMidiMessage.bind(output),output},WebMidi.prototype._onInterfaceStateChange=function(e){if(this._stateChangeQueue.push(e),!this._processingStateChange){for(this._processingStateChange=!0;this._stateChangeQueue.length>0;)this._processStateChange(this._stateChangeQueue.shift());this._processingStateChange=!1;}},WebMidi.prototype._processStateChange=function(e){if(this._updateInputsAndOutputs(),null!==e){var event={timestamp:e.timeStamp,type:e.port.state,id:e.port.id,manufacturer:e.port.manufacturer,name:e.port.name};"connected"===e.port.state&&("output"===e.port.type?event.output=this.getOutputById(e.port.id):"input"===e.port.type&&(event.input=this.getInputById(e.port.id))),this._userHandlers[e.port.state].forEach(function(handler){handler(event);});}},WebMidi.prototype._resetInterfaceUserHandlers=function(){for(var i=0;i<this._midiInterfaceEvents.length;i++)this._userHandlers[this._midiInterfaceEvents[i]]=[];},Input.prototype.addListener=function(type,channel,listener){var that=this;if(void 0===channel&&(channel="all"),Array.isArray(channel)||(channel=[channel]),channel.forEach(function(item){if("all"!==item&&!(item>=1&&16>=item))throw new RangeError("The 'channel' parameter is invalid.")}),"function"!=typeof listener)throw new TypeError("The 'listener' parameter must be a function.");if(wm.MIDI_SYSTEM_MESSAGES[type])this._userHandlers.system[type]||(this._userHandlers.system[type]=[]),this._userHandlers.system[type].push(listener);else{if(!wm.MIDI_CHANNEL_MESSAGES[type])throw new TypeError("The specified event type is not supported.");if(channel.indexOf("all")>-1){channel=[];for(var j=1;16>=j;j++)channel.push(j);}this._userHandlers.channel[type]||(this._userHandlers.channel[type]=[]),channel.forEach(function(ch){that._userHandlers.channel[type][ch]||(that._userHandlers.channel[type][ch]=[]),that._userHandlers.channel[type][ch].push(listener);});}return this},Input.prototype.on=Input.prototype.addListener,Input.prototype.hasListener=function(type,channel,listener){var that=this;if("function"!=typeof listener)throw new TypeError("The 'listener' parameter must be a function.");if(void 0===channel&&(channel="all"),channel.constructor!==Array&&(channel=[channel]),wm.MIDI_SYSTEM_MESSAGES[type]){for(var o=0;o<this._userHandlers.system[type].length;o++)if(this._userHandlers.system[type][o]===listener)return!0}else if(wm.MIDI_CHANNEL_MESSAGES[type]){if(channel.indexOf("all")>-1){channel=[];for(var j=1;16>=j;j++)channel.push(j);}return this._userHandlers.channel[type]?channel.every(function(chNum){var listeners=that._userHandlers.channel[type][chNum];return listeners&&listeners.indexOf(listener)>-1}):!1}return!1},Input.prototype.removeListener=function(type,channel,listener){var that=this;if(void 0!==listener&&"function"!=typeof listener)throw new TypeError("The 'listener' parameter must be a function.");if(void 0===channel&&(channel="all"),channel.constructor!==Array&&(channel=[channel]),wm.MIDI_SYSTEM_MESSAGES[type])if(void 0===listener)this._userHandlers.system[type]=[];else for(var o=0;o<this._userHandlers.system[type].length;o++)this._userHandlers.system[type][o]===listener&&this._userHandlers.system[type].splice(o,1);else if(wm.MIDI_CHANNEL_MESSAGES[type]){if(channel.indexOf("all")>-1){channel=[];for(var j=1;16>=j;j++)channel.push(j);}if(!this._userHandlers.channel[type])return this;channel.forEach(function(chNum){var listeners=that._userHandlers.channel[type][chNum];if(listeners)if(void 0===listener)that._userHandlers.channel[type][chNum]=[];else for(var l=0;l<listeners.length;l++)listeners[l]===listener&&listeners.splice(l,1);});}else{if(void 0!==type)throw new TypeError("The specified event type is not supported.");this._initializeUserHandlers();}return this},Input.prototype._initializeUserHandlers=function(){for(var prop1 in wm.MIDI_CHANNEL_MESSAGES)wm.MIDI_CHANNEL_MESSAGES.hasOwnProperty(prop1)&&(this._userHandlers.channel[prop1]={});for(var prop2 in wm.MIDI_SYSTEM_MESSAGES)wm.MIDI_SYSTEM_MESSAGES.hasOwnProperty(prop2)&&(this._userHandlers.system[prop2]=[]);},Input.prototype._onMidiMessage=function(e){e.data[0]<240?this._parseChannelEvent(e):e.data[0]<=255&&this._parseSystemEvent(e);},Input.prototype._parseChannelEvent=function(e){var data1,data2,command=e.data[0]>>4,channel=(15&e.data[0])+1;e.data.length>1&&(data1=e.data[1],data2=e.data.length>2?e.data[2]:void 0);var event={target:this,data:e.data,timestamp:e.timeStamp,channel:channel};command===wm.MIDI_CHANNEL_MESSAGES.noteoff||command===wm.MIDI_CHANNEL_MESSAGES.noteon&&0===data2?(event.type="noteoff",event.note={number:data1,name:wm._notes[data1%12],octave:wm.getOctave(data1)},event.velocity=data2/127,event.rawVelocity=data2):command===wm.MIDI_CHANNEL_MESSAGES.noteon?(event.type="noteon",event.note={number:data1,name:wm._notes[data1%12],octave:wm.getOctave(data1)},event.velocity=data2/127,event.rawVelocity=data2):command===wm.MIDI_CHANNEL_MESSAGES.keyaftertouch?(event.type="keyaftertouch",event.note={number:data1,name:wm._notes[data1%12],octave:wm.getOctave(data1)},event.value=data2/127):command===wm.MIDI_CHANNEL_MESSAGES.controlchange&&data1>=0&&119>=data1?(event.type="controlchange",event.controller={number:data1,name:this.getCcNameByNumber(data1)},event.value=data2):command===wm.MIDI_CHANNEL_MESSAGES.channelmode&&data1>=120&&127>=data1?(event.type="channelmode",event.controller={number:data1,name:this.getChannelModeByNumber(data1)},event.value=data2):command===wm.MIDI_CHANNEL_MESSAGES.programchange?(event.type="programchange",event.value=data1):command===wm.MIDI_CHANNEL_MESSAGES.channelaftertouch?(event.type="channelaftertouch",event.value=data1/127):command===wm.MIDI_CHANNEL_MESSAGES.pitchbend?(event.type="pitchbend",event.value=((data2<<7)+data1-8192)/8192):event.type="unknownchannelmessage",this._userHandlers.channel[event.type]&&this._userHandlers.channel[event.type][channel]&&this._userHandlers.channel[event.type][channel].forEach(function(callback){callback(event);});},Input.prototype.getCcNameByNumber=function(number){if(number=parseInt(number),!(number>=0&&119>=number))throw new RangeError("The control change number must be between 0 and 119.");for(var cc in wm.MIDI_CONTROL_CHANGE_MESSAGES)if(number===wm.MIDI_CONTROL_CHANGE_MESSAGES[cc])return cc;return void 0},Input.prototype.getChannelModeByNumber=function(number){if(number=parseInt(number),!(number>=120&&status<=127))throw new RangeError("The control change number must be between 120 and 127.");for(var cm in wm.MIDI_CHANNEL_MODE_MESSAGES)if(number===wm.MIDI_CHANNEL_MODE_MESSAGES[cm])return cm},Input.prototype._parseSystemEvent=function(e){var command=e.data[0],event={target:this,data:e.data,timestamp:e.timeStamp};command===wm.MIDI_SYSTEM_MESSAGES.sysex?event.type="sysex":command===wm.MIDI_SYSTEM_MESSAGES.timecode?event.type="timecode":command===wm.MIDI_SYSTEM_MESSAGES.songposition?event.type="songposition":command===wm.MIDI_SYSTEM_MESSAGES.songselect?(event.type="songselect",event.song=e.data[1]):command===wm.MIDI_SYSTEM_MESSAGES.tuningrequest?event.type="tuningrequest":command===wm.MIDI_SYSTEM_MESSAGES.clock?event.type="clock":command===wm.MIDI_SYSTEM_MESSAGES.start?event.type="start":command===wm.MIDI_SYSTEM_MESSAGES["continue"]?event.type="continue":command===wm.MIDI_SYSTEM_MESSAGES.stop?event.type="stop":command===wm.MIDI_SYSTEM_MESSAGES.activesensing?event.type="activesensing":command===wm.MIDI_SYSTEM_MESSAGES.reset?event.type="reset":event.type="unknownsystemmessage",this._userHandlers.system[event.type]&&this._userHandlers.system[event.type].forEach(function(callback){callback(event);});},Output.prototype.send=function(status,data,timestamp){if(!(status>=128&&255>=status))throw new RangeError("The status byte must be an integer between 128 (0x80) and 255 (0xFF).");Array.isArray(data)||(data=parseInt(data)>=0&&parseInt(data)<=127?[parseInt(data)]:[]);var message=[status];return data.forEach(function(item){if(!(item>=0&&255>=item))throw new RangeError("The data bytes must be integers between 0 (0x00) and 255 (0xFF).");message.push(item);}),this._midiOutput.send(message,parseFloat(timestamp)||0),this},Output.prototype.sendSysex=function(manufacturer,data,options){if(!wm.sysexEnabled)throw new Error("SysEx message support must first be activated.");return options=options||{},manufacturer=[].concat(manufacturer),data.forEach(function(item){if(0>item||item>127)throw new RangeError("The data bytes of a SysEx message must be integers between 0 (0x00) and 127 (0x7F).")}),data=manufacturer.concat(data,wm.MIDI_SYSTEM_MESSAGES.sysexend),this.send(wm.MIDI_SYSTEM_MESSAGES.sysex,data,this._parseTimeParameter(options.time)),this},Output.prototype.sendTimecodeQuarterFrame=function(value,options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES.timecode,value,this._parseTimeParameter(options.time)),this},Output.prototype.sendSongPosition=function(value,options){value=parseInt(value)||0,options=options||{};var msb=value>>7&127,lsb=127&value;return this.send(wm.MIDI_SYSTEM_MESSAGES.songposition,[msb,lsb],this._parseTimeParameter(options.time)),this},Output.prototype.sendSongSelect=function(value,options){if(value=parseInt(value),options=options||{},!(value>=0&&127>=value))throw new RangeError("The song number must be between 0 and 127.");return this.send(wm.MIDI_SYSTEM_MESSAGES.songselect,[value],this._parseTimeParameter(options.time)),this},Output.prototype.sendTuningRequest=function(options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES.tuningrequest,void 0,this._parseTimeParameter(options.time)),this},Output.prototype.sendClock=function(options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES.clock,void 0,this._parseTimeParameter(options.time)),this},Output.prototype.sendStart=function(options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES.start,void 0,this._parseTimeParameter(options.time)),this},Output.prototype.sendContinue=function(options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES["continue"],void 0,this._parseTimeParameter(options.time)),this},Output.prototype.sendStop=function(options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES.stop,void 0,this._parseTimeParameter(options.time)),this},Output.prototype.sendActiveSensing=function(options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES.activesensing,void 0,this._parseTimeParameter(options.time)),this},Output.prototype.sendReset=function(options){return options=options||{},this.send(wm.MIDI_SYSTEM_MESSAGES.reset,void 0,this._parseTimeParameter(options.time)),this},Output.prototype.stopNote=function(note,channel,options){if("all"===note)return this.sendChannelMode("allnotesoff",0,channel,options);var nVelocity=64;return options=options||{},options.velocity=parseFloat(options.velocity),options.rawVelocity?!isNaN(options.velocity)&&options.velocity>=0&&options.velocity<=127&&(nVelocity=options.velocity):!isNaN(options.velocity)&&options.velocity>=0&&options.velocity<=1&&(nVelocity=127*options.velocity),this._convertNoteToArray(note).forEach(function(item){this._convertChannelToArray(channel).forEach(function(ch){this.send((wm.MIDI_CHANNEL_MESSAGES.noteoff<<4)+(ch-1),[item,Math.round(nVelocity)],this._parseTimeParameter(options.time));}.bind(this));}.bind(this)),this},Output.prototype.playNote=function(note,channel,options){var nVelocity=64;if(options=options||{},options.velocity=parseFloat(options.velocity),options.rawVelocity?!isNaN(options.velocity)&&options.velocity>=0&&options.velocity<=127&&(nVelocity=options.velocity):!isNaN(options.velocity)&&options.velocity>=0&&options.velocity<=1&&(nVelocity=127*options.velocity),options.time=this._parseTimeParameter(options.time),this._convertNoteToArray(note).forEach(function(item){this._convertChannelToArray(channel).forEach(function(ch){this.send((wm.MIDI_CHANNEL_MESSAGES.noteon<<4)+(ch-1),[item,Math.round(nVelocity)],options.time);}.bind(this));}.bind(this)),options.duration=parseFloat(options.duration),options.duration){options.duration<=0&&(options.duration=0);var nRelease=64;options.release=parseFloat(options.release),options.rawVelocity?!isNaN(options.release)&&options.release>=0&&options.release<=127&&(nRelease=options.release):!isNaN(options.release)&&options.release>=0&&options.release<=1&&(nRelease=127*options.release),this._convertNoteToArray(note).forEach(function(item){this._convertChannelToArray(channel).forEach(function(ch){this.send((wm.MIDI_CHANNEL_MESSAGES.noteoff<<4)+(ch-1),[item,Math.round(nRelease)],(options.time||wm.time)+options.duration);}.bind(this));}.bind(this));}return this},Output.prototype.sendKeyAftertouch=function(note,channel,pressure,options){var that=this;if(options=options||{},1>channel||channel>16)throw new RangeError("The channel must be between 1 and 16.");pressure=parseFloat(pressure),(isNaN(pressure)||0>pressure||pressure>1)&&(pressure=.5);var nPressure=Math.round(127*pressure);return this._convertNoteToArray(note).forEach(function(item){that._convertChannelToArray(channel).forEach(function(ch){that.send((wm.MIDI_CHANNEL_MESSAGES.keyaftertouch<<4)+(ch-1),[item,nPressure],that._parseTimeParameter(options.time));});}),this},Output.prototype.sendControlChange=function(controller,value,channel,options){if(options=options||{},"string"==typeof controller){if(controller=wm.MIDI_CONTROL_CHANGE_MESSAGES[controller],!controller)throw new TypeError("Invalid controller name.")}else if(controller=parseInt(controller),!(controller>=0&&119>=controller))throw new RangeError("Controller numbers must be between 0 and 119.");if(value=parseInt(value)||0,!(value>=0&&127>=value))throw new RangeError("Controller value must be between 0 and 127.");return this._convertChannelToArray(channel).forEach(function(ch){this.send((wm.MIDI_CHANNEL_MESSAGES.controlchange<<4)+(ch-1),[controller,value],this._parseTimeParameter(options.time));}.bind(this)),this},Output.prototype._selectRegisteredParameter=function(parameter,channel,time){var that=this;if(parameter[0]=parseInt(parameter[0]),!(parameter[0]>=0&&parameter[0]<=127))throw new RangeError("The control65 value must be between 0 and 127");if(parameter[1]=parseInt(parameter[1]),!(parameter[1]>=0&&parameter[1]<=127))throw new RangeError("The control64 value must be between 0 and 127");return this._convertChannelToArray(channel).forEach(function(ch){that.sendControlChange(101,parameter[0],channel,{time:time}),that.sendControlChange(100,parameter[1],channel,{time:time});}),this},Output.prototype._selectNonRegisteredParameter=function(parameter,channel,time){var that=this;if(parameter[0]=parseInt(parameter[0]),!(parameter[0]>=0&&parameter[0]<=127))throw new RangeError("The control63 value must be between 0 and 127");if(parameter[1]=parseInt(parameter[1]),!(parameter[1]>=0&&parameter[1]<=127))throw new RangeError("The control62 value must be between 0 and 127");return this._convertChannelToArray(channel).forEach(function(ch){that.sendControlChange(99,parameter[0],channel,{time:time}),that.sendControlChange(98,parameter[1],channel,{time:time});}),this},Output.prototype._setCurrentRegisteredParameter=function(data,channel,time){var that=this;if(data=[].concat(data),data[0]=parseInt(data[0]),!(data[0]>=0&&data[0]<=127))throw new RangeError("The msb value must be between 0 and 127");return this._convertChannelToArray(channel).forEach(function(ch){that.sendControlChange(6,data[0],channel,{time:time});}),data[1]=parseInt(data[1]),data[1]>=0&&data[1]<=127&&this._convertChannelToArray(channel).forEach(function(ch){that.sendControlChange(38,data[1],channel,{time:time});}),this},Output.prototype._deselectRegisteredParameter=function(channel,time){var that=this;return this._convertChannelToArray(channel).forEach(function(ch){that.sendControlChange(101,127,channel,{time:time}),that.sendControlChange(100,127,channel,{time:time});}),this},Output.prototype.setRegisteredParameter=function(parameter,data,channel,options){var that=this;if(options=options||{},!Array.isArray(parameter)){if(!wm.MIDI_REGISTERED_PARAMETER[parameter])throw new Error("The specified parameter is not available.");parameter=wm.MIDI_REGISTERED_PARAMETER[parameter];}return this._convertChannelToArray(channel).forEach(function(ch){that._selectRegisteredParameter(parameter,channel,options.time),that._setCurrentRegisteredParameter(data,channel,options.time),that._deselectRegisteredParameter(channel,options.time);}),this},Output.prototype.setNonRegisteredParameter=function(parameter,data,channel,options){var that=this;if(options=options||{},!(parameter[0]>=0&&parameter[0]<=127&&parameter[1]>=0&&parameter[1]<=127))throw new Error("Position 0 and 1 of the 2-position parameter array must both be between 0 and 127.");return data=[].concat(data),this._convertChannelToArray(channel).forEach(function(ch){that._selectNonRegisteredParameter(parameter,channel,options.time),that._setCurrentRegisteredParameter(data,channel,options.time),that._deselectRegisteredParameter(channel,options.time);}),this},Output.prototype.incrementRegisteredParameter=function(parameter,channel,options){var that=this;if(options=options||{},!Array.isArray(parameter)){if(!wm.MIDI_REGISTERED_PARAMETER[parameter])throw new Error("The specified parameter is not available.");parameter=wm.MIDI_REGISTERED_PARAMETER[parameter];}return this._convertChannelToArray(channel).forEach(function(ch){that._selectRegisteredParameter(parameter,channel,options.time),that.sendControlChange(96,0,channel,{time:options.time}),that._deselectRegisteredParameter(channel,options.time);}),this},Output.prototype.decrementRegisteredParameter=function(parameter,channel,options){if(options=options||{},!Array.isArray(parameter)){if(!wm.MIDI_REGISTERED_PARAMETER[parameter])throw new TypeError("The specified parameter is not available.");parameter=wm.MIDI_REGISTERED_PARAMETER[parameter];}return this._convertChannelToArray(channel).forEach(function(ch){this._selectRegisteredParameter(parameter,channel,options.time),this.sendControlChange(97,0,channel,{time:options.time}),this._deselectRegisteredParameter(channel,options.time);}.bind(this)),this},Output.prototype.setPitchBendRange=function(semitones,cents,channel,options){var that=this;if(options=options||{},semitones=parseInt(semitones)||0,!(semitones>=0&&127>=semitones))throw new RangeError("The semitones value must be between 0 and 127");if(cents=parseInt(cents)||0,!(cents>=0&&127>=cents))throw new RangeError("The cents value must be between 0 and 127");return this._convertChannelToArray(channel).forEach(function(ch){that.setRegisteredParameter("pitchbendrange",[semitones,cents],channel,{time:options.time});}),this},Output.prototype.setModulationRange=function(semitones,cents,channel,options){var that=this;if(options=options||{},semitones=parseInt(semitones)||0,!(semitones>=0&&127>=semitones))throw new RangeError("The semitones value must be between 0 and 127");if(cents=parseInt(cents)||0,!(cents>=0&&127>=cents))throw new RangeError("The cents value must be between 0 and 127");return this._convertChannelToArray(channel).forEach(function(ch){that.setRegisteredParameter("modulationrange",[semitones,cents],channel,{time:options.time});}),this},Output.prototype.setMasterTuning=function(value,channel,options){var that=this;if(options=options||{},value=parseFloat(value)||0,-65>=value||value>=64)throw new RangeError("The value must be a decimal number larger than -65 and smaller than 64.");var coarse=parseInt(value)+64,fine=value-parseInt(value);fine=Math.round((fine+1)/2*16383);var msb=fine>>7&127,lsb=127&fine;return this._convertChannelToArray(channel).forEach(function(ch){that.setRegisteredParameter("channelcoarsetuning",coarse,channel,{time:options.time}),that.setRegisteredParameter("channelfinetuning",[msb,lsb],channel,{time:options.time});}),this},Output.prototype.setTuningProgram=function(value,channel,options){var that=this;if(options=options||{},value=parseInt(value)||0,!(value>=0&&127>=value))throw new RangeError("The program value must be between 0 and 127");return this._convertChannelToArray(channel).forEach(function(ch){that.setRegisteredParameter("tuningprogram",value,channel,{time:options.time});}),this},Output.prototype.setTuningBank=function(value,channel,options){var that=this;if(options=options||{},value=parseInt(value)||0,!(value>=0&&127>=value))throw new RangeError("The bank value must be between 0 and 127");return this._convertChannelToArray(channel).forEach(function(ch){that.setRegisteredParameter("tuningbank",value,channel,{time:options.time});}),this},Output.prototype.sendChannelMode=function(command,value,channel,options){if(options=options||{},"string"==typeof command){if(command=wm.MIDI_CHANNEL_MODE_MESSAGES[command],!command)throw new TypeError("Invalid channel mode message name.")}else if(command=parseInt(command),!(command>=120&&127>=command))throw new RangeError("Channel mode numerical identifiers must be between 120 and 127.");if(value=parseInt(value)||0,0>value||value>127)throw new RangeError("Value must be an integer between 0 and 127.");return this._convertChannelToArray(channel).forEach(function(ch){this.send((wm.MIDI_CHANNEL_MESSAGES.channelmode<<4)+(ch-1),[command,value],this._parseTimeParameter(options.time));}.bind(this)),this},Output.prototype.sendProgramChange=function(program,channel,options){var that=this;if(options=options||{},program=parseInt(program),isNaN(program)||0>program||program>127)throw new RangeError("Program numbers must be between 0 and 127.");return this._convertChannelToArray(channel).forEach(function(ch){that.send((wm.MIDI_CHANNEL_MESSAGES.programchange<<4)+(ch-1),[program],that._parseTimeParameter(options.time));}),this},Output.prototype.sendChannelAftertouch=function(pressure,channel,options){var that=this;options=options||{},pressure=parseFloat(pressure),(isNaN(pressure)||0>pressure||pressure>1)&&(pressure=.5);var nPressure=Math.round(127*pressure);return this._convertChannelToArray(channel).forEach(function(ch){that.send((wm.MIDI_CHANNEL_MESSAGES.channelaftertouch<<4)+(ch-1),[nPressure],that._parseTimeParameter(options.time));}),this},Output.prototype.sendPitchBend=function(bend,channel,options){
var that=this;if(options=options||{},bend=parseFloat(bend),isNaN(bend)||-1>bend||bend>1)throw new RangeError("Pitch bend value must be between -1 and 1.");var nLevel=Math.round((bend+1)/2*16383),msb=nLevel>>7&127,lsb=127&nLevel;return this._convertChannelToArray(channel).forEach(function(ch){that.send((wm.MIDI_CHANNEL_MESSAGES.pitchbend<<4)+(ch-1),[lsb,msb],that._parseTimeParameter(options.time));}),this},Output.prototype._parseTimeParameter=function(time){var parsed,value;return"string"==typeof time&&"+"===time.substring(0,1)?(parsed=parseFloat(time),parsed&&parsed>0&&(value=wm.time+parsed)):(parsed=parseFloat(time),parsed>wm.time&&(value=parsed)),value},Output.prototype._convertNoteToArray=function(note){var notes=[];return Array.isArray(note)||(note=[note]),note.forEach(function(item){notes.push(wm.guessNoteNumber(item));}),notes},Output.prototype._convertChannelToArray=function(channel){if(("all"===channel||void 0===channel)&&(channel=["all"]),Array.isArray(channel)||(channel=[channel]),channel.indexOf("all")>-1){channel=[];for(var i=1;16>=i;i++)channel.push(i);}return channel.forEach(function(ch){if(!(ch>=1&&16>=ch))throw new RangeError("MIDI channels must be between 1 and 16.")}),channel},Output.prototype._onMidiMessage=function(e){},"function"==typeof undefined&&"object"==typeof undefined.amd?undefined([],function(){return wm}):"undefined"!='object'&&module.exports?module.exports=wm:scope.WebMidi||(scope.WebMidi=wm);}(commonjsGlobal);
});

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WebAudio = /** @class */ (function () {
    function WebAudio() {
        this.name = "web_audio";
        this.prepared = false;
        this.midi = false;
        this.sources = [];
        this.keys = {};
    }
    WebAudio.prototype.source = function (name) {
        return this.sources[name];
    };
    WebAudio.prototype.is_prepared = function () {
        return this.prepared;
    };
    /******************
     * Private behavior
     **/
    WebAudio.prototype.componentDidLoad = function () {
        this.connect_debugger();
        this.connect_context();
        this.gain = this.context.createGain();
        this.connect_visualizers();
        this.connect_sources();
        this.connect_midi();
    };
    WebAudio.prototype.connect_context = function () {
        var AudioContext = window.AudioContext
            || window.webkitAudioContext
            || window.audio_context;
        if (AudioContext) {
            window.audio_context = new AudioContext;
            this.log("Set window.audio_context");
        }
        else {
            this.log("The Web Audio API is not supported by your browser.");
        }
        this.context = window.audio_context;
        this.log("Connected to window.audio_context");
    };
    WebAudio.prototype.connect_sources = function () {
        this.build_sources();
    };
    WebAudio.prototype.build_sources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.log("Building sources");
                this._sources = this.element.querySelectorAll('web-audio-source');
                this.externalFiles = [];
                forEach(this._sources, function (index, source) {
                    _this.log("Preparing " + source.name);
                    _this.sources[source.name] = source;
                    var bufferLoader = new BufferLoader(_this.context, [source.src], function (bufferList) {
                        _this.cache_sources(bufferList, source);
                    });
                    bufferLoader.load();
                }, this);
                return [2 /*return*/];
            });
        });
    };
    WebAudio.prototype.cache_sources = function (bufferList, source) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        bufferList.forEach(function (item) {
                            _this.log("Caching " + source.name);
                            if (_this.midi) {
                                _this.log("Assigned " + source.name + " to midi key " + source.midikey + ", channel " + source.midichannel);
                                if (_this.keys[source.midichannel] == undefined) {
                                    _this.keys[source.midichannel] = [];
                                }
                                _this.keys[source.midichannel][source.midikey] = source;
                            }
                            _this._currentSource = source;
                            _this._currentSource.assignBuffer(_this, item);
                            _this.log("Source " + source.name + " is ready");
                        });
                        this._currentSource = null;
                        this.prepared = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    WebAudio.prototype.connect_visualizers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        this.visualizers = document.querySelectorAll("web-audio-visualizer[for=\"" + this.name + "\"]");
                        if (this.visualizers) {
                            this.log("Attaching visualizers");
                            forEach(this.visualizers, function (index, visualizer) {
                                if (index === 0) {
                                    visualizer = visualizer.connect(_this.context, _this.context.destination);
                                }
                                else {
                                    visualizer = visualizer.connect(_this.context, _this.previousVisualizer.analyser);
                                }
                                _this.previousVisualizer = visualizer;
                            }, this);
                        }
                        else {
                            this.log("No visualizers for " + this.name);
                        }
                        if (this.visualizers.length >= 1) {
                            this.gain.connect(this.previousVisualizer.analyser);
                        }
                        else {
                            this.gain.connect(this.context.destination);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WebAudio.prototype.connect_debugger = function () {
        this.debugger = document.querySelector("web-audio-debugger[for=\"" + this.name + "\"]");
        this.log("Connected debugger");
    };
    WebAudio.prototype.log = function (string) {
        if (this.debugger) {
            this.debugger.addHistory(string);
        }
    };
    WebAudio.prototype.connect_midi = function () {
        var _this = this;
        if (this.midi) {
            webmidi_min.enable(function (err) {
                if (err) {
                    _this.log("Midi couldn't be enabled." + err);
                }
                else {
                    _this.log("Midi is enabled");
                }
                var input = webmidi_min.inputs[0];
                if (input) {
                    input.addListener('noteon', 'all', function (e) {
                        _this.log("KEY: Channel: " + e.channel + ", Note: " + e.note.number + ", Name: " + e.note.name + ", Oct: " + e.note.octave);
                        if (_this.keys[e.channel]) {
                            _this.keys[e.channel][e.note.number].gain().value = (e.data[2] / 175);
                            _this.keys[e.channel][e.note.number].play();
                        }
                    });
                    input.addListener('pitchbend', 'all', function (e) {
                        _this.log("PITCH: Channel: " + e.channel + ", Value: " + e.value);
                    });
                    // Listen to control change message on all channels
                    input.addListener('controlchange', 'all', function (e) {
                        _this.log("CTRL: Channel: " + e.channel + ", controller: " + e.controller.number + ", Value: " + e.value);
                        var event = new CustomEvent('midi-controller-update', { detail: e });
                        document.dispatchEvent(event);
                    });
                    _this.log("Listeners added for notes, pitch bend, and controllers.");
                }
            });
        }
    };
    return WebAudio;
}());

var WebAudioDebugger = /** @class */ (function () {
    function WebAudioDebugger() {
        this.history = [];
        this.count = 50;
    }
    WebAudioDebugger.prototype.addHistory = function (string) {
        var our_history = [
            string
        ].concat(this.history);
        if (our_history.length > this.count) {
            this.history = our_history.slice(1, this.count);
        }
        else {
            this.history = our_history;
        }
    };
    WebAudioDebugger.prototype.render = function () {
        return (h("div", 0, this.history.map(function (log) {
            return h("div", 0,
                h("p", 0, log));
        })));
    };
    return WebAudioDebugger;
}());

var buildBiquadFilterNode = function (context, effectWC) {
    var biquadFilter = context.createBiquadFilter();
    biquadFilter.type = effectWC.method;
    biquadFilter.gain.value = 1.0;
    responsiveTo(biquadFilter, effectWC);
    return biquadFilter;
};
var buildDelayNode = function (context, effectWC) {
    var delay = context.createDelay(5.0);
    delay.delayTime.value = 3.0;
    responsiveTo(delay, effectWC);
    return delay;
};
var buildReverbNode = function (context, effectWC) {
    var convolver = context.createConvolver();
    var source = effectWC._use;
    if (source.getBuffer()) {
        convolver.buffer = source.getBuffer();
    }
    // responsiveTo(convolver, effectWC)
    return convolver;
};
// Private
var responsiveTo = function (effect, effectWC) {
    if (effectWC.midicontroller !== false) {
        biquadResponsiveToMidi(effect, effectWC);
    }
    else if (effectWC.responds === "mouse") {
        biquadResponsiveToMouse(effect, effectWC);
    }
    else {
        effect.frequency.value = effectWC.value;
    }
};
var handleMouseMove = function (event) {
    var dot, eventDoc, doc, body, pageX, pageY;
    event = event || window.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }
    window.mousePos = {
        toTop: event.pageY,
        toRight: (window.innerWidth - event.pageX),
        toBottom: (window.innerHeight - event.pageY),
        toLeft: event.pageX,
    };
};
var getMousePosition = function () {
    if (window.mousePos) {
        var event = new CustomEvent('mouse-update', { detail: window.mousePos });
        document.dispatchEvent(event);
    }
};
var biquadResponsiveToMidi = function (effect, effectWC) {
    document.addEventListener('midi-controller-update', function (e) {
        if (effectWC.midicontroller === e.detail.controller.number) {
            effect.frequency.value = ((e.detail.value + 1) / 128) * 3000;
        }
    });
};
var biquadResponsiveToMouse = function (effect, effectWC) {
    document.addEventListener('mouse-update', function (e) {
        if (effectWC.axis === "x") {
            effect.frequency.value = (e.detail.toLeft * 1.5) || 1000;
        }
        else if (effectWC.axis === "x-reverse") {
            effect.frequency.value = (e.detail.toRight * 1.5) || 1000;
        }
        else if (effectWC.axis === "y") {
            effect.frequency.value = (e.detail.toTop * 1.5) || 1000;
        }
        else if (effectWC.axis === "y-reverse") {
            effect.frequency.value = (e.detail.toBottom * 1.5) || 1000;
        }
        else if (effectWC.axis === "bi") {
            effect.frequency.value = ((e.detail.toRight + e.detail.toTop)) || 1000;
        }
        else if (effectWC.axis === "bi-reverse") {
            effect.frequency.value = ((e.detail.toLeft + e.detail.toRight)) || 1000;
        }
    }, false);
    (function () {
        if (!window.mouseInitialized) {
            window.mouseInitialized = true;
            document.onmousemove = handleMouseMove;
            setInterval(getMousePosition, 100); // setInterval repeats every X ms
        }
    })();
};

var WebAudioEffect = /** @class */ (function () {
    function WebAudioEffect() {
        this.method = "lowshelf";
        this.value = 1.0;
        this.responds = null;
        this.midicontroller = 0;
        this.axis = "x";
    }
    WebAudioEffect.prototype.attachEffect = function (context, source) {
        this.context = context;
        this.source = source;
        this._use = source.webAudio().querySelector("web-audio-source[name=" + this.use + "]");
        if (assert(this.type, "\"" + this.type + "\" is not a valid effect - Routing around to masterGain.\"")) {
            if (this.type === "panner") {
                // make a PannerNode
            }
            else if (this.type === "listener") {
                // make a AudioListener
            }
            else if (this.type === "reverb") {
                // make a ConvolverNode
                this.effect = buildReverbNode(this.context, this);
            }
            else if (this.type === "filter") {
                // make a BiquadFilterNode
                this.effect = buildBiquadFilterNode(this.context, this);
            }
            else if (this.type === "delay") {
                // make a DelayNode
                this.effect = buildDelayNode(this.context, this);
            }
            else if (this.type === "compression") {
                // make a DynamicsCompressorNode
            }
            else if (this.type === "distortion") {
                // make a WaveShaperNode
            }
        }
        return this.effect;
    };
    WebAudioEffect.prototype.effects = function () {
        return ["panner", "listener", "reverb", "delay", "compression", "distortion", "filter"];
    };
    return WebAudioEffect;
}());

var WebAudioSequencer = /** @class */ (function () {
    function WebAudioSequencer() {
        this.name = "web_audio_sequencer";
        this.autoplay = false;
        this.taps = 4;
        this.context = function () { return window.audio_context; };
        this.noteTime = 0.0;
        this.currentTap = 0;
        this.totalPlayTime = 0.0;
        this.custom = function () {
            // do nothing
        };
    }
    WebAudioSequencer.prototype.componentDidLoad = function () {
        if (this.autoplay) {
            this.play();
        }
    };
    WebAudioSequencer.prototype.schedule = function () {
        var _this = this;
        var currentTime = this.context().currentTime;
        // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
        currentTime -= this.startTime;
        while (this.noteTime < currentTime + 0.005) {
            this.totalPlayTime = this.noteTime + this.startTime;
            if (this.currentTap === 0) {
                this.iterations++;
            }
            this.custom();
            this.advance();
        }
        this.timer = setTimeout(function () {
            _this.schedule();
        }, 0);
    };
    WebAudioSequencer.prototype.advance = function () {
        // Setting tempo to 60 BPM just for now
        var secondsPerBeat = 60 / this.tempo;
        this.currentTap++;
        if (this.currentTap == this.taps) {
            this.currentTap = 0;
        }
        // 0.25 because each square is a 16th note
        this.noteTime += 0.25 * secondsPerBeat;
    };
    WebAudioSequencer.prototype.play = function () {
        this.iterations = 0;
        this.startTime = this.context().currentTime + 0.005 || 0.005;
        this.schedule();
    };
    WebAudioSequencer.prototype.stop = function () {
        this.iterations = 0;
        this.startTime = null;
        this.currentTap = 0;
        clearTimeout(this.timer);
    };
    return WebAudioSequencer;
}());

var WebAudioSource = /** @class */ (function () {
    function WebAudioSource() {
        this.inert = false;
        this.midikey = 0;
        this.midichannel = 1;
        this.status = "paused";
        this.effectsvolume = 100;
        this.effects = [];
    }
    WebAudioSource.prototype.getBuffer = function () {
        return this.buffer;
    };
    WebAudioSource.prototype.webAudio = function () {
        return this.webAudioWrapper;
    };
    WebAudioSource.prototype.gain = function (place) {
        if (place === void 0) { place = "wet"; }
        if (place === "wet") {
            return this.wetGain;
        }
        else if (place === "dry") {
            return this.dryGain;
        }
        else if (place === "channel") {
            return this.channelGain;
        }
    };
    WebAudioSource.prototype.play = function () {
        if (!this.inert) {
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;
            if (this.wetGain) {
                this.wetGain.gain.value = this.effectsvolume / 100;
                this.dryGain.gain.value = Math.abs((this.effectsvolume - 100) / 100);
            }
            else {
                this.dryGain.gain.value = 1;
            }
            if (this.wetGain) {
                this.source.connect(this.wetGain);
            }
            this.source.connect(this.dryGain);
            this.source.start(0);
        }
        else {
            throw "Cannot play inert media.";
        }
    };
    WebAudioSource.prototype.assignBuffer = function (webAudio, buffer) {
        var _this = this;
        this.webAudioWrapper = webAudio.element;
        this.context = webAudio.context;
        this.buffer = buffer;
        if (!this.inert) {
            this.masterGain = webAudio.gain;
            this.channelGain = this.context.createGain();
            this.prepareEffects();
            if (Object.keys(this.effects).length > 0) {
                // Make the source and gain
                this.wetGain = this.context.createGain();
                var previous_1 = "";
                Object.keys(this.effects).reverse().forEach(function (element, index) {
                    if (index === 0) {
                        _this.wetGain.connect(_this.effects[element]);
                    }
                    else {
                        _this.effects[previous_1].connect(_this.effects[element]);
                    }
                    previous_1 = element;
                });
                this.effects[previous_1].connect(this.channelGain);
            }
            this.dryGain = this.context.createGain();
            this.dryGain.connect(this.channelGain);
            this.channelGain.connect(this.masterGain);
        }
    };
    WebAudioSource.prototype.prepareEffects = function () {
        if (this.element.parentElement.nodeName !== "WEB-AUDIO") {
            var element = this.element.parentElement;
            while (element.nodeName !== "WEB-AUDIO") {
                this.effects[element.getAttribute("name")] = element.attachEffect(this.context, this.element);
                element = element.parentElement;
            }
        }
    };
    return WebAudioSource;
}());

var WebAudioVisualizer = /** @class */ (function () {
    function WebAudioVisualizer() {
        this.for = "web_audio";
        this.type = "wave";
        this.smoothing = 0.9;
        this.size = 1024;
        this.width = 800;
        this.height = 800;
    }
    WebAudioVisualizer.prototype.componentDidLoad = function () {
        this.canvas = this.element.querySelector('canvas');
        // this.width = this.element.outerWidth
    };
    WebAudioVisualizer.prototype.connect = function (context, destination) {
        this.context = context;
        this.analyser = this.context.createAnalyser();
        this.analyser.connect(destination);
        this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
        this.times = new Uint8Array(this.analyser.frequencyBinCount);
        if (this.type === "webgl") {
            this.canvasCTX = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
            this.__prepareWebGL();
        }
        else {
            this.canvasCTX = this.canvas.getContext('2d');
        }
        requestAnimationFrame(this.draw.bind(this));
        return this;
    };
    WebAudioVisualizer.prototype.draw = function () {
        this.analyser.smoothingTimeConstant = this.smoothing;
        this.analyser.fftSize = this.size;
        // Get the frequency data from the currently playing music
        this.analyser.getByteFrequencyData(this.freqs);
        this.analyser.getByteTimeDomainData(this.times);
        if (this.type !== "webgl") {
            var width = Math.floor(this.freqs.length);
            this.canvas.width = width || this.width;
            this.canvas.height = this.height;
        }
        switch (this.type) {
            case "wave":
                this.wave();
                break;
            case "bars":
                this.bars();
                break;
            case "webgl":
                this.webgl();
                break;
        }
        requestAnimationFrame(this.draw.bind(this));
    };
    WebAudioVisualizer.prototype.wave = function () {
        this.canvasCTX.fillRect(0, 0, this.width * 2, this.height);
        // Draw the time domain chart.
        for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
            var value = this.times[i];
            var percent = value / 256;
            var height = this.height * percent;
            var offset = this.height - height;
            var barWidth = this.width / this.analyser.frequencyBinCount + 4;
            var hue = i / this.analyser.frequencyBinCount * 360;
            this.canvasCTX.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            this.canvasCTX.fillRect(i * barWidth, offset, 4, 4);
        }
    };
    WebAudioVisualizer.prototype.bars = function () {
        // Draw the frequency domain chart.
        for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
            var value = this.freqs[i];
            var percent = value / 256;
            var height = this.height * percent;
            var offset = this.height - height;
            var barWidth = (this.width / this.analyser.frequencyBinCount) + 1;
            var hue = i / this.analyser.frequencyBinCount * 360;
            this.canvasCTX.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            this.canvasCTX.fillRect(i * barWidth, offset, barWidth, height);
        }
    };
    WebAudioVisualizer.prototype.webgl = function () {
        this.canvasCTX.uniform1f(this.fragTime, this.context.currentTime);
        this.canvasCTX.fillStyle = 'black';
        this.__copyAudioDataToTexture();
        this.__renderQuad();
    };
    WebAudioVisualizer.prototype.getFrequencyValue = function (freq) {
        var nyquist = this.context.sampleRate / 2;
        var index = Math.round(freq / nyquist * this.freqs.length);
        return this.freqs[index];
    };
    WebAudioVisualizer.prototype.render = function () {
        return (h("canvas", { "a": { "id": "canvas" } }));
    };
    // Private
    WebAudioVisualizer.prototype.__prepareWebGL = function () {
        var vbo = this.canvasCTX.createBuffer();
        this.canvasCTX.bindBuffer(this.canvasCTX.ARRAY_BUFFER, vbo);
        var vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        this.canvasCTX.bufferData(this.canvasCTX.ARRAY_BUFFER, vertices, this.canvasCTX.STATIC_DRAW);
        this.canvasCTX.vertexAttribPointer(0, 2, this.canvasCTX.FLOAT, false, 0, 0);
        var vertex = this.element.querySelector('web-audio-visualizer-shader[type="vertex"]');
        this.vertex = vertex.innerText;
        var fragment = this.element.querySelector('web-audio-visualizer-shader[type="fragment"]');
        this.fragment = fragment.innerText;
        this.fragShader = this.__createShader();
        var fragPosition = this.canvasCTX.getAttribLocation(this.fragShader, 'position');
        this.canvasCTX.enableVertexAttribArray(fragPosition);
        this.fragTime = this.canvasCTX.getUniformLocation(this.fragShader, 'time');
        this.canvasCTX.uniform1f(this.fragTime, this.context.currentTime);
        var fragResolution = this.canvasCTX.getUniformLocation(this.fragShader, 'resolution');
        this.canvasCTX.uniform2f(fragResolution, this.width, this.height);
        this.fragSpectrumArray = new Uint8Array(4 * this.freqs.length);
        var fragSpectrum = this.__createTexture();
    };
    WebAudioVisualizer.prototype.__createShader = function () {
        var vertexShader = this.canvasCTX.createShader(this.canvasCTX.VERTEX_SHADER);
        this.canvasCTX.shaderSource(vertexShader, this.vertex);
        this.canvasCTX.compileShader(vertexShader);
        if (!this.canvasCTX.getShaderParameter(vertexShader, this.canvasCTX.COMPILE_STATUS)) {
            throw new Error(this.canvasCTX.getShaderInfoLog(vertexShader));
        }
        var fragmentShader = this.canvasCTX.createShader(this.canvasCTX.FRAGMENT_SHADER);
        this.canvasCTX.shaderSource(fragmentShader, this.fragment);
        this.canvasCTX.compileShader(fragmentShader);
        if (!this.canvasCTX.getShaderParameter(fragmentShader, this.canvasCTX.COMPILE_STATUS)) {
            throw new Error(this.canvasCTX.getShaderInfoLog(fragmentShader));
        }
        var shader = this.canvasCTX.createProgram();
        this.canvasCTX.attachShader(shader, vertexShader);
        this.canvasCTX.attachShader(shader, fragmentShader);
        this.canvasCTX.linkProgram(shader);
        this.canvasCTX.useProgram(shader);
        return shader;
    };
    WebAudioVisualizer.prototype.__createTexture = function () {
        var texture = this.canvasCTX.createTexture();
        this.canvasCTX.bindTexture(this.canvasCTX.TEXTURE_2D, texture);
        this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D, this.canvasCTX.TEXTURE_MIN_FILTER, this.canvasCTX.LINEAR);
        this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D, this.canvasCTX.TEXTURE_WRAP_S, this.canvasCTX.CLAMP_TO_EDGE);
        this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D, this.canvasCTX.TEXTURE_WRAP_T, this.canvasCTX.CLAMP_TO_EDGE);
        return texture;
    };
    WebAudioVisualizer.prototype.__copyAudioDataToTexture = function () {
        for (var i = 0; i < this.freqs.length; i++) {
            this.fragSpectrumArray[6 * i + 0] = this.freqs[i]; // R
            this.fragSpectrumArray[6 * i + 1] = this.freqs[i]; // G
            this.fragSpectrumArray[6 * i + 2] = this.freqs[i]; // B
            this.fragSpectrumArray[6 * i + 3] = 255; // A
        }
        this.canvasCTX.texImage2D(this.canvasCTX.TEXTURE_2D, 0, this.canvasCTX.RGBA, this.freqs.length, 1, 0, this.canvasCTX.RGBA, this.canvasCTX.UNSIGNED_BYTE, this.fragSpectrumArray);
    };
    WebAudioVisualizer.prototype.__renderQuad = function () {
        this.canvasCTX.drawArrays(this.canvasCTX.TRIANGLE_STRIP, 0, 4);
    };
    return WebAudioVisualizer;
}());

var WebAudioVisualizerShader = /** @class */ (function () {
    function WebAudioVisualizerShader() {
    }
    WebAudioVisualizerShader.prototype.render = function () {
        return ('');
    };
    return WebAudioVisualizerShader;
}());

exports['WEB-AUDIO'] = WebAudio;
exports['WEB-AUDIO-DEBUGGER'] = WebAudioDebugger;
exports['WEB-AUDIO-EFFECT'] = WebAudioEffect;
exports['WEB-AUDIO-SEQUENCER'] = WebAudioSequencer;
exports['WEB-AUDIO-SOURCE'] = WebAudioSource;
exports['WEB-AUDIO-VISUALIZER'] = WebAudioVisualizer;
exports['WEB-AUDIO-VISUALIZER-SHADER'] = WebAudioVisualizerShader;
},


/***************** web-audio *****************/
[
/** web-audio: tag **/
"WEB-AUDIO",

/** web-audio: members **/
[
  [ "_currentSource", /** state **/ 5 ],
  [ "_sources", /** state **/ 5 ],
  [ "autoplay", /** prop **/ 1 ],
  [ "context", /** state **/ 5 ],
  [ "debugger", /** state **/ 5 ],
  [ "element", /** element ref **/ 7 ],
  [ "externalFiles", /** state **/ 5 ],
  [ "gain", /** state **/ 5 ],
  [ "is_prepared", /** method **/ 6 ],
  [ "keys", /** state **/ 5 ],
  [ "midi", /** prop **/ 1 ],
  [ "name", /** prop **/ 1 ],
  [ "prepared", /** state **/ 5 ],
  [ "previousVisualizer", /** state **/ 5 ],
  [ "source", /** method **/ 6 ],
  [ "sources", /** state **/ 5 ],
  [ "visualizerNodes", /** state **/ 5 ],
  [ "visualizers", /** state **/ 5 ]
],

/** web-audio: host **/
{},

/** web-audio: events **/
0 /* no events */,

/** web-audio: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-debugger *****************/
[
/** web-audio-debugger: tag **/
"WEB-AUDIO-DEBUGGER",

/** web-audio-debugger: members **/
[
  [ "addHistory", /** method **/ 6 ],
  [ "count", /** prop **/ 1, /** type number **/ 2 ],
  [ "history", /** state **/ 5 ]
],

/** web-audio-debugger: host **/
{},

/** web-audio-debugger: events **/
0 /* no events */,

/** web-audio-debugger: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-debugger: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-debugger: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-effect *****************/
[
/** web-audio-effect: tag **/
"WEB-AUDIO-EFFECT",

/** web-audio-effect: members **/
[
  [ "_use", /** state **/ 5 ],
  [ "attachEffect", /** method **/ 6 ],
  [ "axis", /** prop **/ 1 ],
  [ "context", /** state **/ 5 ],
  [ "effect", /** state **/ 5 ],
  [ "element", /** element ref **/ 7 ],
  [ "method", /** prop **/ 1 ],
  [ "midicontroller", /** prop **/ 1, /** type number **/ 2 ],
  [ "parent", /** state **/ 5 ],
  [ "responds", /** prop **/ 1 ],
  [ "source", /** state **/ 5 ],
  [ "type", /** prop **/ 1 ],
  [ "use", /** prop **/ 1 ],
  [ "value", /** prop **/ 1, /** type number **/ 2 ]
],

/** web-audio-effect: host **/
{},

/** web-audio-effect: events **/
0 /* no events */,

/** web-audio-effect: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-effect: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-effect: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-sequencer *****************/
[
/** web-audio-sequencer: tag **/
"WEB-AUDIO-SEQUENCER",

/** web-audio-sequencer: members **/
[
  [ "autoplay", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "context", /** state **/ 5 ],
  [ "currentTap", /** state **/ 5 ],
  [ "custom", /** prop **/ 1 ],
  [ "iterations", /** state **/ 5 ],
  [ "name", /** prop **/ 1 ],
  [ "noteTime", /** state **/ 5 ],
  [ "play", /** method **/ 6 ],
  [ "startTime", /** state **/ 5 ],
  [ "stop", /** method **/ 6 ],
  [ "taps", /** prop **/ 1, /** type number **/ 2 ],
  [ "tempo", /** prop **/ 1, /** type number **/ 2 ],
  [ "timer", /** state **/ 5 ],
  [ "totalPlayTime", /** state **/ 5 ]
],

/** web-audio-sequencer: host **/
{},

/** web-audio-sequencer: events **/
0 /* no events */,

/** web-audio-sequencer: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-sequencer: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-sequencer: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-source *****************/
[
/** web-audio-source: tag **/
"WEB-AUDIO-SOURCE",

/** web-audio-source: members **/
[
  [ "assignBuffer", /** method **/ 6 ],
  [ "buffer", /** state **/ 5 ],
  [ "channelGain", /** state **/ 5 ],
  [ "context", /** state **/ 5 ],
  [ "dryGain", /** state **/ 5 ],
  [ "effects", /** state **/ 5 ],
  [ "effectsvolume", /** prop **/ 1, /** type number **/ 2 ],
  [ "element", /** element ref **/ 7 ],
  [ "entry", /** state **/ 5 ],
  [ "gain", /** method **/ 6 ],
  [ "getBuffer", /** method **/ 6 ],
  [ "inert", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "masterGain", /** state **/ 5 ],
  [ "midichannel", /** prop **/ 1, /** type number **/ 2 ],
  [ "midikey", /** prop **/ 1, /** type number **/ 2 ],
  [ "name", /** prop **/ 1 ],
  [ "play", /** method **/ 6 ],
  [ "source", /** state **/ 5 ],
  [ "src", /** prop **/ 1 ],
  [ "status", /** state **/ 5 ],
  [ "webAudio", /** method **/ 6 ],
  [ "webAudioWrapper", /** state **/ 5 ],
  [ "wetGain", /** state **/ 5 ]
],

/** web-audio-source: host **/
{},

/** web-audio-source: events **/
0 /* no events */,

/** web-audio-source: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-source: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-source: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-visualizer *****************/
[
/** web-audio-visualizer: tag **/
"WEB-AUDIO-VISUALIZER",

/** web-audio-visualizer: members **/
[
  [ "_bufferLength", /** state **/ 5 ],
  [ "_dataArray", /** state **/ 5 ],
  [ "analyser", /** state **/ 5 ],
  [ "canvas", /** state **/ 5 ],
  [ "canvasCTX", /** state **/ 5 ],
  [ "connect", /** method **/ 6 ],
  [ "context", /** state **/ 5 ],
  [ "element", /** element ref **/ 7 ],
  [ "for", /** prop **/ 1 ],
  [ "fragment", /** state **/ 5 ],
  [ "fragShader", /** state **/ 5 ],
  [ "fragSpectrumArray", /** state **/ 5 ],
  [ "fragTime", /** state **/ 5 ],
  [ "freqs", /** state **/ 5 ],
  [ "height", /** state **/ 5 ],
  [ "renderer", /** prop **/ 1 ],
  [ "size", /** prop **/ 1, /** type number **/ 2 ],
  [ "smoothing", /** prop **/ 1, /** type number **/ 2 ],
  [ "times", /** state **/ 5 ],
  [ "type", /** prop **/ 1 ],
  [ "vertex", /** state **/ 5 ],
  [ "vertexShader", /** state **/ 5 ],
  [ "width", /** state **/ 5 ]
],

/** web-audio-visualizer: host **/
{},

/** web-audio-visualizer: events **/
0 /* no events */,

/** web-audio-visualizer: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-visualizer: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-visualizer: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-visualizer-shader *****************/
[
/** web-audio-visualizer-shader: tag **/
"WEB-AUDIO-VISUALIZER-SHADER",

/** web-audio-visualizer-shader: members **/
[
  [ "type", /** prop **/ 1 ]
],

/** web-audio-visualizer-shader: host **/
{},

/** web-audio-visualizer-shader: events **/
0 /* no events */,

/** web-audio-visualizer-shader: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-visualizer-shader: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-visualizer-shader: shadow **/
1 /* use shadow dom */

]
)