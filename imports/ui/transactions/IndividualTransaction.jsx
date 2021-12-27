import React from 'react';
import { Row, Col, Card } from 'reactstrap';
import TransactionActivities from '../components/TransactionActivities.jsx'

export const IndividualTransaction = (props) => {
    let tx = props.tx;
    // console.log(tx);
    return <div className={(tx.code)?"tx-info invalid":"tx-info"}>
        <div className="activity">{(tx.tx.value.msg && tx.tx.value.msg.length >0)?tx.tx.value.msg.map((msg,i) => {
            return <div key={i}><TransactionActivities msg={msg} invalid={(!!tx.code)} tags={tx.tags} /></div>
        }):''}</div>
         {/* <div className="nodname"><p>node name</p></div>
            <div className="sendbtn">Button</div>
            <div className="amount">3,300 ATOM to</div>
            <div className="address"><p>antliadifsdoir7843jd8493ur8j483ojer9843jr.</p></div> */}
    </div>
}