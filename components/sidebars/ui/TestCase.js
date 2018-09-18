import Link from 'next/link';
import ActiveNav from '../../ActiveNav';

const TestCase = () => {
    return (
        <ActiveNav href={'/testcases'}>
            <Link href='/testcases'>
                <a className="nav-link">
                    <span className="menu-title">TestCase</span>
                    <i className="mdi mdi-playlist-check menu-icon"></i>
                </a>
            </Link>
        </ActiveNav>
    );
};

export default TestCase;