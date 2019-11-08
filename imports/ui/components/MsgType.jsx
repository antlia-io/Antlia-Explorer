import React from 'react';
import { Button } from 'reactstrap';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export const MsgType = (props) => {
    switch (props.type){
    // bank
    case "cosmos-sdk/MsgSend":
        return <Button color="success"><T>messageTypes.send</T></Button>
    case "cosmos-sdk/MsgMultiSend":
        return <Button color="success"><T>messageTypes.multiSend</T></Button>
        
        // staking
    case "cosmos-sdk/MsgCreateValidator":
        return <Button color="warning"><T>messageTypes.createValidator</T></Button>;
    case "cosmos-sdk/MsgEditValidator":
        return <Button color="warning"><T>messageTypes.editValidator</T></Button>;
    case "cosmos-sdk/MsgDelegate":
        return <Button color="warning"><T>messageTypes.delegate</T></Button>;
    case "cosmos-sdk/MsgUndelegate":
        return <Button color="warning"><T>messageTypes.undelegate</T></Button>;
    case "cosmos-sdk/MsgBeginRedelegate":
        return <Button color="warning"><T>messageTypes.redelegate</T></Button>;
        
        // gov
    case "cosmos-sdk/MsgSubmitProposal":
        return <Button color="info"><T>messageTypes.submitProposal</T></Button>
    case "cosmos-sdk/MsgDeposit":
        return <Button color="info"><T>messageTypes.deposit</T></Button>
    case "cosmos-sdk/MsgVote":
        return <Button color="info"><T>messageTypes.vote</T></Button>;
        
        // distribution
    case "cosmos-sdk/MsgWithdrawValidatorCommission":
        return <Button color="secondary"><T>messageTypes.withdrawComission</T></Button>;
    case "cosmos-sdk/MsgWithdrawDelegationReward":
        return <Button color="secondary"><T>messageTypes.withdrawReward</T></Button>;
    case "cosmos-sdk/MsgModifyWithdrawAddress":
        return <Button color="secondary"><T>messgeTypes.modifyWithdrawAddress</T></Button>;

        // slashing
    case "cosmos-sdk/MsgUnjail":
        return <Button color="danger"><T>messageTypes.unjail</T></Button>;
        
        // ibc
    case "cosmos-sdk/IBCTransferMsg":
        return <Button color="dark"><T>messageTypes.IBCTransfer</T></Button>;
    case "cosmos-sdk/IBCReceiveMsg":
        return <Button color="dark"><T>messageTypes.IBCReceive</T></Button>;

    default:
        return <Button color="primary">{props.type}</Button>;
    }
}