function UsersList({users}) {
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
                                <li key={index}><span className="status online"><i className="fa fa-circle"/></span><span>{user.username}</span></li>
                            ))
                        }
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default UsersList;