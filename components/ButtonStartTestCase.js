import {Button} from "react-bootstrap";

class ButtonStartTestCase extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isLoading: false
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            isLoading: !nextProps.completed
        });
    }

    handleClick() {
        this.setState({
            isLoading: true
        });

        this.props.onClick(this.props.type);
    }

    render() {
        const {isLoading} = this.state;

        return (
            <Button bsStyle="warning"
                    disabled={isLoading}
                    onClick={!isLoading ? this.handleClick : null}>
                {isLoading ? 'Loading...' : 'Start'}
            </Button>
        );
    }
}

export default ButtonStartTestCase;