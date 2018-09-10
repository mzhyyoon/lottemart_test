import Layout from '../components/Layout';
import ButtonStartTestCase from '../components/ButtonStartTestCase';
import fetch from 'isomorphic-unfetch';
import {
    PanelGroup,
    Panel,
    Badge,
    Label,
    PageHeader
} from 'react-bootstrap';
import isEmpty from '../assets/js/is-empty';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists : [{
                type: 'main',
                completed: false,
                name: 'Lottemart Main',
                results: {}
            }]
        };
    }

    startTestCase = async (type) => {
        //TODO call api server
        const res = await fetch(`https://api-tdd-test.herokuapp.com/${type}`);
        const json = await res.json();

        this.setState({
            lists : [Object.assign(
                {},
                ...this.state.lists
                ,
                {
                    type,
                    completed: true,
                    results: JSON.parse(json.result)
                }
            )]
        });
    };

    render() {
        const {lists} = this.state;

        console.log(lists);

        return (
            <Layout>
                <PageHeader>Test Case</PageHeader>
                <PanelGroup accordion id="ts1">
                {lists.map((item, index) =>
                    <Panel key={index}
                           eventKey={index+1}>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                {item.name} <Badge>{item.results.stats && item.results.stats.tests
                                ? item.results.stats.tests : 0}</Badge> <Label bsStyle={item.results.stats && item.results.stats.failures === 0
                                    ? 'success' : (item.results.stats && item.results.stats.failures > 0 ? 'warning' : 'default')}>
                                    {item.results.stats && item.results.stats.failures === 0
                                        ? 'success' : (item.results.stats && item.results.stats.failures > 0 ? 'warning' : 'default')}
                                </Label>
                            </Panel.Title>
                            <ButtonStartTestCase type={item.type}
                                                 completed={item.completed}
                                                 onClick={this.startTestCase}/>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            {item.results.tests && item.results.tests.map((test, index) =>
                                <div key={index}>
                                    <p>{test.title}</p> <Label bsStyle={isEmpty(test.err) ? 'success' : 'warning'}>{isEmpty(test.err) ? 'success' : 'warning'}</Label>
                                </div>
                            )}
                        </Panel.Body>
                    </Panel>
                )}
                </PanelGroup>
            </Layout>
        )
    }
};