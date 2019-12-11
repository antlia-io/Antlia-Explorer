import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import numbro from 'numbro';
import moment from 'moment';
import { Markdown } from 'react-showdown';
import Block from '../components/Block.jsx';
import Avatar from '../components/Avatar.jsx';
import PowerHistory from '../components/PowerHistory.jsx';
import {
    Badge, Row, Col, Card,
    CardBody, Spinner, Nav, NavItem, NavLink
} from 'reactstrap';
import KeybaseCheck from '../components/KeybaseCheck.jsx';
import ValidatorDelegations from './Delegations.jsx';
import ValidatorTransactions from '../components/TransactionsContainer.js';
import DelegatedGraph from './DelegatedGraph.js';
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import ScrollArea from 'react-scrollbar';

const T = i18n.createComponent();

addhttp = (url) => {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
        url = "http://" + url;
    }
    return url;
}

const StatusBadge = (props) => {
    const statusColor = ['secondary', 'warning', 'success'];
    const statusText = ['Unbonded', 'Unbonding', 'Active'];
    return <div>
        {props.jailed ? <Badge color='danger'><T>validators.jailed</T></Badge> : ''}
        <Badge color={statusColor[props.bondingStatus]}>{statusText[props.bondingStatus]}</Badge>
    </div>;
}

export default class Validator extends Component {
    constructor(props) {
        let showdown = require('showdown');
        showdown.setFlavor('github');
        super(props);
        this.state = {
            identity: "",
            records: "",
            history: "",
            updateTime: "",
            expanded: false,
            selected: "validators",
        }
    }
    onSelect = selected => {
        this.setState({ selected: selected });
    };
    onToggle = expanded => {
        this.setState({ expanded: expanded });
    };
    componentDidUpdate(prevState) {
        if (this.props.validator != prevState.validator) {
            // if (this.props.validator.description.identity != prevState.validator.description.identity){
            if ((this.props.validator.description) && (this.props.validator.description != prevState.validator.description)) {
                // console.log(prevState.validator.description);
                if (this.state.identity != this.props.validator.description.identity) {
                    this.setState({ identity: this.props.validator.description.identity });
                }
            }

            if (this.props.validator.commission) {
                if (this.props.validator.commission.update_time == Meteor.settings.public.genesisTime) {
                    this.setState({
                        updateTime: "Never changed"
                    });
                }
                else {
                    Meteor.call('Validators.findCreateValidatorTime', this.props.validator.delegator_address, (error, result) => {
                        if (error) {
                            console.warn(error);
                        }
                        else {
                            if (result) {
                                if (result == this.props.validator.commission.update_time) {
                                    this.setState({
                                        updateTime: "Never changed"
                                    });
                                }
                                else {
                                    this.setState({
                                        updateTime: "Updated " + moment(this.props.validator.commission.update_time).fromNow()
                                    });
                                }
                            }
                            else {
                                this.setState({
                                    updateTime: "Updated " + moment(this.props.validator.commission.update_time).fromNow()
                                });
                            }
                        }
                    });
                }
            }

            if (this.props.validatorExist) {
                if (this.props.validator.history().length > 0) {
                    this.setState({
                        history: this.props.validator.history().map((history, i) => {
                            return (
                                <div>
                                    <ScrollArea className="pcscroll-list">
                                        <PowerHistory
                                            key={i}
                                            type={history.type}
                                            prevVotingPower={history.prev_voting_power}
                                            votingPower={history.voting_power}
                                            time={history.block_time}
                                            height={history.height}
                                            address={this.props.validator.operator_address}
                                        />
                                    </ScrollArea>
                                </div>
                            )


                        })
                    })
                }
            }
        }

        if (this.props.records != prevState.records) {
            if (this.props.records.length > 0) {
                this.setState({
                    records: this.props.records.map((record, i) => {
                        return <Block key={i} exists={record.exists} height={record.height} />
                    })
                })
            }
        }
    }

