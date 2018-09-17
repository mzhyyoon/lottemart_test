import Link from 'next/link';
import {withRouter} from 'next/router';
import LayoutNoNav from '../components/LayoutNoNavBar';
import 'isomorphic-unfetch';

const SignIn = ({router}) => {
    return (
        <LayoutNoNav>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left p-5">
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="font-weight-light">
                                        Sign in to continue.
                                    </h6>
                                    <RenderSignForm router={router}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutNoNav>
    );
};


class RenderSignForm extends React.Component {
    render() {
        return (
            <form className="pt-3"
                  method="post"
                  action="/signin"
                  id="frmSignIn">
                <div className="form-group">
                    <input type="email"
                           name="email"
                           className="form-control form-control-lg"
                           id="exampleInputEmail1"
                           placeholder="Username"/>
                </div>
                <div className="form-group">
                    <input type="password"
                           name="password"
                           className="form-control form-control-lg"
                           id="exampleInputPassword1"
                           placeholder="Password"/>
                </div>
                <div className="mt-3">
                    <button type="submit"
                            className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">
                        SIGN IN
                    </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                    <Link href="/signup">
                        <a className="text-primary">
                            Create
                        </a>
                    </Link>
                </div>
            </form>
        )
    }
}

export default withRouter(SignIn);