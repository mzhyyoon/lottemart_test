import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from "../constants";

const Index = ({children, router, href, user}) => {
    console.log(children);

    return (
       <Layout user={user}>
           <div className="content-wrapper">
               <div className="row">
                   <div className="col-12">
                       <div className="page-header">
                           <h3 className="page-title">
                               <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                   <i className="mdi mdi-view-dashboard"></i>
                               </span>
                               Index
                           </h3>
                       </div>
                   </div>
               </div>
           </div>
       </Layout>
    );
};

Index.getInitialProps = async ({req}) => {
    console.log('req : ', req);
    const res = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/users/${encodeURIComponent('hyyoon')}`);
    const data = await res.json();

    return data;
};

export default withRouter(Index);