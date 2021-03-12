/**
 * Server credentials URL
 * 
 * From these URL the client ask for a Chime Meeting and Chime Attendee.
 * 
 * @constant
 * @type {string}
 * 
 * @see server.js
 */
export const CRENDTIALS_TO_MEETING_URL = "http://localhost:3000/meeting/";

/**
 * The App main wrapper element ID.
 * 
 * @constant
 * @type {string}
 */
export const ID_APP = "cz-kibo-meeting-chime-client";

// ## MAIN STATUSES #######################################

/**
 * The app status - login
 * 
 * @constant
 * @type {string}
 */
export const APP_STATUS_LOGIN = "login";

/**
 * The app status - configure
 * 
 * @constant
 * @type {string}
 */
export const APP_STATUS_CONFIGURE = "configure";

// ## configure - AUDIO SETTING  #######################################
/**
 * The ID of the audio meeting element.
 * 
 * @constant
 * @type {string}
 */
export const ID_MEETING_AUDIO_ELEMENT = "cz-kibo-meeting-chime-client-meeting-audio";

/**
 * This file uses the audio element to play test sound
 * 
 * @constant
 * @type {string}
 */
export const AUDIO_TEST_SOUND_URL = "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav";

// ## configure - VIDEO SETTING  #######################################
	
/**
 * The ID of the HTMLVideoElement for video preview. 
 * 
 * @constant
 * @type {string}
 */
export const ID_VIDEO_ELEMENT_FOR_PREVIEW = "cz-kibo-meeting-chime-client-video-preview";






