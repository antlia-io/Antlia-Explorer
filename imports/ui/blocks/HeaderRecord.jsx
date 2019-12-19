import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
class HeaderRecord extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Row className="header text-nowrap d-sm-flex">                
                <Col xs={12} sm={12} md={12} lg={3}><i className="fas fa-hashtag"></i> <span className="d-md-inline">
                    {/* <T>common.hash</T> */}
                    Block Hash
                    </span></Col>
                <Col xs={12} sm={6} md={6} lg={3}><i className="fas fa-calendar"></i> <span className="d-md-inline"><T>blocks.proposer</T></span></Col>
                <Col xs={12} sm={6} md={6} lg={2}><i className="fas fa-sync"></i> <span className="d-md-inline">
                    {/* <T>blocks.numOfTxs</T> */}
                    Txs
                    </span></Col>
                <Col xs={12} sm={6} md={6} lg={2}><i className="fas fa-database"></i> <span className="d-md-inline"><T>common.height</T></span></Col>
                <Col xs={12} sm={6} md={6} lg={2}><i className="fas fa-clock"></i> <span className="d-md-inline"><T>common.time</T></span></Col>
            </Row>
        );
    }
}

export default HeaderRecord;