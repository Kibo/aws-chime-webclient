import {Attendee, AttendeeManager } from "../src/modules/common/Attendee.js"

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

	tom.externalUserId = '123#petr'
	expect( tom.externalUserId).toBe( '123#petr' )
})

test('Attendee isContent', async () => {
	let tom = new Attendee('tom')
	expect( tom.isContent() ).toBe( false )

	tom = new Attendee('tom#123')
	expect( tom.isContent() ).toBe( false )

	tom = new Attendee('tom#content')
	expect( tom.isContent() ).toBe( true )
})

test('AttendeeManager presenter operation', async () => {
	let tom = new Attendee('1')
	let jakub = new Attendee('2')
	let mirek = new Attendee('3')

	let manager = new AttendeeManager()

	manager.attendeePresenceMap.set( tom.attendeeId, tom )
	manager.attendeePresenceMap.set( jakub.attendeeId, jakub )
	manager.attendeePresenceMap.set( mirek.attendeeId, mirek )

	expect( manager.getPresenter()).toBeNull()

	expect( manager.attendeePresenceMap.has( jakub.attendeeId ) ).toBe( true )
	manager.setPresenter( jakub.attendeeId )
	expect( manager.getPresenter()).toBe( jakub )

	expect( manager.attendeePresenceMap.has( tom.attendeeId ) ).toBe( true )
	manager.setPresenter( tom.attendeeId )
	expect( manager.getPresenter()).toBe( tom )
})

test('AttendeeMap unsetPresenter', async () => {
	let tom = new Attendee('1')
	let jakub = new Attendee('2')

	let manager = new AttendeeManager()

	manager.attendeePresenceMap.set( tom.attendeeId, tom )
	manager.attendeePresenceMap.set( jakub.attendeeId, jakub )

	expect( manager.getPresenter()).toBeNull()

	manager.setPresenter( jakub.attendeeId )
	expect( manager.getPresenter()).toBe( jakub )

 	manager.unsetPresenter()
 	expect( manager.getPresenter()).toBeNull()

	manager.setPresenter( tom.attendeeId )
	expect( manager.getPresenter()).toBe( tom )

 	manager.unsetPresenter()
 	expect( manager.getPresenter()).toBeNull()
})
