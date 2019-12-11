import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
import numbro from 'numbro';
import Account from '../components/Account.jsx';
import { Mongo } from 'meteor/mongo';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export default class AccountDelegations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            numDelegations: 0,
            delegations: ''
        }
    }

    updateDelegations = () => {
        Meteor.call('accounts.getAllDelegations', this.props.address, (error, result) => {
            if (error) {
                console.warn(error);
            }
            else {
                this.setState({
                    loading: false
                });
                if (result) {

                    let Delegations = new Mongo.Collection(null);
                    result.forEach((delegation, i) => {
                        Delegations.insert(delegation);
                    })
                    let delegations = Delegations.find({}, { sort: { shares: -1 } }).fetch();
                    this.setState({
                        numDelegations: delegations.length,
                        delegations: delegations.map((d, i) => {
                            return <Row key={i} className="delegation-info">
                                <Col xs={12} sm={6} md={6} lg={6} className="text-nowrap overflow-auto"><i className="fas fa-at d-lg-none"></i><Account address={d.validator_address} /></Col>
                                <Col xs={12} sm={6} md={6} lg={6}><i className="fas piggy-bank d-lg-none"></i>{numbro(d.shares / Meteor.settings.public.stakingFraction).format("0,0")} {Meteor.settings.public.stakingDenom}</Col>
                            </Row>
                        })
                    })
                }
            }
        })
    }

    componentDidMount() {
        this.updateDelegations();
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            this.updateDelegations();
        }
    }

    render() {
        if (this.state.loading) {
            return <div><Spinner type="grow" color="primary" /></div>
        }
        else if (this.state.numDelegations > 0) {
            return <div>
                <Container fluid className="list overflow-auto acc-delegation">
                    <Row className="header text-nowrap d-lg-flex">
                        <Col xs={12} sm={6} md={6} lg={6}><i className="fas fa-at"></i> <span><T>accounts.validators</T></span></Col>
                        <Col xs={12} sm={6} md={6} lg={6}><i className="fas fa-piggy-bank"></i> <span><T>accounts.shares</T></span></Col>
                    </Row>
                    {this.state.delegations}
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