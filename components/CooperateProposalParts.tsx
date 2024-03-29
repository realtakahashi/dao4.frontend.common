import {
    CooperateProposalProps,
    PROPOSAL_KIND,
    PROPOSAL_STATUS,
  } from "../types/ProposalManagerType";
  
  const CooperateProposalParts = (props: CooperateProposalProps) => {

    return (
      <div className="px-6 py-4">
        <div className="text-20px font-bold mb-2 text-white">
          {props.targetProposal.title}
        </div>
        <p className="p-1 text-white text-base">
          Id: {String(props.targetProposal.proposalId)}
        </p>
        <p className="p-1 text-white text-base">
          Kind: {PROPOSAL_KIND[props.targetProposal.cooperateProposalKind]}
        </p>
        <p className="p-1 text-white text-base">
          Status: {PROPOSAL_STATUS[props.targetProposal.proposalStatus]}
        </p>
        <p className="p-1 text-white text-base">{props.targetProposal.outline}</p>
      </div>
    );
  };
  
  export default CooperateProposalParts;
  