import Cookies from "js-cookie";

const Authorization = (WrapComponent) => {
    return class Component extends React.Component {
        static async getInitialProps({req, query}) {
            let uuid;

            if(req && req.cookies) {
                uuid = req.cookies.uuid;
            } else {
                uuid = Cookies.get('uuid');
            }

            const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';

            const response = await fetch(`${baseUrl}/api/user/${uuid}`, {
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