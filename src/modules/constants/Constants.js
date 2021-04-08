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

// ## ROLES #######################################
/**
 * The presenter role name
 *
 * @constant
 * @type {string}
 */
export const ROLE_NAME_PRESENTER = "presenter";

// ## MAIN STATUSES #######################################

/**
 * The app status - login
 *
 * a user can login to the local server
 *
 * @constant
 * @type {string}
 */
export const APP_STATUS_LOGIN = "login";

/**
 * The app status - configure
 *
 * a user can configure devices - audio, video
 *
 * @constant
 * @type {string}
 */
export const APP_STATUS_CONFIGURE = "configure";

/**
 * The app status - session
 *
 * a meeting session begins
 *
 * @constant
 * @type {string}
 */
export const APP_STATUS_SESSION = "session";


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

// ## session #######################################

/**
 * The Prefix ID of the HTMLVideoElement for video tile.
 *
 * Example:
 * PREFIX_FOR_ID_VIDEO_ELEMENT + '1'
 * PREFIX_FOR_ID_VIDEO_ELEMENT + '2'
 * ...
 * PREFIX_FOR_ID_VIDEO_ELEMENT + '16'
 *
 * @constant
 * @type {string}
 */
export const ID_PREFIX_FOR_VIDEO_ELEMENT = "cz-kibo-meeting-chime-client-video-tile-";

// ## PREZENTATION CANVAS #######################################

/**
 * The DOM ID element for canvas
 *
 * @constant
 * @type {string}
 */
export const ID_ELEMENT_FOR_PREZENTATION_CANVAS = "cz-kibo-meeting-chime-client-prezentation-canvas";

/**
 * Canvas Width (px)
 *
 * @constant
 * @type {number}
 */
export const PREZENTATION_CANVAS_WIDTH = 1280

/**
 * Canvas height (px)
 *
 * @constant
 * @type {number}
 */
export const PREZENTATION_CANVAS_HEIGHT = 720

/**
 * Canvas FPS
 *
 * @constant
 * @type {number}
 */
export const PREZENTATION_CANVAS_FPS = 15

/**
 * Canvas padding - top (px)
 *
 * @constant
 * @type {number}
 */
export const PREZENTATION_CANVAS_PADDING_TOP = 50

/**
 * Canvas padding - bottom (px)
 *
 * @constant
 * @type {number}
 */
export const PREZENTATION_CANVAS_PADDING_BOTTOM = 50

/**
 * Canvas padding - left (px)
 *
 * @constant
 * @type {number}
 */
export const PREZENTATION_CANVAS_PADDING_LEFT = 50

/**
 * Canvas padding - right (px)
 *
 * @constant
 * @type {number}
 */
export const PREZENTATION_CANVAS_PADDING_RIGHT = 50

// ## MESSAGING #######################################

/**
 * System topic name
 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#realtimesubscribetoreceivedatamessage
 *
 * @constant
 * @type {string}
 */
export const MESSAGE_SYSTEM_TOPIC_NAME = "system"

/**
 * Chat topic name
 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#realtimesubscribetoreceivedatamessage
 *
 * @constant
 * @type {string}
 */
export const MESSAGE_CHAT_TOPIC_NAME = "chat"


// ## COMMANDS #######################################

/*
* Command delimiter
*
* @constant
* @type {string}
*/
export const COMMAND_DELIMITER = "#"

/**
 * System command - setPresenter
 *
 * usage:
 * setPresenter#AttendeeId
 *
 * @constant
 * @type {string}
 */
export const SYSTEM_COMMAND_SET_PRESENTER = "setPresenter"

/**
 * System command - unsetPresenter
 *
 * usage:
 * unsetPresenter#AttendeeId
 *
 * @constant
 * @type {string}
 */
export const SYSTEM_COMMAND_UNSET_PRESENTER = "unsetPresenter"

/**
 * System command - setFps
 *
 * usage:
 * setFps#30
 *
 * @constant
 * @type {string}
 */
export const SYSTEM_COMMAND_SET_FPS = "setFps"

/**
 * System command - setFCanvasFg
 *
 * usage:
 * setFCanvasFg#URL
 *
 * @constant
 * @type {string}
 */
export const SYSTEM_COMMAND_SET_CANVAS_FG = "setCanvasFg"

/**
 * System command - setFCanvasBg
 *
 * usage:
 * setFCanvasBg#URL
 *
 * @constant
 * @type {string}
 */
export const SYSTEM_COMMAND_SET_CANVAS_BG = "setCanvasBg"

/**
 * Chat command - sendMessage
 *
 * usage:
 * sendMessage#Hello
 *
 * @constant
 * @type {string}
 */
export const CHAT_COMMAND_SEND_MESSAGE = "sendMessage"
