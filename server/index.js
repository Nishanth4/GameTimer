const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {//when socket is connected
    console.log('connected');
    

    socket.on('join', ({ name, room}, callback) => {//when socket emits join event gets name and room from client
        console.log(name, room);

        const { error, user } = addUser({ id: socket.id, name, room });//error check

        if(error) return callback(error);

        socket.join(user.room);

        callback();
    });


    socket.on('disconnect', (room) => {//disconnect event room is passed in
        console.log('user has left');
        const user = removeUser(socket.id);//removes socket
    });
})

app.use(router);

server.listen(PORT, () => console.log(`server has started ${PORT}`));