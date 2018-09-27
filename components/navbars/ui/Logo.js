import Link from 'next/link';
import C from '../../../constants';

const Logo = () => (
    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link href="/">
            <a className="navbar-brand brand-logo">
                <style jsx>{`
                    img {
                        height:100% !important
                    }
                `}
                </style>
                <img src="/static/images/logo_v1.1.png" alt="logo"/>
            </a>
        </Link>
        <Link href="/">
            <a className="navbar-brand brand-logo-mini">
                <img src="/static/images/logo_v1.1.png" alt="logo"/>
            </a>
        </Link>
    </div>
);

export default Logo;