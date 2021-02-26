const express = require('express')
const app = express()
const port = 3000
app.use(express.static('dist'))

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({region: 'us-east-1'});
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

const MEETINGS = new Map()
MEETINGS.set('abcdefg', {id:'abcdefg', title:"Demo", isActive: true, isLocked:false, region:"eu-west-1"})

const PINS = new Map()
PINS.set('1234', {id:'1234', role:"demo"})


app.get('/', (req, res) => {
  res.sendFile('demo/meeting.html', {root: __dirname })
})

app.get('/meeting/:id/:pin/:name', async (req, res) => {
	if(!MEETINGS.has(req.params.id)){
		res.status(403)
		return	
	}
		
	if(!MEETINGS.get( req.params.id ).isActive){
		res.status(403)
		return	
	}
	
	if( MEETINGS.get( req.params.id ).isLocked ){
		res.status(403)
		return		
	}
	
	if(!PINS.has(req.params.pin)){
		res.status(403)
		return	
	}
	
	let chimeCreateMeetingResponse
	let chimeCreateAttendeeResponse
	try{		
		chimeCreateMeetingResponse = await chime.createMeeting({
			ClientRequestToken: MEETINGS.get( req.params.id ).id, 
			ExternalMeetingId:MEETINGS.get( req.params.id ).title, 
			MediaRegion:MEETINGS.get( req.params.id ).region
		}).promise();
		
		chimeCreateAttendeeResponse = await chime.createAttendee({
			MeetingId: chimeCreateMeetingResponse.Meeting.MeetingId,
			ExternalUserId: `${uuidv4().substring(0, 8)}#${req.params.name ? req.params.name : 'Joe'}`.substring(0, 64),
		}).promise()
		
	}catch(e){
		console.error(e)
		res.status(500);		
		return		
	}
					 
	res.status(200).json({meeting:chimeCreateMeetingResponse.Meeting, atendee:chimeCreateAttendeeResponse.Attendee});
	return  
})

app.listen(port, () => {
  console.log(`Demo app listening at http://localhost:${port}`)
})
