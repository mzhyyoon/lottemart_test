import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import {
    Grid,
    Col,
    Row
} from 'react-bootstrap';

export default class extends React.Component {
    static async getInitialProps() {
        const res = await fetch('http://localhost:3000/main/tc');
        const data = await res.json();

        return {
            result : JSON.parse(data.result)
        };
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Head>
                    <link href="/static/css/bootstrap.min.css" rel="stylesheet"/>
                </Head>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={8}>
                            stats.suites : {this.props.result.stats.suites}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}