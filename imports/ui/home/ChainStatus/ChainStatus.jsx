import React from 'react';
import { render } from "react-dom";
import {
    Row, Col, Card, CardText,
    CardTitle, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner
} from 'reactstrap';
import moment from 'moment';
import numbro from 'numbro';
import i18n from 'meteor/universe:i18n';
// import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from "./ChangingProgressProvider";
import RadialSeparators from "./RadialSeparators";
import "react-circular-progressbar/dist/styles.css";
//semi circle progress bar
import SemiCircleProgressBar from "react-progressbar-semicircle";

const T = i18n.createComponent();
let sum = 0
var length = 0
export default class ChainStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Precommit: "Precommit",
            blockHeight: 0,
            blockTime: 0,
            averageBlockTime: 0,
            votingPower: 0,
            numValidators: 0,
            totalNumValidators: 0,
            avgBlockTimeType: "",
            avgVotingPowerType: "",
            blockTimeText: <T>chainStatus.all</T>,
            votingPowerText: <T>chainStatus.now</T>,
            activeValidatorsUpTime: 0,
            activeValidatorsVotingPower: 0
        }
    }

    componentDidUpdate(prevProps) {
     
        if(prevProps.validators.length !== this.props.validators.length){
            this.props.validators.map((type,key)=>{
                if(type.jailed===false){
                  sum=sum+type.uptime
                  length  = length+1
                }
            })
        }
        if (prevProps != this.props) {
           
            if (this.props.validators.length > 0 && this.props.chainStatus) {
              
                this.setState({
                    blockHeight: numbro(this.props.status.latestBlockHeight).format({ thousandSeparated: true }),
                    blockTime: moment.utc(this.props.status.latestBlockTime).format("D MMM YYYY hh:mm:ssa z"),
                    delegatedTokens: numbro(this.props.status.totalVotingPower).format('0,0.00a'),
                    numValidators: this.props.status.validators,
                    totalNumValidators: this.props.status.totalValidators,
                    bondedTokens: this.props.states.bondedTokens,
                    notBondedTokens: this.props.states.notBondedTokens,
                    validators: this.props.validators
                })
            }
            else {
                this.setState({
                    validators: ""
                });
            }

            switch (this.state.avgBlockTimeType) {
                case "":
                    this.setState({
                        averageBlockTime: numbro(this.props.status.blockTime / 1000).format('0,0.00')
                    })
                    break;
                case "m":
                    this.setState({
                        averageBlockTime: numbro(this.props.status.lastMinuteBlockTime / 1000).format('0,0.00')
                    })
                    break;
                case "h":
                    this.setState({
                        averageBlockTime: numbro(this.props.status.lastHourBlockTime / 1000).format('0,0.00')
                    })
                    break;
                case "d":
                    this.setState({
                        averageBlockTime: numbro(this.props.status.lastDayBlockTime / 1000).format('0,0.00')
                    })
                    break;
            }

            switch (this.state.avgVotingPowerType) {
                case "":
                    this.setState({
                        votingPower: numbro(this.props.status.activeVotingPower).format('0,0.00a'),
                    });
                    break;
                case "h":
                    this.setState({
                        votingPower: numbro(this.props.status.lastHourVotingPower).format('0,0.00a'),
                    });
                    break;
                case "d":
                    this.setState({
                        votingPower: numbro(this.props.status.lastDayVotingPower).format('0,0.00a'),
                    });
                    break;

            }

        }
    }

    handleSwitchBlockTime = (type, e) => {
        e.preventDefault();
        switch (type) {
            case "":
                this.setState({
                    blockTimeText: <T>chainStatus.all</T>,
                    avgBlockTimeType: "",
                    averageBlockTime: numbro(this.props.status.blockTime / 1000).format('0,0.00')
                })
                break;
            case "m":
                this.setState({
                    blockTimeText: "1m",
                    avgBlockTimeType: "m",
                    averageBlockTime: numbro(this.props.status.lastMinuteBlockTime / 1000).format('0,0.00')
                })
                break;
            case "h":
                this.setState({
                    blockTimeText: "1h",
                    avgBlockTimeType: "h",
                    averageBlockTime: numbro(this.props.status.lastHourBlockTime / 1000).format('0,0.00')
                })
                break;
            case "d":
                this.setState({
                    blockTimeText: "1d",
                    avgBlockTimeType: "d",
                    averageBlockTime: numbro(this.props.status.lastDayBlockTime / 1000).format('0,0.00')
                })
                break;

        }
    }

    handleSwitchVotingPower = (type, e) => {
        e.preventDefault();
        switch (type) {
            case "":
                this.setState({
                    votingPowerText: <T>chainStatus.now</T>,
                    avgVotingPowerType: "",
                    votingPower: numbro(this.props.status.activeVotingPower).format('0,0.00a')
                })
                break;
            case "h":
                this.setState({
                    votingPowerText: "1h",
                    avgVotingPowerType: "h",
                    votingPower: numbro(this.props.status.lastHourVotingPower).format('0,0.00a')
                })
                break;
            case "d":
                this.setState({
                    votingPowerText: "1d",
                    avgVotingPowerType: "d",
                    votingPower: numbro(this.props.status.lastDayVotingPower).format('0,0.00a')
                })
                break;

        }
    }

    render() {
        if (this.props.loading) {
            return <Spinner type="grow" color="primary" />
        }
        else {
            if (this.props.statusExist && this.props.status.prevotes) {
                return (
                    <div>
                        <Row>
                            <Col lg={6} md={12}>
                                <Card>
                                    <div className="activestatus">
                                        <h4>Active Status</h4>
                                        {/* <Row>
                                    <Col lg={6} md={6}> */}
                                        <div className="content">
                                            <div className="validator-height">
                                                <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                                                    {value => (
                                                        <CircularProgressbar
                                                            value={value}
                                                            // text={this.state.Precommit}
                                                            text={`${this.state.blockHeight}`}
                                                            circleRatio={0.999}
                                                            styles={buildStyles({
                                                                rotation: 1 / 2 + 1 / 8,
                                                                strokeLinecap: "butt",
                                                                trailColor: "#eee"
                                                            })}
                                                        />
                                                    )} 
                                                </ChangingProgressProvider>
                                            </div>
                                            <div className="statusdetail">
                                                <div className="activevalidator">
                                                    <CardTitle><T>chainStatus.activeValidators</T></CardTitle>
                                                    <CardText><span className="value">{this.state.numValidators}</span></CardText>
                                                    <CardText><T totalValidators={this.state.totalNumValidators}>chainStatus.outOfValidators</T></CardText>
                                                </div>
                                                <div className="line"></div>
                                                <div className="averagetime">
                                                    <UncontrolledDropdown size="sm" className="more">
                                                        <DropdownToggle>
                                                            <i className="material-icons">more_vert</i>
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={(e) => this.handleSwitchBlockTime("", e)}><T>chainStatus.allTime</T></DropdownItem>
                                                            {this.props.status.lastMinuteBlockTime ? <DropdownItem onClick={(e) => this.handleSwitchBlockTime("m", e)}><T>chainStatus.lastMinute</T></DropdownItem> : ''}
                                                            {this.props.status.lastHourBlockTime ? <DropdownItem onClick={(e) => this.handleSwitchBlockTime("h", e)}><T>chainStatus.lastHour</T></DropdownItem> : ''}
                                                            {this.props.status.lastDayBlockTime ? <DropdownItem onClick={(e) => this.handleSwitchBlockTime("d", e)}><T>chainStatus.lastDay</T> </DropdownItem> : ''}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                    <CardTitle><T>chainStatus.averageBlockTime</T> ({this.state.blockTimeText})</CardTitle>
                                                    <CardText>
                                                        <span className="value">{this.state.averageBlockTime}</span></CardText>
                                                    <CardText>
                                                        <T>chainStatus.seconds</T>
                                                    </CardText>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={6} md={12}>
                                <Card>
                                    <div className="randomstatus">
                                        <h4>Random Status</h4>
                                        <div className="content">
                                            <div className="bonded">
                                                <CardTitle>Bonded</CardTitle>
                                                <CardText><span className="value">{numbro(this.state.bondedTokens / (this.state.bondedTokens + this.state.notBondedTokens)).format("0.00%")}</span></CardText>
                                                <CardText>{this.state.votingPower} / {numbro((this.state.bondedTokens + this.state.notBondedTokens) / Meteor.settings.public.stakingFraction).format("0.00a")}</CardText>
                                                <SemiCircleProgressBar
                                                    percentage={(this.state.bondedTokens / (this.state.bondedTokens + this.state.notBondedTokens)) * 100}
                                                    diameter={130}
                                                    animationSpeed={4}
                                                    className="table-semi-circle"
                                                    stroke="#660099"
                                                    strokeWidth={20}
                                                />
                                                <div className="color-values">
                                                    <div className="item">
                                                        <span></span>
                                                        <p>{numbro(this.state.bondedTokens / (this.state.bondedTokens + this.state.notBondedTokens)).format("0.00%")}</p>
                                                    </div>
                                                    <div className="item">
                                                        <span></span>
                                                        <p>100%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="validators">
                                                <CardTitle>Validators</CardTitle>
                                                <CardText><span className="value">
                                                    {/* {sum/length} */}
                                                    {numbro((sum / length)).format('0.0%')}
                                                    </span>
                                                    </CardText>
                                                <CardText>Active</CardText>
                                                <SemiCircleProgressBar
                                                    // percentage={(this.state.activeValidatorsUpTime / this.props.validators.length) * 100}
                                                    percentage={sum/length}
                                                    diameter={130}
                                                    animationSpeed={4}
                                                    className="table-semi-circle"
                                                    stroke="#ffb901"
                                                    strokeWidth={20}
                                                />
                                                <div className="color-values">
                                                    <div className="item">
                                                        <span></span>
                                                        <p>UpTime</p>
                                                    </div>
                                                    <div className="item">
                                                        <span></span>
                                                        <p>Voting Power</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>


                        {/* <Row className="status text-center">
                            <Col lg={6}>
                                <Card body className="shade">
                                    <CardTitle><T>chainStatus.latestHeight</T></CardTitle>
                                    <CardText>
                                        <span className="display-4 value text-primary">{this.state.blockHeight}</span>
                                        {this.state.blockTime}
                                    </CardText>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card body className="shade">
                                    <UncontrolledDropdown size="sm" className="more">
                                        <DropdownToggle>
                                            <i className="material-icons">more_vert</i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={(e) => this.handleSwitchVotingPower("", e)}><T>chainStatus.now</T></DropdownItem>
                                            {this.props.status.lastHourVotingPower ? <DropdownItem onClick={(e) => this.handleSwitchVotingPower("h", e)}><T>chainStatus.lastHour</T></DropdownItem> : ''}
                                            {this.props.status.lastDayVotingPower ? <DropdownItem onClick={(e) => this.handleSwitchVotingPower("d", e)}><T>chainStatus.lastDay</T></DropdownItem> : ''}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <CardTitle><T>chainStatus.onlineVotingPower</T> ({this.state.votingPowerText})</CardTitle>
                                    <CardText><span className="display-4 value text-primary">{this.state.votingPower}</span><T percent={numbro(this.state.bondedTokens / (this.state.bondedTokens + this.state.notBondedTokens)).format("0.00%")} totalStakes={numbro((this.state.bondedTokens + this.state.notBondedTokens) / Meteor.settings.public.stakingFraction).format("0.00a")} denom={Meteor.settings.public.stakingDenom}>chainStatus.fromTotalStakes</T></CardText>
                                </Card>
                            </Col>
                        </Row> */}
                        {/* <Row className="status text-center">
                            <Col lg={6}>
                                <Card body className="shade">
                                    <CardTitle><T>chainStatus.activeValidators</T></CardTitle>
                                    <CardText><span className="display-4 value text-primary">{this.state.numValidators}</span><T totalValidators={this.state.totalNumValidators}>chainStatus.outOfValidators</T></CardText>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card body className="shade">
                                    <UncontrolledDropdown size="sm" className="more">
                                        <DropdownToggle>
                                            <i className="material-icons">more_vert</i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={(e) => this.handleSwitchBlockTime("", e)}><T>chainStatus.allTime</T></DropdownItem>
                                            {this.props.status.lastMinuteBlockTime ? <DropdownItem onClick={(e) => this.handleSwitchBlockTime("m", e)}><T>chainStatus.lastMinute</T></DropdownItem> : ''}
                                            {this.props.status.lastHourBlockTime ? <DropdownItem onClick={(e) => this.handleSwitchBlockTime("h", e)}><T>chainStatus.lastHour</T></DropdownItem> : ''}
                                            {this.props.status.lastDayBlockTime ? <DropdownItem onClick={(e) => this.handleSwitchBlockTime("d", e)}><T>chainStatus.lastDay</T> </DropdownItem> : ''}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <CardTitle><T>chainStatus.averageBlockTime</T> ({this.state.blockTimeText})</CardTitle>
                                    <CardText>
                                        <span className="display-4 value text-primary">{this.state.averageBlockTime}</span><T>chainStatus.seconds</T>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row> */}
                    </div>
                )
            }
            else {
                return <div></div>
            }
        }
    }
}