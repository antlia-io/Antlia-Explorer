import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
import numbro from 'numbro';
import Account from '../components/Account.jsx';
import { Mongo } from 'meteor/mongo';
import i18n from 'meteor/universe:i18n';
import ScrollArea from 'react-scrollbar';

const T = i18n.createComponent();

export default class ValidatorDelegations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            numDelegatiors: 0,
            delegations: ''
        }
    }

    componentDidMount() {
        Meteor.call('Validators.getAllDelegations', this.props.address, (error, result) => {
            if (error) {
                console.warn(error);
            }

            if (result) {
                // console.log(result);
                // Delegations.remove({});
                let Delegations = new Mongo.Collection(null);
                result.forEach((delegation, i) => {
                    Delegations.insert(delegation);
                })
                let delegations = Delegations.find({}, { sort: { shares: -1 } }).fetch();
                this.setState({
                    loading: false,
                    numDelegatiors: delegations.length,
                    delegations: delegations.map((d, i) => {
                        return (
                            <ScrollArea className="delegatescroll-list">
                                <Row key={i} className="delegation-info">
                                    <Col lg={5} md={12} className="text-nowrap text-truncate"><Account address={d.delegator_address} /></Col>
                                    <Col lg={4} md={12} className="textAlign">{numbro(d.shares / this.props.shares * this.props.tokens / Meteor.settings.public.stakingFraction).format("0,0.00")} {Meteor.settings.public.stakingDenom}</Col>
                                    <Col lg={3} md={12} className="textAlign">{numbro(d.shares / this.props.shares * this.props.tokens / Meteor.settings.public.stakingFraction).format("0,0.00")} {Meteor.settings.public.stakingDenom}</Col>
                                </Row>
                            </ScrollArea>
                        )
                    })
                })
            }
        })
    }

    render() {
        if (this.state.loading) {
            return <div><Spinner type="grow" color="primary" /></div>
        }
        else {
            return <div className="delegation">
                {/* <T>common.delegators</T> */}
                <CardHeader><h4>Delegators</h4><span className="userdelegate"><i className="fas fa-user-circle"></i>{(this.state.numDelegatiors > 0) ? this.state.numDelegatiors : 'No'}  {(this.state.numDelegatiors > 0) ? <small className="text-secondary">(<i className="fas fa-arrow-up"></i>{numbro(this.props.tokens / this.state.numDelegatiors / Meteor.settings.public.stakingFraction).format('0,0.00')} {Meteor.settings.public.stakingDenom} in 24h)</small> : ''}</span></CardHeader>
                <CardBody className="list">
                    <Container fluid>
                        <Row className="header text-nowrap d-lg-flex">
                            <Col lg={5} md={12}><i className="fas fa-at"></i> <span><T>common.addresses</T></span></Col>
                            <Col lg={4} md={12} className="textAlign"><i className="fas fa-piggy-bank"></i> <span><T>common.amounts</T></span></Col>
                            <Col lg={3} md={12} className="textAlign"><i className="fas fa-share"></i> <span>Share</span></Col>
                        </Row>
                        <div>
                            {this.state.delegations}
                        </div>
                    </Container>
                </CardBody>
            </div>
        }
    }
}