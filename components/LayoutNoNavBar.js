import Head from 'next/head';

const LayoutNoNavBar = (props) => (
    <div>
        <Head>
            <title>{C.pageTitle}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel="stylesheet" href="/static/fonts/mdi/css/materialdesignicons.min.css"/>
            <link rel="stylesheet" href="/static/css/vendor.bundle.base.css"/>
            <link rel="stylesheet" href="/static/css/style.css"/>
        </Head>
        {props.children}
    </div>
);

export default LayoutNoNavBar;