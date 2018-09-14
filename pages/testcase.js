import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from '../constants';
import moment from 'moment';
import isEmpty from '../assets/js/is-empty';

const TestCase = ({children, router, href, user, testcases, timestamps}) => {
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
                userId : user[0].id
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
                    timestamps={timestamps}
                    testcases={testcases} />
            </div>
        </Layout>
    );
};

TestCase.getInitialProps = async () => {
    const userResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/users/${encodeURIComponent('hyyoon')}`);
    const testcasesResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/testcases/${encodeURIComponent('hyyoon')}`);
    const timeStampResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/testcases/timestamps/${encodeURIComponent('hyyoon')}`);

    const userJSONData = await userResponse.json();
    const testcasesJSONData = await testcasesResponse.json();
    const timeStampJSONData = await timeStampResponse.json();

    return {
        user : userJSONData.user,
        testcases : testcasesJSONData.testcase,
        timestamps : timeStampJSONData.timestamp
    };
};

const RenderTestCase = ({testcases, timestamps, onStart}) => {
    if(isEmpty(testcases)) {
        return (
            <div>{C.messages.noResult}</div>
        )
    }

    const onChangeDate = () => {
        
    };

    return testcases.map((testcase, index) =>
        <div key={index} className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {testcase.type}
                            <div className="btn-group">
                                <div className="dropdown-menu" x-placement="bottom-start">
                                    <a className="dropdown-item">Go back</a>
                                    <a className="dropdown-item">Delete</a>
                                    <a className="dropdown-item">Swap</a>
                                </div>
                            </div>
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
                                Last Modify : <select onChange={onChangeDate}>
                                {timestamps.map((timestamp, index) =>
                                    <option key={index}
                                            value={timestamp}
                                            selected={timestamp === testcase.timestamp}>
                                        {moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}
                                    </option>)
                                })
                            </select>
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
                                        <td>
                                            {test.title}
                                        </td>
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