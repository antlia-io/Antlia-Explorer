import React from 'react';


export default class Test extends React.Component{
    render(){
        console.log(this.props.transactions)
        return(
            <div>
                Test
            </div>
        )
    }
}