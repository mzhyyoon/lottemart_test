import {withRouter} from 'next/router';

const ActiveNav = ({children, router, href}) => {
    return (
        <li className={"nav-item " + (href === '/home' ?
            (router.route === '/' ? 'active' : '') :
            (router.route.indexOf(href) !== -1 ? 'active' : ''))}>
            {children}
        </li>
    );
};

export default withRouter(ActiveNav);