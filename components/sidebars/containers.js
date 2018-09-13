import Profile from "./ui/Profile";
import Home from "./ui/Home";
import TestCase from "./ui/TestCase";

const SideBarContainer = ({user}) => (
    <div className="container-fluid page-body-wrapper">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <Profile user={user}/>
                <Home/>
                <TestCase/>
            </ul>
        </nav>
    </div>
);

export default SideBarContainer;