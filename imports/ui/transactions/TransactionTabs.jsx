import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import classnames from 'classnames';
import numbro from 'numbro';
import { TransactionRow } from './TransactionRow.jsx';
import { IndividualTransaction } from './IndividualTransaction.jsx'
import i18n from 'meteor/universe:i18n';
import ScrollArea from 'react-scrollbar';

const T = i18n.createComponent();
export default class TransactionTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'tx-transfer',
            transferTxs: {},
            stakingTxs: {},
            distributionTxs: {},
            governanceTxs: {},
            slashingTxs: {},

        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            this.setState({
                transferTxs: this.props.transferTxs,
                stakingTxs: this.props.stakingTxs,
                distributionTxs: this.props.distributionTxs,
                governanceTxs: this.props.governanceTxs,
                slashingTxs: this.props.slashingTxs
            })
        }
    }

    render() {

        return <div className="delegate-trans">
            {/* <T>transactions.transactions</T> */}
            <CardHeader> <h4>Total: 100</h4>

                <Nav tabs className="tx-types">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === 'tx-transfer' })}
                            onClick={() => { this.toggle('tx-transfer'); }}
                        >
                            <T>transactions.transfer</T> ({numbro(this.state.transferTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === 'tx-staking' })}
                            onClick={() => { this.toggle('tx-staking'); }}
                        >
                            <T>transactions.staking</T> ({numbro(this.state.stakingTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === 'tx-distr' })}
                            onClick={() => { this.toggle('tx-distr'); }}
                        >
                            <T>transactions.distribution</T> ({numbro(this.state.distributionTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === 'tx-gov' })}
                            onClick={() => { this.toggle('tx-gov'); }}
                        >
                            <T>transactions.governance</T> ({numbro(this.state.governanceTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === 'tx-slashing' })}
                            onClick={() => { this.toggle('tx-slashing'); }}
                        >
                            <T>transactions.slashing</T> ({numbro(this.state.slashingTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                </Nav>
            </CardHeader>
            {/* <CardBody> */}
            <TabContent activeTab={this.state.activeTab}>

                <TabPane tabId="tx-transfer">
                    <ScrollArea className="transcroll-list">
                        {(this.state.transferTxs.length > 0) ? this.state.transferTxs.map((tx, i) => {
                            return (
                                <div>
                                    <div className="deskpart">
                                        <Row className="transfer-item">
                                            <Col lg={6} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={6} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="respart">
                                        <Row className="transfer-item">
                                            <Col lg={12} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={12} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        }) :
                            (
                                <div className="nodata">
                                    <div>
                                        <img src="/img/nodata.png" className="img-fluid nodata-img" />
                                        <h2>No Data</h2>
                                    </div>
                                </div>
                            )
                        }
                    </ScrollArea>
                </TabPane>

                <TabPane tabId="tx-staking">
                    <ScrollArea className="transcroll-list">
                        {(this.state.stakingTxs.length > 0) ? this.state.stakingTxs.map((tx, i) => {
                            return (
                                <div>
                                    <div className="deskpart">
                                        <Row className="transfer-item">
                                            <Col lg={6} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={6} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="respart">
                                        <Row className="transfer-item">
                                            <Col lg={12} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={12} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        }) :
                            (
                                <div className="nodata">
                                    <div>
                                        <img src="/img/nodata.png" className="img-fluid nodata-img" />
                                        <h2>No Data</h2>
                                    </div>
                                </div>
                            )
                        }
                    </ScrollArea>
                </TabPane>
                <TabPane tabId="tx-distr">
                    <ScrollArea className="transcroll-list">
                        {(this.state.distributionTxs.length > 0) ? this.state.distributionTxs.map((tx, i) => {
                            return (
                                <div>
                                    <div className="deskpart">
                                        <Row className="transfer-item">
                                            <Col lg={6} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={6} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="respart">
                                        <Row className="transfer-item">
                                            <Col lg={12} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={12} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        }) :
                            (
                                <div className="nodata">
                                    <div>
                                        <img src="/img/nodata.png" className="img-fluid nodata-img" />
                                        <h2>No Data</h2>
                                    </div>
                                </div>
                            )
                        }
                    </ScrollArea>
                </TabPane>
                <TabPane tabId="tx-gov">
                    <ScrollArea className="transcroll-list">
                        {(this.state.governanceTxs.length > 0) ? this.state.governanceTxs.map((tx, i) => {
                            return (

                                <div>
                                    <div className="deskpart">
                                        <Row className="transfer-item">
                                            <Col lg={6} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={6} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="respart">
                                        <Row className="transfer-item">
                                            <Col lg={12} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={12} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        }) :
                            (
                                <div className="nodata">
                                    <div>
                                        <img src="/img/nodata.png" className="img-fluid nodata-img" />
                                        <h2>No Data</h2>
                                    </div>
                                </div>
                            )
                        }
                    </ScrollArea>
                </TabPane>
                <TabPane tabId="tx-slashing">
                    <ScrollArea className="transcroll-list">
                        {(this.state.slashingTxs.length > 0) ? this.state.slashingTxs.map((tx, i) => {
                            return (
                                <div>
                                    <div className="deskpart">
                                        <Row className="transfer-item">
                                            <Col lg={6} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={6} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="respart">
                                        <Row className="transfer-item">
                                            <Col lg={12} md={12}>
                                                <IndividualTransaction
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                            <Col lg={12} md={12}>
                                                <TransactionRow
                                                    key={i}
                                                    index={i}
                                                    tx={tx}
                                                    blockList
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        }) :
                            (
                                <div className="nodata">
                                    <div>
                                        <img src="/img/nodata.png" className="img-fluid nodata-img" />
                                        <h2>No Data</h2>
                                    </div>
                                </div>
                            )
                        }
                    </ScrollArea>
                </TabPane>
            </TabContent>
            {/* </CardBody> */}
        </div>
    }
}
