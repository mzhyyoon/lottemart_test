import Search from "./ui/Search";
import Logo from "./ui/Logo";
import User from "./ui/User";
import FullScreen from "./ui/FullScreen";
import Email from "./ui/Email";

const NavBarContainer = () => (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <Logo type="lottemart"/>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <Search/>
            <ul className="navbar-nav navbar-nav-right">
                <User/>
                <FullScreen/>
                <Email/>
            </ul>
        </div>
    </nav>
);

export default NavBarContainer;