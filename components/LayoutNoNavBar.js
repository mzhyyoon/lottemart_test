import Head from 'next/head';
import C from '../constants';

const LayoutNoNavBar = (props) => (
    <div>
        <Head>
            <title>{C.pageTitle}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link href="/static/vendor/iconfonts/mdi/css/materialdesignicons.min.css" rel="stylesheet"/>
            <link href="/static/fonts/css/vendor.bundle.base.css" rel="stylesheet"/>
            <link href="/static/css/style.css" rel="stylesheet"/>
        </Head>
        {props.children}
    </div>
);

export default LayoutNoNavBar;