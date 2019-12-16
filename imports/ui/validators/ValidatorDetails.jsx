import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import Validator from './ValidatorContainer.js';
import MissedBlocks from './MissedBlocksContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import i18n from 'meteor/universe:i18n';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const T = i18n.createComponent();

export default class ValidatorDetails extends Component {
    constructor(props) {
        super(props);
    };
    state = {
        selected: 'validators',
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
                <div id="validatordetails" style={{
                    marginLeft: expanded ? 200 : 64,
                    padding: '15px 20px 0 20px'
                }}>

                    <div className="topbar">
                        <h1><T>validators.validatorDetails</T></h1>
                        <div className="chainstate">
                            <ChainStates />
                        </div>
                    </div>
                    <Row>
                        <Col md={12}>
                            <Switch>
                                <Route exact path="/(validator|validators)/:address/missed/blocks" render={(props) => <MissedBlocks {...props} type='voter' />} />
                                <Route exact path="/(validator|validators)/:address/missed/precommits" render={(props) => <MissedBlocks {...props} type='proposer' />} />
                                <Route path="/(validator|validators)/:address" render={(props) => <Validator address={props.match.params.address} {...props} />} />
                            </Switch>
                        </Col>
                    </Row>
                </div>
                <SideNav className="sidenav position-fixed" onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav selected={selected} defaultSelected="validators">
                        <NavItem title="Explorer">
                            <NavIcon className="explorer">
                                <span className="ex">EX</span>
                            </NavIcon>
                            <NavText>
                                <span className="explorer">PLORER</span>
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