    render() {
        const { expanded } = this.state;
        if (this.props.loading) {
            return <Spinner type="grow" color="primary" />
        }
        else {
            if (this.props.validatorExist) {
                let moniker = (this.props.validator.description && this.props.validator.description.moniker) ? this.props.validator.description.moniker : this.props.validator.address;
                let identity = (this.props.validator.description && this.props.validator.description.identity) ? this.props.validator.description.identity : "No data";
                let website = (this.props.validator.description && this.props.validator.description.website) ? this.props.validator.description.website : undefined;
                let details = (this.props.validator.description && this.props.validator.description.details) ? this.props.validator.description.details : "No data";

                return (<div>
                    <Row>
                        <Helmet>
                            <title>{moniker} - Antlia | Explorer</title>
                            <meta name="description" content={details} />
                        </Helmet>
                        <Col xs={12}>
                            <Link to="/validators" className="btn btn-link"><i className="fas fa-caret-left"></i> <T>common.backToList</T></Link>
                        </Col>
                        <Col lg={12} className="validator-details">
                            <Card>
                                <Row>
                                    <Col lg={4} md={6}>
                                        <div className="validator-status">
                                            <div className="validator-avatar">
                                                <Avatar moniker={moniker} identity={identity} address={this.props.validator.address} list={false} />
                                            </div>
                                            <div className="validator-link">
                                                {/* <div className="moniker text-primary">{website ? <a href={addhttp(this.props.validator.description.website)} target="_blank">{moniker} <i className="fas fa-link"></i></a> : moniker}</div> */}
                                                <div className="address" data-delegator-address={this.props.validator.delegator_address}>
                                                    <p>Address</p>
                                                    <Link to={"/account/" + this.props.validator.delegator_address}>{this.props.validator.delegator_address}</Link>
                                                </div>
                                                <StatusBadge bondingStatus={this.props.validator.status} jailed={this.props.validator.jailed} />
                                            </div>
                                            {/* <div className="identity"><KeybaseCheck identity={identity} showKey /></div> */}
                                            {/* <div className="details"></div>
                                            <div className="website"></div> */}
                                            {/* <div className="card-header backgroundcolor"><T>validators.validatorInfo</T></div> */}
                                        </div>
                                    </Col>
                                    <Col lg={8} md={6}>
                                        <CardBody>
                                            <Row>
                                                <Col lg={3} md={12} className="label">Website</Col>
                                                <Col lg={9} md={12} className="value address">{website ? <a href={addhttp(this.props.validator.description.website)} target="_blank">{moniker} <i className="fas fa-link"></i></a> : moniker}</Col>
                                                <Col lg={3} md={12} className="label"><T>validators.commissionRate</T></Col>
                                                <Col lg={9} md={12} className="value">{this.props.validator.commission ? numbro(this.props.validator.commission.rate * 100).format('0.00') + "%" : ''} <small className="text-secondary">({this.state.updateTime})</small></Col>
                                                {/* <Col lg={3} md={12} className="label"><T>validators.maxRate</T></Col>
                                                <Col lg={9} md={12} className="value">{this.props.validator.commission ? numbro(this.props.validator.commission.max_rate * 100).format('0.00') + "%" : ''}</Col>
                                                <Col lg={3} md={12} className="label"><T>validators.maxChangeRate</T></Col>
                                                <Col lg={9} md={12} className="value">{this.props.validator.commission ? numbro(this.props.validator.commission.max_change_rate * 100).format('0.00') + "%" : ''}</Col> */}
                                                <Col lg={3} md={12} className="label">Uptime</Col>
                                                <Col lg={9} md={12} className="value">{numbro(this.props.validator.uptime).format('0.00')}%</Col>
                                                <Col lg={3} md={12} className="label">Voting Power</Col>
                                                <Col lg={9} md={12} className="value">6{this.props.validator.self_delegation ? <span>{numbro(this.props.validator.self_delegation).format("0,0.00%")} <small className="text-secondary">(~{numbro(this.props.validator.voting_power * this.props.validator.self_delegation).format({ thousandSeparated: true, mantissa: 0 })} {Meteor.settings.public.stakingDenom})</small></span> : 'N/A'}</Col>
                                                <Col lg={3} md={12} className="label">Bonded Height</Col>
                                                <Col lg={9} md={12} className="value">1</Col>
                                                <Col lg={3} md={12} className="label">Details</Col>
                                                <Col lg={9} md={12} className="value"><Markdown markup={details} /></Col>
                                                <Col lg={3} md={12} className="label"><T>validators.operatorAddress</T></Col>
                                                <Col lg={9} md={12} className="value address" data-operator-address={this.props.validator.operator_address}>{this.props.validator.operator_address}</Col>
                                            </Row>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    {/* Component Desktop View */}
                    <div className="deskpart">
                        <Row>
                            <Col lg={4} md={6} sm={12}>
                                <div className="delegated">
                                    <Card>
                                        <div className="header"><h4>Delegated</h4></div>
                                        <div className="delegated-details">
                                            <div className="chart-view">
                                                <DelegatedGraph data={numbro(this.props.validator.voting_power / this.props.chainStatus.activeVotingPower).format('0.00%')} />
                                                <h6>{numbro(this.props.validator.voting_power).format('0,0')}</h6>
                                                <h6>ATOM</h6>
                                            </div>
                                            <div className="chart-details">
                                                <div className="self">
                                                    <p><b>Self</b></p>
                                                    <p>{numbro(this.props.validator.self_delegation).format("0,0.00%")}</p>
                                                    <p>(~{numbro(this.props.validator.voting_power * this.props.validator.self_delegation).format({ thousandSeparated: true, mantissa: 0 })} {Meteor.settings.public.stakingDenom})</p>
                                                </div>
                                                <div className="others">
                                                    <p><b>Others</b></p>
                                                    <p>(~{numbro(this.props.validator.voting_power / this.props.chainStatus.activeVotingPower).format('0.00%')})</p>
                                                    <p>{numbro(this.props.validator.voting_power).format('0,0')}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Card>
                                </div>
                                {/* <Card> */}

                                {/* <div className="card-header backgroundcolor"><T>common.votingPower</T></div> */}
                                {/* <div className="card-header"><h4>Delegated</h4></div>
                            <CardBody className="voting-power-card">
                                <Row>
                                    {this.props.validator.voting_power ? <Col xs={12}><h1 className="display-4 voting-power"><Badge color="primary" >{numbro(this.props.validator.voting_power).format('0,0')}</Badge></h1><span>(~{numbro(this.props.validator.voting_power / this.props.chainStatus.activeVotingPower).format('0.00%')})</span></Col> : ''}
                                    <Col sm={6} className="label"><T>validators.selfDelegationRatio</T></Col>
                                    <Col sm={6} className="value">{this.props.validator.self_delegation ? <span>{numbro(this.props.validator.self_delegation).format("0,0.00%")} <small className="text-secondary">(~{numbro(this.props.validator.voting_power * this.props.validator.self_delegation).format({ thousandSeparated: true, mantissa: 0 })} {Meteor.settings.public.stakingDenom})</small></span> : 'N/A'}</Col>
                                    <Col sm={6} className="label"><T>validators.proposerPriority</T></Col>
                                    <Col sm={6} className="value">{this.props.validator.proposer_priority ? numbro(this.props.validator.proposer_priority).format('0,0') : 'N/A'}</Col>
                                    <Col sm={6} className="label"><T>validators.delegatorShares</T></Col>
                                    <Col sm={6} className="value">{numbro(this.props.validator.delegator_shares / Meteor.settings.public.stakingFraction).format('0,0.00')} {Meteor.settings.public.stakingDenom}</Col>
                                    <Col sm={6} className="label"><T>validators.tokens</T></Col>
                                    <Col sm={6} className="value">{numbro(this.props.validator.tokens / Meteor.settings.public.stakingFraction).format('0,0.00')} {Meteor.settings.public.stakingDenom}</Col>
                                    {(this.props.validator.jailed) ? <Col xs={12} >
                                        <Row><Col md={6} className="label"><T>validators.unbondingHeight</T></Col>
                                            <Col md={6} className="value">{numbro(this.props.validator.unbonding_height).format('0,0')}</Col>
                                            <Col md={6} className="label"><T>validators.unbondingTime</T></Col>
                                            <Col md={6} className="value">{moment.utc(this.props.validator.unbonding_time).format("D MMM YYYY, h:mm:ssa z")}</Col>
                                        </Row></Col> : ''}
                                </Row>
                            </CardBody>
                        </Card> */}
                                {/* <Card>
                            <div className="card-header backgroundcolor"><T>validators.uptime</T> <Link className="float-right white" to={"/validator/" + this.props.validator.address + "/missed/blocks"}><T>common.more</T>...</Link></div>
                            <CardBody>
                                <Row>
                                    <Col xs={8} className="label"><T numBlocks={Meteor.settings.public.uptimeWindow}>validators.lastNumBlocks</T></Col>
                                    <Col xs={4} className="value text-right">{numbro(this.props.validator.uptime).format('0.00')}%</Col>
                                    <Col md={12} className="blocks-list">{this.state.records}</Col>
                                </Row>
                            </CardBody>
                        </Card> */}
                            </Col>
                            <Col lg={8} md={6} sm={12} className="validator_tabs">
                                <Card>
                                    <Nav pills>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/validator/" + this.props.validator.operator_address} active={!(this.props.location.pathname.match(/(delegations|transactions)/gm))}><T>validators.powerChange</T></NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/validator/" + this.props.validator.operator_address + "/delegations"} active={(this.props.location.pathname.match(/delegations/gm) && this.props.location.pathname.match(/delegations/gm).length > 0)}><T>validators.delegations</T></NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/validator/" + this.props.validator.operator_address + "/transactions"} active={(this.props.location.pathname.match(/transactions/gm) && this.props.location.pathname.match(/transactions/gm).length > 0)}><T>validators.transactions</T></NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Switch>
                                        <Route exact path="/(validator|validators)/:address" render={() => <div className="power-history">{this.state.history}</div>} />
                                        <Route path="/(validator|validators)/:address/delegations" render={() => <ValidatorDelegations address={this.props.validator.operator_address} tokens={this.props.validator.tokens} shares={this.props.validator.delegator_shares} />} />
                                        <Route path="/(validator|validators)/:address/transactions" render={() => <ValidatorTransactions validator={this.props.validator.operator_address} delegator={this.props.validator.delegator_address} limit={100} />} />
                                    </Switch>
                                </Card>
                                
                            </Col>
                        </Row>
                        <Link to="/validators" className="btn btn-link"><i className="fas fa-caret-left"></i> <T>common.backToList</T></Link>
                    </div>
                    {/* Component Responsive View */}
                    <div className="respart">
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <div className="delegated">
                                    <Card>
                                        <div className="header"><h4>Delegated</h4></div>
                                        <div className="delegated-details">
                                            <div className="chart-view">
                                                <DelegatedGraph data={numbro(this.props.validator.voting_power / this.props.chainStatus.activeVotingPower).format('0.00%')} />
                                                <h6>{numbro(this.props.validator.voting_power).format('0,0')}</h6>
                                                <h6>ATOM</h6>
                                            </div>
                                            <div className="chart-details">
                                                <div className="self">
                                                    <p><b>Self</b></p>
                                                    <p>{numbro(this.props.validator.self_delegation).format("0,0.00%")}</p>
                                                    <p>(~{numbro(this.props.validator.voting_power * this.props.validator.self_delegation).format({ thousandSeparated: true, mantissa: 0 })} {Meteor.settings.public.stakingDenom})</p>
                                                </div>
                                                <div className="others">
                                                    <p><b>Others</b></p>
                                                    <p>(~{numbro(this.props.validator.voting_power / this.props.chainStatus.activeVotingPower).format('0.00%')})</p>
                                                    <p>{numbro(this.props.validator.voting_power).format('0,0')}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Card>
                                </div>
                                {/* <Card> */}

                                {/* <div className="card-header backgroundcolor"><T>common.votingPower</T></div> */}
                                {/* <div className="card-header"><h4>Delegated</h4></div>
                            <CardBody className="voting-power-card">
                                <Row>
                                    {this.props.validator.voting_power ? <Col xs={12}><h1 className="display-4 voting-power"><Badge color="primary" >{numbro(this.props.validator.voting_power).format('0,0')}</Badge></h1><span>(~{numbro(this.props.validator.voting_power / this.props.chainStatus.activeVotingPower).format('0.00%')})</span></Col> : ''}
                                    <Col sm={6} className="label"><T>validators.selfDelegationRatio</T></Col>
                                    <Col sm={6} className="value">{this.props.validator.self_delegation ? <span>{numbro(this.props.validator.self_delegation).format("0,0.00%")} <small className="text-secondary">(~{numbro(this.props.validator.voting_power * this.props.validator.self_delegation).format({ thousandSeparated: true, mantissa: 0 })} {Meteor.settings.public.stakingDenom})</small></span> : 'N/A'}</Col>
                                    <Col sm={6} className="label"><T>validators.proposerPriority</T></Col>
                                    <Col sm={6} className="value">{this.props.validator.proposer_priority ? numbro(this.props.validator.proposer_priority).format('0,0') : 'N/A'}</Col>
                                    <Col sm={6} className="label"><T>validators.delegatorShares</T></Col>
                                    <Col sm={6} className="value">{numbro(this.props.validator.delegator_shares / Meteor.settings.public.stakingFraction).format('0,0.00')} {Meteor.settings.public.stakingDenom}</Col>
                                    <Col sm={6} className="label"><T>validators.tokens</T></Col>
                                    <Col sm={6} className="value">{numbro(this.props.validator.tokens / Meteor.settings.public.stakingFraction).format('0,0.00')} {Meteor.settings.public.stakingDenom}</Col>
                                    {(this.props.validator.jailed) ? <Col xs={12} >
                                        <Row><Col md={6} className="label"><T>validators.unbondingHeight</T></Col>
                                            <Col md={6} className="value">{numbro(this.props.validator.unbonding_height).format('0,0')}</Col>
                                            <Col md={6} className="label"><T>validators.unbondingTime</T></Col>
                                            <Col md={6} className="value">{moment.utc(this.props.validator.unbonding_time).format("D MMM YYYY, h:mm:ssa z")}</Col>
                                        </Row></Col> : ''}
                                </Row>
                            </CardBody>
                        </Card> */}
                                {/* <Card>
                            <div className="card-header backgroundcolor"><T>validators.uptime</T> <Link className="float-right white" to={"/validator/" + this.props.validator.address + "/missed/blocks"}><T>common.more</T>...</Link></div>
                            <CardBody>
                                <Row>
                                    <Col xs={8} className="label"><T numBlocks={Meteor.settings.public.uptimeWindow}>validators.lastNumBlocks</T></Col>
                                    <Col xs={4} className="value text-right">{numbro(this.props.validator.uptime).format('0.00')}%</Col>
                                    <Col md={12} className="blocks-list">{this.state.records}</Col>
                                </Row>
                            </CardBody>
                        </Card> */}
                            </Col>
                            <Col lg={6} md={6} sm={12} className="validator_tabs">
                                <Card>
                                    <Nav pills>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/validator/" + this.props.validator.operator_address} active={!(this.props.location.pathname.match(/(delegations|transactions)/gm))}><T>validators.powerChange</T></NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/validator/" + this.props.validator.operator_address + "/delegations"} active={(this.props.location.pathname.match(/delegations/gm) && this.props.location.pathname.match(/delegations/gm).length > 0)}><T>validators.delegations</T></NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/validator/" + this.props.validator.operator_address + "/transactions"} active={(this.props.location.pathname.match(/transactions/gm) && this.props.location.pathname.match(/transactions/gm).length > 0)}><T>validators.transactions</T></NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Switch>
                                        <Route exact path="/(validator|validators)/:address" render={() =>
                                            <div className="power-history">

                                                {this.state.history}

                                            </div>
                                        } />
                                        <Route path="/(validator|validators)/:address/delegations" render={() =>
                                            <ValidatorDelegations address={this.props.validator.operator_address} tokens={this.props.validator.tokens} shares={this.props.validator.delegator_shares} />}
                                        />
                                        <Route path="/(validator|validators)/:address/transactions" render={() =>
                                            <ValidatorTransactions validator={this.props.validator.operator_address} delegator={this.props.validator.delegator_address} limit={100} />}
                                        />
                                    </Switch>
                                </Card>
                              
                            </Col>
                        </Row>
                        <Link to="/validators" className="btn btn-link"><i className="fas fa-caret-left"></i> <T>common.backToList</T></Link>
                        </div>
                </div>
                )

            }
            else {
                return <div>
                    <T>validators.validatorNotExists</T>
                    <h1>test</h1>
                </div>
            }
        }
    }

}