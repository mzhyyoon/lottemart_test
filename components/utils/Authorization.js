import Cookies from "js-cookie";
import getHost from "../../assets/js/get-hosts";

const Authorization = (WrapComponent) => {
    return class Component extends React.Component {
        static async getInitialProps({req, query}) {
            let uuid;

            if(req && req.cookies) {
                uuid = req.cookies.uuid;
            } else {
                uuid = Cookies.get('uuid');
            }

            const response = await fetch(`${getHost('page', process.env.NODE_ENV)}/api/user/${uuid}`, {
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if(response.status === 401) {
                window.location.replace('/signin');
                return;
            }

            const data = await response.json();

            const params = req ? {...req.query} : {...query};

            return {
                user : [data],
                params
            }
        }
        constructor(props) {
            super(props);
        }
        render() {
            return <WrapComponent user={this.props.user}
                                  {...this.props.params}/>
        }
    };
};

export default Authorization;