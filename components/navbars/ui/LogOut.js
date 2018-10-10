import Link from "next/link";

const LogOut = () =>
    <li className="nav-item nav-logout d-none d-lg-block">
        <Link href="/logout">
            <a className="nav-link">
                <i className="mdi mdi-power"></i>
            </a>
        </Link>
    </li>;

export default LogOut;