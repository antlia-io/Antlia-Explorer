import React, { Component } from 'react';
// import { Row, Col } from 'reactstrap';
// import ChainStatus from './ChainStatusContainer.js';
// import Consensus from './ConsensusContainer.js';
// import TopValidators from './TopValidatorsContainer.js';
// import RandomStatus from './RandomStatus'
// import Blocks from './Blocks.js'
// import Transactions from './Transactions'
// import Chart from './ChartContainer.js';
// import ChainStates from '../components/ChainStatesContainer.js'
// import { Helmet } from "react-helmet";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// import PieChart from './PieChart.js';

export default class MainSideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };



    

    render() {
        return (
            <div>
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