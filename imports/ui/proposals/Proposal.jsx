import React, { Component } from 'react';
import moment from 'moment';
import {
    Row, Col, Progress, Card, CardHeader, CardBody, Spinner,
    TabContent, TabPane, Nav, NavLink, NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ProposalStatusIcon, VoteIcon } from '../components/Icons';
import Account from '../components/Account.jsx';
import PChart from '../components/Chart.jsx';
import numbro from 'numbro';
import { Markdown } from 'react-showdown';
import { Helmet } from 'react-helmet';
import posed from 'react-pose';
import i18n from 'meteor/universe:i18n';
import { Meteor } from 'meteor/meteor';
import { TransactionRow } from './TransactionsRow.jsx';

const T = i18n.createComponent();

const Result = posed.div({
    // closed: { height: 250 },
    open: { height: 'auto' }
});
export default class Proposal extends Component {
    constructor(props) {
        super(props);



        let showdown = require('showdown');
        showdown.setFlavor('github');
        this.state = {
            proposal: '',
            deposit: '',
            tallyDate: <T>proposals.notStarted</T>,
            voteStarted: false,
            totalVotes: 0,
            open: false,
            yesPercent: 0,
            abstainPercent: 0,
            noPercent: 0,
            noWithVetoPercent: 0,
            proposalValid: false,
            orderDir: -1,
            breakDownSelection: 'Bar',
            governanceTxs: {},
        }

        if (Meteor.isServer) {
            this.state.proposal = this.props.proposal;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.proposal != prevProps.proposal) {
            // console.log(this.props.proposal.value);
            this.setState({
                proposal: this.props.proposal,
                governanceTxs: this.props.governanceTxs,
                deposit: <div>{this.props.proposal.total_deposit ? this.props.proposal.total_deposit.map((deposit, i) => {
                    return <div key={i}>{numbro(deposit.amount / Meteor.settings.public.stakingFraction).format(0, 0)} {Meteor.settings.public.stakingDenom}</div>
                }) : ''} </div>
            });

            let now = moment();
            let totalVotingPower = this.props.chain.activeVotingPower * Meteor.settings.public.stakingFraction;
            if (this.props.proposal.voting_start_time != '0001-01-01T00:00:00Z') {
                if (now.diff(moment(this.props.proposal.voting_start_time)) > 0) {
                    let endVotingTime = moment(this.props.proposal.voting_end_time);
                    if (now.diff(endVotingTime) < 0) {
                        // not reach end voting time yet
                        let totalVotes = 0;
                        for (let i in this.props.proposal.tally) {
                            totalVotes += parseInt(this.props.proposal.tally[i]);
                        }

                        this.setState({
                            tally: this.props.proposal.tally,
                            tallyDate: moment.utc(this.props.proposal.updatedAt).format("D MMM YYYY, h:mm:ssa z"),
                            voteStarted: true,
                            voteEnded: false,
                            totalVotes: totalVotes,
                            yesPercent: (totalVotes > 0) ? parseInt(this.props.proposal.tally.yes) / totalVotes * 100 : 0,
                            abstainPercent: (totalVotes > 0) ? parseInt(this.props.proposal.tally.abstain) / totalVotes * 100 : 0,
                            noPercent: (totalVotes > 0) ? parseInt(this.props.proposal.tally.no) / totalVotes * 100 : 0,
                            noWithVetoPercent: (totalVotes > 0) ? parseInt(this.props.proposal.tally.no_with_veto) / totalVotes * 100 : 0,
                            proposalValid: (this.state.totalVotes / totalVotingPower > parseFloat(this.props.chain.gov.tallyParams.quorum)) ? true : false
                        })
                    }
                    else {
                        let totalVotes = 0;
                        for (let i in this.props.proposal.final_tally_result) {
                            totalVotes += parseInt(this.props.proposal.final_tally_result[i]);
                        }

                        this.setState({
                            tally: this.props.proposal.final_tally_result,
                            tallyDate: <T>proposals.final</T>,
                            voteStarted: true,
                            voteEnded: true,
                            totalVotes: totalVotes,
                            yesPercent: (totalVotes > 0) ? parseInt(this.props.proposal.final_tally_result.yes) / totalVotes * 100 : 0,
                            abstainPercent: (totalVotes > 0) ? parseInt(this.props.proposal.final_tally_result.abstain) / totalVotes * 100 : 0,
                            noPercent: (totalVotes > 0) ? parseInt(this.props.proposal.final_tally_result.no) / totalVotes * 100 : 0,
                            noWithVetoPercent: (totalVotes > 0) ? parseInt(this.props.proposal.final_tally_result.no_with_veto) / totalVotes * 100 : 0,
                            proposalValid: (this.state.totalVotes / totalVotingPower > parseFloat(this.props.chain.gov.tallyParams.quorum)) ? true : false
                        })
                    }
                }
            }
        }
    }

