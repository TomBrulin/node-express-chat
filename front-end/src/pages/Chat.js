import './Chat.scss';
import Message from '../components/Message';
import SendMessage from '../components/SendMessage';
import MyAccount from '../components/MyAccount';
import UsersList from '../components/UsersList';

function Chat({ data, socket, users, messages }) {
    return (
        <div className="window-wrapper">
            <div className="window-title">
                <div className="dots">
                    <i className="fa fa-circle"/>
                    <i className="fa fa-circle"/>
                    <i className="fa fa-circle"/>
                </div>
                <div className="title">
                    <span>RIL - CHAT</span>
                </div>
            </div>
            <div className="window-area">
                <div className="conversation-list">
                    <ul>
                        <li className="item active">
                            <a href="#">
                                <i className="fa fa-globe"/>
                                <span>Général</span>
                            </a>
                        </li>
                    </ul>

                    <MyAccount username={data.username} />
                </div>

                <div className="chat-area">
                    <div className="title"><b>Général</b></div>
                    <div className="chat-list">
                        <ul>
                            {
                                messages.map(((message, index) => (
                                    <Message key={index} isMe={message.username === data.username} username={message.username} content={message.content} time={message.time} />
                                )))
                            }
                        </ul>
                    </div>

                    <SendMessage socket={socket} />
                </div>

                <UsersList users={users} />
            </div>
        </div>
    );
}

export default Chat;