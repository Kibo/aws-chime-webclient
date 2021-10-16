const Attendee = require("./Attendee")

// @ponicode
describe("addRole", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.Attendee("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
    })

    test("0", () => {
        let callFunction = () => {
            inst.addRole("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.addRole("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.addRole("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.addRole(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.addRole("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.addRole(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("hasRole", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.Attendee("7289708e-b17a-477c-8a77-9ab575c4b4d8")
    })

    test("0", () => {
        let callFunction = () => {
            inst.hasRole(["user-name", "user-name", "user_name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.hasRole(["user_name", "username", "user_name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.hasRole(["user name", "username", 123])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.hasRole(["username", 123, "user123"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.hasRole(["user-name", 123, "user name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.hasRole(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isContent", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.Attendee("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
    })

    test("0", () => {
        let callFunction = () => {
            inst.isContent()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("removeRole", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.Attendee("a85a8e6b-348b-4011-a1ec-1e78e9620782")
    })

    test("0", () => {
        let callFunction = () => {
            inst.removeRole(["myDIV", "myDIV", "myDIV", "myDIV", "myDIV", "myDIV"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.removeRole(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getPresenter", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getPresenter()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("setPresenter", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.setPresenter("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.setPresenter("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.setPresenter("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.setPresenter(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("unsetPresenter", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.unsetPresenter()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isPresenter", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.isPresenter("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.isPresenter("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.isPresenter("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.isPresenter(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("shareContent", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.shareContent("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.shareContent(-10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.shareContent(0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.shareContent(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.shareContent("bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.shareContent(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getTileState", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getTileState("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.getTileState("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.getTileState("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.getTileState(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getAttendee", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getAttendee("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.getAttendee("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.getAttendee("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.getAttendee(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("addHiddeClass", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.addHiddeClass({ tileId: -1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.addHiddeClass({ tileId: "7289708e-b17a-477c-8a77-9ab575c4b4d8" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.addHiddeClass({ tileId: 1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.addHiddeClass({ tileId: 0.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.addHiddeClass({ tileId: -10 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.addHiddeClass({ tileId: NaN })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("removeHiddeClass", () => {
    let inst

    beforeEach(() => {
        inst = new Attendee.AttendeeManager()
    })

    test("0", () => {
        let callFunction = () => {
            inst.removeHiddeClass({ tileId: -1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.removeHiddeClass({ tileId: -10 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.removeHiddeClass({ tileId: 1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.removeHiddeClass({ tileId: 0.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.removeHiddeClass({ tileId: 0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.removeHiddeClass(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
