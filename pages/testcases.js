import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from '../constants';
import moment from 'moment';
import isEmpty from '../assets/js/is-empty';
import Link from 'next/link';
import Cookies from "js-cookie";
import getHost from "../assets/js/get-hosts";

class TestCases extends React.Component {
    static async getInitialProps ({req}) {
        let uuid;

        if(req && req.cookies) {
            uuid = req.cookies.uuid;
        } else {
            uuid = Cookies.get('uuid');
        }

        const userResponse = await fetch(`${getHost('page', process.env.NODE_ENV)}/api/user/${uuid}`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const userJSONData = await userResponse.json();

        return {
            user : [userJSONData]
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            testcase : []
        };
    }

    async componentDidMount() {
        const response = await fetch(`${getHost('page', process.env.NODE_ENV)}/api/testcase/${this.props.user[0].id}`,{
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const jsonData = await response.json();

        this.setState({
            ...this.state,
            testcase: jsonData.data.testcase
        });
    }

    onStart = (id, type) => {
        const {
            router
        } = this.props;

        this.setState({
            ...this.state,
            fetching: true
        });

        fetch(`${getHost('page', process.env.NODE_ENV)}/api/testcase`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                type
            })
        }).then(() => {
            this.setState({
                ...this.state,
                fetching: false
            });
            router.push('/testcases');
        }).catch(() => {
            this.setState({
                ...this.state,
                fetching: false
            });
            router.push('/testcases');
        });
    };

    render() {
        const {
            user
        } = this.props;

        const {
            fetching,
            testcase
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
                        testcase={testcase}/>
                </div>
            </Layout>
        );
    }
};

const RenderTestCase = ({testcase, onStart}) => {
    if(isEmpty(testcase)) {
        return (
            <div>{C.messages.noResult}</div>
        )
    }

    return testcase.map((tc, index) =>
        <div key={index} className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <Link href={{pathname : `/testcases/detail`, query : {type :tc.type} }}>
                                <a>{tc.type}</a>
                            </Link>
                            <button type="button"
                                    className="btn btn-inverse-primary btn-rounded btn-icon float-right"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onStart(
                                            tc.id,
                                            tc.type.toLowerCase()
                                        );
                                    }}>
                                <i className="mdi mdi-arrow-right-drop-circle-outline"></i>
                            </button>
                        </h4>
                        {tc.timestamp &&
                        <p className="card-description">
                            <em className="text-muted small">
                                Last Modify : {moment(tc.timestamp).format('YYYY-MM-DD HH:mm:ss')}
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
                            {isEmpty(tc.result) ? (
                                <tr>
                                    <td colSpan={3}>{C.messages.noResult}</td>
                                </tr>
                            ) : (tc.result.tests.length === 0  ? tc.result.failures.map((errors, index) =>
                                    <tr key={index}>
                                        <td>{errors.fullTitle}</td>
                                        <td>
                                            {moment(tc.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                Fail
                                            </span>
                                        </td>
                                    </tr>
                                    ):
                                (tc.result.tests.map((test, index) =>
                                    <tr key={index}>
                                        <td>
                                            {test.title}
                                        </td>
                                        <td>
                                            {moment(tc.timestamp).format('YYYY-MM-DD HH:mm:ss')}
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