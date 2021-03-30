<template>
	
</template>

<script>
import Utils from "../tools/Utils.js"
import {Attendee} from "../common/Attendee.js"

export default {
	emits: [],
	props: ['meetingSession', 'attendeePresenceMap'],	
	data() {
		return {
								
		}
	}, 
	mounted() {				
		this.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence( this.attendeePresenceChange )			
	},
	beforeUnmount(){
		this.meetingSession.audioVideo.realtimeUnsubscribeToAttendeeIdPresence( this.attendeePresenceChange )
	},
	methods: {
		/*
		 * Attendee presence change - handler
		 * 
		 * @param {String} attendeeId
		 * @param {Boolean} present
		 * @param {String} externalUserId (optional)
		 * @param {Boolean} dropped (optional)
		 * @param {RealtimeAttendeePositionInFrame | Null} posInFrame (optional)
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#realtimesubscribetoattendeeidpresence
		 */
		attendeePresenceChange(attendeeId, present, externalUserId, dropped, posInFrame){
																			
			// The attendee is added to the map if he has set a microphone.							
			if (present) {												
				let attendee = new Attendee(attendeeId)								
				attendee.externalUserId = externalUserId
				if( !attendee.isContent()){																								 		
					this.attendeePresenceMap.set(attendeeId, attendee);
				}										
			} else {
				this.attendeePresenceMap.delete(attendeeId);
			}																
		}
	}
}
</script>