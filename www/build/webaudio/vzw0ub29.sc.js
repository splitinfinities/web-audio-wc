/*! Built with http://stenciljs.com */
const{h:e}=window.webaudio;import{forEach as t,delay as n}from"./chunk1.js";class r{constructor(e,t,n){this.loadBuffer=function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer";var r=this;n.onload=function(){r.context.decodeAudioData(n.response,function(n){n?(r.bufferList[t]=n,++r.loadCount==r.urlList.length&&r.onload(r.bufferList)):alert("error decoding file data: "+e)},function(e){console.error("decodeAudioData error",e)})},n.onerror=function(){alert("BufferLoader: XHR error")},n.send()},this.load=function(){for(var e=0;e<this.urlList.length;++e)this.loadBuffer(this.urlList[e],e)},this.context=e,this.urlList=t,this.onload=n,this.bufferList=new Array,this.loadCount=0}}var i,s="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},o=(function(e){!function(t){function n(){if(n.prototype._singleton)throw new Error("WebMidi is a singleton, it cannot be instantiated directly.");n.prototype._singleton=this,this._inputs=[],this._outputs=[],this._userHandlers={},this._stateChangeQueue=[],this._processingStateChange=!1,this._midiInterfaceEvents=["connected","disconnected"],this._notes=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],this._semitones={C:0,D:2,E:4,F:5,G:7,A:9,B:11},Object.defineProperties(this,{MIDI_SYSTEM_MESSAGES:{value:{sysex:240,timecode:241,songposition:242,songselect:243,tuningrequest:246,sysexend:247,clock:248,start:250,continue:251,stop:252,activesensing:254,reset:255,unknownsystemmessage:-1},writable:!1,enumerable:!0,configurable:!1},MIDI_CHANNEL_MESSAGES:{value:{noteoff:8,noteon:9,keyaftertouch:10,controlchange:11,channelmode:11,programchange:12,channelaftertouch:13,pitchbend:14},writable:!1,enumerable:!0,configurable:!1},MIDI_REGISTERED_PARAMETER:{value:{pitchbendrange:[0,0],channelfinetuning:[0,1],channelcoarsetuning:[0,2],tuningprogram:[0,3],tuningbank:[0,4],modulationrange:[0,5],azimuthangle:[61,0],elevationangle:[61,1],gain:[61,2],distanceratio:[61,3],maximumdistance:[61,4],maximumdistancegain:[61,5],referencedistanceratio:[61,6],panspreadangle:[61,7],rollangle:[61,8]},writable:!1,enumerable:!0,configurable:!1},MIDI_CONTROL_CHANGE_MESSAGES:{value:{bankselectcoarse:0,modulationwheelcoarse:1,breathcontrollercoarse:2,footcontrollercoarse:4,portamentotimecoarse:5,dataentrycoarse:6,volumecoarse:7,balancecoarse:8,pancoarse:10,expressioncoarse:11,effectcontrol1coarse:12,effectcontrol2coarse:13,generalpurposeslider1:16,generalpurposeslider2:17,generalpurposeslider3:18,generalpurposeslider4:19,bankselectfine:32,modulationwheelfine:33,breathcontrollerfine:34,footcontrollerfine:36,portamentotimefine:37,dataentryfine:38,volumefine:39,balancefine:40,panfine:42,expressionfine:43,effectcontrol1fine:44,effectcontrol2fine:45,holdpedal:64,portamento:65,sustenutopedal:66,softpedal:67,legatopedal:68,hold2pedal:69,soundvariation:70,resonance:71,soundreleasetime:72,soundattacktime:73,brightness:74,soundcontrol6:75,soundcontrol7:76,soundcontrol8:77,soundcontrol9:78,soundcontrol10:79,generalpurposebutton1:80,generalpurposebutton2:81,generalpurposebutton3:82,generalpurposebutton4:83,reverblevel:91,tremololevel:92,choruslevel:93,celestelevel:94,phaserlevel:95,databuttonincrement:96,databuttondecrement:97,nonregisteredparametercoarse:98,nonregisteredparameterfine:99,registeredparametercoarse:100,registeredparameterfine:101},writable:!1,enumerable:!0,configurable:!1},MIDI_CHANNEL_MODE_MESSAGES:{value:{allsoundoff:120,resetallcontrollers:121,localcontrol:122,allnotesoff:123,omnimodeoff:124,omnimodeon:125,monomodeon:126,polymodeon:127},writable:!1,enumerable:!0,configurable:!1}}),Object.defineProperties(this,{supported:{enumerable:!0,get:function(){return"requestMIDIAccess"in navigator}},enabled:{enumerable:!0,get:function(){return void 0!==this.interface}.bind(this)},inputs:{enumerable:!0,get:function(){return this._inputs}.bind(this)},outputs:{enumerable:!0,get:function(){return this._outputs}.bind(this)},sysexEnabled:{enumerable:!0,get:function(){return!(!this.interface||!this.interface.sysexEnabled)}.bind(this)},time:{enumerable:!0,get:function(){return performance.now()}}})}function r(e){var t=this;this._userHandlers={channel:{},system:{}},this._midiInput=e,Object.defineProperties(this,{connection:{enumerable:!0,get:function(){return t._midiInput.connection}},id:{enumerable:!0,get:function(){return t._midiInput.id}},manufacturer:{enumerable:!0,get:function(){return t._midiInput.manufacturer}},name:{enumerable:!0,get:function(){return t._midiInput.name}},state:{enumerable:!0,get:function(){return t._midiInput.state}}}),this._initializeUserHandlers()}function i(e){var t=this;this._midiOutput=e,Object.defineProperties(this,{connection:{enumerable:!0,get:function(){return t._midiOutput.connection}},id:{enumerable:!0,get:function(){return t._midiOutput.id}},manufacturer:{enumerable:!0,get:function(){return t._midiOutput.manufacturer}},name:{enumerable:!0,get:function(){return t._midiOutput.name}},state:{enumerable:!0,get:function(){return t._midiOutput.state}}})}var s=new n;n.prototype.enable=function(e,t){return this.enabled?void 0:this.supported?void navigator.requestMIDIAccess({sysex:t}).then(function(t){this.interface=t,this._resetInterfaceUserHandlers(),this.interface.onstatechange=this._onInterfaceStateChange.bind(this),this._onInterfaceStateChange(null),"function"==typeof e&&e.call(this)}.bind(this),function(t){"function"==typeof e&&e.call(this,t)}.bind(this)):void("function"==typeof e&&e(new Error("The Web MIDI API is not supported by your browser.")))},n.prototype.disable=function(){if(!this.supported)throw new Error("The Web MIDI API is not supported by your browser.");this.interface.onstatechange=void 0,this.interface=void 0,this._inputs=[],this._outputs=[],this._resetInterfaceUserHandlers()},n.prototype.addListener=function(e,t){if(!this.enabled)throw new Error("WebMidi must be enabled before adding event listeners.");if("function"!=typeof t)throw new TypeError("The 'listener' parameter must be a function.");if(!(this._midiInterfaceEvents.indexOf(e)>=0))throw new TypeError("The specified event type is not supported.");return this._userHandlers[e].push(t),this},n.prototype.hasListener=function(e,t){if(!this.enabled)throw new Error("WebMidi must be enabled before checking event listeners.");if("function"!=typeof t)throw new TypeError("The 'listener' parameter must be a function.");if(!(this._midiInterfaceEvents.indexOf(e)>=0))throw new TypeError("The specified event type is not supported.");for(var n=0;n<this._userHandlers[e].length;n++)if(this._userHandlers[e][n]===t)return!0;return!1},n.prototype.removeListener=function(e,t){if(!this.enabled)throw new Error("WebMidi must be enabled before removing event listeners.");if(void 0!==t&&"function"!=typeof t)throw new TypeError("The 'listener' parameter must be a function.");if(this._midiInterfaceEvents.indexOf(e)>=0)if(t)for(var n=0;n<this._userHandlers[e].length;n++)this._userHandlers[e][n]===t&&this._userHandlers[e].splice(n,1);else this._userHandlers[e]=[];else{if(void 0!==e)throw new TypeError("The specified event type is not supported.");this._resetInterfaceUserHandlers()}return this},n.prototype.getInputById=function(e){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var t=0;t<this.inputs.length;t++)if(this.inputs[t].id===e)return this.inputs[t];return!1},n.prototype.getOutputById=function(e){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var t=0;t<this.outputs.length;t++)if(this.outputs[t].id===e)return this.outputs[t];return!1},n.prototype.getInputByName=function(e){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var t=0;t<this.inputs.length;t++)if(~this.inputs[t].name.indexOf(e))return this.inputs[t];return!1},n.prototype.getOctave=function(e){return e>=0&&127>=e?Math.floor(parseInt(e)/12-1)-1:void 0},n.prototype.getOutputByName=function(e){if(!this.enabled)throw new Error("WebMidi is not enabled.");for(var t=0;t<this.outputs.length;t++)if(~this.outputs[t].name.indexOf(e))return this.outputs[t];return!1},n.prototype.guessNoteNumber=function(e){var t=!1;if(e&&e.toFixed&&e>=0&&127>=e?t=Math.round(e):parseInt(e)>=0&&parseInt(e)<=127?t=parseInt(e):("string"==typeof e||e instanceof String)&&(t=this.noteNameToNumber(e)),!1===t)throw new Error("Invalid note number ("+e+").");return t},n.prototype.noteNameToNumber=function(e){"string"!=typeof e&&(e="");var t=e.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);if(!t)throw new RangeError("Invalid note name.");var n=s._semitones[t[1].toUpperCase()],r=parseInt(t[3]),i=12*(r+2)+n;if(t[2].toLowerCase().indexOf("b")>-1?i-=t[2].length:t[2].toLowerCase().indexOf("#")>-1&&(i+=t[2].length),0>n||-2>r||r>8||0>i||i>127)throw new RangeError("Invalid note name or note outside valid range.");return i},n.prototype._updateInputsAndOutputs=function(){this._updateInputs(),this._updateOutputs()},n.prototype._updateInputs=function(){for(var e=0;e<this._inputs.length;e++){for(var t=!0,n=this.interface.inputs.values(),r=n.next();r&&!r.done;r=n.next())if(this._inputs[e]._midiInput===r.value){t=!1;break}t&&this._inputs.splice(e,1)}this.interface.inputs.forEach(function(e){for(var t=!0,n=0;n<this._inputs.length;n++)this._inputs[n]._midiInput===e&&(t=!1);t&&this._inputs.push(this._createInput(e))}.bind(this))},n.prototype._updateOutputs=function(){for(var e=0;e<this._outputs.length;e++){for(var t=!0,n=this.interface.outputs.values(),r=n.next();r&&!r.done;r=n.next())if(this._outputs[e]._midiOutput===r.value){t=!1;break}t&&this._outputs.splice(e,1)}this.interface.outputs.forEach(function(e){for(var t=!0,n=0;n<this._outputs.length;n++)this._outputs[n]._midiOutput===e&&(t=!1);t&&this._outputs.push(this._createOutput(e))}.bind(this))},n.prototype._createInput=function(e){var t=new r(e);return t._midiInput.onmidimessage=t._onMidiMessage.bind(t),t},n.prototype._createOutput=function(e){var t=new i(e);return t._midiOutput.onmidimessage=t._onMidiMessage.bind(t),t},n.prototype._onInterfaceStateChange=function(e){if(this._stateChangeQueue.push(e),!this._processingStateChange){for(this._processingStateChange=!0;this._stateChangeQueue.length>0;)this._processStateChange(this._stateChangeQueue.shift());this._processingStateChange=!1}},n.prototype._processStateChange=function(e){if(this._updateInputsAndOutputs(),null!==e){var t={timestamp:e.timeStamp,type:e.port.state,id:e.port.id,manufacturer:e.port.manufacturer,name:e.port.name};"connected"===e.port.state&&("output"===e.port.type?t.output=this.getOutputById(e.port.id):"input"===e.port.type&&(t.input=this.getInputById(e.port.id))),this._userHandlers[e.port.state].forEach(function(e){e(t)})}},n.prototype._resetInterfaceUserHandlers=function(){for(var e=0;e<this._midiInterfaceEvents.length;e++)this._userHandlers[this._midiInterfaceEvents[e]]=[]},r.prototype.addListener=function(e,t,n){var r=this;if(void 0===t&&(t="all"),Array.isArray(t)||(t=[t]),t.forEach(function(e){if("all"!==e&&!(e>=1&&16>=e))throw new RangeError("The 'channel' parameter is invalid.")}),"function"!=typeof n)throw new TypeError("The 'listener' parameter must be a function.");if(s.MIDI_SYSTEM_MESSAGES[e])this._userHandlers.system[e]||(this._userHandlers.system[e]=[]),this._userHandlers.system[e].push(n);else{if(!s.MIDI_CHANNEL_MESSAGES[e])throw new TypeError("The specified event type is not supported.");if(t.indexOf("all")>-1){t=[];for(var i=1;16>=i;i++)t.push(i)}this._userHandlers.channel[e]||(this._userHandlers.channel[e]=[]),t.forEach(function(t){r._userHandlers.channel[e][t]||(r._userHandlers.channel[e][t]=[]),r._userHandlers.channel[e][t].push(n)})}return this},r.prototype.on=r.prototype.addListener,r.prototype.hasListener=function(e,t,n){var r=this;if("function"!=typeof n)throw new TypeError("The 'listener' parameter must be a function.");if(void 0===t&&(t="all"),t.constructor!==Array&&(t=[t]),s.MIDI_SYSTEM_MESSAGES[e]){for(var i=0;i<this._userHandlers.system[e].length;i++)if(this._userHandlers.system[e][i]===n)return!0}else if(s.MIDI_CHANNEL_MESSAGES[e]){if(t.indexOf("all")>-1){t=[];for(var o=1;16>=o;o++)t.push(o)}return!!this._userHandlers.channel[e]&&t.every(function(t){var i=r._userHandlers.channel[e][t];return i&&i.indexOf(n)>-1})}return!1},r.prototype.removeListener=function(e,t,n){var r=this;if(void 0!==n&&"function"!=typeof n)throw new TypeError("The 'listener' parameter must be a function.");if(void 0===t&&(t="all"),t.constructor!==Array&&(t=[t]),s.MIDI_SYSTEM_MESSAGES[e])if(void 0===n)this._userHandlers.system[e]=[];else for(var i=0;i<this._userHandlers.system[e].length;i++)this._userHandlers.system[e][i]===n&&this._userHandlers.system[e].splice(i,1);else if(s.MIDI_CHANNEL_MESSAGES[e]){if(t.indexOf("all")>-1){t=[];for(var o=1;16>=o;o++)t.push(o)}if(!this._userHandlers.channel[e])return this;t.forEach(function(t){var i=r._userHandlers.channel[e][t];if(i)if(void 0===n)r._userHandlers.channel[e][t]=[];else for(var s=0;s<i.length;s++)i[s]===n&&i.splice(s,1)})}else{if(void 0!==e)throw new TypeError("The specified event type is not supported.");this._initializeUserHandlers()}return this},r.prototype._initializeUserHandlers=function(){for(var e in s.MIDI_CHANNEL_MESSAGES)s.MIDI_CHANNEL_MESSAGES.hasOwnProperty(e)&&(this._userHandlers.channel[e]={});for(var t in s.MIDI_SYSTEM_MESSAGES)s.MIDI_SYSTEM_MESSAGES.hasOwnProperty(t)&&(this._userHandlers.system[t]=[])},r.prototype._onMidiMessage=function(e){e.data[0]<240?this._parseChannelEvent(e):e.data[0]<=255&&this._parseSystemEvent(e)},r.prototype._parseChannelEvent=function(e){var t,n,r=e.data[0]>>4,i=1+(15&e.data[0]);e.data.length>1&&(t=e.data[1],n=e.data.length>2?e.data[2]:void 0);var o={target:this,data:e.data,timestamp:e.timeStamp,channel:i};r===s.MIDI_CHANNEL_MESSAGES.noteoff||r===s.MIDI_CHANNEL_MESSAGES.noteon&&0===n?(o.type="noteoff",o.note={number:t,name:s._notes[t%12],octave:s.getOctave(t)},o.velocity=n/127,o.rawVelocity=n):r===s.MIDI_CHANNEL_MESSAGES.noteon?(o.type="noteon",o.note={number:t,name:s._notes[t%12],octave:s.getOctave(t)},o.velocity=n/127,o.rawVelocity=n):r===s.MIDI_CHANNEL_MESSAGES.keyaftertouch?(o.type="keyaftertouch",o.note={number:t,name:s._notes[t%12],octave:s.getOctave(t)},o.value=n/127):r===s.MIDI_CHANNEL_MESSAGES.controlchange&&t>=0&&119>=t?(o.type="controlchange",o.controller={number:t,name:this.getCcNameByNumber(t)},o.value=n):r===s.MIDI_CHANNEL_MESSAGES.channelmode&&t>=120&&127>=t?(o.type="channelmode",o.controller={number:t,name:this.getChannelModeByNumber(t)},o.value=n):r===s.MIDI_CHANNEL_MESSAGES.programchange?(o.type="programchange",o.value=t):r===s.MIDI_CHANNEL_MESSAGES.channelaftertouch?(o.type="channelaftertouch",o.value=t/127):r===s.MIDI_CHANNEL_MESSAGES.pitchbend?(o.type="pitchbend",o.value=((n<<7)+t-8192)/8192):o.type="unknownchannelmessage",this._userHandlers.channel[o.type]&&this._userHandlers.channel[o.type][i]&&this._userHandlers.channel[o.type][i].forEach(function(e){e(o)})},r.prototype.getCcNameByNumber=function(e){if(!((e=parseInt(e))>=0&&119>=e))throw new RangeError("The control change number must be between 0 and 119.");for(var t in s.MIDI_CONTROL_CHANGE_MESSAGES)if(e===s.MIDI_CONTROL_CHANGE_MESSAGES[t])return t},r.prototype.getChannelModeByNumber=function(e){if(!((e=parseInt(e))>=120&&status<=127))throw new RangeError("The control change number must be between 120 and 127.");for(var t in s.MIDI_CHANNEL_MODE_MESSAGES)if(e===s.MIDI_CHANNEL_MODE_MESSAGES[t])return t},r.prototype._parseSystemEvent=function(e){var t=e.data[0],n={target:this,data:e.data,timestamp:e.timeStamp};t===s.MIDI_SYSTEM_MESSAGES.sysex?n.type="sysex":t===s.MIDI_SYSTEM_MESSAGES.timecode?n.type="timecode":t===s.MIDI_SYSTEM_MESSAGES.songposition?n.type="songposition":t===s.MIDI_SYSTEM_MESSAGES.songselect?(n.type="songselect",n.song=e.data[1]):t===s.MIDI_SYSTEM_MESSAGES.tuningrequest?n.type="tuningrequest":t===s.MIDI_SYSTEM_MESSAGES.clock?n.type="clock":t===s.MIDI_SYSTEM_MESSAGES.start?n.type="start":t===s.MIDI_SYSTEM_MESSAGES.continue?n.type="continue":t===s.MIDI_SYSTEM_MESSAGES.stop?n.type="stop":t===s.MIDI_SYSTEM_MESSAGES.activesensing?n.type="activesensing":t===s.MIDI_SYSTEM_MESSAGES.reset?n.type="reset":n.type="unknownsystemmessage",this._userHandlers.system[n.type]&&this._userHandlers.system[n.type].forEach(function(e){e(n)})},i.prototype.send=function(e,t,n){if(!(e>=128&&255>=e))throw new RangeError("The status byte must be an integer between 128 (0x80) and 255 (0xFF).");Array.isArray(t)||(t=parseInt(t)>=0&&parseInt(t)<=127?[parseInt(t)]:[]);var r=[e];return t.forEach(function(e){if(!(e>=0&&255>=e))throw new RangeError("The data bytes must be integers between 0 (0x00) and 255 (0xFF).");r.push(e)}),this._midiOutput.send(r,parseFloat(n)||0),this},i.prototype.sendSysex=function(e,t,n){if(!s.sysexEnabled)throw new Error("SysEx message support must first be activated.");return n=n||{},e=[].concat(e),t.forEach(function(e){if(0>e||e>127)throw new RangeError("The data bytes of a SysEx message must be integers between 0 (0x00) and 127 (0x7F).")}),t=e.concat(t,s.MIDI_SYSTEM_MESSAGES.sysexend),this.send(s.MIDI_SYSTEM_MESSAGES.sysex,t,this._parseTimeParameter(n.time)),this},i.prototype.sendTimecodeQuarterFrame=function(e,t){return t=t||{},this.send(s.MIDI_SYSTEM_MESSAGES.timecode,e,this._parseTimeParameter(t.time)),this},i.prototype.sendSongPosition=function(e,t){e=parseInt(e)||0,t=t||{};var n=e>>7&127,r=127&e;return this.send(s.MIDI_SYSTEM_MESSAGES.songposition,[n,r],this._parseTimeParameter(t.time)),this},i.prototype.sendSongSelect=function(e,t){if(e=parseInt(e),t=t||{},!(e>=0&&127>=e))throw new RangeError("The song number must be between 0 and 127.");return this.send(s.MIDI_SYSTEM_MESSAGES.songselect,[e],this._parseTimeParameter(t.time)),this},i.prototype.sendTuningRequest=function(e){return e=e||{},this.send(s.MIDI_SYSTEM_MESSAGES.tuningrequest,void 0,this._parseTimeParameter(e.time)),this},i.prototype.sendClock=function(e){return e=e||{},this.send(s.MIDI_SYSTEM_MESSAGES.clock,void 0,this._parseTimeParameter(e.time)),this},i.prototype.sendStart=function(e){return e=e||{},this.send(s.MIDI_SYSTEM_MESSAGES.start,void 0,this._parseTimeParameter(e.time)),this},i.prototype.sendContinue=function(e){return e=e||{},this.send(s.MIDI_SYSTEM_MESSAGES.continue,void 0,this._parseTimeParameter(e.time)),this},i.prototype.sendStop=function(e){return e=e||{},this.send(s.MIDI_SYSTEM_MESSAGES.stop,void 0,this._parseTimeParameter(e.time)),this},i.prototype.sendActiveSensing=function(e){return e=e||{},this.send(s.MIDI_SYSTEM_MESSAGES.activesensing,void 0,this._parseTimeParameter(e.time)),this},i.prototype.sendReset=function(e){return e=e||{},this.send(s.MIDI_SYSTEM_MESSAGES.reset,void 0,this._parseTimeParameter(e.time)),this},i.prototype.stopNote=function(e,t,n){if("all"===e)return this.sendChannelMode("allnotesoff",0,t,n);var r=64;return(n=n||{}).velocity=parseFloat(n.velocity),n.rawVelocity?!isNaN(n.velocity)&&n.velocity>=0&&n.velocity<=127&&(r=n.velocity):!isNaN(n.velocity)&&n.velocity>=0&&n.velocity<=1&&(r=127*n.velocity),this._convertNoteToArray(e).forEach(function(e){this._convertChannelToArray(t).forEach(function(t){this.send((s.MIDI_CHANNEL_MESSAGES.noteoff<<4)+(t-1),[e,Math.round(r)],this._parseTimeParameter(n.time))}.bind(this))}.bind(this)),this},i.prototype.playNote=function(e,t,n){var r=64;if((n=n||{}).velocity=parseFloat(n.velocity),n.rawVelocity?!isNaN(n.velocity)&&n.velocity>=0&&n.velocity<=127&&(r=n.velocity):!isNaN(n.velocity)&&n.velocity>=0&&n.velocity<=1&&(r=127*n.velocity),n.time=this._parseTimeParameter(n.time),this._convertNoteToArray(e).forEach(function(e){this._convertChannelToArray(t).forEach(function(t){this.send((s.MIDI_CHANNEL_MESSAGES.noteon<<4)+(t-1),[e,Math.round(r)],n.time)}.bind(this))}.bind(this)),n.duration=parseFloat(n.duration),n.duration){n.duration<=0&&(n.duration=0);var i=64;n.release=parseFloat(n.release),n.rawVelocity?!isNaN(n.release)&&n.release>=0&&n.release<=127&&(i=n.release):!isNaN(n.release)&&n.release>=0&&n.release<=1&&(i=127*n.release),this._convertNoteToArray(e).forEach(function(e){this._convertChannelToArray(t).forEach(function(t){this.send((s.MIDI_CHANNEL_MESSAGES.noteoff<<4)+(t-1),[e,Math.round(i)],(n.time||s.time)+n.duration)}.bind(this))}.bind(this))}return this},i.prototype.sendKeyAftertouch=function(e,t,n,r){var i=this;if(r=r||{},1>t||t>16)throw new RangeError("The channel must be between 1 and 16.");n=parseFloat(n),(isNaN(n)||0>n||n>1)&&(n=.5);var o=Math.round(127*n);return this._convertNoteToArray(e).forEach(function(e){i._convertChannelToArray(t).forEach(function(t){i.send((s.MIDI_CHANNEL_MESSAGES.keyaftertouch<<4)+(t-1),[e,o],i._parseTimeParameter(r.time))})}),this},i.prototype.sendControlChange=function(e,t,n,r){if(r=r||{},"string"==typeof e){if(!(e=s.MIDI_CONTROL_CHANGE_MESSAGES[e]))throw new TypeError("Invalid controller name.")}else if(!((e=parseInt(e))>=0&&119>=e))throw new RangeError("Controller numbers must be between 0 and 119.");if(!((t=parseInt(t)||0)>=0&&127>=t))throw new RangeError("Controller value must be between 0 and 127.");return this._convertChannelToArray(n).forEach(function(n){this.send((s.MIDI_CHANNEL_MESSAGES.controlchange<<4)+(n-1),[e,t],this._parseTimeParameter(r.time))}.bind(this)),this},i.prototype._selectRegisteredParameter=function(e,t,n){var r=this;if(e[0]=parseInt(e[0]),!(e[0]>=0&&e[0]<=127))throw new RangeError("The control65 value must be between 0 and 127");if(e[1]=parseInt(e[1]),!(e[1]>=0&&e[1]<=127))throw new RangeError("The control64 value must be between 0 and 127");return this._convertChannelToArray(t).forEach(function(i){r.sendControlChange(101,e[0],t,{time:n}),r.sendControlChange(100,e[1],t,{time:n})}),this},i.prototype._selectNonRegisteredParameter=function(e,t,n){var r=this;if(e[0]=parseInt(e[0]),!(e[0]>=0&&e[0]<=127))throw new RangeError("The control63 value must be between 0 and 127");if(e[1]=parseInt(e[1]),!(e[1]>=0&&e[1]<=127))throw new RangeError("The control62 value must be between 0 and 127");return this._convertChannelToArray(t).forEach(function(i){r.sendControlChange(99,e[0],t,{time:n}),r.sendControlChange(98,e[1],t,{time:n})}),this},i.prototype._setCurrentRegisteredParameter=function(e,t,n){var r=this;if((e=[].concat(e))[0]=parseInt(e[0]),!(e[0]>=0&&e[0]<=127))throw new RangeError("The msb value must be between 0 and 127");return this._convertChannelToArray(t).forEach(function(i){r.sendControlChange(6,e[0],t,{time:n})}),e[1]=parseInt(e[1]),e[1]>=0&&e[1]<=127&&this._convertChannelToArray(t).forEach(function(i){r.sendControlChange(38,e[1],t,{time:n})}),this},i.prototype._deselectRegisteredParameter=function(e,t){var n=this;return this._convertChannelToArray(e).forEach(function(r){n.sendControlChange(101,127,e,{time:t}),n.sendControlChange(100,127,e,{time:t})}),this},i.prototype.setRegisteredParameter=function(e,t,n,r){var i=this;if(r=r||{},!Array.isArray(e)){if(!s.MIDI_REGISTERED_PARAMETER[e])throw new Error("The specified parameter is not available.");e=s.MIDI_REGISTERED_PARAMETER[e]}return this._convertChannelToArray(n).forEach(function(s){i._selectRegisteredParameter(e,n,r.time),i._setCurrentRegisteredParameter(t,n,r.time),i._deselectRegisteredParameter(n,r.time)}),this},i.prototype.setNonRegisteredParameter=function(e,t,n,r){var i=this;if(r=r||{},!(e[0]>=0&&e[0]<=127&&e[1]>=0&&e[1]<=127))throw new Error("Position 0 and 1 of the 2-position parameter array must both be between 0 and 127.");return t=[].concat(t),this._convertChannelToArray(n).forEach(function(s){i._selectNonRegisteredParameter(e,n,r.time),i._setCurrentRegisteredParameter(t,n,r.time),i._deselectRegisteredParameter(n,r.time)}),this},i.prototype.incrementRegisteredParameter=function(e,t,n){var r=this;if(n=n||{},!Array.isArray(e)){if(!s.MIDI_REGISTERED_PARAMETER[e])throw new Error("The specified parameter is not available.");e=s.MIDI_REGISTERED_PARAMETER[e]}return this._convertChannelToArray(t).forEach(function(i){r._selectRegisteredParameter(e,t,n.time),r.sendControlChange(96,0,t,{time:n.time}),r._deselectRegisteredParameter(t,n.time)}),this},i.prototype.decrementRegisteredParameter=function(e,t,n){if(n=n||{},!Array.isArray(e)){if(!s.MIDI_REGISTERED_PARAMETER[e])throw new TypeError("The specified parameter is not available.");e=s.MIDI_REGISTERED_PARAMETER[e]}return this._convertChannelToArray(t).forEach(function(r){this._selectRegisteredParameter(e,t,n.time),this.sendControlChange(97,0,t,{time:n.time}),this._deselectRegisteredParameter(t,n.time)}.bind(this)),this},i.prototype.setPitchBendRange=function(e,t,n,r){var i=this;if(r=r||{},!((e=parseInt(e)||0)>=0&&127>=e))throw new RangeError("The semitones value must be between 0 and 127");if(!((t=parseInt(t)||0)>=0&&127>=t))throw new RangeError("The cents value must be between 0 and 127");return this._convertChannelToArray(n).forEach(function(s){i.setRegisteredParameter("pitchbendrange",[e,t],n,{time:r.time})}),this},i.prototype.setModulationRange=function(e,t,n,r){var i=this;if(r=r||{},!((e=parseInt(e)||0)>=0&&127>=e))throw new RangeError("The semitones value must be between 0 and 127");if(!((t=parseInt(t)||0)>=0&&127>=t))throw new RangeError("The cents value must be between 0 and 127");return this._convertChannelToArray(n).forEach(function(s){i.setRegisteredParameter("modulationrange",[e,t],n,{time:r.time})}),this},i.prototype.setMasterTuning=function(e,t,n){var r=this;if(n=n||{},-65>=(e=parseFloat(e)||0)||e>=64)throw new RangeError("The value must be a decimal number larger than -65 and smaller than 64.");var i=parseInt(e)+64,s=e-parseInt(e),o=(s=Math.round((s+1)/2*16383))>>7&127,a=127&s;return this._convertChannelToArray(t).forEach(function(e){r.setRegisteredParameter("channelcoarsetuning",i,t,{time:n.time}),r.setRegisteredParameter("channelfinetuning",[o,a],t,{time:n.time})}),this},i.prototype.setTuningProgram=function(e,t,n){var r=this;if(n=n||{},!((e=parseInt(e)||0)>=0&&127>=e))throw new RangeError("The program value must be between 0 and 127");return this._convertChannelToArray(t).forEach(function(i){r.setRegisteredParameter("tuningprogram",e,t,{time:n.time})}),this},i.prototype.setTuningBank=function(e,t,n){var r=this;if(n=n||{},!((e=parseInt(e)||0)>=0&&127>=e))throw new RangeError("The bank value must be between 0 and 127");return this._convertChannelToArray(t).forEach(function(i){r.setRegisteredParameter("tuningbank",e,t,{time:n.time})}),this},i.prototype.sendChannelMode=function(e,t,n,r){if(r=r||{},"string"==typeof e){if(!(e=s.MIDI_CHANNEL_MODE_MESSAGES[e]))throw new TypeError("Invalid channel mode message name.")}else if(!((e=parseInt(e))>=120&&127>=e))throw new RangeError("Channel mode numerical identifiers must be between 120 and 127.");if(0>(t=parseInt(t)||0)||t>127)throw new RangeError("Value must be an integer between 0 and 127.");return this._convertChannelToArray(n).forEach(function(n){this.send((s.MIDI_CHANNEL_MESSAGES.channelmode<<4)+(n-1),[e,t],this._parseTimeParameter(r.time))}.bind(this)),this},i.prototype.sendProgramChange=function(e,t,n){var r=this;if(n=n||{},e=parseInt(e),isNaN(e)||0>e||e>127)throw new RangeError("Program numbers must be between 0 and 127.");return this._convertChannelToArray(t).forEach(function(t){r.send((s.MIDI_CHANNEL_MESSAGES.programchange<<4)+(t-1),[e],r._parseTimeParameter(n.time))}),this},i.prototype.sendChannelAftertouch=function(e,t,n){var r=this;n=n||{},e=parseFloat(e),(isNaN(e)||0>e||e>1)&&(e=.5);var i=Math.round(127*e);return this._convertChannelToArray(t).forEach(function(e){r.send((s.MIDI_CHANNEL_MESSAGES.channelaftertouch<<4)+(e-1),[i],r._parseTimeParameter(n.time))}),this},i.prototype.sendPitchBend=function(e,t,n){var r=this;if(n=n||{},e=parseFloat(e),isNaN(e)||-1>e||e>1)throw new RangeError("Pitch bend value must be between -1 and 1.");var i=Math.round((e+1)/2*16383),o=i>>7&127,a=127&i;return this._convertChannelToArray(t).forEach(function(e){r.send((s.MIDI_CHANNEL_MESSAGES.pitchbend<<4)+(e-1),[a,o],r._parseTimeParameter(n.time))}),this},i.prototype._parseTimeParameter=function(e){var t,n;return"string"==typeof e&&"+"===e.substring(0,1)?(t=parseFloat(e))&&t>0&&(n=s.time+t):(t=parseFloat(e))>s.time&&(n=t),n},i.prototype._convertNoteToArray=function(e){var t=[];return Array.isArray(e)||(e=[e]),e.forEach(function(e){t.push(s.guessNoteNumber(e))}),t},i.prototype._convertChannelToArray=function(e){if(("all"===e||void 0===e)&&(e=["all"]),Array.isArray(e)||(e=[e]),e.indexOf("all")>-1){e=[];for(var t=1;16>=t;t++)e.push(t)}return e.forEach(function(e){if(!(e>=1&&16>=e))throw new RangeError("MIDI channels must be between 1 and 16.")}),e},i.prototype._onMidiMessage=function(e){},e.exports?e.exports=s:t.WebMidi||(t.WebMidi=s)}(s)}(i={exports:{}}),i.exports),a=function(e,t,n,r){return new(n||(n=Promise))(function(i,s){function o(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(o,a)}u((r=r.apply(e,t||[])).next())})};class u{constructor(){this.name="web_audio",this.prepared=!1,this.midi=!1,this.sources=[],this.keys={}}source(e){return this.sources[e]}is_prepared(){return this.prepared}componentDidLoad(){this.connect_debugger(),this.connect_context(),this.gain=this.context.createGain(),this.connect_visualizers(),this.connect_sources(),this.connect_midi()}connect_context(){var e=window.AudioContext||window.webkitAudioContext||window.audio_context;e?(window.audio_context=new e,this.log("Set window.audio_context")):this.log("The Web Audio API is not supported by your browser."),this.context=window.audio_context,this.log("Connected to window.audio_context")}connect_sources(){this.build_sources()}build_sources(){return a(this,void 0,void 0,function*(){this.log("Building sources"),this._sources=this.element.querySelectorAll("web-audio-source"),this._sources?(this.externalFiles=[],t(this._sources,(e,t)=>{this.log(`Preparing #${e}: ${t.name}`),this.sources[t.name]=t,new r(this.context,[t.src],e=>{this.cache_sources(e,t)}).load()},this)):this.log("You need to mount a <web-audio-source> inside the <web-audio> tag!")})}cache_sources(e,t){return a(this,void 0,void 0,function*(){yield n(20),e.forEach(e=>{this.log(`Caching ${t.name}`),this.midi&&(this.log(`Assigned ${t.name} to midi key ${t.midikey}, channel ${t.midichannel}`),void 0==this.keys[t.midichannel]&&(this.keys[t.midichannel]=[]),this.keys[t.midichannel][t.midikey]=t),this._currentSource=t,this._currentSource.assignBuffer(this,e),this.log(`Source ${t.name} is ready`)}),this._currentSource=null,this.prepared=!0})}connect_visualizers(){return a(this,void 0,void 0,function*(){yield n(20),this.visualizers=document.querySelectorAll(`web-audio-visualizer[for="${this.name}"]`),this.visualizers?(this.log("Attaching visualizers"),t(this.visualizers,(e,t)=>{t=0===e?t.connect(this.context,this.context.destination):t.connect(this.context,this.previousVisualizer.analyser),this.previousVisualizer=t},this)):this.log(`No visualizers for ${this.name}`),this.visualizers.length>=1?this.gain.connect(this.previousVisualizer.analyser):this.gain.connect(this.context.destination)})}connect_debugger(){this.debugger=document.querySelector(`web-audio-debugger[for="${this.name}"]`),this.log("Connected debugger")}log(e){this.debugger&&this.debugger.addHistory(e)}connect_midi(){this.midi&&o.enable(e=>{e?this.log("Midi couldn't be enabled."+e):this.log("Midi is enabled");var t=o.inputs[0];t&&(t.addListener("noteon","all",e=>{this.log(`KEY: Channel: ${e.channel}, Note: ${e.note.number}, Name: ${e.note.name}, Oct: ${e.note.octave}`),this.keys[e.channel]&&(this.keys[e.channel][e.note.number].gain().value=e.data[2]/175,this.keys[e.channel][e.note.number].play())}),t.addListener("pitchbend","all",e=>{this.log(`PITCH: Channel: ${e.channel}, Value: ${e.value}`)}),t.addListener("controlchange","all",e=>{this.log(`CTRL: Channel: ${e.channel}, controller: ${e.controller.number}, Value: ${e.value}`);var t=new CustomEvent("midi-controller-update",{detail:e});document.dispatchEvent(t)}),this.log("Listeners added for notes, pitch bend, and controllers."))})}static get is(){return"web-audio"}static get encapsulation(){return"shadow"}static get properties(){return{_currentSource:{state:!0},_sources:{state:!0},autoplay:{type:"Any",attr:"autoplay"},context:{state:!0},debugger:{state:!0},element:{elementRef:!0},externalFiles:{state:!0},gain:{state:!0},is_prepared:{method:!0},keys:{state:!0},midi:{type:"Any",attr:"midi"},name:{type:String,attr:"name"},prepared:{state:!0},previousVisualizer:{state:!0},source:{method:!0},sources:{state:!0},visualizerNodes:{state:!0},visualizers:{state:!0}}}}class h{constructor(){this.inert=!1,this.midikey=0,this.midichannel=1,this.status="paused",this.effectsvolume=100,this.effects=[]}getBuffer(){return this.buffer}webAudio(){return this.webAudioWrapper}gain(e="wet"){return"wet"===e?this.wetGain:"dry"===e?this.dryGain:"channel"===e?this.channelGain:void 0}play(){if(this.inert)throw"Cannot play inert media.";this.source=this.context.createBufferSource(),this.source.buffer=this.buffer,this.wetGain?(this.wetGain.gain.value=this.effectsvolume/100,this.dryGain.gain.value=Math.abs((this.effectsvolume-100)/100)):this.dryGain.gain.value=1,this.wetGain&&this.source.connect(this.wetGain),this.source.connect(this.dryGain),this.source.start(0)}assignBuffer(e,t){if(this.webAudioWrapper=e.element,this.context=e.context,this.buffer=t,!this.inert){if(this.masterGain=e.gain,this.channelGain=this.context.createGain(),this.prepareEffects(),Object.keys(this.effects).length>0){this.wetGain=this.context.createGain();let e="";Object.keys(this.effects).reverse().forEach((t,n)=>{0===n?this.wetGain.connect(this.effects[t]):this.effects[e].connect(this.effects[t]),e=t}),this.effects[e].connect(this.channelGain)}this.dryGain=this.context.createGain(),this.dryGain.connect(this.channelGain),this.channelGain.connect(this.masterGain)}}prepareEffects(){if("WEB-AUDIO"!==this.element.parentElement.nodeName){let e=this.element.parentElement;for(;"WEB-AUDIO"!==e.nodeName;)this.effects[e.getAttribute("name")]=e.attachEffect(this.context,this.element),e=e.parentElement}}static get is(){return"web-audio-source"}static get encapsulation(){return"shadow"}static get properties(){return{assignBuffer:{method:!0},buffer:{state:!0},channelGain:{state:!0},context:{state:!0},dryGain:{state:!0},effects:{state:!0},effectsvolume:{type:Number,attr:"effectsvolume"},element:{elementRef:!0},entry:{state:!0},gain:{method:!0},getBuffer:{method:!0},inert:{type:Boolean,attr:"inert"},masterGain:{state:!0},midichannel:{type:Number,attr:"midichannel"},midikey:{type:Number,attr:"midikey"},name:{type:String,attr:"name"},play:{method:!0},source:{state:!0},src:{type:String,attr:"src"},status:{state:!0},webAudio:{method:!0},webAudioWrapper:{state:!0},wetGain:{state:!0}}}}export{u as WebAudio,h as WebAudioSource};