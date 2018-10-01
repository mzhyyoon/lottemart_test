import Layout from "../../components/Layout";
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import Link from "next/link";
import moment from 'moment';
import isEmpty from "../../assets/js/is-empty";
import Cookies from "js-cookie";
import getHost from "../../assets/js/get-hosts";

const PER_PAGE = 10;

class TestCasesDetail extends React.Component {
    static async getInitialProps ({req, query}) {
        let type = req ? req.query.type : query.type;
        let page = req ? req.query.page : query.page;
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
            user : [data],
            type,
            page
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            testcases: [],
            totalCount : 0,
            page: this.props.page || 1,
            fetching : false
        };
    }

    async componentDidMount() {
        const {
            user,
            type,
            page
        } = this.props;

        const response = await fetch(
            `${getHost('page', process.env.NODE_ENV)}/api/testcases/${user[0].id}/${type}/${page || 1}/${PER_PAGE}`
        );

        const responseJSON = await response.json();
        const {totalCount, testcase} = responseJSON.data;

        this.setState({
            ...this.state,
            totalCount,
            testcases : testcase
        });
    }

    onGetList = (id, type, page = 1) => {
        if(!page){
            return;
        }

        page = page + 1;

        this.setState({
            fetching: true
        });

        fetch(
            `${getHost('page', process.env.NODE_ENV)}/api/testcases/${id}/${type}/${page}/${PER_PAGE}`
        ).then((res) => res.json())
            .then((responseJSON) => {
                this.setState({
                    page,
                    fetching : false,
                    testcases: [
                        ...this.state.testcases,
                        ...responseJSON.data.testcase
                    ]
                });
            })
    };

    render() {
        const {
            user,
            type
        } = this.props;

        const {
            testcases,
            totalCount,
            page,
            fetching
        } = this.state;

        const currentPage = Number(page);

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
                                    Test Case - {type}
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/">
                                                <a>Home</a>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link href="/testcases">
                                                <a>Test Case</a>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Detail
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <RenderDetail testcases={testcases}
                                  type={type}/>
                    <div className="row">
                        <div className="col-12 text-center">
                            <button onClick={(event) => {
                                event.preventDefault();
                                this.onGetList(user[0].id, type, currentPage);
                            }}
                                    disabled={(currentPage * PER_PAGE >= totalCount) || fetching}
                                    type="button"
                                    className={"btn btn-gradient-primary btn-rounded btn-fw btn-lg " + (currentPage * PER_PAGE >= totalCount ? 'disabled' : '')}>
                                {currentPage * PER_PAGE >= totalCount ? totalCount : currentPage * PER_PAGE} / {totalCount}
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
};

const RenderDetail = ({testcases, type}) => {
    if(!testcases) {
        return null;
    }
    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {type}
                        </h4>
                        <ul className="list-arrow">
                        {testcases.map((tc, index) =>
                            <li key={index}>
                                <em className="font-weight-bold text-muted small">
                                    Date : {moment(tc.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                                </em>
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="table-info">
                                            <th>Describe</th>
                                            <th>Date</th>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tc.result.tests.length === 0 ? tc.result.failures.map((errors, index) =>
                                        <tr key={index}>
                                            <td>
                                                <h6>
                                                    {errors.fullTitle}
                                                    <div>
                                                        <hr/>
                                                        <ul className="list-star text-muted">
                                                            <li className="text-danger">{errors.err.message}</li>
                                                        </ul>
                                                    </div>
                                                </h6>
                                            </td>
                                            <td>{moment(tc.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                                            <td>
                                                <span className="text-danger">Fail</span>
                                            </td>
                                        </tr>
                                    ) : tc.result.tests.map((test, index) =>
                                        <tr key={index}>
                                            <td>
                                                <h6>
                                                    {test.title}
                                                </h6>
                                                <div>
                                                    <hr/>
                                                    <ul className="list-star text-muted">
                                                        <li>{test.fullTitle}</li>
                                                        {!isEmpty(test.err) &&
                                                            <li className="text-danger">{test.err.message}</li>
                                                        }
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>{moment(tc.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
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
                                    )}
                                    </tbody>
                                </table>
                            </li>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(TestCasesDetail);