import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner, Button } from 'reactstrap';
import { TxIcon } from '../../components/Icons.jsx';
import Activities from '../../components/Activities.jsx';
import ColorErrors from '../../components/ColorErrors.jsx';
import TimeAgo from '../../components/TimeAgo.jsx';
import numbro from 'numbro';
import ScrollArea from 'react-scrollbar';
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
        else if (!this.props.transactionsExist ) {
           
            return  <div className="nodata">
            <div>
                <img src="/img/nodata.png" className="img-fluid nodata-img" />
                <h2>No Data</h2>
            </div>
        </div>
           

        }
        else {
            return (
                <Card>
                <div className="transactions">
                    <div className="header">
                        <h4>Transactions</h4>
                        <Link to="/transactions" className="link">View All Transactions</Link>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <ScrollArea className="block-list">
                                {this.state.txs} 
                            </ScrollArea>
                        </Col>
                    </Row>
                </div>
            </Card> 
        
                    )
                }
            }
        }

                //     {/* <Row className="header text-nowrap d-none d-lg-flex">
                //     <Col xs={2} md={2}><i className="material-icons">merge_type</i> <span className="d-none d-md-inline-block"><T>transactions.type</T></span></Col>
                //     <Col className="resultpaddingleft" xs={1} md={1}><i className="material-icons">check_circle</i> <span className="d-none d-lg-inline-block"><T>transactions.result</T></span></Col>
                //     <Col xs={2} md={2}><i className="material-icons">attach_money</i> <span className="d-none d-md-inline-block"><T>transactions.amount</T></span></Col>
                //     <Col xs={2} md={2} className="fee"><i className="material-icons">monetization_on</i> <span className="d-none d-md-inline-block"><T>transactions.fee</T></span></Col>
                //     <Col xs={2} md={2}><i className="fas fa-database"></i> <span className="d-none d-md-inline-block"><T>common.height</T></span></Col>
                //     <Col xs={9} lg={6}><i className="material-icons">message</i> <span className="d-none d-md-inline-block"><T>transactions.activities</T></span></Col>
                //     <Col xs={3} lg={{ size: 1, order: "first" }}><i className="fas fa-hashtag"></i> <span className="d-none d-md-inline-block"><T>transactions.txHash</T></span></Col>
                //     <Col xs={2} md={2}><i className="material-icons">schedule</i> <span className="d-none d-md-inline-block"><T>transactions.time</T></span></Col>
                // </Row> */}
                    // {/* <Card>
                    //     <div className="transactions">
                    //         <div className="header">
                    //             <h4>Transactions</h4>
                    //             <Link to="/transactions" className="link">View All Transactions</Link>
                    //         </div>
                    //         <Row>
                    //             <Col lg={12}>
                    //                 <ScrollArea className="block-list">
                    //                     {this.state.txs} 
                      
                    //                 </ScrollArea>
                    //             </Col>
                    //         </Row>
                    //     </div>
                    // </Card> */}
        //             {/* <div>
        //     <Card>
        //       <div className="transactions">
        //           <div className="header">
        //               <h4>Transactions</h4>
        //               <Link to="#" className="link">View All Transactions</Link>
        //           </div>

        //           <Row>
        //               <Col lg={12}>
        //                   <ScrollArea className="block-list">
        //                   <div className="transaction-item">
        //                           <div className="trans-img">
        //                               <img src="/img/user.png" />
        //                           </div>
        //                           <div className="trans-details">
        //                               <p className="tc">antliadjowur9874u8ejiif8e90uf43809ujfiofj489rueoos...</p>
        //                               <div className="from-to">
        //                                   <p className="from">From: <Link to="#">ft456f546565f46456435rfreyrtertret</Link>...</p>
        //                                   <p>To: <Link to="#">erect045483054380reifreutirutgy54ry</Link>...</p>
        //                               </div>
        //                           </div>
        //                           <div className="action">
        //                               <Button>Delegate</Button>
        //                               <p>10 sec ago</p>
        //                           </div>
        //                           <div className="status">
        //                               <Button>Success</Button>
        //                           </div>
        //                       </div>
        //                   </ScrollArea>
        //               </Col>
        //           </Row>
        //       </div>
        //   </Card>
        //   </div> */}
