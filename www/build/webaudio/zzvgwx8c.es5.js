/*! Built with http://stenciljs.com */
webaudio.loadBundle("zzvgwx8c",["exports"],function(t){var e=window.webaudio.h,a=function(){function t(){this.for="web_audio",this.type="wave",this.smoothing=.9,this.size=1024,this.width=800,this.height=800}return t.prototype.componentDidLoad=function(){this.canvas=this.element.querySelector("canvas")},t.prototype.connect=function(t,e){return this.context=t,this.analyser=this.context.createAnalyser(),this.analyser.connect(e),this.freqs=new Uint8Array(this.analyser.frequencyBinCount),this.times=new Uint8Array(this.analyser.frequencyBinCount),"webgl"===this.type?(this.canvasCTX=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl"),this.__prepareWebGL()):this.canvasCTX=this.canvas.getContext("2d"),requestAnimationFrame(this.draw.bind(this)),this},t.prototype.draw=function(){if(this.analyser.smoothingTimeConstant=this.smoothing,this.analyser.fftSize=this.size,this.analyser.getByteFrequencyData(this.freqs),this.analyser.getByteTimeDomainData(this.times),"webgl"!==this.type){var t=Math.floor(this.freqs.length);this.canvas.width=t||this.width,this.canvas.height=this.height}switch(this.type){case"wave":this.wave();break;case"bars":this.bars();break;case"webgl":this.webgl()}requestAnimationFrame(this.draw.bind(this))},t.prototype.wave=function(){this.canvasCTX.fillRect(0,0,2*this.width,this.height);for(var t=0;t<this.analyser.frequencyBinCount;t++){var e=this.times[t]/256,a=this.height*e,s=this.height-a,r=this.width/this.analyser.frequencyBinCount+4,i=t/this.analyser.frequencyBinCount*360;this.canvasCTX.fillStyle="hsl("+i+", 100%, 50%)",this.canvasCTX.fillRect(t*r,s,4,4)}},t.prototype.bars=function(){for(var t=0;t<this.analyser.frequencyBinCount;t++){var e=this.freqs[t]/256,a=this.height*e,s=this.height-a,r=this.width/this.analyser.frequencyBinCount+1,i=t/this.analyser.frequencyBinCount*360;this.canvasCTX.fillStyle="hsl("+i+", 100%, 50%)",this.canvasCTX.fillRect(t*r,s,r,a)}},t.prototype.webgl=function(){this.canvasCTX.uniform1f(this.fragTime,this.context.currentTime),this.canvasCTX.fillStyle="black",this.__copyAudioDataToTexture(),this.__renderQuad()},t.prototype.getFrequencyValue=function(t){var e=this.context.sampleRate/2,a=Math.round(t/e*this.freqs.length);return this.freqs[a]},t.prototype.__prepareWebGL=function(){var t=this.canvasCTX.createBuffer();this.canvasCTX.bindBuffer(this.canvasCTX.ARRAY_BUFFER,t);var e=new Float32Array([-1,-1,1,-1,-1,1,1,1]);this.canvasCTX.bufferData(this.canvasCTX.ARRAY_BUFFER,e,this.canvasCTX.STATIC_DRAW),this.canvasCTX.vertexAttribPointer(0,2,this.canvasCTX.FLOAT,!1,0,0);var a=this.element.querySelector('web-audio-visualizer-shader[type="vertex"]');this.vertex=a.innerText;var s=this.element.querySelector('web-audio-visualizer-shader[type="fragment"]');this.fragment=s.innerText,this.fragShader=this.__createShader();var r=this.canvasCTX.getAttribLocation(this.fragShader,"position");this.canvasCTX.enableVertexAttribArray(r),this.fragTime=this.canvasCTX.getUniformLocation(this.fragShader,"time"),this.canvasCTX.uniform1f(this.fragTime,this.context.currentTime);var i=this.canvasCTX.getUniformLocation(this.fragShader,"resolution");this.canvasCTX.uniform2f(i,this.width,this.height),this.fragSpectrumArray=new Uint8Array(4*this.freqs.length)},t.prototype.__createShader=function(){var t=this.canvasCTX.createShader(this.canvasCTX.VERTEX_SHADER);if(this.canvasCTX.shaderSource(t,this.vertex),this.canvasCTX.compileShader(t),!this.canvasCTX.getShaderParameter(t,this.canvasCTX.COMPILE_STATUS))throw new Error(this.canvasCTX.getShaderInfoLog(t));var e=this.canvasCTX.createShader(this.canvasCTX.FRAGMENT_SHADER);if(this.canvasCTX.shaderSource(e,this.fragment),this.canvasCTX.compileShader(e),!this.canvasCTX.getShaderParameter(e,this.canvasCTX.COMPILE_STATUS))throw new Error(this.canvasCTX.getShaderInfoLog(e));var a=this.canvasCTX.createProgram();return this.canvasCTX.attachShader(a,t),this.canvasCTX.attachShader(a,e),this.canvasCTX.linkProgram(a),this.canvasCTX.useProgram(a),a},t.prototype.__createTexture=function(){var t=this.canvasCTX.createTexture();return this.canvasCTX.bindTexture(this.canvasCTX.TEXTURE_2D,t),this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D,this.canvasCTX.TEXTURE_MIN_FILTER,this.canvasCTX.LINEAR),this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D,this.canvasCTX.TEXTURE_WRAP_S,this.canvasCTX.CLAMP_TO_EDGE),this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D,this.canvasCTX.TEXTURE_WRAP_T,this.canvasCTX.CLAMP_TO_EDGE),t},t.prototype.__copyAudioDataToTexture=function(){for(var t=0;t<this.freqs.length;t++)this.fragSpectrumArray[6*t+0]=this.freqs[t],this.fragSpectrumArray[6*t+1]=this.freqs[t],this.fragSpectrumArray[6*t+2]=this.freqs[t],this.fragSpectrumArray[6*t+3]=255;this.canvasCTX.texImage2D(this.canvasCTX.TEXTURE_2D,0,this.canvasCTX.RGBA,this.freqs.length,1,0,this.canvasCTX.RGBA,this.canvasCTX.UNSIGNED_BYTE,this.fragSpectrumArray)},t.prototype.__renderQuad=function(){this.canvasCTX.drawArrays(this.canvasCTX.TRIANGLE_STRIP,0,4)},t.prototype.render=function(){return e("canvas",{id:"canvas"})},Object.defineProperty(t,"is",{get:function(){return"web-audio-visualizer"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{_bufferLength:{state:!0},_dataArray:{state:!0},analyser:{state:!0},canvas:{state:!0},canvasCTX:{state:!0},connect:{method:!0},context:{state:!0},element:{elementRef:!0},for:{type:String,attr:"for"},fragment:{state:!0},fragShader:{state:!0},fragSpectrumArray:{state:!0},fragTime:{state:!0},freqs:{state:!0},height:{type:Number,attr:"height"},renderer:{type:"Any",attr:"renderer"},size:{type:Number,attr:"size"},smoothing:{type:Number,attr:"smoothing"},times:{state:!0},type:{type:String,attr:"type"},vertex:{state:!0},vertexShader:{state:!0},width:{type:Number,attr:"width"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"web-audio-visualizer{display:block;width:800px;height:800px}web-audio-visualizer canvas{display:block;width:800px;height:800px}"},enumerable:!0,configurable:!0}),t}();t.WebAudioVisualizer=a,Object.defineProperty(t,"__esModule",{value:!0})});