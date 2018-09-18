import Link from 'next/link';
import ActiveNav from '../../ActiveNav';

const Home = () => {
    return (
        <ActiveNav href={"/home"}>
            <Link href="/">
                <a className="nav-link">
                    <span className="menu-title">Home</span>
                    <i className="mdi mdi-view-dashboard menu-icon"></i>
                </a>
            </Link>
        </ActiveNav>
    );
};

export default Home;