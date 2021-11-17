import './Login.scss';
import { useEffect, useRef, useState } from 'react';

function Login({ setData, socket }) {
    const [error, setError] = useState('');
    const usernameRef = useRef();

    useEffect(() => {
        socket.on('CONNECTION_ACCEPTED', (username, socketId) => {
            setData({
                username: username,
                socketId: socketId
            });
        });

        socket.on('CONNECTION_DENIED', () => {
            setError('Nom d\'utilisateur ou mot de passe incorrect');
        });

        return () => {
            socket.off('CONNECTION_ACCEPTED');
            socket.off('CONNECTION_DENIED');
        };
    }, [socket, setData]);


    function handleLogin(e) {
        e.preventDefault();

        const username = usernameRef.current.value;

        if (username === '') {
            setError('Veuillez saisir un nom d\'utilisateur');
            return;
        }

        socket.emit('TRY_TO_CONNECT', username, 'password here');
    }

    return (
        <div id="wrapper" className="wrapper">
            <div className="container">
                <h1>Bienvenue</h1>

                <br />

                <div id="error" className="error">{error}</div>

                <form className="form" id="signup">
                    <input type="text" id="username" placeholder="Nom d'utilisateur" ref={usernameRef} required />
                    <button className="loginbutton" onClick={handleLogin}>Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default Login;