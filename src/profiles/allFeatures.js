/**
 * Fullband speech mono audio profile
 * 
 * @constant
 * @type {Boolean}
 * 
 * @see https://aws.github.io/amazon-chime-sdk-js/classes/audioprofile.html
 */
export const FULLBAND_SPEECH_MONO_QUALITY = true

/**
 * Specifies whether the option to set up the device is displayed.
 * 
 * @constant
 * @type {Boolean}
 */
export const IS_AUDIO_INPUT_DEVICE = true

/**
 * Specifies whether the option to set up the device is displayed.
 * 
 * @constant
 * @type {Boolean}
 */
export const IS_VIDEO_INPUT_DEVICE = true


// ## VIDEO QUALITY #################################################

/**
 * Default video width
 * 
 * max 1280px
 * 
 * @constant
 * @type {Number}
 */
export const VIDEO_INPUT_QUALITY_WIDTH=960

/**
 * Default video height
 * 
 * max 720px
 * 
 * @constant
 * @type {Number}
 */
export const VIDEO_INPUT_QUALITY_HEIGHT=540

/**
 * Default video framerate
 * 
 *  max 30 fps
 * 
 * @constant
 * @type {Number}
 */
export const VIDEO_INPUT_QUALITY_FRAMERATE=15

/**
 * Default video bandWidth
 * 
 *  max 2400 Kbps
 * 
 * @constant
 * @type {Number}
 */
export const VIDEO_INPUT_QUALITY_BANDWIDTH=1400


// ## SESSION #####################################################
/**
 * The function names that you want to remove from AudioVideoObserver.
 *
 * There are implemented all callbacks in default. But you dont want to send messages from all callbacks to visitors.
 * You can use this array of function names for remove inappropriate callbacks.
 * 
 * For instance:
 * Moderator:[] 
 * Visitor:['encodingSimulcastLayersDidChange', 'eventDidReceive', 'metricsDidReceive', 'remoteVideoSourcesDidChange']
 * 
 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideoobserver.html
 */
export const AUDIO_VIDEO_OBSERVER_CALLBACKS_FOR_REMOVE = []

/**
 * Can share content
 *  
 * @constant
 * @type {Boolean}
 */
export const CAN_SHARE_CONTENT=true
