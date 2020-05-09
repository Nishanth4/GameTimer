const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const currentRooms = [];

io.on('connection', (socket) => {//when socket is connected
    console.log('connected');
    

    socket.on('join', ({ name, room}, callback) => {//when socket emits join event gets name and room from client
        console.log(name, room);

        const { error, user } = addUser({ id: socket.id, name, room });//error check

        if(error) return callback(error);

        if(!currentRooms.includes(room)){//adds the room to currentRooms if it is a new room and emits new-room event
            currentRooms.push(room);
            socket.emit('new-room', name);
            console.log('current rooms: ' + currentRooms);
        }

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}!`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined!`})

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});//sends client list of users in room

        callback();
    });

    socket.on('timer-clicked', (nameobj) => {
        console.log('clicked event');
        console.log(nameobj);
        console.log(getUsersInRoom(nameobj.room));
        let usersInRoomList = getUsersInRoom(nameobj.room);
        let nextUser;

        for (i in usersInRoomList) {//needs to be switched to a while loop
            currentUser = usersInRoomList[i];
            console.log('current user: ');
            console.log(currentUser);
            if (currentUser.name === nameobj.name) {//opposite of this in wild loop
                console.log('current user index');
                currentUserIndex = usersInRoomList.indexOf(currentUser);//gets index in array
                console.log(currentUserIndex);
                if (currentUserIndex === usersInRoomList.length) {//if it is the final index must be back to first user's turn
                    nextUser = usersInRoomList[0];
                    console.log(nextUser);
                } else {
                    console.log('2');
                    nextUser = usersInRoomList[nextUser + 1];//otherwise next person's turn
                    console.log(nextUser);
                }
            }
        }
        console.log(nextUser)
        console.log('clicked event done');
    });

    socket.on('disconnect', (room) => {//disconnect event room is passed in
        console.log('user has left');
        console.log(getUsersInRoom(room));
        if(!getUsersInRoom(room).length > 0){//if last member in room, room is removed
            currentRooms.pop(room);
            console.log(currentRooms);
        }
        const user = removeUser(socket.id);//removes socket
    });
})

app.use(router);

server.listen(PORT, () => console.log(`server has started ${PORT}`));