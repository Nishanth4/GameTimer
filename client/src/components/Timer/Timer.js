import React, { useState, useEffect } from 'react';
import queryString from 'querystring';
import io from 'socket.io-client';

import Time from '../Time/Time.js';
import TextContainer from '../TextContainer/TextContainer.js';

let socket;

//Timer Page, Time is the actual Time object

const Timer = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [roomMaster, setRoomMaster] = useState('');
    const [isClicked, setIsClicked] = useState(true);
    const ENDPOINT = 'localhost:5000';

    const recievedClick = (isClicked, counter) => {//function to call in child when stop is clicked
        setIsClicked(!isClicked);
        console.log({'name': name, 'time': counter}); 
    }

    useEffect(() =>{
        const { name, room } = queryString.parse(location.search);//gets values for name and room form url

        socket=io(ENDPOINT);//creates socket

        console.log(socket);

        setName(name);//sets name and room values
        setRoom(room);

        socket.emit('join', { name, room }, () => {//emits join event

        });

        return () => {
            socket.emit('disconnect', room);//passes room so can be checked if empty

            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', () => {

        })

        socket.on('new-room', (roomMasterName) => {
            console.log('new room');
            setRoomMaster(roomMasterName);
            
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users);//gets all the users in the room from server and sets them
        })
    }, []);

    useEffect(() => {
        socket.emit('timer-clicked', {name: name, room: room});//when timer is clicked this event is sent
    }, [isClicked])

    return (
        <div>
            <div>
                <TextContainer users={users}/>
            </div>
            <div>
                <Time recievedClick ={ recievedClick }/>
            </div>
            <div>
                if name==roomMaster 
            </div>
        </div>
    )
}

export default Timer;