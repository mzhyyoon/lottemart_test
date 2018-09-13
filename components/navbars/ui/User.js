import Link from 'next/link';
import 'isomorphic-unfetch'

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user : props.user,
            isExpanded: false
        };
    }

    toggleExpanded = (isExpanded = false) => {
        this.setState(
            isExpanded
        );
    };

    render() {
        const {
            user,
            isExpanded
        } = this.state;

        return (
            <RenderList user={user}
                        isExpanded={isExpanded}
                        toggleExpanded={this.toggleExpanded}/>
        );
    }
};

const RenderList = ({user, isExpanded, toggleExpanded}) => {
    if(user.length === 0) {
        return null;
    }

    const {
        name,
        profileImage
    } = user[0];

    return (
        <li className={"nav-item nav-profile dropdown " + (isExpanded ? 'show' : '')}>
            <a className="nav-link dropdown-toggle"
               id="profileDropdown"
               href="#"
               onClick={(event) => {
                   event.preventDefault();
                   toggleExpanded({
                       isExpanded: !isExpanded
                   });
               }}
               data-toggle="dropdown"
               aria-expanded={isExpanded}>
                <div className="nav-profile-img">
                    <img src={profileImage} alt="image"/>
                    <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text">
                    <p className="mb-1 text-black">{name}</p>
                </div>
            </a>
            <div className={"dropdown-menu navbar-dropdown " + (isExpanded ? 'show' : '')}
                 aria-labelledby="profileDropdown">
                <Link href="/logs">
                    <a className="dropdown-item">
                        <i className="mdi mdi-cached mr-2 text-success"></i>
                        Activity Log
                    </a>
                </Link>
                <div className="dropdown-divider"></div>
                <Link href="/singout">
                    <a className="dropdown-item">
                        <i className="mdi mdi-logout mr-2 text-primary"></i>
                        Signout
                    </a>
                </Link>
            </div>
        </li>
    );
};

export default User;