import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from "../constants";

const Index = ({children, router, href, user}) => {
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

Index.getInitialProps = async () => {
    const res = await fetch(`${C.hosts[process.env.NODE_ENV]}/api/users/${encodeURIComponent('hyyoon')}`);
    const data = await res.json();

    return data;
};

export default withRouter(Index);