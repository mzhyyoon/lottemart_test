import Link from 'next/link';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import LayoutNoNav from '../components/LayoutNoNavBar';

class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email : {
                valid : null,
                value : ''
            },
            password : {
                valid : null,
                value : ''
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if((nextState.email.valid !== this.state.email.valid)
            || (nextState.email.value !== this.state.email.value)) {
            return true;
        }
        if((nextState.password.valid !== this.state.password.valid)
            || (nextState.password.value !== this.state.password.value)) {
            return true;
        }
        return false;
    }

    onBlur = (event) => {
        const name = event.target.name;

        this.setState({
            [name]: {
                ...this.state[name],
                valid: event.target.checkValidity()
            }
        });
    };

    onSubmit = ($form) => {
        const email = $form.email.value;
        const password = $form.password.value;

        fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: encodeURIComponent(email),
                password: encodeURIComponent(password)
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            if(!data.success) {
                window.alert(data.errors.message);
                return;
            }

            this.props.router.replace('/');
        });
    };

    render () {
        const {
            email,
            password
        } = this.state;

        return (
            <LayoutNoNav>
                <div className={"container-scroller"}>
                    <style jsx>{`
                    input.error {
                        border-color: #900;
                        background-color: #FDD;
                    }
                    span.error-message {
                        height:10px;
                        visibility : hidden;
                    }
                    span.error-message.active {
                        visibility : visible;
                    }
                `}</style>
                    <div className={"container-fluid page-body-wrapper full-page-wrapper"}>
                        <div className={"content-wrapper d-flex align-items-center auth"}>
                            <div className={"row w-100"}>
                                <div className={"col-lg-4 mx-auto"}>
                                    <div className={"auth-form-light text-left p-5"}>
                                        <div className={"brand-logo text-center"}>
                                            <img src={"/static/images/logo_v1.png"}
                                                 alt={"megazone testser."}/>
                                        </div>
                                        <h6 className={"font-weight-light"}>Sign in to Megazone Tester</h6>
                                        <form id={"frmSignin"}
                                              className={"pt-3"}
                                              onSubmit={(event) => {
                                                  event.preventDefault();
                                                  this.onSubmit(event.target);
                                              }}>
                                            <div className={"form-group"}>
                                                <input type={"email"}
                                                       name={"email"}
                                                       className={"form-control from-control-lg" + (email.valid === false ? ' error' : '')}
                                                       placeholder={"email address"}
                                                       onInvalid={(event) => event.preventDefault()}
                                                       onBlur={(event) => this.onBlur(event)}
                                                       onInput={(event) => {
                                                           this.setState({
                                                               email: {
                                                                   ...this.state.email,
                                                                   value: event.target.value
                                                               }
                                                           });
                                                       }}
                                                       value={email.value}
                                                       required/>
                                                <span className={"error-message text-danger" + (email.valid === false ? ' active' : '')}>
                                                    Please check your email.
                                                </span>
                                            </div>
                                            <div className={"form-group"}>
                                                <input type={"password"}
                                                       name={"password"}
                                                       className={"form-control form-control-lg"+ (password.valid === false ? ' error' : '')}
                                                       placeholder={"Password"}
                                                       onInvalid={(event) => event.preventDefault()}
                                                       onBlur={(event) => this.onBlur(event)}
                                                       onInput={(event) => {
                                                           this.setState({
                                                               password: {
                                                                   ...this.state.password,
                                                                   value: event.target.value
                                                               }
                                                           });
                                                       }}
                                                       value={password.value}
                                                       required/>
                                                <span className={"error-message text-danger" + (password.valid === false ? ' active' : '')}>
                                                    Please check your password.
                                                </span>
                                            </div>
                                            <div className={"mt-3"}>
                                                <button type={"submit"}
                                                        className={"btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"}>
                                                    SIGN IN
                                                </button>
                                            </div>
                                            <div className={"my-2 d-flex justify-content-between align-items-center"}>
                                                <div className={"font-weight-light"}>
                                                    Don't have an account? <Link href={"/signup"}><a>Create</a></Link>
                                                </div>
                                                <Link href={"/password_reset"}>
                                                    <a className={"auth-link font-weight-light text-black"}>
                                                        Forgot password?
                                                    </a>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutNoNav>
        );
    }
};

export default withRouter(Signin);