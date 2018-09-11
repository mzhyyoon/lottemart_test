import Link from "next/link";

const SignOut = () =>
    <li className="nav-item nav-logout d-none d-lg-block">
        <Link href="/singout">
            <a className="nav-link">
                <i className="mdi mdi-power"></i>
            </a>
        </Link>
    </li>;

export default SignOut;