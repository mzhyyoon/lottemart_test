class Alert extends React.Component {
    render () {
        return (
            <div className={"alert alert-"+(this.props.type ? this.props.type : 'success')+" alert-dismissible" + (this.props.active ? ' fade show' : '')}
                 role={"alert"}>
                {this.props.message}
            </div>
        );
    }

}

export default Alert;