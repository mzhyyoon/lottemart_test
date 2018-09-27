import {withRouter} from 'next/router';
import LayoutNoNavBar from "../components/LayoutNoNavBar";

const PasswordReset = () => {
    return (
        <LayoutNoNavBar>
            <div>Password Reset</div>
        </LayoutNoNavBar>
    )
};

export default withRouter(PasswordReset);