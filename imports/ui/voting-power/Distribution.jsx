import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import TwentyEighty from './TwentyEightyContainer.js';
import ThirtyFour from './ThirtyFourContainer.js';
import VotingPower from './VotingPowerContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const T = i18n.createComponent();

export default class Distribution extends Component {
    constructor(props) {
        super(props);
    };
    state = {
        selected: 'proposals',
        expanded: false
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
                <div id="voting-power-dist" style={{
                    marginLeft: expanded ? 200 : 64,
                    padding: '15px 20px 15px 20px'
                }}>
                    <Helmet>
                        <title>Voting Power Distribution on Color Explorer | Color</title>
                        <meta name="description" content="We would like to keep track how voting power are distributed over time among validators." />
                    </Helmet>
                    <div className="topbar">
                        <h1><T>votingPower.distribution</T></h1>
                        <div className="chainstate">
                            <ChainStates />
                        </div>
                    </div>
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            <TwentyEighty />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <ThirtyFour />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <VotingPower />
                        </Col>
                    </Row>
                </div>
                <SideNav className="sidenav position-fixed" onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav selected={selected} defaultSelected="voting-power-distribution">
                    <NavItem title="Explorer">
                            <NavIcon className="disabled">
                                <i className="fa fa-fw fa-th" />
                            </NavIcon>
                            <NavText className="disabled">
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