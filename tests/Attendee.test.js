import Attendee from "../src/modules/common/Attendee.js"

test('Attendee roles', async () => {
	let tom = new Attendee('tom')		
	expect( tom.hasRole('lektor') ).toBe( false )
	
	tom.addRole('lektor')
	expect( tom.hasRole('lektor') ).toBe( true )
	
	tom.removeRole('lektor')
	expect( tom.hasRole('lektor') ).toBe( false )
	
	tom.addRole('lektor')
	tom.addRole('presenter')
	expect( tom.hasRole('lektor') ).toBe( true )
	expect( tom.hasRole('presenter') ).toBe( true )
})

test('Attendee IDs', async () => {
	let tom = new Attendee('tom')		
	expect( tom.attendeeId ).toBe( 'tom' )
	
	tom.externalUserId = 'petr'	
	expect( tom.externalUserId).toBe( 'petr' )	
})