import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Progress, Spinner } from 'reactstrap';
import numbro from 'numbro';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export default class TwentyEighty extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {},
            options: {}
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.stats != this.props.stats){
            let topPercent = this.props.stats.topTwentyPower/this.props.stats.totalVotingPower;
            let bottomPercent = this.props.stats.bottomEightyPower/this.props.stats.totalVotingPower;

            this.setState({
                data:{
                    labels:
                        [
                            "Top 10% ("+this.props.stats.numTopTwenty+") validators",
                            "Rest 90% ("+this.props.stats.numBottomEighty+") validators",


                        ]
                    ,
                    datasets: [
                        {
                            data: [
                                topPercent,
                                bottomPercent
                            ],
                            backgroundColor: [
                                '#004bff',
                                '#ddd'
                            ],
                            hoverBackgroundColor: [
                                '#004bff',
                                '#ddd'
                            ]
                        }
                    ]
                },
                options:{
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.labels[tooltipItem.index] || '';
            
                                if (label) {
                                    label += ' hold ';
                                }
                                label += numbro(data.datasets[0].data[tooltipItem.index]).format("0.00%");
                                label += " voting power";
                                return label;
                            }
                        }
                    }
                }
            });
        }
    }

    render(){
        if (this.props.loading){
            return <Spinner type="grow" color="primary" />
        }
        else{
            if (this.props.statsExist && this.props.stats){
                return (                    
                    <Card>
                        {/* <div className="card-header backgroundcolor"><T>votingPower.pareto</T></div> */}
                        <div className="header"><h4><T>votingPower.pareto</T></h4></div>
                        <CardBody>
                            <Doughnut data={this.state.data} />
                        </CardBody>
                    </Card>
                );   
            }
            else{
                return <div></div>
            }
        }
    }
}    
