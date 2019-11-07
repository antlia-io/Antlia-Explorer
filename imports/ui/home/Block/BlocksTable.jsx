import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import HeaderRecord from './HeaderRecord.jsx';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import Blocks from './ListContainer.js'
import { LoadMore } from '../../components/LoadMore.jsx';
// import { Route, Switch } from 'react-router-dom';
// import Sidebar from "react-sidebar";
// import Block from './BlockContainer.js';
// import Blockcomp from '../home/Block/Blocks.js'
// import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
// import SideNav, { NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const T = i18n.createComponent();
export default class BlocksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: Meteor.settings.public.initialPageSize,
            // sidebarOpen: (props.location.pathname.split("/blocks/").length == 2)
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    };
    state = {
        selected: 'blocks',
        expanded: false
    };

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('block-table');
        if (this.isBottom(wrappedElement)) {
            // console.log('header bottom reached');
            document.removeEventListener('scroll', this.trackScrolling);
            this.setState({ loadmore: true });
            this.setState({
                limit: this.state.limit + 10
            }, (err, result) => {
                if (!err) {
                    document.addEventListener('scroll', this.trackScrolling);
                }
                if (result) {
                    this.setState({ loadmore: false });
                }
            })
        }
    };

    // componentDidUpdate(prevProps){
    //     if (this.props.location.pathname != prevProps.location.pathname){
    //         this.setState({
    //             sidebarOpen: (this.props.location.pathname.split("/blocks/").length == 2)
    //         })
    //     }
    // };

    onSetSidebarOpen(open) {
        // console.log(open);
        this.setState({ sidebarOpen: open }, (error, result) => {
            let timer = Meteor.setTimeout(() => {
                if (!open) {
                    this.props.history.push('/blocks');
                }
                Meteor.clearTimeout(timer);
            }, 500)
        });
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render() {
        const { expanded, selected } = this.state;
        return (

            <div>
                <Helmet>
                    <title>Latest Blocks on Color Explorer | Color</title>
                    <meta name="description" content="Latest blocks committed by validators on Color Explorer" />
                </Helmet>


                <Card>
                    <div className="blocks">
                        <div className="header">
                            <h4>Blocks</h4>
                            <Link to="#">View All Blocks</Link>
                        </div>
                        <Row>
                            <Col lg={12}>
                                <ScrollArea className="block-list">
                                    <Blocks limit={this.state.limit} />
                                </ScrollArea>
                            </Col>
                        </Row>
                        {/* <Blockcomp limit={this.state.limit} /> */}
                        {/* </Container> */}
                        <LoadMore show={this.state.loadmore} />
                    </div>
                </Card>
            </div>


        )
    }
}
