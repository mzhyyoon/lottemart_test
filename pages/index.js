import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import getHost from '../assets/js/get-hosts';
import {withRouter} from 'next/router';
import Cookies from 'js-cookie';

class Index extends React.Component {
    static async getInitialProps({req}) {
        let uuid;

        if(req && req.cookies) {
            uuid = req.cookies.uuid;
        } else {
            uuid = Cookies.get('uuid');
        }

        const response = await fetch(`${getHost('page', process.env.NODE_ENV)}/api/user/${uuid}`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();

        return {
            user : [data]
        }
    }

    render() {
        return (
            <Layout user={this.props.user}>
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
    }
};

export default withRouter(Index);