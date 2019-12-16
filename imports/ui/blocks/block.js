import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import numbro from 'numbro';
import Avatar from '../components/Avatar.jsx';
import TimeAgo from "../components/TimeAgo.jsx";

export default class Block extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let proposer = this.props.block.proposer();
        if (proposer) {
            let moniker = (proposer.description && proposer.description.moniker) ? proposer.description.moniker : proposer.address;
            let identity = (proposer.description && proposer.description.identity) ? proposer.description.identity : "";
            return <Row className="block-info">
                <Col xs={12} sm={6} md={6} lg={3} className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i><Link to="#">{this.props.block.hash}</Link> </Col>
                <Col xs={12} sm={6} md={6} lg={3}><i className="fas fa-calendar d-lg-none"></i><Link to={"/validator/" + this.props.block.proposerAddress}><Avatar moniker={moniker} identity={identity} address={this.props.block.proposerAddress} list={true} /> {moniker}</Link></Col>
                <Col xs={12} sm={6} md={6} lg={2}><i className="fas fa-sync d-lg-none"></i> {numbro(this.props.block.transNum).format('0,0')}</Col>
                <Col xs={12} sm={6} md={6} lg={2}><i className="fas fa-database d-lg-none"></i> <Link to={"/blocks/" + this.props.block.height}>{numbro(this.props.block.height).format('0,0')}</Link></Col>
                <Col xs={12} sm={6} md={6} lg={2}>
                    <div className="timealign"> <i className="fas fa-clock d-lg-none"></i>
                        <TimeAgo time={this.props.block.time} /></div>
                    {/* <i className="fas fa-clock d-lg-none"></i> {moment.utc(this.props.block.time).format("D MMM YYYY, h:mm:ssa")} */}
                </Col>
            </Row>
        }
        else {
            return <div className="blockrow"></div>
        }
    }
}