import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Row, Col } from 'reactstrap';
import HeaderRecord from './HeaderRecord.jsx';
import Blocks from '/imports/ui/blocks/ListContainer.js'
import { LoadMore } from '../components/LoadMore.jsx';
import { Route, Switch } from 'react-router-dom';
import Sidebar from "react-sidebar";
import Block from './BlockContainer.js'
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import SideNav, { NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const T = i18n.createComponent();
export default class BlocksTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit: Meteor.settings.public.initialPageSize,
            sidebarOpen: (props.location.pathname.split("/blocks/").length == 2)
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
            this.setState({loadmore:true});
            this.setState({
                limit: this.state.limit+10
            }, (err, result) => {
                if (!err){
                    document.addEventListener('scroll', this.trackScrolling);
                }
                if (result){
                    this.setState({loadmore:false});
                }
            })
        }
    };

    componentDidUpdate(prevProps){
        if (this.props.location.pathname != prevProps.location.pathname){
            this.setState({
                sidebarOpen: (this.props.location.pathname.split("/blocks/").length == 2)
            })
        }
    };

    onSetSidebarOpen(open) {
        // console.log(open);
        this.setState({ sidebarOpen: open }, (error, result) =>{
            let timer = Meteor.setTimeout(() => {
                if (!open){
                    this.props.history.push('/blocks');
                }
                Meteor.clearTimeout(timer);
            },500)
        }); 
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render(){
        const { expanded, selected } = this.state;
        return (
        <div>
            <div id="blockstable" style={{
                        marginLeft: expanded ? 200 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
            <Helmet>
                <title>Latest Blocks on Color Explorer | Color</title>
                <meta name="description" content="Latest blocks committed by validators on Color Explorer" />
            </Helmet>
            <div className="topbar">
                            <h1><T>blocks.block</T></h1>
                            <div className="chainstate">
                                <ChainStates />
                            </div>
                        </div>
            <Switch>
                <Route path="/blocks/:blockId" render={(props)=> <Sidebar 
                    sidebar={<Block {...props} />}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { 
                        background: "white", 
                        position: "fixed",
                        width: '85%',
                        zIndex: 4
                    }, overlay:{
                        zIndex: 3
                    } }}
                >
                </Sidebar>} />
            </Switch>
            <Card>
            <Container fluid id="block-table">
                <HeaderRecord />
                <Blocks limit={this.state.limit} />
            </Container>
            <LoadMore show={this.state.loadmore} />
            </Card>
            </div>
            <SideNav className="sidenav position-fixed" onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav selected={selected} defaultSelected="blocks">
                        <NavItem title="Explorer">
                            <NavIcon>
                            <i className="fa fa-fw fa-tv" />
                            </NavIcon>
                            <NavText>
                            Explorer
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="dashboard" onClick={e => this.props.history.push("/")} title="Dashboard">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" />
                            </NavIcon>
                            <NavText>
                                Dashboard
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="validators" onClick={e => this.props.history.push("/validators")} title="Validators">
                            <NavIcon>
                                <i className="fa fa-fw fa-spinner" />
                            </NavIcon>
                            <NavText>
                                Validators
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="blocks" onClick={e => this.props.history.push("/blocks")} title="Blocks">
                            <NavIcon>
                                <i className="fa fa-fw fa-cube" />
                            </NavIcon>
                            <NavText>
                                Blocks
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="transactions" onClick={e => this.props.history.push("/transactions")} title="Transactions">
                            <NavIcon>
                                <i className="fa fa-fw fa-random" />
                            </NavIcon>
                            <NavText>
                                Transactions
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="proposals" onClick={e => this.props.history.push("/proposals")} title="Proposals">
                            <NavIcon>
                                <i className="fa fa-fw fa-edit" />
                            </NavIcon>
                            <NavText>
                                Proposals
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="voting-power-distribution" onClick={e => this.props.history.push("/voting-power-distribution")} title="Voting Power">
                            <NavIcon>
                                <i className="fa fa-fw fa-chart-bar" />
                            </NavIcon>
                            <NavText>
                                Voting Power
                        </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </div>
            )
    }
}
