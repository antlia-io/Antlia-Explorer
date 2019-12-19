import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner } from 'reactstrap';
// import { TxIcon } from '../components/Icons.jsx';
// import Activities from '../components/Activities.jsx';
// import ColorErrors from '../components/ColorErrors.jsx';
// import ButtonActivities from '../components/ButtonActivities.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
// import numbro from 'numbro';
// import moment from 'moment';
// import Coin from '/both/utils/coins.js'

export const TransactionRow = (props) => {
    let tx = props.tx;
    if (props.id == props.tx.tx.value.msg[0].value.proposal_id) {
        return <Row className={(!props.blockList) ? "tx-info tx-row" : "bb"}>
            <Col xs={12} sm={12} md={6} lg={6} className="text-truncate textalign">
                <i className="fas fa-hashtag d-lg-none"></i> <Link to={"/transactions/" + tx.txhash}>{tx.txhash}</Link></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
                <i className="material-icons d-lg-none">schedule</i>
                <span className="time-align">
                    <TimeAgo time={tx.block().time} />
                </span>
            </Col>
        </Row>
    }
    else {
        return <p>No Data</p>
    }
}