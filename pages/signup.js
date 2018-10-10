import Link from 'next/link';
import 'isomorphic-unfetch';
import {withRouter} from 'next/router';
import LayoutNoNav from '../components/LayoutNoNavBar';

const REGEXP_PASSWORD = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id : {
                valid : null,
                value : ''
            },
            email : {
              valid : null,
              value : ''
            },
            password : {
                valid : null,
                value : ''
            },
            agree : {
                valid : null,
                value : false
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if((nextState.id.valid !== this.state.id.valid)
            || (nextState.id.value !== this.state.id.value)) {
            return true;
        }
        if((nextState.email.valid !== this.state.email.valid)
            || (nextState.email.value !== this.state.email.value)) {
            return true;
        }
        if((nextState.password.valid !== this.state.password.valid)
            || (nextState.password.value !== this.state.password.value)) {
            return true;
        }
        if((nextState.agree.valid !== this.state.agree.valid)
            || (nextState.agree.value !== this.state.agree.value)) {
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

    onSubmit = async ($form) => {
        const id = $form.id.value;
        const email = $form.email.value;
        const password = $form.password.value;
        const agree = $form.agree.checked;
        const {router} = this.props;

        if(!agree) {
            this.setState({
                agree: {
                    ...this.state.agree,
                    valid: false
                }
            });
            return;
        }

        if(!REGEXP_PASSWORD.test(password)) {
            this.setState({
                password: {
                    ...this.state.password,
                    valid: false
                }
            });
            return;
        }

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: encodeURIComponent(id),
                email: encodeURIComponent(email),
                password: encodeURIComponent(password)
            })
        });

        const statusCode = await res.status;

        if(statusCode === 200) {
            router.replace('/');
        } else {
            router.replace(`/${status}`);
        }
    };

    render() {
        const {
            id,
            email,
            password,
            agree
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
                                        <div className={"brand-logo"}>
                                            <img src={"/static/images/logo_v1.png"}
                                                 alt={"megazone testser."}/>
                                        </div>
                                        <h4>New here?</h4>
                                        <h6 className={"font-weight-light"}>
                                            Signing up is easy. It only takes a few steps
                                        </h6>
                                        <form className={"pt-3"}
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            this.onSubmit(event.target);
                                        }}>
                                            <div className={"form-group"}>
                                                <input type={"text"}
                                                       name={"id"}
                                                       className={"form-control form-control-lg" + (id.valid === false ? ' error' : '')}
                                                       placeholder={"Username"}
                                                       onInvalid={(event) => event.preventDefault()}
                                                       onBlur={(event) => this.onBlur(event)}
                                                       onInput={(event) => {
                                                           this.setState({
                                                               id: {
                                                                   ...this.state.id,
                                                                   value: event.target.value
                                                               }
                                                           });
                                                       }}
                                                       value={id.value}
                                                       required/>
                                                <span className={"error-message text-danger" + (id.valid === false ? ' active' : '')}>
                                                    Please check your id.
                                                </span>
                                            </div>
                                            <div className={"form-group"}>
                                                <input type={"email"}
                                                       name={"email"}
                                                       className={"form-control form-control-lg" + (email.valid === false ? ' error' : '')}
                                                       placeholder={"Email"}
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
                                            <div className={"mb-4"}>
                                                <div className={"form-check"}>
                                                    <label className={"form-check-label text-muted"}>
                                                        <input type={"checkbox"}
                                                               name={"agree"}
                                                               className={"form-check-input"}
                                                               onInvalid={(event) => event.preventDefault()}
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       agree: {
                                                                           ...agree,
                                                                           value: event.target.checked
                                                                       }
                                                                   });
                                                               }}
                                                               checked={agree.value}/>
                                                        I agree to all Terms & Conditions
                                                        <i className={"input-helper"}></i>
                                                    </label>
                                                    <span className={"error-message text-danger" + (agree.valid === false ? ' active' : '')}>
                                                        Please checked.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={"mt-3"}>
                                                <button type={"submit"}
                                                        className={"btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"}>
                                                    SIGN UP
                                                </button>
                                            </div>
                                            <div className={"text-center mt-4 font-weight-light"}>
                                                Already have an account?
                                                <Link href={"/signin"}>
                                                    <a className={"text-primary"}> Login</a>
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
}


export default withRouter(Signup);