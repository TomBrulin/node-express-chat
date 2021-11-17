import { useRef } from 'react';

function SendMessage({ socket }) {
    const messageRef = useRef();

    function handleSendMessage(e) {
        e.preventDefault();

        const message = messageRef.current.value;

        if (message === '') {
            return;
        }

        socket.emit('SEND_MESSAGE', message);

        messageRef.current.value = '';
    }

    return (
        <div className="input-area">
            <div className="input-wrapper">
                <input type="text" placeholder="Votre message" ref={messageRef} />
                <i className="fa fa-smile-o"/>
            </div>
            <input type="button" value="Envoyer" className="send-btn"  onClick={handleSendMessage} />
        </div>
    );
}

export default SendMessage;