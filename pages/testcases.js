import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from '../constants';
import moment from 'moment';
import isEmpty from '../assets/js/is-empty';
import Link from 'next/link';

class TestCases extends React.Component {
    static async getInitialProps () {
        const userResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/users/${encodeURIComponent('hyyoon')}`);
        const testcasesResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/testcases/${encodeURIComponent('hyyoon')}`);

        const userJSONData = await userResponse.json();
        const testcasesJSONData = await testcasesResponse.json();

        return {
            user : userJSONData.user,
            testcases : testcasesJSONData.testcase
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            fetching: false
        };
    }

    onStart = (id, type) => {
        const {
            user,
            router
        } = this.props;

        this.setState({
            fetching: true
        });

        fetch(`${C.hosts.api[process.env.NODE_ENV]}/testcases`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                type,
                userId: user[0].id
            })
        }).then(() => {
            this.setState({
                fetching: false
            });
            router.push('/testcases');
        });
    };

    render() {
        const {
            user,
            testcases
        } = this.props;


        const {
            fetching
        } = this.state;

        return (
            <Layout user={user} fetching={fetching}>
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
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/">
                                                <a>Home</a>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Test Case
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <RenderTestCase
                        onStart={this.onStart}
                        testcases={testcases}/>
                </div>
            </Layout>
        );
    }
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
                            <Link href={{pathname : `/testcases/detail`, query : {type :testcase.type} }}>
                                {testcase.type}
                            </Link>
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
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Describe</th>
                                <th>Date</th>
                                <th>Result</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isEmpty(testcase.result) ? (
                                <tr>
                                    <td colSpan={3}>{C.messages.noResult}</td>
                                </tr>
                            ) : (testcase.result.tests.length === 0  ? testcase.result.failures.map((errors, index) =>
                                    <tr key={index}>
                                        <td>{errors.fullTitle}</td>
                                        <td>
                                            {moment(testcase.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                Fail
                                            </span>
                                        </td>
                                    </tr>
                                    ):
                                (testcase.result.tests.map((test, index) =>
                                    <tr key={index}>
                                        <td>
                                            {test.title}
                                        </td>
                                        <td>
                                            {moment(testcase.timestamp).format('YYYY-MM-DD HH:mm:ss')}
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

export default withRouter(TestCases);