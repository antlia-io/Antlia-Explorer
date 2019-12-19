import React from 'react';
import { Card, CardFooter, CardBody, Col, Row, Badge } from 'reactstrap';
import momemt from 'moment';
import numbro from 'numbro';
import Account from './Account.jsx';
import i18n from 'meteor/universe:i18n';


const T = i18n.createComponent();
export default class PowerHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tx: "",
            diff: <span className={"text-" + ((props.votingPower - props.prevVotingPower > 0) ? "success" : "danger") + " vp-diff"}>({numbro(props.votingPower - props.prevVotingPower).format("+0,0")})</span>
        }

        Meteor.call('Transactions.findDelegation', this.props.address, this.props.height, (err, result) => {
            if (err) {
                // console.log(err);
            }
            if (result) {
                // console.log(result);
                let self = this;
                this.setState({
                    tx: result.map((msg, i) => <CardFooter key={i} className="text-secondary">
                        <Row>
                            <Col md={12} lg={8}>
                                {(msg.tx.value.msg && msg.tx.value.msg.length > 0) ? msg.tx.value.msg.map((m, j) => {
                                    switch (m.type) {
                                        case "cosmos-sdk/MsgBeginRedelegate":
                                            return <Row key={j}>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={12} sm={12} md={4} lg={4}><T>validators.delegator</T></Col>
                                                        <Col xs={12} sm={12} md={8} lg={8} className="address" data-delegator-address={m.value.delegator_address}><Account address={m.value.delegator_address} /></Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={12} sm={12} md={4} lg={4}>{(this.props.address == m.value.validator_dst_address) ? <T>activities.from</T> : <T>activities.to</T>}</Col>
                                                        <Col xs={12} sm={12} md={8} lg={8} className="address" data-validator-address={(this.props.address == m.value.validator_dst_address) ? m.value.validator_src_address : m.value.validator_dst_address}><Account address={(this.props.address == m.value.validator_dst_address) ? m.value.validator_src_address : m.value.validator_dst_address} /></Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={12} sm={12} md={4} lg={4}><T>validators.amount</T></Col>
                                                        <Col xs={12} sm={12} md={8} lg={8}>{numbro(m.value.amount.amount / Meteor.settings.public.stakingFraction).format('0,0')} {Meteor.settings.public.stakingDenom}</Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        case "cosmos-sdk/MsgDelegate":
                                            if (m.value.validator_address == self.props.address) {
                                                return <Row key={j}>
                                                    <Col xs={12}>
                                                        <Row>
                                                            <Col xs={12} sm={12} md={6} lg={4}><T>validators.delegator</T></Col>
                                                            <Col xs={12} sm={12} md={6} lg={4} className="address" data-delegator-address={m.value.delegator_address}><Account address={m.value.delegator_address} /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <Row>
                                                            <Col xs={12} sm={12} md={6} lg={4}><T>validators.amount</T></Col>
                                                            <Col xs={12} sm={12} md={6} lg={4}><span>{numbro(m.value.amount.amount).format('0,0')} {m.value.amount.denom}</span></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            }
                                            else {
                                                return;
                                            }
                                        case "cosmos-sdk/MsgCreateValidator":
                                            return <Row key={j}>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={12} sm={12} md={4} lg={4}><T>validators.delegator</T></Col>
                                                        <Col xs={12} sm={12} md={8} lg={8} className="address" data-delegator-address={m.value.delegator_address}><Account address={m.value.delegator_address} /></Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={12} sm={12} md={4} lg={4}><T>validators.amount</T></Col>
                                                        <Col xs={12} sm={12} md={8} lg={8}>{numbro(m.value.value.amount).format('0,0')} {m.value.value.denom}</Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        case "cosmos-sdk/MsgUndelegate":
                                            return <Row key={j}>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={12} sm={12} md={4} lg={4}><T>validators.delegator</T></Col>
                                                        <Col xs={12} sm={12} md={8} lg={8} className="address" data-delegator-address={m.value.delegator_address}><Account address={m.value.delegator_address} /></Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col  xs={12} sm={12} md={4} lg={4}><T>validators.amount</T></Col>
                                                        <Col  xs={12} sm={12} md={8} lg={8}><span>{numbro(m.value.amount.amount).format('0,0')} {m.value.amount.denom}</span></Col>
                                                    </Row>
                                                </Col>
                                            </Row>

                                    }
                                }) : ''}</Col>
                            <Col md={12} lg={4}>
                                <Row>
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={12}>
                                                {(msg.tx.value.msg && msg.tx.value.msg.length > 0) ? msg.tx.value.msg.map((m, j) => {
                                                    switch (m.type) {
                                                        case "cosmos-sdk/MsgBeginRedelegate":
                                                            return <div key={j}><Badge color="success"><T>messageTypes.redelegate</T></Badge></div>;
                                                        case "cosmos-sdk/MsgDelegate":
                                                            if (m.value.validator_address == self.props.address) {
                                                                return <div key={j}><Badge color="success"><T>messageTypes.delegate</T></Badge></div>;
                                                            }
                                                            else
                                                                return;
                                                        case "cosmos-sdk/MsgCreateValidator":
                                                            return <div key={j}><Badge color="warning"><T>messageTypes.createValidator</T></Badge></div>;
                                                        case "cosmos-sdk/MsgUnjail":
                                                            return <div key={j}><Badge color="info"><T>messageTypes.unjail</T></Badge></div>;
                                                        case "cosmos-sdk/MsgUndelegate":
                                                            return <div key={j}><Badge color="danger"><T>messageTypes.undelegate</T></Badge></div>;
                                                    }
                                                }) : ''}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={6} md={4} lg={4} className="fee"><T>transactions.fee</T></Col>
                                            <Col xs={12} sm={6} md={8} lg={8}>{(msg.tx.value.fee.amount && msg.tx.value.fee.amount.length > 0) ? msg.tx.value.fee.amount.map((amount, i) => {
                                                if (i > 0) {
                                                    return <span key={i}> ,{numbro(amount.amount).format('0,0')} {amount.denom}</span>
                                                }
                                                else {
                                                    return <span key={i}>{numbro(amount.amount).format('0,0')} {amount.denom}</span>
                                                }
                                            }) : '0'}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardFooter>)
                })
            }
        });
    }

    render() {
        let changeClass = "";
        switch (this.props.type) {
            case 'up':
                changeClass = "fas fa-chevron-circle-up";
                break;
            case 'down':
                changeClass = "fas fa-chevron-circle-down";
                break;
            case 'remove':
                changeClass = "fas fa-minus-circle";
                break;
            default:
                changeClass = "fas fa-plus-circle";
        }
        return (
            <div className={this.props.type}>
                <CardBody>
                    <div className="deskpart">
                        <Row>
                            <Col lg={1} md={1} className="ta"><span className={(this.props.type == 'down' || this.props.type == 'remove') ? 'text-danger' : (this.props.type == 'up' ? 'text-success' : 'text-warning')}><i className={changeClass}></i></span> </Col>
                            <Col lg={7} md={11} className="changevalues"><span className="voting-power">{numbro(this.props.prevVotingPower).format('0,0')}</span> <i className="material-icons">arrow_forward</i> <span className="voting-power">{numbro(this.props.votingPower).format('0,0')}</span> {this.state.diff}</Col>
                            <Col lg={4} md={12} className="time"><i className="fas fa-cube"></i> {numbro(this.props.height).format('0,0')}<br /><i className="fas fa-clock"></i> {momemt.utc(this.props.time).format("D MMM YYYY, h:mm:ssa z")}</Col>
                        </Row>
                        {this.state.tx}
                    </div>
                    <div className="respart">
                        <Row>
                            <Col lg={1} md={1} sm={12} xs={12} className="ta"><span className={(this.props.type == 'down' || this.props.type == 'remove') ? 'text-danger' : (this.props.type == 'up' ? 'text-success' : 'text-warning')}><i className={changeClass}></i></span> </Col>
                            <Col lg={11} md={11} sm={12} xs={12} className="changevalues"><span className="voting-power">{numbro(this.props.prevVotingPower).format('0,0')}</span> <i className="material-icons">arrow_forward</i> <span className="voting-power">{numbro(this.props.votingPower).format('0,0')}</span> {this.state.diff}</Col>
                            <Col lg={12} md={12} sm={12} xs={12} className="time"><i className="fas fa-cube"></i> {numbro(this.props.height).format('0,0')}<br /><i className="fas fa-clock"></i> {momemt.utc(this.props.time).format("D MMM YYYY, h:mm:ssa z")}</Col>
                        </Row>
                        {this.state.tx}
                    </div>
                </CardBody>
            </div>
        );
    }
}

