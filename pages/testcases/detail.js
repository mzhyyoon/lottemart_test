import Layout from "../../components/Layout";
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import Link from "next/link";
import C from "../../constants";
import moment from 'moment';
import isEmpty from "../../assets/js/is-empty";

const TestCasesDetail = (
    {
        children,
        router,
        href,
        user,
        testcases,
        type
    }) => {
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
            </div>
        </Layout>
    )
};

const RenderDetail = ({testcases, type}) => {
    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {type}
                        </h4>
                        <ul className="list-arrow">
                        {testcases.map((testcase, index) =>
                            <li key={index}>
                                <em className="font-weight-bold text-muted small">
                                    Date : {moment(testcase.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                                </em>
                                <table className="table table-hover">
                                    <thead>
                                        <tr class="table-info">
                                            <th>Describe</th>
                                            <th>Date</th>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {testcase.result.tests.length === 0 ? testcase.result.failures.map((errors, index) =>
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
                                            <td>{moment(testcase.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                                            <td>
                                                <span className="text-danger">Fail</span>
                                            </td>
                                        </tr>
                                    ) : testcase.result.tests.map((test, index) =>
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
                                            <td>{moment(testcase.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
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

TestCasesDetail.getInitialProps = async ({req, query}) => {
    let type = req ? req.query.type : query.type;
    const userResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/users/${encodeURIComponent('hyyoon')}`);
    const testcasesResponse = await fetch(`${C.hosts.api[process.env.NODE_ENV]}/testcases/${encodeURIComponent('hyyoon')}?type=${type}`);

    const userJSONData = await userResponse.json();
    const testcasesJSONData = await testcasesResponse.json();

    return {
        user : userJSONData.user,
        testcases : testcasesJSONData.testcase,
        type
    };
};

export default withRouter(TestCasesDetail);