    handleClick = (i, e) => {
        e.preventDefault();

        this.setState({
            open: this.state.open === i ? false : i
        });
    }

    toggleDir(e) {
        e.preventDefault();
        this.setState({
            orderDir: this.state.orderDir * -1
        });
    }

    populateChartData() {
        const optionOrder = { 'Yes': 0, 'Abstain': 1, 'No': 2, 'NoWithVeto': 3 };
        let votes = this.props.proposal.votes.sort(
            (vote1, vote2) => vote2['votingPower'] - vote1['votingPower']
        ).sort(
            (vote1, vote2) => optionOrder[vote1.option] - optionOrder[vote2.option]);
        let maxVotingPower = { 'N/A': 1 };
        let totalVotingPower = { 'N/A': 0 };
        let votesByOptions = { 'All': votes, 'Yes': [], 'Abstain': [], 'No': [], 'NoWithVeto': [] };

        let emtpyData = [{ 'votingPower': 1, option: 'N/A' }];
        votes.forEach((vote) => votesByOptions[vote.option].push(vote));

        let datasets = [];
        for (let option in votesByOptions) {
            let data = votesByOptions[option];
            maxVotingPower[option] = Math.max.apply(null, data.map((vote) => vote.votingPower));
            totalVotingPower[option] = data.reduce((s, x) => x.votingPower + s, 0);
            datasets.push({
                datasetId: option,
                data: data.length == 0 ? emtpyData : data,
                totalVotingPower: totalVotingPower,
                maxVotingPower: maxVotingPower
            })
        };

        let layout = [['piePlot']];
        let scales = [{
            scaleId: 'colorScale',
            type: 'Color',
            domain: ['Yes', 'Abstain', 'No', 'NoWithVeto', 'N/A'],
            range: ['#4CAF50', '#ff9800', '#e51c23', '#9C27B0', '#BDBDBD']
        }];
        let isDataEmtpy = votesByOptions[this.state.breakDownSelection].length == 0;
        let tooltip = (component, point, data, ds) => {
            let total = ds.metadata().totalVotingPower['All'];
            let optionTotal = ds.metadata().totalVotingPower[data.option];
            let percentage = numbro(data.votingPower / total).format('0.00%');
            let optionPercentage = numbro(data.votingPower / optionTotal).format('0.00%');
            return `<p>Voting Power: ${data.votingPower}</p>
                    <p>${percentage} out of all votes</p>
                    <p>${optionPercentage} out of all ${data.option} votes</p>`;
        }
        let components = {
            plots: [{
                plotId: 'piePlot',
                type: 'Pie',
                sectorValue: {
                    value: (d, i, ds) => d.votingPower
                },
                labelsEnabled: isDataEmtpy,
                labelFormatter: isDataEmtpy ? ((value) => 'N/A') : null,
                attrs: [{
                    attr: 'fill',
                    value: (d) => d.option,
                    scale: 'colorScale'
                }, {
                    attr: 'fill-opacity',
                    value: (d, i, ds) => Math.max(0.1, d.votingPower / ds.metadata().maxVotingPower[d.option])
                }, {
                    attr: 'stroke',
                    value: 'white'
                }, {
                    attr: 'stroke-width',
                    value: '0.5'
                }],
                datasets: [this.state.breakDownSelection],
                tooltip: isDataEmtpy ? null : tooltip
            }]
        };
        let config = {
            height: '300px',
            width: '300px',
            margin: 'auto'
        }
        return { layout, datasets, scales, components, config };
    }

