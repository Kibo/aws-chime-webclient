const Setting = {

	/**
	 * Fullband speech mono audio profile
	 * 
	 * @constant
	 * @type {Boolean}
	 * 
	 * @see https://aws.github.io/amazon-chime-sdk-js/classes/audioprofile.html
	 */
	FULLBAND_SPEECH_MONO_QUALITY:true,
	
	/**
	 * Specifies whether the option to set up the device is displayed.
	 * 
	 * @constant
	 * @type {Boolean}
	 */
	IS_AUDIO_INPUT_DEVICE:false,
	
	/**
	 * Specifies whether the option to set up the device is displayed.
	 * 
	 * @constant
	 * @type {Boolean}
	 */
	IS_VIDEO_INPUT_DEVICE:false,
	
	
	// ## VIDEO QUALITY #################################################
	
	/**
	 * Default video width
	 * 
	 * max 1280px
	 * 
	 * @constant
	 * @type {Number}
	 */
	VIDEO_INPUT_QUALITY_WIDTH:640,
	
	/**
	 * Default video height
	 * 
	 * max 720px
	 * 
	 * @constant
	 * @type {Number}
	 */
	VIDEO_INPUT_QUALITY_HEIGHT:360,
	
	/**
	 * Default video framerate
	 * 
	 *  max 30 fps
	 * 
	 * @constant
	 * @type {Number}
	 */
	VIDEO_INPUT_QUALITY_FRAMERATE:15,
	
	/**
	 * Default video bandWidth
	 * 
	 *  max 2400 Kbps
	 * 
	 * @constant
	 * @type {Number}
	 */
	VIDEO_INPUT_QUALITY_BANDWIDTH:600,
	
	
	// ## SESSION #####################################################
	/**
	 * The function names that you want to remove from AudioVideoObserver.
	 *
	 * There are implemented all callbacks in default. But you dont want to send messages from all callbacks to visitors.
	 * You can use this array of function names for remove inappropriate callbacks.
	 * 
	 * For instance:
	 * Moderator:[] 
	 * Listener:['encodingSimulcastLayersDidChange', 'eventDidReceive', 'metricsDidReceive', 'remoteVideoSourcesDidChange']
	 * 
	 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideoobserver.html
	 */
	AUDIO_VIDEO_OBSERVER_CALLBACKS_FOR_REMOVE:[],
	
	/**
	 * Can share content
	 *  
	 * @constant
	 * @type {Boolean}
	 */
	CAN_SHARE_CONTENT:false,
	
	/**
	 * Show moderator panel
	 * 
	 * Moderator can add and change the presenter role
	 *  
	 * @constant
	 * @type {Boolean}
	 */
	SHOW_MODERATOR_PANEL:false,	
	
	
	/**
	 * Show chat panel
	 * 
	 * an attendee can send and view chat messages
	 *  
	 * @constant
	 * @type {Boolean}
	 */
	SHOW_CHAT_PANEL:false
	
}

export default Setting
