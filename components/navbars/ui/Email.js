class Email extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email : {
                isExpanded : false,
                messages : []
            }
        }
    }
    render () {
        const {email} = this.state;

        return (
            <li className={"nav-item dropdown " + (email.isExpanded ? 'show' : '')}>
                <a className="nav-link count-indicator dropdown-toggle"
                   id="messageDropdown"
                   href="#"
                   onClick={(event) => {
                       event.preventDefault();

                       this.setState({
                           email :
                               Object.assign(
                                   {},
                                   this.state.email,
                                   {
                                       isExpanded: !email.isExpanded
                                   }
                               )
                       });
                   }}
                   data-toggle="dropdown"
                   aria-expanded={email.isExpanded}>
                    <i className="mdi mdi-email-outline"></i>
                    <span className="count-symbol bg-warning"></span>
                </a>
                <div className={"dropdown-menu dropdown-menu-right navbar-dropdown preview-list " + (email.isExpanded ? 'show': '')}
                     aria-labelledby="messageDropdown">
                    <h6 className="p-3 mb-0">Messages</h6>
                    <RenderMessage messages={email.messages}/>
                    <div className="dropdown-divider"></div>
                    <h6 className="p-3 mb-0 text-center">
                        {email.messages.length} new messages
                    </h6>
                </div>
            </li>
        )
    }
}

const RenderMessage = ({messages}) => {
    if(messages.length === 0) {
        return null;
    }

    return (
        messages.map(message =>
            <div>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                        <img src={message.user.image}
                             alt={message.user.name}
                             className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                            {message.title}
                        </h6>
                        <p className="text-gray mb-0">
                            {message.sendDate}
                        </p>
                    </div>
                </a>
                <div className="dropdown-divider"></div>
            </div>
        )
    );
}

export default Email;