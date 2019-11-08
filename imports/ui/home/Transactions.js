import React from 'react';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import {
    Row, Col, Card, Button
} from 'reactstrap';
import moment from 'moment';
import numbro from 'numbro';

export default class Transactions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let proposer = this.props.block.proposer();
        // if (proposer){
        //     let moniker = (proposer.description&&proposer.description.moniker)?proposer.description.moniker:proposer.address;
        //     let identity = (proposer.description&&proposer.description.identity)?proposer.description.identity:"";
        // }
        return (
            <div>
                <Card>
                    <div className="transactions">
                        <div className="header">
                            <h4>Transactions</h4>
                            <Link to="#" className="link">View All Transactions</Link>
                        </div>

                        <Row>
                            <Col lg={12}>
                                <ScrollArea className="block-list">
                                    <div className="transaction-item">
                                        <div className="trans-img">
                                            <img src="/img/user.png" />
                                        </div>
                                        <div className="trans-details">
                                            <p className="tc">cosmosdjowur9874u8ejiif8e90uf43809ujfiofj489rueoos...</p>
                                            <div className="from-to">
                                                <p className="from">From: <Link to="#">ft456f546565f46456435rfreyrtertret</Link>...</p>
                                                <p>To: <Link to="#">erect045483054380reifreutirutgy54ry</Link>...</p>
                                            </div>
                                        </div>
                                        <div className="action">
                                            <Button>Delegate</Button>
                                            <p>10 sec ago</p>
                                        </div>
                                        <div className="status">
                                            <Button>Success</Button>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}