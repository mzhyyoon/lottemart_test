import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from '../constants';
import moment from 'moment';

const TestCase = ({children, router, href, user, testcases}) => {
    return (
        <Layout user={user}>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div className="page-header">
                            <h3 className="page-title">
                               <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                   <i className="mdi mdi-playlist-check"></i>
                               </span>
                                Test Case
                            </h3>
                        </div>
                    </div>
                </div>
                {testcases.map(testcase =>
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">
                                        {testcase.type}
                                        <button type="button"
                                                className="btn btn-inverse-primary btn-rounded btn-icon float-right">
                                            <i className="mdi mdi-arrow-right-drop-circle-outline"></i>
                                        </button>
                                    </h4>
                                    {testcase.timestamp &&
                                        <p className="card-description">
                                            <em className="text-muted small">
                                                Last Modify : {moment(testcase.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                                            </em>
                                        </p>
                                    }
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Describe</th>
                                                <th>It</th>
                                                <th>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {testcase.shoulds.map(should =>
                                            <tr>
                                                <td>{should.describe}</td>
                                                <td>{should.it}</td>
                                                <td>
                                                    {should.result === 'ok' ? (
                                                        <span className="text-success">
                                                            Success
                                                        </span>
                                                    ) : (
                                                        <span className="text-danger">
                                                            Fail
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

TestCase.getInitialProps = async () => {
    const userResponse = await fetch(`${C.hosts[process.env.NODE_ENV]}/api/users/${encodeURIComponent('hyyoon')}`);
    const testcasesResponse = await fetch(`${C.hosts[process.env.NODE_ENV]}/api/testcases/${encodeURIComponent('hyyoon')}`);

    const userJSONData = await userResponse.json();
    const testcasesJSONData = await testcasesResponse.json();

    return {
        user : userJSONData.user,
        testcases : testcasesJSONData.testcase
    };
};

export default withRouter(TestCase);