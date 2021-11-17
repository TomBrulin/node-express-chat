require('dotenv').config();
const express = require('express');
const chatData = require('./chatData');
const mongoose = require('mongoose');
const sMessage = require('./models/message');
const formatDate = require('./dateUtil');

module.exports = function (app, server) {

    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('DB is OK'))
        .catch((err) => console.log('DB failed', err));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());

    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    require('./socket/chat')(io);

    app.use(function (req, res, next) { req.io = io; next(); });

    app.get('/online', (req, res) => {
        const users = [];

        Object.entries(chatData.users).map((key, index) => {
           users.push({ username: key[1].username, socketId: key[1].socket.id });
        });

        return res.json({
            users
        });
    });

    app.get('/messages', (req, res) => {
        sMessage.find({}).sort([['created_at', 1]]).exec((err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ messages: [] });
            } else {
                return res.json({
                    messages: result.map((message) => {
                        const date = new Date(message.created_at);
                        const time = formatDate(date);
                        return {
                            username: message.by,
                            content: message.content,
                            time: time
                        };
                    })
                });
            }
        });
    });

    app.get('/total-messages', (req, res) => {
       sMessage.count((err, amount) => {
           if (err) {
               return res.status(400).json({
                   amount: 0
               });
           } else {
               return res.json({
                   amount: amount
               });
           }
       });
    });

    app.get('/total-user-messages/:username', async (req, res) => {
        const { username } = req.params;
        sMessage.count({ by: username }, (err, amount) => {
            if (err) {
                return res.status(400).json({
                    amount: 0
                });
            } else {
                return res.json({
                    amount: amount
                });
            }
        });
    });
}