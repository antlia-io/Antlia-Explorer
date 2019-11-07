import React from 'react';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import {
    Row, Col, Card,
} from 'reactstrap';
import moment from 'moment';
import numbro from 'numbro';

export default class Blocks extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            BlocksDetails:[
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
                {blockHeight:"12132321323", time: "12 sec ago", Txns:"1232", Fees:"321321",nodeName:"Carrauntoohil"},
            ]
        }
    }

    render() {
        // let proposer = this.props.block.proposer();
        // if (proposer){
        //     let moniker = (proposer.description&&proposer.description.moniker)?proposer.description.moniker:proposer.address;
        //     let identity = (proposer.description&&proposer.description.identity)?proposer.description.identity:"";
        return (
            <div>
                <Card>
                    <div className="blocks">
                        <div className="header">
                            <h4>Blocks</h4>
                            <Link to="#">View All Blocks</Link>
                        </div>

                        <Row>
                            <Col lg={12}>
                                <ScrollArea className="block-list">
                                    {this.state.BlocksDetails.map((items,index)=>
                                    <div className="block-item" key={index}>
                                        <div className="block-content">

                                            <p>Blocks <span>{items.blockHeight}</span></p>
                                            <p>{items.time}</p>
                                        </div>
                                        <div className="block-content">
                                            <p>includes Txns {items.Txns}, Fees {items.Fees} uclr</p>
                                            <p>Node: {items.nodeName}</p>
                                        </div>
                                    </div>
                                  )}
                                
                                    {/* <div className="block-item">
                                        <div className="block-content">

                                            <p>Blocks <span>1223213</span></p>
                                            <p>1 hours ago</p>
                                        </div>
                                        <div className="block-content">
                                            <p>includes Txns 23234, Fees 2323 uclr</p>
                                            <p>Node: Node name</p>
                                        </div>
                                    </div> */}
                                  
                                </ScrollArea>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}