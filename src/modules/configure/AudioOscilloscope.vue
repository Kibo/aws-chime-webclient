<template>
	<div class="progress">
		<div v-bind:style="{width: volume + '%'}"  class="progress-bar progress-bar-striped bg-success" role="progressbar" ></div>
	</div>
</template>

<script>
import * as Constants from '../constants/Constants.js';

export default {
	props: ['analyserNode'],
	data() {
			return {
				requestID:null,
				sample:null,
				volume:0,

				secondsPassed:0,
				oldTimeStamp:0,
				fps:0,
			}
		},

	mounted() {
		this.sample = new Uint8Array( this.analyserNode.fftSize );
		this.requestID = this.getRequestAnimationFrame()( this.animationLoop.bind( this ) );
	},

	beforeUnmount(){
		if( this.requestID ){
			this.getCancelAnimationFrame()( this.requestID );
		}
	},

	methods: {
		animationLoop( timeStamp ){
			// Calculate the number of seconds passed since the last frame
    		this.secondsPassed = ( timeStamp - this.oldTimeStamp) / 1000;
    		this.oldTimeStamp = timeStamp;

    		// Calculate fps
    		this.fps = Math.round(1 / this.secondsPassed);

			this.draw()

			this.requestID = this.getRequestAnimationFrame()( this.animationLoop.bind( this ) );
		},

		draw(){
			this.analyserNode.getByteTimeDomainData( this.sample );

			const lowest = 0.01;
        	let max = lowest;
        	for (const f of this.sample) {
          		max = Math.max(max, (f - 128) / 128);
        	}
        	let normalized = (Math.log(lowest) - Math.log(max)) / Math.log(lowest);

        	// min:0, max:100
        	this.volume = Math.min(Math.max(normalized * 100, 0), 100);
		},

		getRequestAnimationFrame(){
			return window.requestAnimationFrame 
		},

		getCancelAnimationFrame(){
			return window.cancelAnimationFrame
		}
	}
}
</script>
