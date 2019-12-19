import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner } from 'reactstrap';
import { TxIcon } from '../components/Icons.jsx';
import Activities from '../components/Activities.jsx';
import ColorErrors from '../components/ColorErrors.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
import numbro from 'numbro';
import { TransactionRow } from './TransactionRow.jsx';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export default class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txs: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            if (this.props.transactions.length > 0) {
                this.setState({
                    txs: this.props.transactions.map((tx, i) => {
                        return <TransactionRow
                            key={i}
                            index={i}
                            tx={tx}
                        />
                    })
                })
            }
        }
    }

    render() {
        if (this.props.loading) {
            return <Spinner type="grow" color="primary" />
        }
        else if (!this.props.transactionsExist) {
            return  <div className="nodata">
                <div>
                    <img src="/img/nodata.png" className="img-fluid nodata-img" />
                    <h2>No Data</h2>
                </div>
            </div>
            // <div><T>No Transaction Found</T></div>
        }
        else {
            return <div className="transactions-list">
                <Card>
                    <Row className="header text-nowrap">
                        <Col xs={12} sm={6} md={6} lg={1} className="text-truncate"><i className="fas fa-hashtag"></i> <span className="d-md-inline-block"><T>transactions.txHash</T></span></Col>
                        <Col xs={12} sm={6} md={6} lg={2}><i className="material-icons">merge_type</i> <span className="d-md-inline-block"><T>transactions.type</T></span></Col>
                        <Col className="resultpaddingleft" xs={12} sm={6} md={6} lg={1}><i className="material-icons">check_circle</i> <span className="d-lg-inline-block"><T>transactions.result</T></span></Col>
                        <Col xs={12} sm={6} md={6} lg={2} className="htextalign"><i className="material-icons">attach_money</i> <span className="d-md-inline-block"><T>transactions.amount</T></span></Col>
                        <Col xs={12} sm={6} md={6} lg={2} className="fee htextalign"><i className="material-icons">monetization_on</i> <span className="d-md-inline-block"><T>transactions.fee</T></span></Col>
                        <Col xs={12} sm={6} md={6} lg={2} className="htextalign"><i className="fas fa-database"></i> <span className="d-md-inline-block"><T>common.height</T></span></Col>
                        {/* <Col xs={9} lg={6}><i className="material-icons">message</i> <span className="d-md-inline-block"><T>transactions.activities</T></span></Col> */}
                        <Col xs={12} sm={6} md={6} lg={2} className="htextalign"><i className="material-icons">schedule</i> <span className="d-md-inline-block">
                            {/* <T>transactions.time</T> */}
                            Time
                        </span></Col>
                    </Row>
                    {this.state.txs}
                </Card>
            </div>
        }
    }
}