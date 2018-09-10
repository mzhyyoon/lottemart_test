import Layout from '../components/Layout';
import Link from 'next/link';
import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

export default () => (
    <div>
        <Layout>
            <ListGroup>
                <ListGroupItem>
                    <Link href="/testcase">
                        <a>Test Case</a>
                    </Link>
                </ListGroupItem>
            </ListGroup>
        </Layout>
    </div>
)