import React, { Component } from 'react';
import { MsgType } from './MsgType.jsx';
import { Link } from 'react-router-dom';
import numbro from 'numbro';
import Account from './Account.jsx';
import i18n from 'meteor/universe:i18n';
import { Row, Col } from 'reactstrap';

const T = i18n.createComponent();

MultiSend = (props) => {
    return <div>
        {/* <p><T>activities.single</T>  */}
        {/* <MsgType type={props.msg.type} />  */}
        {/* <T>activities.happened</T></p>
        <p><T>activities.senders</T>
            <ul>
                {props.msg.value.inputs.map((data,i) =>{
                    return <li key={i}><Account address={data.address}/> <T>activities.sent</T> {data.coins.map((coin, j) =>{
                        return <p key={j} className="text-success">{numbro(coin.amount/Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</p>
                    })}
                    </li>
                })}
            </ul>
            <p><T>activities.receivers</T> </p>
            <ul>
                {props.msg.value.outputs.map((data,i) =>{
                    return <li key={i}><Account address={data.address}/> <T>activities.received</T> {data.coins.map((coin,j) =>{
                        return <p key={j} className="text-success">{numbro(coin.amount/Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</p>
                    })}</li>
                })}
            </ul>
        </p> */}
    </div>
}

export default class TransactionActivities extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        let msg = this.props.msg;
        switch (msg.type) {
            // bank
            case "color/MsgSend":
                let amount = '';
                for (let a in msg.value.amount) {
                    if (a > 0) {
                        amount += ', ' + numbro(msg.value.amount[a].amount / Meteor.settings.public.stakingFraction).format("0,0") + " " + Meteor.settings.public.stakingDenom;
                    }
                    else {
                        amount += numbro(msg.value.amount[a].amount / Meteor.settings.public.stakingFraction).format("0,0") + " " + Meteor.settings.public.stakingDenom;
                    }
                }
                return <p><Account address={msg.value.from_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /> <span>{amount}</span> <T>activities.to</T> <span className="address"><Account address={msg.value.to_address} /></span></p>
            case "color/MsgMultiSend":
                return <MultiSend msg={msg} />

            // staking
            case "color/MsgCreateValidator":
                return <p><Account address={msg.value.delegator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /> <T>activities.operatingAt</T> <span className="address"><Account address={msg.value.validator_address} /></span> <T>activities.withMoniker</T> <Link to="#">{msg.value.description.moniker}</Link></p>
            case "color/MsgEditValidator":
                return <p><Account address={msg.value.address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /></p>
            // case "color/MsgDelegate":
            //     return <p><Account address={msg.value.delegator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /> <span className="text-warning">{numbro(msg.value.amount.amount / Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</span> <T>activities.to</T> <Account address={msg.value.validator_address} /></p>
                case "color/MsgDelegate":
                    return (
                        <div>
                            <Row className="mb">
                                <Col lg={3} md={4} sm={6} xs={12}>From</Col>
                                <Col lg={9} md={8} sm={6} xs={12}><Account address={msg.value.delegator_address} />  {(this.props.invalid) ? <T>activities.failedTo</T> : ''}</Col>
                            </Row>
                            <Row className="mb">
                                <Col lg={3} md={4} sm={6} xs={12}>To</Col>
                                <Col lg={9} md={8} sm={6} xs={12}>{(this.props.invalid) ? <T>activities.failedTo</T> : ''}<Account address={msg.value.validator_address} /></Col>
                            </Row>
                            <Row className="mb">
                                <Col lg={3} md={4} sm={6} xs={12}>Status</Col>
                                <Col lg={9} md={8} sm={6} xs={12}><MsgType type={msg.type} /></Col>
                            </Row>
                            <Row className="mb">
                                <Col lg={3} md={4} sm={6} xs={12}>Amount</Col>
                                <Col lg={9} md={8} sm={6} xs={12}><span className="text-warning">{numbro(msg.value.amount.amount / Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</span></Col>
                            </Row>
                        </div>
                    );
                      
            case "color/MsgUndelegate":
                return <p><Account address={msg.value.delegator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /> <span className="text-warning">{numbro(msg.value.amount.amount / Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</span> <T>activities.from</T> <Account address={msg.value.validator_address} /></p>
            case "color/MsgBeginRedelegate":
                return <p><Account address={msg.value.delegator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /> <span className="text-warning">{numbro(msg.value.amount.amount / Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</span> <T>activities.from</T> <Account address={msg.value.validator_src_address} /> <T>activities.to</T> <Account address={msg.value.validator_dst_address} /></p>

            // gov
            // case "color/MsgSubmitProposal":
            //     return <p>
            //         <Account address={msg.value.proposer} />
            //         {(this.props.invalid) ? <T>activities.failedTo</T> : ''}
            //         <MsgType type={msg.type} />
            //         <T>activities.withTitle</T>
            //         <Link to={"/proposals/" + this.props.tags[2].value}>{msg.value.title}</Link>
            //     </p>
            case "color/MsgSubmitProposal":
                return (
                    <div>
                        <Row className="mb">
                            <Col lg={3} md={4} sm={6} xs={12}>From</Col>
                            <Col lg={9} md={8} sm={6} xs={12}><Account address={msg.value.proposer} />   {(this.props.invalid) ? <T>activities.failedTo</T> : ''}</Col>
                        </Row>
                        <Row className="mb">
                            <Col lg={3} md={4} sm={6} xs={12}>To</Col>
                            <Col lg={9} md={8} sm={6} xs={12}><Link to={"/proposals/" + this.props.tags[2].value}>{msg.value.title}</Link></Col>
                        </Row>
                        <Row className="mb">
                            <Col lg={3} md={4} sm={6} xs={12}>Status</Col>
                            <Col lg={9} md={8} sm={6} xs={12}><MsgType type={msg.type} /></Col>
                        </Row>
                    </div>
                );
            case "color/MsgDeposit":
                return <p><Account address={msg.value.depositor} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /> <span className="text-info">{msg.value.amount.map((amount, i) => {
                    if (i > 0) {
                        return " ," + numbro(amount.amount / Meteor.settings.public.stakingFraction).format("0,0") + " " + Meteor.settings.public.stakingDenom;
                    }
                    else {
                        return numbro(amount.amount / Meteor.settings.public.stakingFraction).format("0,0") + " " + Meteor.settings.public.stakingDenom;
                    }
                })}</span> <T>activities.to</T> <Link to={"/proposals/" + msg.value.proposal_id}><T>proposals.proposal</T> {msg.value.proposal_id}</Link></p>
            case "color/MsgVote":
                return <p><Account address={msg.value.voter} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} />  <Link to={"/proposals/" + msg.value.proposal_id}><T>proposals.proposal</T> {msg.value.proposal_id}</Link> <T>activities.withA</T> <p className="text-info">{msg.value.option}</p></p>

            // distribution
            case "color/MsgWithdrawValidatorCommission":
                return <p><Account address={msg.value.validator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /></p>
            case "color/MsgWithdrawDelegationReward":
                return <p><Account address={msg.value.delegator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /> <T>activities.from</T> <Account address={msg.value.validator_address} /></p>
            case "color/MsgModifyWithdrawAddress":
                return <p><Account address={msg.value.delegator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /></p>

            // slashing
            case "color/MsgUnjail":
                return <p><Account address={msg.value.delegator_address} /> {(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type={msg.type} /></p>

            // ibc
            case "color/IBCTransferMsg":
                return <MsgType type={msg.type} />
            case "color/IBCReceivpsg":
                return <MsgType type={msg.type} />

            default:
                return <div>

                    {JSON.stringify(msg.value)}
                </div>
        }
    }
}