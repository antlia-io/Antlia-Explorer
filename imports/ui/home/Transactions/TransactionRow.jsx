import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Alert, Spinner, Button } from "reactstrap";
import { TxIcon } from "../../components/Icons.jsx";
// import Activities from "../../components/Activities.jsx";
// import ColorErrors from "../../components/ColorErrors.jsx";
import ButtonActivities from "../../components/ButtonActivities.jsx";
import TimeAgo from "../../components/TimeAgo.jsx";
// import numbro from "numbro";
// import moment from "moment";
// import ScrollArea from "react-scrollbar";
// import Coin from "/both/utils/coins.js";
// import TransactionActivities from './TransactionActivities.jsx';

export const TransactionRow = props => {
  let tx = props.tx;
  let txTags = props.tx.tags;
  // console.log(tx.tx.value.msg[0].type);
  let from = txTags[1].value;
  let to = txTags[2].value;
  //    console.log(from)
  //    console.log(to)
  // console.log(tx);
  return (
    <div>
      {/* <Row className={(tx.code) ? "tx-info invalid" : "tx-info"}>
        {(!props.blockList) ? 
        <Col xs={5} md={2}>{(tx.tx.value.msg && tx.tx.value.msg.length > 0) ? tx.tx.value.msg.map((msg) => {
            return <p><ButtonActivities msg={msg} invalid={(!!tx.code)} tags={tx.tags} /></p>
        }) : ''}</Col> : ''}

        <Col className="resultpaddingleft" xs={(!props.blockList) ? 3 : 3} md={1}>{(!tx.code) ? <TxIcon valid /> : <TxIcon />}</Col>

        {(!props.blockList) ? 
        <Col xs={3} md={2}>{(tx.tx.value.msg && tx.tx.value.msg.length > 0) ? tx.tx.value.msg.map((msg) => {
            return <Activities msg={msg} invalid={(!!tx.code)} tags={tx.tags} />
        }) : ''}</Col> : ''}

        <Col xs={(!props.blockList) ? 3 : 2} md={(!props.blockList) ? 2 : 2} className="fee"><i className="material-icons d-lg-none">monetization_on</i> {tx.tx.value.fee.amount ? tx.tx.value.fee.amount.map((fee, i) => {
            return <span key={i}>{new Coin(fee.amount).toString()}</span>
            <span>{numbro(fee.amount).format(0,0)} CLR</span> 
        }) : <span>No fee</span>}</Col>
        {(!props.blockList) ? 
        <Col xs={2} md={2}><i className="fas fa-database d-lg-none"></i> <Link to={"/blocks/" + tx.height}>{numbro(tx.height).format("0,0")}</Link></Col> : ''}
        <Col xs={(!props.blockList) ? { size: 4, order: "first" } : { size: 12, order: "first" }} md={(!props.blockList) ? { size: 3, order: "first" } : { size: 7, order: "first" }} lg={(!props.blockList) ? { size: 1, order: "first" } : { size: 2, order: "first" }} className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link to={"/transactions/" + tx.txhash}>{tx.txhash}</Link></Col>
        {(!props.blockList) ? <Col xs={2} md={2}><span>{tx.block() ? moment.utc(tx.block().time).format("D MMM YYYY, h:mm:ssa") : ''}</span></Col> : ''}
        className="text-nowrap"                   <TimeAgo time={tx.block().time} />
        {(tx.code) ? 
        <Col xs={{ size: 12, order: "last" }} className="error">
            <Alert color="danger">
                <ColorErrors
                    code={tx.code}
                    logs={tx.logs}
                    gasWanted={tx.gas_wanted}
                    gasUses={tx.gas_used}
                />
            </Alert>
        </Col> : ''}

    </Row>  */}

      {/* <div className={(tx.code) ? "tx-info invalid" : "tx-info", "transaction-item"}> */}
      <div className="transaction-item">
        <div className="trans-img">
          <img src="/img/user.png" />
        </div>
        <div className="trans-details">
          <div className="tc text-truncate">
            {" "}
            <Link to={"/transactions/" + tx.txhash} className="txlink">
              {tx.txhash}
            </Link>...
          </div>
          {/* <p className="tc">cosmosdjowur9874u8ejiif8e90uf43809ujfiofj489rueoos...</p> */}
          <div className="from-to">
            {/* <TransactionActivities/> */}
            <p className="from">
              From: <Link to="#">{from}</Link>...
            </p>
            <p>
              {tx.tx.value.msg[0].type === "cosmos-sdk/MsgSubmitProposal" ? (
                <React.Fragment></React.Fragment>
              ) : (
                <React.Fragment>
                  To: <Link to="#">{to}</Link>...
                </React.Fragment>
              )}
            </p>
          </div>
        </div>
        <div className="action">
          {!props.blockList ? (
            <div>
              {tx.tx.value.msg && tx.tx.value.msg.length > 0
                ? tx.tx.value.msg.map(msg => {
                    return <ButtonActivities msg={msg} invalid={!!tx.code} />;
                  })
                : ""}
            </div>
          ) : (
            ""
          )}
          <TimeAgo time={tx.block().time} />
        </div>
        <div className="statushow">
          <Button>{!tx.code ? <TxIcon valid /> : <TxIcon />}</Button>
        </div>
      </div>
    </div>
  );
};
