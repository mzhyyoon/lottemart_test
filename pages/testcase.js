import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from '../constants';

const TestCase = ({children, router, href, user}) => {
    return (
        <Layout user={user}>
            <div>TestCase</div>
        </Layout>
    );
};

TestCase.getInitialProps = async () => {
    const res = await fetch(`${C.hosts[process.env.NODE_ENV]}/api/users/${encodeURIComponent('hyyoon@mz.co.kr')}`);
    const data = await res.json();

    return data;
};

export default withRouter(TestCase);