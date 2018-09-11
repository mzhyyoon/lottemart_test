import Head from 'next/head';
import C from '../constants';

const LayoutNoNavBar = (props) => (
    <div>
        <Head>
            <title>{C.pageTitle}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="/static/fonts/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
            <link href="/static/vendor/animate/animate.css" rel="stylesheet"/>
            <link href="/static/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet"/>
            <link href="/static/vendor/select2/select2.min.css" rel="stylesheet"/>
            <link href="/static/css/util.css" rel="stylesheet"/>
            <link href="/static/css/main.css" rel="stylesheet"/>
        </Head>
        {props.children}
    </div>
);

export default LayoutNoNavBar;