/*! Built with http://stenciljs.com */
webaudio.loadBundle("jrgy75jm",["exports"],function(t){window.webaudio.h;var e=function(){function t(){this.name="web_audio_sequencer",this.autoplay=!1,this.taps=4,this.context=function(){return window.audio_context},this.noteTime=0,this.currentTap=0,this.totalPlayTime=0,this.custom=function(){}}return t.prototype.componentDidLoad=function(){this.autoplay&&this.play()},t.prototype.schedule=function(){var t=this,e=this.context().currentTime;for(e-=this.startTime;this.noteTime<e+.005;)this.totalPlayTime=this.noteTime+this.startTime,0===this.currentTap&&this.iterations++,this.custom(),this.advance();this.timer=setTimeout(function(){t.schedule()},0)},t.prototype.advance=function(){var t=60/this.tempo;this.currentTap++,this.currentTap==this.taps&&(this.currentTap=0),this.noteTime+=.25*t},t.prototype.play=function(){this.iterations=0,this.startTime=this.context().currentTime+.005||.005,this.schedule()},t.prototype.stop=function(){this.iterations=0,this.startTime=null,this.currentTap=0,clearTimeout(this.timer)},Object.defineProperty(t,"is",{get:function(){return"web-audio-sequencer"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{autoplay:{type:Boolean,attr:"autoplay"},context:{state:!0},currentTap:{state:!0},custom:{type:"Any",attr:"custom"},iterations:{state:!0},name:{type:String,attr:"name"},noteTime:{state:!0},play:{method:!0},startTime:{state:!0},stop:{method:!0},taps:{type:Number,attr:"taps"},tempo:{type:Number,attr:"tempo"},timer:{state:!0},totalPlayTime:{state:!0}}},enumerable:!0,configurable:!0}),t}();t.WebAudioSequencer=e,Object.defineProperty(t,"__esModule",{value:!0})});