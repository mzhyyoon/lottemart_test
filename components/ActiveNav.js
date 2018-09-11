import {withRouter} from 'next/router';

const ActiveNav = ({children, router, href}) => {
    return (
        <li className={"nav-item " + (router.pathname === href ? 'active' : '')}>
            {children}
        </li>
    );
};

export default withRouter(ActiveNav);