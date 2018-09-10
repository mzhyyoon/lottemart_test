import NavBar from './NavBar';
import Head from 'next/head';
import {Col, Grid, Row} from "react-bootstrap";

const Layout = (props) => (
    <div>
        <Head>
            <title>Lottemart TDD - Test</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="/static/css/bootstrap.min.css" rel="stylesheet"/>
        </Head>
        <NavBar/>
        <Grid>
            <Row className="show-grid">
                <Col xs={18} md={12}>
                    {props.children}
                </Col>
            </Row>
        </Grid>
    </div>
);

export default Layout;