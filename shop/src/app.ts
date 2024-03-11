import { Socket } from "dgram";

const io = require('socket.io');
const http = require('http');

io.on('connection', (socket: Socket) => {
    console.log('Connected', socket)
})
