import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Validators } from '/imports/api/validators/validators.js';
import { Chain, ChainStates } from '/imports/api/chain/chain.js';
import ChainStatus from './ChainStatus.jsx';

export default ChainStatusContainer = withTracker((props) => {
    let statusHandle;
    let validatorsHandle;
    let chainStatesHandle;
    let loading = true;

    if (Meteor.isClient) {
        validatorsHandle = Meteor.subscribe('validators.all');
        statusHandle = Meteor.subscribe('chain.status');
        chainStatesHandle = Meteor.subscribe('chainStates.latest');
        loading = !statusHandle.ready() && !chainStatesHandle.ready() && !validatorsHandle.ready();
    }


    let validatorsCond = {};
    
    if (props.inactive){
        validatorsCond = {
            $or: [
                { status: { $lt : 2 } },
                { jailed: true }
            ]
        }
    }
    else{
        validatorsCond = {
            jailed: false,
            status: 2
        }
    }
    
    let status;
    let states;
    let statusExist;
    let chainStatus;
    let validators;
    let validatorsExist;

    if (Meteor.isServer || (!loading)) {
        validators = Validators.find(validatorsCond).fetch();
        chainStatus = Chain.findOne({chainId:Meteor.settings.public.chainId});
        status = Chain.findOne({chainId:Meteor.settings.public.chainId});
        states = ChainStates.findOne({}, {sort:{height:-1}, limit: 1});

        if (Meteor.isServer){
            // loading = false;
            validatorsExist = !!validators && !!chainStatus;
            statusExist = !!status && !!states;
        }
        else{
            validatorsExist = !loading && !!validators && !!chainStatus;
            statusExist = !loading && !!status && !!states;
        }
    }

    return {
        loading,
        statusExist,
        validatorsExist,
        validators: validatorsExist ? validators : {},
        chainStatus: validatorsExist ? chainStatus : {},
        status: statusExist ? status : {},
        states: statusExist ? states : {}
    };
})(ChainStatus);

