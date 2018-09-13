import Link from 'next/link';
import 'isomorphic-unfetch';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user
        };
    }

    render() {
        const {
            user
        } = this.state;

        return (
            <RenderProfile user={user}/>
        );
    }
}

const RenderProfile = ({user}) => {
    if(user.length === 0) {
        return null;
    }

    const {
        name,
        profileImage,
        position,
        isBookMark,
    } = user[0];

    return (
        <li className="nav-item nav-profile">
            <Link href="/">
                <a className="nav-link">
                    <div className="nav-profile-image">
                        <img src={profileImage} alt="profile"/>
                        <span className="login-status online"></span>
                    </div>
                    <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">
                                {name}
                            </span>
                        <span className="text-secondary text-small">
                                {position}
                            </span>
                    </div>
                    <i className={"mdi mdi-bookmark-check " + (isBookMark ? 'text-success' : '') + " nav-profile-badge"}></i>
                </a>
            </Link>
        </li>
    );
};

export default Profile;