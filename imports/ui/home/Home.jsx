import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ChainStatus from './ChainStatus/ChainStatusContainer.js'
import Consensus from './ConsensusContainer.js';
// import TopValidators from './TopValidatorsContainer.js';
import RandomStatus from './RandomStatus/RandomStatus'
import Blocks from './Block/BlocksTable.jsx'
// import Blocks from './Block/Blocks.js'
import Transactions from './Transactions'
// import Chart from './ChartContainer.js';
// import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from "react-helmet";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// import MainSideMenu from '../components/MainSideMenu.js'
// import PieChart from './PieChart.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chainStopped: false
        }
    };
    state = {
        selected: 'dashboard',
        expanded: false
    };

    componentDidUpdate(prevProps) {
        if (prevProps.consensus != this.props.consensus) {
            if (this.props.consensus.latestBlockTime) {
                let lastSync = moment(this.props.consensus.latestBlockTime);
                let current = moment();
                let diff = current.diff(lastSync);
                if (diff > 60000) {
                    this.setState({
                        chainStopped: true
                    })
                }
                else {
                    this.setState({
                        chainStopped: false
                    })
                }
            }
        }
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
                <div id="home" style={{
                    marginLeft: expanded ? 200 : 64,
                    padding: '15px 20px 0 20px'
                }}>
                    <Helmet>
                        <title>Antlia | Explorer</title>
                        <meta name="description" content="Antlia is a decentralized network of independent parallel blockchains, each powered by BFT consensus algorithms like Prism consensus." />
                    </Helmet>
                    <Row>
                        <Col md={12} xs={12} className="topbar">
                            <h1 className="d-none d-lg-block">{Meteor.settings.public.chainName}</h1>
                            <div className="validatordetails">
                                <Consensus />
                            </div>
                        </Col>
                        {/* <Col md={9} xs={12} className="text-md-right"><ChainStates /></Col> */}
                    </Row>
                    {(this.state.chainStopped) ? <Card body inverse color="danger">
                        <span><T _purify={false} time={moment(this.props.consensus.latestBlockTime).fromNow(true)}>chainStatus.stopWarning</T></span>
                    </Card> : ''}
                    <Row>
                        <Col lg={6} md={12}>
                            <ChainStatus/>
                        </Col>
                        <Col lg={6} md={12}>
                            <RandomStatus />

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5} md={12}>
                            <Blocks/>
                        </Col>
                        <Col lg={7} md={12}>
                        <Transactions/>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col md={6}>
                            <TopValidators />
                        </Col>
                        <Col md={6}>
                            <PieChart />
                        </Col>
                    </Row> */}

                </div>

                {/* <MainSideMenu/> */}
                <SideNav className="sidenav position-fixed" onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav selected={selected} defaultSelected="dashboard">
                        <NavItem title="Explorer">
                            <NavIcon>
                            <i className="fa fa-fw fa-angle-right" />
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