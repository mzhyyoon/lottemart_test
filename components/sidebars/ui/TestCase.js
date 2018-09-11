import Link from 'next/link';
import ActiveNav from '../../ActiveNav';

const TestCase = () => (
    <ActiveNav href={'/testcase'}>
        <Link href={'/testcase'}>
            <a className="nav-link">
                <span className="menu-title">TestCase</span>
                <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            </a>
        </Link>
    </ActiveNav>
);

export default TestCase;