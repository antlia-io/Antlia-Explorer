import React, { Component } from 'react';
import {
    UncontrolledTooltip, Card, CardHeader, Progress, Badge, Row, Col,
    CardBody, Spinner, Nav, NavLink,
} from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom'
import numbro from 'numbro';
import AccountCopy from '../components/AccountCopy.jsx';
import Delegations from './Delegations.jsx';
import Unbondings from './Unbondings.jsx';
import AccountTransactions from '../components/TransactionsContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Pie } from 'react-chartjs-2';
// import AccountGraph from './AccountGraph.js';
// import QRCode from 'react-qr-code';

const T = i18n.createComponent();
export default class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.match.params.address,
            loading: true,
            accountExists: false,
            available: 0,
            delegated: 0,
            unbonding: 0,
            rewards: 0,
            total: 0,
            price: 0
        }
    };
    state = {
        selected: 'validators',
        expanded: false
    };

    getBalance() {
        Meteor.call('coinStats.getStats', (error, result) => {
            if (result) {
                this.setState({
                    price: result.usd
                })
            }
        });
        Meteor.call('accounts.getBalance', this.props.match.params.address, (error, result) => {
            if (error) {
                console.warn(error);
                this.setState({
                    loading: false
                })
            }

            if (result) {
                // console.log(result);
                if (result.available) {
                    this.setState({
                        available: parseFloat(result.available.amount),
                        total: parseFloat(this.state.total) + parseFloat(result.available.amount)
                    })
                }

                if (result.delegations && result.delegations.length > 0) {
                    result.delegations.forEach((delegation, i) => {
                        this.setState({
                            delegated: this.state.delegated + parseFloat(delegation.shares),
                            total: this.state.total + parseFloat(delegation.shares)
                        })
                    }, this)
                }

                if (result.unbonding && result.unbonding.length > 0) {
                    result.unbonding.forEach((unbond, i) => {
                        unbond.entries.forEach((entry, j) => {
                            this.setState({
                                unbonding: this.state.unbonding + parseFloat(entry.balance),
                                total: this.state.total + parseFloat(entry.balance)
                            })
                                , this
                        })
                    }, this)
                }

                if (result.rewards && result.rewards.length > 0) {
                    result.rewards.forEach((reward, i) => {
                        this.setState({
                            rewards: this.state.rewards + parseFloat(reward.amount),
                            total: this.state.total + parseFloat(reward.amount)
                        })
                    }, this)
                }

                this.setState({
                    loading: false,
                    accountExists: true
                })
            }
        })
    }

    componentDidMount() {
        this.getBalance();
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            this.setState({
                address: this.props.match.params.address,
                loading: true,
                accountExists: false,
                available: 0,
                delegated: 0,
                unbonding: 0,
                rewards: 0,
                total: 0,
                price: 0
            }, () => {
                this.getBalance();
            })
        }
    }

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render() {
        const { expanded, selected } = this.state;
        if (this.state.loading) {
            return <div id="account">
                <h1 className="d-none d-lg-block"><T>accounts.accountDetails</T></h1>
                <Spinner type="grow" color="primary" />
            </div>
        }
        else if (this.state.accountExists) {
            var data = {
                datasets: [
                    {
                        data: [
                            this.state.delegated / this.state.total * 100,
                            this.state.unbonding / this.state.total * 100,
                            this.state.rewards / this.state.total * 100
                        ],
                        backgroundColor: [
                            '#0e44a7',
                            '#3603ff',
                            '#6897ff',
                        ],
                        hoverBackgroundColor: [
                            '#0e44a7',
                            '#3603ff',
                            '#6897ff',
                        ],
                        // height: [
                        //     "200px"
                        // ],
                        // width: [
                        //     "200px"
                        // ]

                    }
                ]
            };
            return (
                <div>
                    <div id="account" style={{
                        marginLeft: expanded ? 200 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
                        <Helmet>
                            <title>Account Details of {this.state.address} on Antlia Explorer | Antlia</title>
                            <meta name="description" content={"Account Details of " + this.state.address + " on Color Explorer"} />
                        </Helmet>
                        <div className="topbar">
                            <h1><T>accounts.accountDetails</T></h1>
                            <div className="chainstate">
                                <ChainStates />
                            </div>
                        </div>
                        {/* <h3 className="text-primary"><AccountCopy address={this.state.address} /></h3> */}
                        <Row>
                            <Col>
                                <Card>
                                    {/* <CardHeader className="backgroundcolor">Balance</CardHeader> */}
                                    <CardBody>
                                        <Row>
                                            <Col lg={6} md={12} sm={12}>
                                                <Row>
                                                    <Col lg={4} xs={12}>
                                                        <div className="acc-img">
                                                            <img src="/img/QR.svg" className="img-fluid" />
                                                            {/* <QRCode value="hey" /> */}
                                                        </div>
                                                    </Col>
                                                    <Col lg={8} xs={12}>
                                                        <div className="addresslink">
                                                            <p>Address</p>
                                                            <AccountCopy address={this.state.address} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6} md={12} sm={12}>
                                                <div className="addresslink">
                                                    <p>Reward Address</p>
                                                    <p>antlia1eld45rphtn8p8gjdv96rcfl06ghwl25rayq3nf</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <hr />
                                    <CardBody>
                                        {/* <Row className="account-distributions">
                                            <Col xs={12}>
                                                <Progress multi>
                                                    <Progress bar className="available" value={this.state.available / this.state.total * 100} />
                                                    <Progress bar className="delegated" value={this.state.delegated / this.state.total * 100} />
                                                    <Progress bar className="unbonding" value={this.state.unbonding / this.state.total * 100} />
                                                    <Progress bar className="rewards" value={this.state.rewards / this.state.total * 100} />
                                                </Progress>
                                            </Col>
                                        </Row> */}
                                        <Row>
                                            <Col md={12} lg={8}>
                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="acc-graph">
                                                            {/* <img src="/img/acc-graph.png" className="img-fluid" /> */}
                                                            <Pie data={data} width="180px" />
                                                        </div>
                                                        {/* <AccountGraph/> */}
                                                    </Col>
                                                    <Col lg={8} className="graph-detail">
                                                        <Row className="mb">
                                                            <Col xs={4} sm={2} md={2} lg={2} className="label text-nowrap"><div className="available infinity" /></Col>
                                                            <Col xs={8} sm={3} md={3} lg={3} className="value textitle"><T>accounts.available</T></Col>
                                                            <Col xs={4} sm={3} md={3} lg={3} className="label text-right">100.00%</Col>
                                                            <Col xs={8} sm={4} md={4} lg={4} className="value text-right">{numbro(this.state.available / Meteor.settings.public.stakingFraction).format("0,0.00")} {Meteor.settings.public.stakingDenom}</Col>
                                                        </Row>
                                                        <Row className="mb">
                                                            <Col xs={4} sm={2} md={2} lg={2} className="label text-nowrap"><div className="delegated infinity" /></Col>
                                                            <Col xs={8} sm={3} md={3} lg={3} className="value textitle"><T>accounts.delegated</T></Col>
                                                            <Col xs={4} sm={3} md={3} lg={3} className="label text-right">{numbro(((this.state.delegated / Meteor.settings.public.stakingFraction) / (this.state.available / Meteor.settings.public.stakingFraction)) * 100).format("0,0.00")}%</Col>
                                                            <Col xs={8} sm={4} md={4} lg={4} className="value text-right">{numbro(this.state.delegated / Meteor.settings.public.stakingFraction).format("0,0.00")} {Meteor.settings.public.stakingDenom}</Col>
                                                        </Row>
                                                        <Row className="mb">
                                                            <Col xs={4} sm={2} md={2} lg={2} className="label text-nowrap"><div className="unbonding infinity" /></Col>
                                                            <Col xs={8} sm={3} md={3} lg={3} className="value textitle"><T>accounts.unbonding</T></Col>
                                                            <Col xs={4} sm={3} md={3} lg={3} className="label text-right">{numbro(((this.state.unbonding / Meteor.settings.public.stakingFraction) / (this.state.available / Meteor.settings.public.stakingFraction)) * 100).format("0,0.00")}%</Col>
                                                            <Col xs={8} sm={4} md={4} lg={4} className="value text-right">{numbro(this.state.unbonding / Meteor.settings.public.stakingFraction).format("0,0.00")} {Meteor.settings.public.stakingDenom}</Col>
                                                        </Row>
                                                        <Row className="mb">
                                                            <Col xs={4} sm={2} md={2} lg={2} className="label text-nowrap"><div className="rewards infinity" /></Col>
                                                            <Col xs={8} sm={3} md={3} lg={3} className="value textitle"><T>accounts.rewards</T></Col>
                                                            <Col xs={4} sm={3} md={3} lg={3} className="label text-right">{numbro(((this.state.rewards / Meteor.settings.public.stakingFraction) / (this.state.available / Meteor.settings.public.stakingFraction)) * 100).format("0,0.00")}%</Col>
                                                            <Col xs={8} sm={4} md={4} lg={4} className="value text-right">{numbro(this.state.rewards / Meteor.settings.public.stakingFraction).format("0,0.00")} {Meteor.settings.public.stakingDenom}</Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col md={12} lg={4} className="total">
                                                <Row className="mb">
                                                    <Col lg={12} className="tlabel"><div className="infinity" /><T>accounts.total</T> {Meteor.settings.public.stakingDenom}s</Col>
                                                    <Col lg={12} className="value1 text-right">{numbro(this.state.total / Meteor.settings.public.stakingFraction).format("0,0.0000a")} {Meteor.settings.public.stakingDenom}</Col>
                                                    {/* <Col xs={12} className="dollar-value text-right text-secondary">~{numbro(this.state.total/Meteor.settings.public.stakingFraction*this.state.price).format("$0,0.0000a")} ({numbro(this.state.price).format("$0,0.00")}/{Meteor.settings.public.stakingDenom})</Col> */}
                                                </Row>
                                                <Row>
                                                    <Col lg={12} className="tlabel"><div className="infinity" />~{numbro(this.state.price).format("$0,0.00")} / {Meteor.settings.public.stakingDenom}</Col>
                                                    <Col lg={12} className="value2   text-right">{numbro(this.state.total / Meteor.settings.public.stakingFraction * this.state.price).format("$0,0.0000a")} {Meteor.settings.public.stakingDenom}</Col>
                                                    {/* <Col xs={12} className="dollar-value text-right text-secondary">~{numbro(this.state.total/Meteor.settings.public.stakingFraction*this.state.price).format("$0,0.0000a")} ({numbro(this.state.price).format("$0,0.00")}/{Meteor.settings.public.stakingDenom})</Col> */}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card></Col>
                        </Row>
                        <Row>



                            <Col lg={12} md={12} sm={12} className="validator_tabs">
                                <Card>
                                    <Nav pills>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/account/" + this.state.address} active={!(this.props.location.pathname.match(/(delegations|unbondings)/gm))}><T>validators.transactions</T></NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/account/" + this.state.address + "/delegations"} active={(this.props.location.pathname.match(/delegations/gm) && this.props.location.pathname.match(/delegations/gm).length > 0)}><T>validators.delegations</T></NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to={"/account/" + this.state.address + "/unbondings"} active={(this.props.location.pathname.match(/unbondings/gm) && this.props.location.pathname.match(/unbondings/gm).length > 0)}><T>accounts.unbonding</T></NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Switch>
                                        <Route exact path="/(account)/:address" render={() =>
                                            <div className="power-history">
                                                <AccountTransactions delegator={this.state.address} limit={100} />
                                            </div>
                                        } />
                                        <Route path="/(account)/:address/delegations" render={() =>
                                            <Delegations address={this.state.address} />}

                                        />
                                        <Route path="/(account)/:address/unbondings" render={() =>
                                            <Unbondings address={this.state.address} />}
                                        />
                                    </Switch>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <SideNav className="sidenav position-fixed" onSelect={this.onSelect} onToggle={this.onToggle}>
                        <SideNav.Toggle />
                        <SideNav.Nav selected={selected} defaultSelected="transactions">
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
        else {
            return <div id="account">
                <h1 className="d-none d-lg-block"><T>accounts.accountDetails</T></h1>
                <p><T>acounts.notFound</T></p>
            </div>
        }
    }
}