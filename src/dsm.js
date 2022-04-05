/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './dsm.css'
var mic = null;
var mic = new window.webkitSpeechRecognition();

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'


function Dsm() {

    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState('')
    const [waitStart, setWaitStart] = useState(true)

    //room state
    const [roomLight, setRoomLight] = useState(false)
    const [curtain, setCurtain] = useState(false)
    const [ac, SetAc] = useState(false)
    const [heater, SetHeater] = useState(false)
    const [roomWindow, setRoomWindow] = useState(false)
    const [roomFan, setRoomFan] = useState(false)
    const [roomDoor, setRoomDoor] = useState(false)
    const [tv, setTv] = useState(false)
    const [pc, setPc] = useState(false)

    //kitchen state
    const [kitchenLight, setKitchenLight] = useState(false)
    const [kitchenWindow, setKitchenWindow] = useState(false)
    const [kitchenFan, setKitchenFan] = useState(false)
    const [kitchenDoor, setKitchenDoor] = useState(false)
    const [KitchenExhaust, setKitchenExhaust] = useState(false)

    //bathroom state
    const [bathroomLight, setBathroomLight] = useState(false)
    const [bathroomFan, setBathroomFan] = useState(false)
    const [bathroomDoor, setBathroomDoor] = useState(false)
    const [bathroomExhaust, setBathroomExhaust] = useState(false)

    const start = () => {
        mic.start()
        setIsListening(true)
        setWaitStart(true)
    }

    mic.onend = function () {
        console.log('stopped')
        setWaitStart(true)
    }
    mic.onstart = function () {
        setWaitStart(false)
        console.log('started')
    }

    const handleListen = () => {
        console.log(isListening)
        if (!isListening) {
            start()
            setIsListening(true)
        } else {
            mic.stop()
            setWaitStart(true)
            setIsListening(false)
        }

        mic.onresult = (event) => {
            const transcript = Array.from(event.results).map((result) => result[0]).map((result) => result.transcript).join('')
            console.log(transcript)
            setNote(transcript)
        }
        mic.onerror = (event) => {
            console.log(event)
        }

    }

    const handleSaveNote = () => {
        mic.stop()

        var currentcommand = String(note)
        currentcommand = currentcommand.toLowerCase()
        setIsListening(false)
        if (
            String(currentcommand).includes('turn on') ||
            String(currentcommand).includes('open')
        ) {
            currentcommand = String(currentcommand).replace('turn on', '')
            currentcommand = String(currentcommand).replace('open', '')
            onswitch(currentcommand)
            setNote('')
        } else if (
            String(currentcommand).includes('turn off') ||
            String(currentcommand).includes('close')
        ) {
            currentcommand = String(currentcommand).replace('turn off', '')
            currentcommand = String(currentcommand).replace('close', '')
            offswitch(currentcommand)
            setNote('')
        } else {
            setNote(
                'your command is malformed. please give proper commands. as in "turn on/turn off/open/close/ + component(ex. light)+ in the room/kitchen/bathroom"',
            )
        }
    }
    function onswitch(currentcommand) {
        if (currentcommand.includes('bathroom')) {
            if (currentcommand.includes('light')) {
                setBathroomLight(true)
            }
            if (currentcommand.includes('exhaust')) {
                setBathroomExhaust(true)
            }
            if (currentcommand.includes('fan')) {
                setBathroomFan(true)
            }
            if (currentcommand.includes('door')) {
                setBathroomDoor(true)
            }
        } else if (currentcommand.includes('room' || 'Room' || 'Rooms')) {
            console.log(currentcommand)
            if (currentcommand.includes('curtain')) {
                setCurtain(true)
            }
            if (currentcommand.includes('ac' || 'AC' || 'Ac')) {
                SetAc(true)
            }
            if (currentcommand.includes('light')) {
                setRoomLight(true)
            }
            if (currentcommand.includes('heater')) {
                SetHeater(true)
            }
            if (currentcommand.includes('window')) {
                setRoomWindow(true)
            }
            if (currentcommand.includes('fan')) {
                setRoomFan(true)
            }
            if (currentcommand.includes('door')) {
                setRoomDoor(true)
            }
            if (currentcommand.includes('tv')) {
                setTv(true)
            }
            if (currentcommand.includes('pc')) {
                setPc(true)
            }
        } else if (currentcommand.includes('kitchen')) {
            if (currentcommand.includes('light')) {
                setKitchenLight(true)
            }
            if (currentcommand.includes('exhaust')) {
                setKitchenExhaust(true)
            }
            if (currentcommand.includes('window')) {
                setKitchenWindow(true)
            }
            if (currentcommand.includes('fan')) {
                setKitchenFan(true)
            }
            if (currentcommand.includes('door')) {
                setKitchenDoor(true)
            }
        } else {
            setNote(
                'your command is malformed. please give proper commands. as in "turn on/turn off/open/close/ + component(ex. light)+ in the room/kitchen/bathroom"',
            )
        }
    }
    function offswitch(currentcommand) {
        if (currentcommand.includes('bathroom')) {
            if (currentcommand.includes('light')) {
                setBathroomLight(false)
            }
            if (currentcommand.includes('exhaust')) {
                setBathroomExhaust(false)
            }
            if (currentcommand.includes('fan')) {
                setBathroomFan(false)
            }
            if (currentcommand.includes('door')) {
                setBathroomDoor(false)
            }
        } else if (currentcommand.includes('room' || 'Room' || 'Rooms')) {
            console.log(currentcommand)
            if (currentcommand.includes('curtain')) {
                setCurtain(false)
            }
            if (currentcommand.includes('ac' || 'AC' || 'Ac')) {
                SetAc(false)
            }
            if (currentcommand.includes('light')) {
                setRoomLight(false)
            }
            if (currentcommand.includes('heater')) {
                SetHeater(false)
            }
            if (currentcommand.includes('window')) {
                setRoomWindow(false)
            }
            if (currentcommand.includes('fan')) {
                setRoomFan(false)
            }
            if (currentcommand.includes('door')) {
                setRoomDoor(false)
            }
            if (currentcommand.includes('tv')) {
                setTv(false)
            }
            if (currentcommand.includes('pc')) {
                setPc(false)
            }
        } else if (currentcommand.includes('kitchen')) {
            if (currentcommand.includes('light')) {
                setKitchenLight(false)
            }
            if (currentcommand.includes('exhaust')) {
                setKitchenExhaust(false)
            }
            if (currentcommand.includes('window')) {
                setKitchenWindow(false)
            }
            if (currentcommand.includes('fan')) {
                setKitchenFan(false)
            }
            if (currentcommand.includes('door')) {
                setKitchenDoor(false)
            }
        } else {
            setNote(
                'your command is malformed. please give proper commands. as in "turn on/turn off/open/close/ + component(ex. light)+ in the room/kitchen/bathroom"',
            )
        }
    }

    return (
        <>
            <h1>Schneider Speaks Demo</h1>
            <div className="container">
                <div className="box">
                    <h2>Give Command</h2>
                    {waitStart ? <span>🛑</span> : <span>🎙️</span>}
                    <button className="btttn" onClick={handleSaveNote} disabled={!note}>
                        Analyze command
                    </button>
                    <button className="btttn" onClick={() => handleListen()}>
                        Start Listening/Stop Listening
                    </button>
                    <p>{note}</p>
                </div>
                <h2>Home State</h2>
                <div className="box1">
                    <div className='box2'>
                        <h3>Room</h3>
                        <p>
                            Light's💡 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: roomLight ? '#00e600' : '' }}
                                onClick={() => setRoomLight((prevState) => !prevState)}
                            >
                                {roomLight ? <span>Lights on</span> : <span>Lights off</span>}
                            </button>
                        </p>
                        <p>
                            ac ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: ac ? '#00e600' : '' }}
                                onClick={() => SetAc((prevState) => !prevState)}
                            >
                                {ac ? <span>AC on</span> : <span>Ac off</span>}
                            </button>
                        </p>
                        <p>
                            heater ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: heater ? '#00e600' : '' }}
                                onClick={() => SetHeater((prevState) => !prevState)}
                            >
                                {heater ? <span>Heaters on</span> : <span>Heaters off</span>}
                            </button>
                        </p>
                        <p>
                            fan ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: roomFan ? '#00e600' : '' }}
                                onClick={() => setRoomFan((prevState) => !prevState)}
                            >
                                {roomFan ? <span>fan on</span> : <span>fan off</span>}
                            </button>
                        </p>
                        <p>
                            door🚪 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: roomDoor ? '#00e600' : '' }}
                                onClick={() => setRoomDoor((prevState) => !prevState)}
                            >
                                {roomDoor ? <span>door open</span> : <span>door closed</span>}
                            </button>
                        </p>
                        <p>
                            tv📺 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: tv ? '#00e600' : '' }}
                                onClick={() => setTv((prevState) => !prevState)}
                            >
                                {tv ? <span>tv's on</span> : <span>tv's off</span>}
                            </button>
                        </p>
                        <p>
                            pc💻 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: pc ? '#00e600' : '' }}
                                onClick={() => setPc((prevState) => !prevState)}
                            >
                                {pc ? <span>pc's on</span> : <span>pc's off</span>}
                            </button>
                        </p>
                    </div>
                    <div className='box2'>

                        <h3>kitchen</h3>
                        <p>
                            Light's💡 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: kitchenLight ? '#00e600' : '' }}
                                onClick={() => setKitchenLight((prevState) => !prevState)}
                            >
                                {kitchenLight ? <span>Lights on</span> : <span>Lights off</span>}
                            </button>
                        </p>
                        <p>
                            window ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: kitchenWindow ? '#00e600' : '' }}
                                onClick={() => setKitchenWindow((prevState) => !prevState)}
                            >
                                {kitchenWindow ? (
                                    <span>windows open</span>
                                ) : (
                                    <span>Windows closed</span>
                                )}
                            </button>
                        </p>
                        <p>
                            fan ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: kitchenFan ? '#00e600' : '' }}
                                onClick={() => setKitchenFan((prevState) => !prevState)}
                            >
                                {kitchenFan ? <span>fan on</span> : <span>fan off</span>}
                            </button>
                        </p>
                        <p>
                            door🚪 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: kitchenDoor ? '#00e600' : '' }}
                                onClick={() => setKitchenDoor((prevState) => !prevState)}
                            >
                                {kitchenDoor ? <span>door open</span> : <span>door closed</span>}
                            </button>
                        </p>
                        <p>
                            exhaust ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: KitchenExhaust ? '#00e600' : '' }}
                                onClick={() => setKitchenExhaust((prevState) => !prevState)}
                            >
                                {KitchenExhaust ? (
                                    <span>exhaust open</span>
                                ) : (
                                    <span>exhaust closed</span>
                                )}
                            </button>
                        </p>
                    </div>
                    <div className='box2'>
                        <h3>Bathroom</h3>
                        <p>
                            Light's💡 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: bathroomLight ? '#00e600' : '' }}
                                onClick={() => setBathroomLight((prevState) => !prevState)}
                            >
                                {bathroomLight ? <span>Lights on</span> : <span>Lights off</span>}
                            </button>
                        </p>
                        <p>
                            fan ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: bathroomFan ? '#00e600' : '' }}
                                onClick={() => setBathroomFan((prevState) => !prevState)}
                            >
                                {bathroomFan ? <span>fan on</span> : <span>fan off</span>}
                            </button>
                        </p>
                        <p>
                            door🚪 ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: bathroomDoor ? '#00e600' : '' }}
                                onClick={() => setBathroomDoor((prevState) => !prevState)}
                            >
                                {bathroomDoor ? <span>door open</span> : <span>door closed</span>}
                            </button>
                        </p>
                        <p>
                            exhaust ={' '}
                            <button
                                className="btttn"
                                style={{ backgroundColor: bathroomExhaust ? '#00e600' : '' }}

                                onClick={() => setBathroomExhaust((prevState) => !prevState)}
                            >
                                {bathroomExhaust ? (
                                    <span>exhaust open</span>
                                ) : (
                                    <span>exhaust closed</span>
                                )}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dsm
