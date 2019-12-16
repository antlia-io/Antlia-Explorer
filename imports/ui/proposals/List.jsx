import React, { Component } from 'react';
import moment from 'moment';
import { Table, Spinner, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DenomSymbol, ProposalStatusIcon } from '../components/Icons.jsx';
import numbro from 'numbro';
import i18n from 'meteor/universe:i18n';
import { Pie } from 'react-chartjs-2';

const T = i18n.createComponent();

const ProposalRow = (props) => {

    var yesvote = props.proposal.final_tally_result.yes;
    var novote = props.proposal.final_tally_result.no;
    var abstainvote = props.proposal.final_tally_result.abstain;

    var max = Math.max(yesvote, novote, abstainvote);

    let totalVotes = 0;
    for (let i in props.proposal.final_tally_result) {
        totalVotes += parseInt(props.proposal.final_tally_result[i]);
    }
    var data = {
        datasets: [
            {
                data: [
                    parseInt(max) / totalVotes * 100,
                ],
                backgroundColor: [
                    '#004bff',
                ],
                hoverBackgroundColor: [
                    '#004bff',
                ],
                // height: [
                //     "100px"
                // ],
                // width: [
                //     "100px"
                // ]

            }
        ]
    };
    return <Card>
        {/* <tr>
        <th className="counter">{props.proposal.proposalId}</th>
        <td className="title"><Link to={"/proposals/" + props.proposal.proposalId}>{props.proposal.proposal_content.value.title}</Link></td>
        <td className="status"><ProposalStatusIcon status={props.proposal.proposal_status} /><span>{props.proposal.proposal_status.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(" ")}</span></td>
        <td className="submit-block">{moment.utc(props.proposal.submit_time).format("D MMM YYYY, h:mm:ssa")}</td>
        <td className="voting-start">{(props.proposal.voting_start_time != "0001-01-01T00:00:00Z") ? moment.utc(props.proposal.voting_start_time).format("D MMM YYYY, h:mm:ssa") : 'Not started'}</td>
        <td className="deposit">{props.proposal.total_deposit ? props.proposal.total_deposit.map((deposit, i) => {
            return <div key={i}>{numbro(deposit.amount / Meteor.settings.public.stakingFraction).format('0,0')} {Meteor.settings.public.stakingDenom}</div>
        }) : '0'}</td>
    </tr> */}
        <div className="proposal-item">
            <div className="name-id">
                <p className="proposer"><b>Proposer</b> <Link to={"/proposals/" + props.proposal.proposalId}>{props.proposal.proposal_content.value.title}</Link></p>
                <p>Antlia Upgrade Proposal: <span className="pid"> {props.proposal.proposal_content.value.title}</span></p>
            </div>
            <div className="desc">
                <div className="vote-status">
                    <div className="status">
                        <span className="inner"><ProposalStatusIcon status={props.proposal.proposal_status} /><span>{props.proposal.proposal_status.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(" ")}</span></span></div>
                    <div className="most-turnover">
                        <div className="turnover">
                            <p className="label">Turnover</p>
                            <p className="value">{(numbro(parseInt(max) / totalVotes * 100).format("0.00") / 3).toFixed(4)}%</p>
                        </div>
                        <div className="ml"></div>
                        <div className="mostvoted">
                            <p className="label">Most Voted On</p>
                            <p className="value"><span className="blue-color"></span>
                                {numbro(parseInt(max) / totalVotes * 100).format("0.00")}%</p>
                        </div>
                    </div>
                </div>
                <div className="vote-graph">
                    <Pie data={data}  width="100px" height="100px"/>
                    {/* <img src="/img/acc-graph.png" /> */}
                </div>
            </div>
        </div>
    </Card>
}

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: {},
            options: {}
        }
        if (Meteor.isServer) {
            if (this.props.proposals.length > 0) {
                this.state = {
                    proposals: this.props.proposals.map((proposal, i) => {
                        return <ProposalRow key={i} index={i} proposal={proposal} />
                    })
                }
            }
        }
        else {

            this.state = {
                proposals: null
            }
        }
    }

    componentDidUpdate(prevState, prevProps) {
        if (this.props.proposals != prevState.proposals) {
            if (this.props.proposals.length > 0) {
                this.setState({
                    proposals: this.props.proposals.map((proposal, i) => {
                        return <ProposalRow key={i} index={i} proposal={proposal} />
                    })
                })
            }
        }
        // if (prevProps.stats != this.props.stats){
        //     let topPercent = this.props.stats.topTwentyPower/this.props.stats.totalVotingPower;
        //     let bottomPercent = this.props.stats.bottomEightyPower/this.props.stats.totalVotingPower;

        //     this.setState({
        //         data:{
        //             // labels:
        //             //     [
        //             //         "Top 20% ("+this.props.stats.numTopTwenty+") validators",
        //             //         "Rest 80% ("+this.props.stats.numBottomEighty+") validators"
        //             //     ]
        //             // ,
        //             datasets: [
        //                 {
        //                     data: [
        //                         "30",
        //                         "70"
        //                     ],
        //                     backgroundColor: [
        //                         '#004bff',
        //                         '#ddd'
        //                     ],
        //                     hoverBackgroundColor: [
        //                         '#004bff',
        //                         '#ddd'
        //                     ]
        //                 }
        //             ]
        //         },
        //         // options:{
        //         //     tooltips: {
        //         //         callbacks: {
        //         //             label: function(tooltipItem, data) {
        //         //                 var label = data.labels[tooltipItem.index] || '';

        //         //                 if (label) {
        //         //                     label += ' hold ';
        //         //                 }
        //         //                 label += numbro(data.datasets[0].data[tooltipItem.index]).format("0.00%");
        //         //                 label += " voting power";
        //         //                 return label;
        //         //             }
        //         //         }
        //         //     }
        //         // }
        //     });
        // }
    }

    render() {
        if (this.props.loading) {
            return <Spinner type="grow" color="primary" />
        }
        else if (!this.props.proposalsExist) {
            return <div><T>No Proposal Found</T></div>
        }
        else {
            return <div>
                {/* <div id="proposals-table" className="proposal-table">
                <Table striped className="proposal-list table-responsive">
                    <thead>
                        <tr>
                            <th className="counter"><i className="fas fa-hashtag"></i><T>proposals.proposalID</T></th>
                            <th className="title"><i className="fas fa-bars"></i><T>proposals.title</T></th>
                            <th className="status"><i className="fas fa-toggle-on"></i><T>proposals.status</T></th>
                            <th className="submit-block"><i className="fas fa-box"></i><T>proposals.submitTime</T> (UTC)</th>
                            <th className="voting-start"><i className="fas fa-box-open"></i><T>proposals.votingStartTime</T> (UTC)</th>
                            <th className="deposit"><i className="fas fa-dollar-sign"></i><T>proposals.totalDeposit</T></th>
                        </tr>
                    </thead>
                    <tbody>{this.state.proposals}</tbody>
                </Table>
                </div> */}
                <div className="proposal-list">
                    {this.state.proposals}
                    {/* <Card>
                        <div className="proposal-item">
                            <div className="name-id">
                                <p><b>Proposer</b> yiudgfiusgdifgsdfisdf</p>
                                <p>Antlia Upgrade Proposal ID: </p>
                            </div>
                            <div className="desc">
                                <div className="vote-status">
                                    <div className="status">Approved</div>
                                    <div className="most-turnover">
                                        <div className="turnover">
                                            <p className="label">Turnover</p>
                                            <p className="value">84.83%</p>
                                        </div>
                                        <div className="ml"></div>
                                        <div className="mostvoted">
                                            <p className="label">Most Voted On</p>
                                            <p className="value"><span className="blue-color"></span>Yes(99.20%)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="vote-graph">
                                <img src="/img/acc-graph.png" />
                                </div>
                            </div>
                        </div>
                    </Card> */}
                </div>
            </div>
        }
    }
}