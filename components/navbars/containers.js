import Search from "./ui/Search";
import Logo from "./ui/Logo";
import User from "./ui/User";
import FullScreen from "./ui/FullScreen";
import Email from "./ui/Email";
import Notice from "./ui/Notice";
import SignOut from './ui/SignOut';

const NavBarContainer = () => (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <Logo type="lottemart"/>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <Search/>
            <ul className="navbar-nav navbar-nav-right">
                <User/>
                <FullScreen/>
                <Email/>
                <Notice/>
                <SignOut/>
            </ul>
        </div>
    </nav>
);

export default NavBarContainer;