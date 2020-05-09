import React, { useState, useEffect } from 'react';
import queryString from 'querystring';
import io from 'socket.io-client';

import TextContainer from '../TextContainer/TextContainer.js';

let socket;

//Timer Page, Time is the actual Time object

const Timer = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const ENDPOINT = 'localhost:5000';

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


    return (
        <div>
            <div>
                <TextContainer users={users}/>
            </div>
        </div>
    )
}

export default Timer;