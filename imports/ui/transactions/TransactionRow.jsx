import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner } from 'reactstrap';
import { TxIcon } from '../components/Icons.jsx';
import Activities from '../components/Activities.jsx';
import ColorErrors from '../components/ColorErrors.jsx';
import ButtonActivities from '../components/ButtonActivities.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
import numbro from 'numbro';
import moment from 'moment';
import Coin from '/both/utils/coins.js'

export const TransactionRow = (props) => {
    let tx = props.tx;
    // console.log(tx);
    return <Row className={(!props.blockList) ? "tx-info tx-row":"bb"}>
        {(!props.blockList) ? <Col xs={12} sm={6} md={4} lg={2}>{(tx.tx.value.msg && tx.tx.value.msg.length > 0) ? tx.tx.value.msg.map((msg) => {
            return <div class="type-align"><i className="material-icons d-lg-none">merge_type</i><ButtonActivities msg={msg} invalid={(!!tx.code)} tags={tx.tags} /></div>
        }) : ''}</Col> : ''}

        <Col className="resultpaddingleft" xs={12} sm={6} md={4} lg={(!props.blockList) ? 1 : 4}>{(!tx.code) ? <TxIcon valid /> : <TxIcon />}</Col>

        {(!props.blockList) ? <Col xs={12} sm={6} md={4} lg={2} className="textalign">
            <i className="material-icons d-lg-none">attach_money</i>
            {(tx.tx.value.msg && tx.tx.value.msg.length > 0) ? tx.tx.value.msg.map((msg) => {
                return <Activities msg={msg} invalid={(!!tx.code)} tags={tx.tags} />
            }) : (<p>No fee</p>)}</Col> : ''}

        <Col xs={12} sm={6} md={4} lg={(!props.blockList) ? 2 : 4} className="fee textalign">
            <i className="material-icons d-lg-none">monetization_on</i>
            {tx.tx.value.fee.amount ? tx.tx.value.fee.amount.map((fee, i) => {
                return <span key={i}>{new Coin(fee.amount).toString()}</span>
                {/* {numbro(fee.amount).format(0,0)} CLR</span> */ }
            }) : <span>No fee</span>}</Col>
        {(!props.blockList) ? <Col xs={12} sm={6} md={2} lg={2} className="textalign"><i className="fas fa-database d-lg-none"></i> <Link to={"/blocks/" + tx.height}>{numbro(tx.height).format("0,0")}</Link></Col> : ''}
        <Col xs={(!props.blockList) ? { size: 12, order: "first" } : { size: 12, order: "first" }} md={(!props.blockList) ? { size: 4, order: "first" } : { size: 12, order: "first" }} lg={(!props.blockList) ? { size: 2, order: "first" } : { size: 4, order: "first" }} className="text-truncate textalign">
            <i className="fas fa-hashtag d-lg-none"></i> <Link to={"/transactions/" + tx.txhash}>{tx.txhash}</Link></Col>
        {(!props.blockList) ? <Col xs={12} sm={6} md={4} lg={1}>
            <i className="material-icons d-lg-none">schedule</i>
            <span className="time-align">
                <TimeAgo time={tx.block().time} />
            </span>
        </Col> : ''}
        {/* className="text-nowrap"                   <TimeAgo time={tx.block().time} /> */}
        {(tx.code) ? <Col xs={{ size: 12, order: "last" }} className="error">
            <Alert color="danger">
                <ColorErrors
                    code={tx.code}
                    logs={tx.logs}
                    gasWanted={tx.gas_wanted}
                    gasUses={tx.gas_used}
                />
            </Alert>
        </Col> : ''}

    </Row>
}