import Profile from "./ui/Profile";

const SideBarContainer = () => (
    <div className="container-fluid page-body-wrapper">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <Profile/>
            </ul>
        </nav>
    </div>
);

export default SideBarContainer;