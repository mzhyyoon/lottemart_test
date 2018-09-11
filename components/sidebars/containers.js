import Profile from "./ui/Profile";
import Home from "./ui/Home";
import TestCase from "./ui/TestCase";

const SideBarContainer = () => (
    <div className="container-fluid page-body-wrapper">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <Profile/>
                <Home/>
                <TestCase/>
            </ul>
        </nav>
    </div>
);

export default SideBarContainer;