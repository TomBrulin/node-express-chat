const chatData = require('../chatData');
const sMessage = require('../models/message');
const sUser = require('../models/user');
const formatDate = require('../dateUtil');
const bcrypt = require('bcrypt');
const leoProfanity = require('leo-profanity');
const frenchBadwordsList = require('french-badwords-list');

module.exports = function (io) {
    leoProfanity.clearList();
    leoProfanity.add(frenchBadwordsList.array);

    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);

        socket.on('REGISTER', async (username, password) => {
            let user = await sUser.findOne({ username: username });

            if (user) {
                socket.emit('SEND_AUTH_MESSAGE', 'Cet utilisateur existe déjà');
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hashSync(password, salt);

            user = new sUser({
                username: username,
                password: hashedPassword
            });

            await user.save();
            socket.emit('SEND_AUTH_MESSAGE', 'Utilisateur créé, vous pouvez vous connecter');
        });

        socket.on('TRY_TO_CONNECT', async (username, password) => {
            const user = await sUser.findOne({ username: username });

            if (!user) {
                socket.emit('SEND_AUTH_MESSAGE', 'L\'utilisateur n\'existe pas');
                return;
            }

            if (!bcrypt.compareSync(password, user.password)) {
                socket.emit('SEND_AUTH_MESSAGE', 'Mot de passe incorrect');
                return;
            }

            chatData.users[socket.id] = {
                socket,
                username
            };

            console.log(`${socket.id} logged with username ${username}`);
            socket.emit('CONNECTION_ACCEPTED', username, socket.id);
            io.emit('ADD_USER', username, socket.id);
        });

        socket.on('SEND_MESSAGE', async (content) => {
            if (!isUserConnected(socket.id)) {
                return;
            }

            const date = new Date(Date.now());
            const time = formatDate(date);
            const username = chatData.users[socket.id].username;
            const clearedContent = leoProfanity.clean(content);

            const message = new sMessage({
                by: username,
                content: clearedContent,
                created_at: Date.now()
            });

            await message.save();

            io.emit('ADD_MESSAGE', username, clearedContent, time);
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