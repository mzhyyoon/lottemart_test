import Search from "./ui/Search";
import Logo from "./ui/Logo";
import User from "./ui/User";
import FullScreen from "./ui/FullScreen";
import Email from "./ui/Email";
import Notice from "./ui/Notice";
import LogOut from './ui/LogOut';

const NavBarContainer = ({user}) => (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <Logo/>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <Search/>
            <ul className="navbar-nav navbar-nav-right">
                <User user={user}/>
                <FullScreen/>
                <Email/>
                <Notice/>
                <LogOut/>
            </ul>
        </div>
    </nav>
);

export default NavBarContainer;