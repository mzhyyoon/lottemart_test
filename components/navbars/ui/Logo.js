import Link from 'next/link';
import C from '../../../constants';

const Logo = ({type}) => (
    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link href="/">
            <a className="navbar-brand brand-logo">
                <img src={C.logo[type].normal} alt="logo"/>
            </a>
        </Link>
        <Link href="/">
            <a className="navbar-brand brand-logo-mini">
                <img src={C.logo[type].small} alt="logo"/>
            </a>
        </Link>
    </div>
);

export default Logo;