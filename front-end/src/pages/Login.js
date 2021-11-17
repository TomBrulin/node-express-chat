import './Login.scss';
import { useEffect, useRef, useState } from 'react';

function Login({ setData, socket }) {
    const [message, setMessage] = useState('');
    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        socket.on('CONNECTION_ACCEPTED', (username, socketId) => {
            setData({
                username: username,
                socketId: socketId
            });
        });

        socket.on('SEND_AUTH_MESSAGE', (msg) => {
            setMessage(msg);
        });

        return () => {
            socket.off('CONNECTION_ACCEPTED');
            socket.off('SEND_AUTH_MESSAGE');
        };
    }, [socket]);


    function handleLogin(e) {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (username === '') {
            setMessage('Veuillez saisir un nom d\'utilisateur');
            return;
        }

        if (password === '') {
            setMessage('Veuillez saisir un mot de passe');
            return;
        }

        socket.emit('TRY_TO_CONNECT', username, password);
    }

    function handleRegister(e) {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (username === '') {
            setMessage('Veuillez saisir un nom d\'utilisateur');
            return;
        }

        if (username.includes(' ')) {
            setMessage('Veuillez ne pas mettre d\'espace dans le nom d\'utilisateur !');
            return;
        }

        if (password === '') {
            setMessage('Veuillez saisir un mot de passe');
            return;
        }

        socket.emit('REGISTER', username, password);
    }

    return (
        <div id="wrapper" className="wrapper">
            <div className="container">
                <h1>Bienvenue</h1>

                <br />

                <div id="error" className="error">{message}</div>

                <form className="form" id="signup">
                    <input type="text" id="username" placeholder="Nom d'utilisateur" ref={usernameRef} required />
                    <input type="password" id="password" placeholder="Mot de passe" ref={passwordRef} required />
                    <button className="loginbutton" onClick={handleLogin}>Se connecter</button>
                    <br />
                    <br />
                    <button className="loginbutton" onClick={handleRegister}>S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Login;