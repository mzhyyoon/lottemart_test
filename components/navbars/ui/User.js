import Link from 'next/link';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                isExpanded: false
            }
        }
    }

    componentWillMount () {
        //TODO get users
    }

    render() {
        const {user} = this.state;

        return (
            <li className={"nav-item nav-profile dropdown " + (user.isExpanded ? 'show' : '')}>
                <a className="nav-link dropdown-toggle"
                   id="profileDropdown"
                   href="#"
                   onClick={(event) => {
                       event.preventDefault();
                       this.setState({
                           user: {
                               isExpanded: !user.isExpanded
                           }
                       })
                   }}
                   data-toggle="dropdown"
                   aria-expanded={user.isExpanded}>
                    <div className="nav-profile-img">
                        <img src="/static/images/faces/face1.jpg" alt="image"/>
                        <span className="availability-status online"></span>
                    </div>
                    <div className="nav-profile-text">
                        <p className="mb-1 text-black">David Greymaax</p>
                    </div>
                </a>
                <div className={"dropdown-menu navbar-dropdown " + (user.isExpanded ? 'show' : '')}
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
    }
}

export default User;