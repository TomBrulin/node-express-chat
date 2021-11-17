import ReactTooltip from 'react-tooltip';
import { useState } from 'react';

function UsersList({users}) {
    const [userTotalMessages, setUserTotalMessages] = useState(-1);

    function handleUserMouseEnter(e) {
        setUserTotalMessages(-1);

        if (!e.target)
            return;

        const element = e.target.querySelector("#username");

        if (!element)
            return;

        const username = element.innerText;

        fetch(`http://localhost:3001/total-user-messages/${username}`)
            .then(response => response.json())
            .then((response) => {
                setUserTotalMessages(response.amount);
            }).catch((e) => console.error(e));
    }

    return (
        <div className="right-tabs">

            <ul className="tabs">
                <li className="active">
                    <a href="#"><i className="fa fa-users"/></a>
                </li>
            </ul>
            <ul className="tabs-container">
                <li className="active">
                    <ul className="member-list">
                        {
                            users.map((user, index) => (
                                <li data-tip="" data-for="user-tooltip" onMouseEnter={handleUserMouseEnter} key={index}>
                                    <ReactTooltip id="user-tooltip" place="top" effect="solid">
                                        {
                                            userTotalMessages <= -1
                                            ?
                                                "Chargement..."
                                            :
                                                `${userTotalMessages} ${userTotalMessages > 0 ? "messages": "message"}`
                                        }
                                    </ReactTooltip>
                                    <span className="status online"><i className="fa fa-circle"/></span>
                                    <span id="username">{user.username}</span>
                                </li>
                            ))
                        }
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default UsersList;