const chatData = require('../chatData');

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);

        socket.on('TRY_TO_CONNECT', (username, password) => {
            // TODO - Check for password here
            // socket.emit('CONNECTION_DENIED');

            chatData.users[socket.id] = {
                socket,
                username
            };

            console.log(`${socket.id} logged with username ${username}`);
            socket.emit('CONNECTION_ACCEPTED', username, socket.id);
            io.emit('ADD_USER', username, socket.id);
        });

        socket.on('SEND_MESSAGE', (message) => {
            if (!isUserConnected(socket.id)) {
                return;
            }

            const date = new Date(Date.now());

            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            const hh = String(date.getHours()).padStart(2, '0');
            const MM = String(date.getMinutes()).padStart(2, '0');
            const ss = String(date.getSeconds()).padStart(2, '0');

            const time = `${dd}/${mm}/${yyyy} ${hh}:${MM}:${ss}`;
            const username = chatData.users[socket.id].username;

            io.emit('ADD_MESSAGE', username, message, time);
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`);
            delete chatData.users[socket.id];

            io.emit('REMOVE_USER', socket.id);
        });
    });
}

function isUserConnected(id) {
    return chatData.users[id] !== null && chatData.users[id] !== undefined;
}