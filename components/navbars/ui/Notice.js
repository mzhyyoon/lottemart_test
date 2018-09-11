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
                   data-toggle="dropdown"
                   aria-expanded={notice.isExpanded}>
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="count-symbol bg-danger"></span>
                </a>
                <div className={"dropdown-menu dropdown-menu-right navbar-dropdown preview-list " + (notice.isExpanded ? 'show' : '')}
                     aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Notifications</h6>
                    <RenderNotice messages={notice.messages}/>
                    {notice.messages.length === 0 ? (
                        <div className="dropdown-divider"></div>
                    ) : ''}
                    <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                </div>
            </li>
        )
    }
}

const RenderNotice = ({messages}) => {
    if(messages.length === 0) {
        return null;
    }

    return (
        messages.map(message =>
            <div>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                        <RenderBadge badge={message.badge}/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">
                            {message.user.name}
                        </h6>
                        <p className="text-gray ellipsis mb-0">
                            {message.title}
                        </p>
                    </div>
                </a>
                <div className="dropdown-divider"></div>
            </div>
        )
    );
};

const RenderBadge = ({badge}) => {
    switch (badge) {
        case 'calendar':
            <div className="preview-icon bg-success">
                <i className="mdi mdi-calendar"></i>
            </div>
            break;
        case 'settings':
            <div className="preview-icon bg-warning">
                <i className="mdi mdi-settings"></i>
            </div>
            break;
        case 'linkVariant':
            return (
                <div className="preview-icon bg-info">
                    <i className="mdi mdi-link-variant"></i>
                </div>
            );
        default:
            return null;
    }
};

export default Notice;