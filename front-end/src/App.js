import Chat from './pages/Chat';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
    const [data, setData] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('ADD_USER', (username, socketId) => {
            setUsers([...users, { username, socketId }]);
        });

        socket.on('REMOVE_USER', (socketId) => {
            setUsers(users.filter(user => user.socketId !== socketId));
        });

        socket.on('ADD_MESSAGE', (username, content, time) => {
            setMessages([...messages, { username, content, time }]);
        });

        return () => {
            socket.off('ADD_USER');
            socket.off('REMOVE_USER');
            socket.off('ADD_MESSAGE');
        };
    }, [users, messages]);

    useEffect(() => {
        fetch('http://localhost:3001/online',)
            .then(response => response.json())
            .then((response) => {
                setUsers(response.users);
            }).catch((e) => console.error(e));
    }, []);

    return (
        <>
            {
                data ? <Chat data={data} socket={socket} users={users} messages={messages} /> : <Login socket={socket} setData={setData} />
            }
        </>
    );
}

export default App;
