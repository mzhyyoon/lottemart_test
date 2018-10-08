import Head from 'next/head';
import C from '../constants';
import NavBarContainer from "./navbars/containers";
import SideBarContainer from "./sidebars/containers";
import Spinner from "./Spinner";

const Layout = ({children, user, test, fetching}) => {
    return (
        <div>
            <Head>
                <title>{C.pageTitle}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link rel="stylesheet" href="/static/fonts/mdi/css/materialdesignicons.min.css"/>
                <link rel="stylesheet" href="/static/css/vendor.bundle.base.css"/>
                <link rel="stylesheet" href="/static/css/style.css"/>
            </Head>
            <div className="container-scroller">
                <NavBarContainer user={user}/>
                <div className="container-fluid page-body-wrapper">
                    <SideBarContainer user={user}/>
                    <div className={"main-panel" + (fetching ? ' dimmed' : '')}>
                        {children}
                        <Spinner isActive={fetching}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

Layout.getInitialProps = ({req}) => {
    return {
        test: '1'
    }
};
export default Layout;