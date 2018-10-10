import Layout from '../components/Layout';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import C from '../constants';
import moment from 'moment';
import isEmpty from '../assets/js/is-empty';
import Link from 'next/link';
import getHost from "../assets/js/get-hosts";
import Authorization from "../components/utils/Authorization";

class TestCases extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            testcase : []
        };
    }

    async componentDidMount() {
        const {router} = this.props;

        const response = await fetch(`${getHost('page', process.env.NODE_ENV)}/api/testcase/${this.props.user[0].id}`,{
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if(response.status === 500) {
            this.setState({
                ...this.state,
                fetching: false
            });

            router.push('/testcases');
            return;
        }

        const testcase = await response.json();

        this.setState({
            ...this.state,
            testcase,
            fetching : false
        });
    }

    onStart = async (id, type) => {
        const {router} = this.props;
        this.setState({
            ...this.state,
            fetching: true
        });

        const response = await fetch(`${getHost('page', process.env.NODE_ENV)}/api/testcase`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                type
            })
        });

        if(response.status !== 200) {
            this.setState({
                ...this.state,
                fetching: false
            });
            router.push('/testcases');
            return;
        }

        const testcase = await response.json();


        this.setState({
            testcase,
            fetching: false
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
                        fetching={this.state.fetching}
                        onStart={this.onStart}
                        testcase={testcase}/>
                </div>
            </Layout>
        );
    }
};

const RenderTestCase = ({testcase, fetching, onStart}) => {
    if(isEmpty(testcase) && !fetching) {
        return (
            <div>
                {C.messages.noResult}
            </div>
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

export default Authorization(withRouter(TestCases));