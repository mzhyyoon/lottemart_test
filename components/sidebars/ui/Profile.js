class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user : {
                isExpanded: false,
                profileImage: '/static/images/faces/face1.jpg',
                name : 'Administration',
                position : 'Project Manager',
                isBookMark : false
            }
        };
    }
    render () {
        const {user} = this.state;

        return (
            <li className="nav-item nav-profile">
                <a href="#" className="nav-link">
                    <div className="nav-profile-image">
                        <img src={user.profileImage} alt="profile"/>
                        <span className="login-status online"></span>
                    </div>
                    <div className="nav-profile-text d-flex flex-column">
                        <span className="font-weight-bold mb-2">
                            {user.name}
                        </span>
                        <span className="text-secondary text-small">
                            {user.position}
                        </span>
                    </div>
                    <i className={"mdi mdi-bookmark-check "+ (user.isBookMark ? 'text-success' : '') +" nav-profile-badge"}></i>
                </a>
            </li>
        );
    }
}

export default Profile;