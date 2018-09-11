import Head from 'next/head';
import C from '../constants';
import NavBarContainer from "./navbars/containers";
import SideBarContainer from "./sidebars/containers";

const Layout = (props) => (
    <div>
        <Head>
            <title>{C.pageTitle}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="stylesheet" href="/static/fonts/mdi/css/materialdesignicons.min.css"/>
            <link rel="stylesheet" href="/static/css/vendor.bundle.base.css" />
            <link rel="stylesheet" href="/static/css/style.css" />
        </Head>
        <div className="container-scroller">
            <NavBarContainer/>
            <SideBarContainer/>
            <div className="main-panel">
                {props.children}
            </div>
        </div>
    </div>
);

export default Layout;