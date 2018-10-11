import LayoutNoNavBar from "../components/LayoutNoNavBar";
import Link from "next/link";
import 'isomorphic-unfetch';

class Logout extends React.Component {
    async componentWillMount() {
        fetch('/api/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        });
    }
    render () {
        return (
            <LayoutNoNavBar>
                <div className={"container-scroller"}>
                    <div className={"container-fluid page-body-wrapper full-page-wrapper"}>
                        <div className={"content-wrapper d-flex align-items-center auth"}>
                            <div className={"row w-100"}>
                                <div className={"col-lg-4 mx-auto"}>
                                    <div className={"auth-form-light text-left p-5"}>
                                        <div className={"brand-logo text-center"}>
                                            <img src={"/static/images/logo_v1.png"}
                                                 alt={"megazone testser."}/>
                                        </div>
                                        <h6 className={"font-weight-light"}>You have successfully logged out.</h6>
                                        <Link href={"/signin"}>
                                            <a>Signin</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutNoNavBar>
        );
    }
};

export default Logout;