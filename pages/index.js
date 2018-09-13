import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from "../constants";

const Index = ({children, router, href, user}) => {
    return (
       <Layout user={user}>
           <div>Index</div>
       </Layout>
    );
};

Index.getInitialProps = async ({req}) => {
    const res = await fetch(`${C.hosts[process.env.NODE_ENV]}/api/users/${encodeURIComponent('hyyoon@mz.co.kr')}`);
    const data = await res.json();

    return data;
};

export default withRouter(Index);