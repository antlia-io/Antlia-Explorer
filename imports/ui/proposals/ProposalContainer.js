import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Proposals } from '/imports/api/proposals/proposals.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import { Chain } from '/imports/api/chain/chain.js';
import Proposal from './Proposal.jsx';

export default ProposalContainer = withTracker((props) => {
    let proposalId = 0;
    if (props.match.params.id){
        proposalId = parseInt(props.match.params.id);
    }

    let chainHandle, proposalHandle, transactionsHandle, transactions,proposalListHandle, proposal,transactionsExist, proposalCount, chain, proposalExist;
    let loading = true;

    if (Meteor.isClient){
        chainHandle = Meteor.subscribe('chain.status');
        proposalListHandle = Meteor.subscribe('proposals.list', proposalId);
        proposalHandle = Meteor.subscribe('proposals.one', proposalId);
        transactionsHandle = Meteor.subscribe('transactions.validator');
        loading = !proposalHandle.ready() || !chainHandle.ready() || !proposalListHandle.ready() || !transactionsHandle.ready();
    }

    if (Meteor.isServer || !loading){
        proposal = Proposals.findOne({proposalId:proposalId});
        proposalCount = Proposals.find({}).count();
        chain = Chain.findOne({chainId:Meteor.settings.public.chainId});
        transactions = Transactions.find({}, {sort:{height:-1}});

        if (Meteor.isServer){
            // loading = false;
            proposalExist = !!proposal;
            transactionsExist = !!transactions;
        }
        else{
            proposalExist = !loading && !!proposal;
            transactionsExist = !loading && !!transactions;
        }
    }

    return {
        loading,
        proposalExist,
        transactionsExist,
        proposal: proposalExist ? proposal : {},
        chain: proposalExist ? chain : {},
        governanceTxs: transactionsExist ? Transactions.find({
            $or: [
                {"tx.value.msg.type":"color/MsgVote"}
            ]
        }).fetch() : {},
        proposalCount: proposalExist? proposalCount: 0
    };
})(Proposal);
