import Link from 'next/link';
import ActiveNav from '../../ActiveNav';

const Home = () => {
    return (
        <ActiveNav href={"/"}>
            <Link href="/">
                <a className="nav-link">
                    <span className="menu-title">Home</span>
                    <i className="mdi mdi-home menu-icon"></i>
                </a>
            </Link>
        </ActiveNav>
    );
};

export default Home;