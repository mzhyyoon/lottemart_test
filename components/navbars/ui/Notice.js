class Notice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notice: {
                isExpanded: false,
                messages: []
            }
        };
    }

    render () {
        const {notice} = this.state;

        return (
            <li className={"nav-item dropdown " + (notice.isExpanded ? 'show' : '')}>
                <a className="nav-link count-indicator dropdown-toggle"
                   href="#"
                   onClick={(event) => {
                       event.preventDefault();

                       this.setState({
                           notice :
                               Object.assign(
                                   {},
                                   this.state.notice,
                                   {
                                       isExpanded: !notice.isExpanded
                                   }
                               )
                       });
                   }}
                   data-toggle="dropdown">
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="count-symbol bg-danger"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                     aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Notifications</h6>

                </div>
            </li>
        )
    }
}

export default Notice;