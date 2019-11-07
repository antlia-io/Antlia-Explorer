import React from 'react';
import { render } from "react-dom";
import {
    Row, Col, Card, CardText,
    CardTitle, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner
} from 'reactstrap';
import moment from 'moment';
import numbro from 'numbro';
import i18n from 'meteor/universe:i18n';
import SemiCircleProgressBar from "react-progressbar-semicircle";
// import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import Bonded from "./Bonded";
import RandomValidators from "./RandomValidators";
import "react-circular-progressbar/dist/styles.css";




export default class ChainStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) {
            return <Spinner type="grow" color="primary" />
        }
        return (
            <div>
                <Card>
                    <div className="randomstatus">
                        <h4>Random Status</h4>
                        {/* <Row>
                            <Col lg={6} md={6}> */}
                            <div className="content">
                                <div className="bonded">
                                    <CardTitle>Bonded</CardTitle>
                                    <CardText><span className="value">96.34%</span></CardText>
                                    <CardText>180 M / 240 M</CardText>
                                    {/* <Bonded values={[15, 50]}>
                                        {value => (
                                            <CircularProgressbar
                                                value={value}
                                                text={`${value}%`}
                                                circleRatio={0.50}
                                                styles={buildStyles({
                                                    rotation: 1 / 2 + 1 / 4,
                                                    strokeLinecap: "butt",
                                                    trailColor: "#eee"
                                                })}
                                            />
                                        )}
                                    </Bonded> */}
                                    {/* <SemiCircleProgressBar percentage={50} animationSpeed={4}/> */}
                                    <div class="semi-donut"></div>
                                    <div className="color-values">
                                        <div className="item">
                                            <span></span>
                                            <p>73.29%</p>
                                        </div>
                                        <div className="item">
                                            <span></span>
                                            <p>100%</p>
                                        </div>
                                    </div>
                                </div>
                            {/* </Col>
                            <Col lg={6} md={6}> */}
                                <div className="validators">
                                <CardTitle>Validators</CardTitle>
                                    <CardText><span className="value">96.34%</span></CardText>
                                    <CardText>Active</CardText>
                                    {/* <RandomValidators values={[10, 50]}>
                                        {value => (
                                            <CircularProgressbar
                                                value={value}
                                                text={`${value}%`}
                                                circleRatio={0.50}
                                                styles={buildStyles({
                                                    rotation: 1 / 2 + 1 / 4,
                                                    strokeLinecap: "butt",
                                                    trailColor: "#eee"
                                                })}
                                            />
                                        )}
                                    </RandomValidators> */}
                                    <div class="semi-donut"></div>
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
                            {/* </Col>

                        </Row> */}
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}