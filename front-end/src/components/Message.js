function Message({ isMe, username, content, time }) {

    return (
        <li className={isMe ? "me" : ""}>
            <div className="name">
                <span className="">{username}</span>
            </div>
            <div className="message">
                <p>{content}</p>
                <span className="msg-time">{time}</span>
            </div>
        </li>
    );
}

export default Message;