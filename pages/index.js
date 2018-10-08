import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import Authorization from '../components/utils/Authorization';

const Index = ({user}) => (
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

export default withRouter(Authorization(Index));