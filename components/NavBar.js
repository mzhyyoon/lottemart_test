import {withRouter} from 'next/router';
import {
    Nav,
    NavItem,
    Navbar
} from 'react-bootstrap';

class NavBar extends React.Component {
    render() {
        const {router} = this.props;

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand onClick={() => router.push('/')}>
                        Home
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
};

export default withRouter(NavBar);