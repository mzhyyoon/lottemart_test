import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from '../constants';
import moment from 'moment';
import isEmpty from '../assets/js/is-empty';

const TestCase = ({children, router, href, user, testcases}) => {
    const onStart = (id, type) => {
        fetch(`${C.hosts.api[process.env.NODE_ENV]}/testcases`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                type,
                userId : user.id
            })
        }).then(() => {
            router.push('/testcase');
        }).catch(() => {
            router.push('/testcase');
        });
    };

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
                <RenderTestCase
                    onStart={onStart}
                    testcases={testcases} />
            </div>
        </Layout>
    );
};

TestCase.getInitialProps = async () => {
    const userResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/users/${encodeURIComponent('hyyoon')}`);
    const testcasesResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/testcases/${encodeURIComponent('hyyoon')}`);

    const userJSONData = await userResponse.json();
    const testcasesJSONData = await testcasesResponse.json();

    return {
        user : userJSONData.user,
        testcases : testcasesJSONData.testcase
    };
};

const RenderTestCase = ({testcases, onStart}) => {
    if(isEmpty(testcases)) {
        return (
            <div>{C.messages.noResult}</div>
        )
    }

    return testcases.map((testcase, index) =>
        <div key={index} className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {testcase.type}
                            <button type="button"
                                    className="btn btn-inverse-primary btn-rounded btn-icon float-right"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onStart(
                                            testcase._id,
                                            testcase.type.toLowerCase()
                                        );
                                    }}>
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
                                <th>Result</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isEmpty(testcase.result) ? (
                                <tr>
                                    <td colSpan={2}>{C.messages.noResult}</td>
                                </tr>
                            ) : (testcase.result.tests.map((test, index) =>
                                <tr key={index}>
                                    <td>{test.title}</td>
                                    <td>
                                        {isEmpty(test.err) ? (
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
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(TestCase);