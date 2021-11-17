function MyAccount({ username }) {
    return (
        <div className="my-account">
            <div className="image">
                <img src="https://thispersondoesnotexist.com/image" alt="Avatar"/>
                <i className="fa fa-circle online"/>
            </div>
            <div className="name">
                <span>{ username }</span>
                <i className="fa fa-angle-down"/>
                <span className="availability">En ligne</span>
            </div>
        </div>
    );
}

export default MyAccount;