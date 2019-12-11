import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
import numbro from 'numbro';
import Account from '../components/Account.jsx';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export default class AccountUnbondings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            numUnbondings: 0,
            unbondings: ''
        }
    }

    componentDidMount() {
        Meteor.call('accounts.getAllUnbondings', this.props.address, (error, result) => {
            if (error) {
                console.warn(error);
            }
            else {
                this.setState({
                    loading: false
                });
                if (result) {
                    this.setState({
                        numUnbondings: result.length,
                        unbondings: result.map((u, i) => {
                            return <Row key={i} className="delegation-info">
                                <Col md={5} className="text-nowrap overflow-auto"><i className="fas fa-at d-lg-none"></i><Account address={u.validator_address} /></Col>
                                <Col md={7}>{u.entries.map((entry, j) => {
                                    return <Row key={j}>
                                        <Col md={6}>
                                            <i className="fas fa-piggy-bank d-lg-none"></i>{numbro(entry.balance / Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}
                                        </Col>
                                        <Col md={6}>
                                            <i className="fas fa-clock d-lg-none"></i>{moment.utc(entry.completion_time).fromNow()}
                                        </Col>
                                    </Row>
                                })}</Col>
                            </Row>
                        })
                    })

                }
            }
        })
    }

    render() {
        if (this.state.loading) {
            return <div><Spinner type="grow" color="primary" /></div>
        }
        else if (this.state.numUnbondings > 0) {
            return <div>
                <Container fluid className="list overflow-auto acc-unbond">
                    <Row className="header text-nowrap d-lg-flex">
                        <Col xs={12} sm={12} md={5} lg={5}><i className="fas fa-at"></i> <span><T>accounts.validators</T></span></Col>
                        <Col xs={12} sm={12} md={7} lg={7}>
                            <Row>
                                <Col xs={12} sm={6} md={6} lg={6}><i className="fas fa-piggy-bank"></i> <span><T>accounts.shares</T></span></Col>
                                <Col xs={12} sm={6} md={6} lg={6}><i className="fas fa-clock"></i> <span><T>accounts.mature</T></span></Col>
                            </Row>
                        </Col>
                    </Row>
                    {this.state.unbondings}
                </Container>
            </div>
        }
        else {
            return <div className="nodata">
                <div>
                <img src="/img/nodata.png" className="img-fluid nodata-img" />
                    <h2>No Data</h2>
                </div>
            </div>
        }
    }
}