    renderPieChart() {
        if (this.state.breakDownSelection == 'Bar') {
            return;
        };
        return <PChart {...this.populateChartData()} />
    }

    renderTallyResultDetail(openState, option) {
        let votes = this.props.proposal.votes ? this.props.proposal.votes.filter((vote) => vote.option == option) : [];
        let orderDir = this.state.orderDir;
        votes = votes.sort((vote1, vote2) => (vote1['votingPower'] - vote2['votingPower']) * orderDir);

        return <Result className="tally-result-detail">
            <div className='tally-result-table'>
                {(votes.length) ? <Row className="header text-nowrap">
                    {/* <Col className="d-none d-md-block counter" md={1}>No.</Col> */}
                    <Col className="moniker" lg={3} md={6} sm={12} xs={12}>
                        <i className="material-icons">perm_contact_calendar</i>
                        <span className="d-inline-block d-md-none d-lg-inline-block"><T>common.voter</T></span>
                    </Col>
                    {/* <Col className="voting-power" lg={3} md={6} sm={12} xs={12} onClick={(e) => this.toggleDir(e)}> */}
                    <Col className="voting-power" lg={3} md={6} sm={12} xs={12}>
                        <i className="material-icons">reply</i>
                        <span className="d-inline-block d-md-none d-lg-inline-block">Answer</span>
                        {/* <i className="material-icons"> {(this.state.orderDir == 1) ? 'arrow_drop_up' : 'arrow_drop_down'}</i> */}
                    </Col>
                    <Col className="voting-power-percent" lg={3} md={6} sm={12} xs={12}>
                        <i className="fas fa-hashtag"></i>
                        <span className="d-inline-block d-md-none d-lg-inline-block">TxHash</span>
                    </Col>
                    <Col className="voting-power-percent" lg={3} md={6} sm={12} xs={12}>
                        <i className="fas fa-clock"></i>
                        <span className="d-inline-block d-md-none d-lg-inline-block">Time</span>
                    </Col>
                    {/* <Col className="voting-power-percent" md={3}>
                        <i className="material-icons">equalizer</i>
                        <span className="d-inline-block d-md-none d-lg-inline-block"><T>common.votingPower</T> %</span>
                    </Col>
                    <Col className="voting-power-percent" md={3}>
                        <i className="material-icons">equalizer</i>
                        <span className="d-inline-block d-md-none d-lg-inline-block"><T>common.votingPower</T> %</span>
                    </Col> */}
                </Row>
                    : ""}
                {votes.map((vote, i) =>
                    // <Card body >
                    <Row className='voter-info'>
                        {/* <Col className="d-none d-md-block counter data" md={1}>{i + 1}</Col> */}


                        <Col className="moniker data" lg={3} md={6} sm={12}>
                        {/* <i className="material-icons d-lg-none">perm_contact_calendar</i> */}
                            <span key={i}><Account address={vote.voter} /></span>

                        </Col>
                        <Col className="voting-power data" lg={3} md={6} sm={12}>
                            <i className="material-icons d-lg-none">reply</i>
                            <VoteIcon /> {vote.option}
                            {/* {(vote.votingPower !== undefined) ? numbro(vote.votingPower).format('0,0.00') : ""} */}
                        </Col>
                        <Col lg={6}>
                            {(this.state.governanceTxs.length > 0) ? this.state.governanceTxs.map((tx, i) => {
                                return (

                                    <div>
                                        {/* <div className="deskpart">
                                <Row className="transfer-item">
                                    <Col lg={6} md={12}> */}
                                        <TransactionRow
                                            key={i}
                                            id={vote.proposal_id}
                                            index={i}
                                            tx={tx}
                                            blockList />
                                        {/* </Col>
                                        </Row>
                                    </div> */}
                                    </div>
                                )
                            }) :
                                (
                                    <p>No Data</p>

                                )
                            }
                        </Col>

                    </Row>
                    
                    // </Card>
                )}
                {/* <Row>
                        <Col lg={12}>
                            <div className="nodata">
                                <div>
                                    <img src="/img/nodata.png" className="img-fluid nodata-img" />
                                    <h2>No Data</h2>
                                </div>
                            </div>
                        </Col>
                    </Row> */}
                   
            </div>
        </Result>
    }

    render() {
        if (this.props.loading) {
            return <Spinner type="grow" color="primary" />
        }
        else {
            if (this.props.proposalExist && this.state.proposal != '') {
                // console.log(this.state.proposal);
                const proposalId = Number(this.props.proposal.proposalId), maxProposalId = Number(this.props.proposalCount);
                let totalVotingPower = this.props.chain.activeVotingPower * Meteor.settings.public.stakingFraction;
                return <div>
                    <Helmet>
                        <title>{this.props.proposal.proposal_content.value.title} | Antlia</title>
                        <meta name="description" content={this.props.proposal.proposal_content.value.description} />
                    </Helmet>
                    <div className="proposal">
                        <Row>
                            <Col lg={4} md={12} sm={12}>
                                <Card>
                                    <div className="proposal-intro">
                                        <div className="name-id">
                                            <p className="proposer"><b>Proposer</b> <Account address={this.props.proposal.proposer} /></p>
                                            {/* <p>Antlia Upgrade Proposal Title: <span className="pid">{this.props.proposal.proposal_id}</span></p> */}

                                            <p>Antlia Upgrade Proposal: <span className="pid">{this.props.proposal.proposal_content.value.title}</span></p>
                                        </div>
                                        <div className="desc">
                                            <div className="vote-status">
                                                <div className="status">
                                                    <span className="inner"><ProposalStatusIcon status={this.props.proposal.proposal_status} /> {(this.props.proposal.proposal_status) ? this.props.proposal.proposal_status.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(" ") : ''}</span></div>
                                                <div className="most-turnover">
                                                    <div className="turnover">
                                                        <p className="label">Turnover</p>
                                                        <p className="value">{(numbro(this.state.yesPercent + this.state.noPercent + this.state.abstainPercent).format("0.00") / 3).toFixed(4)} %</p>
                                                    </div>
                                                    <div className="ml"></div>
                                                    <div className="mostvoted">
                                                        <p className="label">Most Voted On</p>
                                                        <p className="value"><span className="blue-color"></span>Yes({numbro(this.state.totalVotes / totalVotingPower).format("0.00%")})</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={8} md={12} sm={12}>
                                <Card>
                                    <div className="proposal-desc">
                                        <div className="vote-turn">
                                            <h3>Vote</h3>
                                            <div className="turnover-per">
                                                Turnover: {(numbro(this.state.yesPercent + this.state.noPercent + this.state.abstainPercent).format("0.00") / 3).toFixed(4)} %
                               </div>
                                        </div>
                                        <div className="vote-list">
                                            <div className="list-item bblue">
                                                <h5>Yes</h5>
                                                <p>{numbro(this.state.yesPercent).format("0.00")}%</p>
                                                {/* <p>99.20%</p> */}
                                                <p>{this.state.tally ? numbro(this.state.tally.yes).format("0,0") : ''}</p>
                                            </div>
                                            <div className="list-item bgrey">
                                                <h5>No</h5>
                                                <p>{numbro(this.state.noPercent).format("0.00")}%</p>
                                                <p>{this.state.tally ? numbro(this.state.tally.no).format("0,0") : ''}</p>
                                            </div>
                                            <div className="list-item bgrey">
                                                <h5>No with Veto</h5>
                                                <p>{numbro(this.state.noWithVetoPercent).format("0.00")}%</p>
                                                <p>{this.state.tally ? numbro(this.state.tally.no_with_veto).format("0,0") : ''}</p>
                                            </div>
                                            <div className="list-item bgrey">
                                                <h5>Abstain</h5>
                                                <p>{numbro(this.state.abstainPercent).format("0.00")}%</p>
                                                <p>{this.state.tally ? numbro(this.state.tally.abstain).format("0,0") : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <div className="proposal-details">
                            <Card>

                                <Row>
                                    <Col lg={4} md={12} sm={12}>

                                        <div className="submission">
                                            <div className="submit-list">
                                                <p><b><T>proposals.proposalType</T>:</b></p>
                                                <p>{this.props.proposal.proposal_content.type.substr(4).match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(" ")}</p>
                                            </div>
                                            <div className="submit-list">
                                                <p><b><T>proposals.submitTime</T>:</b></p>
                                                <p>{moment.utc(this.state.proposal.submit_time).format("D MMM YYYY, h:mm:ssa z")}</p>
                                            </div>
                                            <div className="submit-list">
                                                <p><b><T>proposals.depositEndTime</T></b></p>
                                                <p>{moment.utc(this.state.proposal.deposit_end_time).format("D MMM YYYY, h:mm:ssa z")}</p>
                                            </div>
                                        </div>

                                    </Col>
                                    <Col lg={8} md={12} sm={12}>
                                        <div className="description">
                                            <p><b>Description</b></p>
                                            <p><Markdown markup={this.props.proposal.proposal_content.value.description} /></p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div className="vote-tabs">
                            {this.state.voteStarted ? <Row>
                                <Col lg={12}>
                                    <Card>
                                        <CardHeader>
                                            <h2>Votes</h2>
                                            <Nav tabs className='card-header-tabs'>
                                                {/* {['Bar', 'All', 'Yes', 'No', 'NoWithVeto', 'Abstain'].map((option) => */}
                                                {['Yes', 'No', 'NoWithVeto', 'Abstain'].map((option) =>
                                                    <NavItem key={option}><NavLink active={this.state.breakDownSelection == option}
                                                        onClick={() => this.setState({ breakDownSelection: option })}>
                                                        {option == 'Yes' ? 'Yes(0)': option}
                                                    </NavLink></NavItem>
                                                )}
                                            </Nav>
                                        </CardHeader>
                                        <CardBody>
                                            <TabContent activeTab={this.state.breakDownSelection == 'All' ? 'all' : 'all1'}>
                                                <TabPane tabId="all">
                                                    <div>
                                                        {this.renderTallyResultDetail(1, 'All')}
                                                        {/* <Row className="header">
                                                            <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-user"></i>Voter</Col>
                                                            <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-reply"></i>Answer</Col>
                                                            <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-hashtag"></i>TxHash</Col>
                                                            <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-clock"></i>Time</Col>
                                                        </Row>
                                                        <Row className="depo-body">
                                                            <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-user d-d-none"></i>{this.renderTallyResultDetail(1, 'Yes')}</Col>
                                                            <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-reply d-d-none"></i><VoteIcon vote="yes" /> Yes</Col>
                                                            <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-hashtag d-d-none"></i>TxHash</Col>
                                                            <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-clock d-d-none"></i>Time</Col>
                                                        </Row> */}
                                                    </div>
                                                    {/* <Progress multi>
                                                        <Progress bar animated color="success" value={this.state.yesPercent}><T>proposals.yes</T> {numbro(this.state.yesPercent).format("0.00")}%</Progress>
                                                        <Progress bar animated color="warning" value={this.state.abstainPercent}><T>proposals.abstain</T> {numbro(this.state.abstainPercent).format("0.00")}%</Progress>
                                                        <Progress bar animated color="danger" value={this.state.noPercent}><T>proposals.no</T> {numbro(this.state.noPercent).format("0.00")}%</Progress>
                                                        <Progress bar animated color="info" value={this.state.noWithVetoPercent}><T>proposals.noWithVeto</T> {numbro(this.state.noWithVetoPercent).format("0.00")}%</Progress>
                                                    </Progress> */}
                                                </TabPane>
                                                <TabPane tabId="all1">
                                                    <div>
                                                        {this.renderTallyResultDetail(1, 'Yes')}
                                                    </div>
                                                    {/* {this.renderPieChart()} */}
                                                </TabPane>

                                            </TabContent>
                                        </CardBody>
                                    </Card></Col>
                                {/* <Col xs={12}>
                                        <Card body className="tally-info">
                                            <em>
                                                <T _purify={false} percent={numbro(this.state.totalVotes / totalVotingPower).format("0.00%")}>proposals.percentageVoted</T><br />
                                                {this.state.proposalValid ? <T _props={{ className: 'text-success' }} tentative={(!this.state.voteEnded) ? '(tentatively) ' : ''} _purify={false}>proposals.validMessage</T> : (this.state.voteEnded) ? <T _props={{ className: 'text-danger' }} quorum={numbro(this.props.chain.gov.tallyParams.quorum).format("0.00%")} _purify={false}>proposals.invalidMessage</T> : <T moreVotes={numbro(totalVotingPower * this.props.chain.gov.tallyParams.quorum - this.state.totalVotes).format("0,0")} _purify={false}>proposals.moreVoteMessage</T>}
                                            </em>
                                        </Card>
                                    </Col> */}
                            </Row>
                                : 'Voting not started yet.'}
                        </div>
                        <div className="depositor">
                            <Card>
                                <Row>
                                    <Col lg={12}>
                                        <h2>Depositors</h2>
                                    </Col>
                                </Row>
                                <Row className="header">
                                    <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-user"></i>Depositor</Col>
                                    <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-dollar-sign"></i>Amount</Col>
                                    <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-hashtag"></i>TxHash</Col>
                                    <Col lg={3} md={6} sm={6} xs={12}><i className="fas fa-clock"></i>Time</Col>
                                </Row>
                                <Row className="depo-body">
                                    <Col lg={12}>
                                        <div className="nodata">
                                            <div>
                                                <img src="/img/nodata.png" className="img-fluid nodata-img" />
                                                <h2>No Data</h2>
                                            </div>
                                        </div>
                                    </Col>
                                    {/* <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-user d-d-none"></i>Depositor</Col>
                                    <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-dollar-sign d-d-none"></i>Amount</Col>
                                    <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-hashtag d-d-none"></i>TxHash</Col>
                                    <Col lg={3} md={6} sm={6} xs={12} className="mb"><i className="fas fa-clock d-d-none"></i>Time</Col> */}
                                </Row>
                            </Card>
                        </div>
                        {/* <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.proposalID</T></Col>
                            <Col md={9} className="value">{this.props.proposal.proposal_id}</Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.proposer</T></Col>
                            <Col md={9} className="value"><Account address={this.props.proposal.proposer} /></Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.title</T></Col>
                            <Col md={9} className="value">{this.props.proposal.proposal_content.value.title}</Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.description</T></Col>
                            <Col md={9} className="value"><Markdown markup={this.props.proposal.proposal_content.value.description} /></Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.proposalType</T></Col>
                            <Col md={9} className="value">{this.props.proposal.proposal_content.type.substr(4).match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(" ")}</Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.proposalStatus</T></Col>
                            <Col md={9} className="value"><ProposalStatusIcon status={this.props.proposal.proposal_status} /> {(this.props.proposal.proposal_status) ? this.props.proposal.proposal_status.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(" ") : ''}</Col>
                        </Row> */}
                        {/* <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.deposit</T></Col>
                            <Col xs={10} md={8} className="value">{this.state.deposit}</Col>
                            <Col xs={2} md={1} onClick={(e) => this.handleClick(5, e)}><i className="material-icons">{this.state.open === 5 ? 'arrow_drop_down' : 'arrow_left'}</i></Col>
                            <Col xs={12}>
                                <Result className="tally-result-detail" pose={this.state.open === 5 ? 'open' : 'closed'}>
                                    <ol>
                                        {this.props.proposal.deposits ? this.props.proposal.deposits.map((deposit, i) => {
                                            return <li key={i}>
                                                <Account address={deposit.depositor} />
                                                {deposit.amount.map((amount, j) => {
                                                    return <div key={j}>{numbro(amount.amount / Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</div>
                                                })}
                                            </li>
                                        }) : ''}
                                    </ol>
                                </Result>
                            </Col>
                        </Row> */}
                        {/* <Row className="mb-2 border-top tally-result">
                            <Col md={3} className="label"><T>proposals.tallyResult</T> <em>({this.state.tallyDate})</em></Col>
                            <Col md={9}>
                                <Row>
                                    <Col xs={6} sm={5} md={4}><VoteIcon vote="yes" /> Yes</Col>
                                    <Col xs={5} sm={6} md={7} className="tally-result-value">{this.state.tally ? numbro(this.state.tally.yes).format("0,0") : ''}</Col>
                                    <Col xs={1} onClick={(e) => this.handleClick(1, e)}><i className="material-icons">{this.state.open === 1 ? 'arrow_drop_down' : 'arrow_left'}</i></Col>
                                    <Col xs={12}>
                                        {this.renderTallyResultDetail(1, 'Yes')}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} sm={5} md={4}><VoteIcon vote="abstain" /> Abstain</Col>
                                    <Col xs={5} sm={6} md={7} className="tally-result-value">{this.state.tally ? numbro(this.state.tally.abstain).format("0,0") : ''}</Col>
                                    <Col xs={1} onClick={(e) => this.handleClick(2, e)}><i className="material-icons">{this.state.open === 2 ? 'arrow_drop_down' : 'arrow_left'}</i></Col>
                                    <Col xs={12}>
                                        {this.renderTallyResultDetail(2, 'Abstain')}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} sm={5} md={4}><VoteIcon vote="no" /> No</Col>
                                    <Col xs={5} sm={6} md={7} className="tally-result-value">{this.state.tally ? numbro(this.state.tally.no).format("0,0") : ''}</Col>
                                    <Col xs={1} onClick={(e) => this.handleClick(3, e)}><i className="material-icons">{this.state.open === 3 ? 'arrow_drop_down' : 'arrow_left'}</i></Col>
                                    <Col xs={12}>
                                        {this.renderTallyResultDetail(3, 'No')}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} sm={5} md={4}><VoteIcon vote="no_with_veto" /> No with Veto</Col>
                                    <Col xs={5} sm={6} md={7} className="tally-result-value">{this.state.tally ? numbro(this.state.tally.no_with_veto).format("0,0") : ''}</Col>
                                    <Col xs={1} onClick={(e) => this.handleClick(4, e)}><i className="material-icons">{this.state.open === 4 ? 'arrow_drop_down' : 'arrow_left'}</i></Col>
                                    <Col xs={12}>
                                        {this.renderTallyResultDetail(4, 'NoWithVeto')}
                                    </Col>
                                </Row>
                                {this.state.voteStarted ? <Row>
                                    <Col xs={12}><Card>
                                        <CardHeader>
                                            <Nav tabs className='card-header-tabs'>
                                                {['Bar', 'All', 'Yes', 'Abstain', 'No', 'NoWithVeto'].map((option) =>
                                                    <NavItem key={option}><NavLink className='no-select' active={this.state.breakDownSelection == option}
                                                        onClick={() => this.setState({ breakDownSelection: option })}>
                                                        {option == 'Bar' ? 'All(Bar)' : option}
                                                    </NavLink></NavItem>
                                                )}
                                            </Nav>
                                        </CardHeader>
                                        <CardBody>
                                            <TabContent activeTab={this.state.breakDownSelection == 'Bar' ? 'bar' : 'pie'}>
                                                <TabPane tabId="bar">
                                                    <Progress multi>
                                                        <Progress bar animated color="success" value={this.state.yesPercent}><T>proposals.yes</T> {numbro(this.state.yesPercent).format("0.00")}%</Progress>
                                                        <Progress bar animated color="warning" value={this.state.abstainPercent}><T>proposals.abstain</T> {numbro(this.state.abstainPercent).format("0.00")}%</Progress>
                                                        <Progress bar animated color="danger" value={this.state.noPercent}><T>proposals.no</T> {numbro(this.state.noPercent).format("0.00")}%</Progress>
                                                        <Progress bar animated color="info" value={this.state.noWithVetoPercent}><T>proposals.noWithVeto</T> {numbro(this.state.noWithVetoPercent).format("0.00")}%</Progress>
                                                    </Progress>
                                                </TabPane>
                                                <TabPane tabId="pie">
                                                    {this.renderPieChart()}
                                                </TabPane>

                                            </TabContent>
                                        </CardBody>
                                    </Card></Col>
                                    <Col xs={12}>
                                        <Card body className="tally-info">
                                            <em>
                                                <T _purify={false} percent={numbro(this.state.totalVotes / totalVotingPower).format("0.00%")}>proposals.percentageVoted</T><br />
                                                {this.state.proposalValid ? <T _props={{ className: 'text-success' }} tentative={(!this.state.voteEnded) ? '(tentatively) ' : ''} _purify={false}>proposals.validMessage</T> : (this.state.voteEnded) ? <T _props={{ className: 'text-danger' }} quorum={numbro(this.props.chain.gov.tallyParams.quorum).format("0.00%")} _purify={false}>proposals.invalidMessage</T> : <T moreVotes={numbro(totalVotingPower * this.props.chain.gov.tallyParams.quorum - this.state.totalVotes).format("0,0")} _purify={false}>proposals.moreVoteMessage</T>}
                                            </em>
                                        </Card>
                                    </Col>
                                </Row> : 'Voting not started yet.'}
                            </Col>
                        </Row> */}
                        {/* <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.submitTime</T></Col>
                            <Col md={9} className="value">{moment.utc(this.state.proposal.submit_time).format("D MMM YYYY, h:mm:ssa z")}</Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.depositEndTime</T></Col>
                            <Col md={9} className="value">{moment.utc(this.state.proposal.deposit_end_time).format("D MMM YYYY, h:mm:ssa z")}</Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.votingStartTime</T></Col>
                            <Col md={9} className="value">{(this.state.proposal.voting_start_time != '0001-01-01T00:00:00Z') ? moment.utc(this.state.proposal.voting_start_time).format("D MMM YYYY, h:mm:ssa z") : '-'}</Col>
                        </Row>
                        <Row className="mb-2 border-top">
                            <Col md={3} className="label"><T>proposals.votingEndTime</T></Col>
                            <Col md={9} className="value">{(this.state.proposal.voting_start_time != '0001-01-01T00:00:00Z') ? moment.utc(this.state.proposal.voting_end_time).format("D MMM YYYY, h:mm:ssa z") : '-'}</Col>
                        </Row> */}
                    </div>
                    <Row className='clearfix'>
                        <Link to={`/proposals/${proposalId - 1}`} className={`btn btn-outline-danger float-left ${proposalId - 1 <= 0 ? "disabled" : ""}`}><i className="fas fa-caret-left"></i> Prev Proposal </Link>
                        <Link to="/proposals" className="btn" style={{ margin: 'auto' }}><i className="fas fa-caret-up"></i> <T>common.backToList</T></Link>
                        <Link to={`/proposals/${proposalId + 1}`} className={`btn btn-outline-danger float-right ${proposalId >= maxProposalId ? "disabled" : ""}`}><i className="fas fa-caret-right"></i> Next Proposal</Link>
                    </Row>
                </div>
            }
            else {
                return <div>
                    <T>proposals.notFound</T>
                </div>
            }
        }
    }
}
