export interface ProposalProps {
  targetProposal: ProposalInfo;
  daoAddress: string;
}

export interface CooperateProposalProps {
  targetProposal: CooperateProposalInfoPlus;
}

export interface ApproveDaoData {
  relatedProposalId: number;
  doReward: boolean;
}

export interface AddProposalFormData {
  proposalKind: number;
  title: string;
  outline: string;
  detail: string;
  githubURL: string;
  relatedId: string;
  relatedAddress: string;
}

export interface AddCooperateProposalFormData {
  cooperateProposalKind: number;
  daoAddressList: string;
  title: string;
  outline: string;
  details: string;
  githubURL: string;
  proposalId: string;
  relatedProposalIdList: string;
  targetAddressList: string;
  targetAmount: string;
}

export interface ProposalInfo {
  proposalKind: number;
  title: string;
  outline: string;
  details: string;
  githubURL: string;
  proposalId: string;
  relatedId: string;
  relatedAddress: string;
  proposalStatus: number;
}

export interface CooperateProposalInfo {
  cooperateProposalKind: number;
  daoAddressList: string[];
  title: string;
  outline: string;
  details: string;
  githubURL: string;
  proposalId: string;
  relatedProposalIdList: Array<string>;
  proposalStatus: number;
  targetAddressList: Array<string>;
  targetAmount: string;
  addressOfThisContract: string;
}

export interface CooperateProposalInfoPlus {
  cooperateProposalKind: number;
  daoAddressList: string[];
  title: string;
  outline: string;
  details: string;
  githubURL: string;
  proposalId: string;
  relatedProposalIdList: Array<string>;
  proposalStatus: number;
  targetAddressList: Array<string>;
  targetAmount: string;
  addressOfThisContract: string;
  isElectoricalCommision:boolean;
  isDaoMemeber:boolean;
}

export const PROPOSAL_KIND = [
  "AddAMember",
  "DeleteAMember",
  "UseOfFunds",
  "CommunityManagement",
  "Activities",
  "ElectionComissionPropsal",
  "DaoReward",
  "CooperationProposal"
] as const;

export const COOPERATE_PROPOSAL_KIND = [
  "UseOfFunds",
  "CommunityManagement",
  "Activities",
] as const;

export const PROPOSAL_STATUS = [
  "UnderDiscussionOnGithub",
  "Voting",
  "Pending",
  "Running",
  "Rejected",
  "FinishedVoting",
  "Finished",
] as const;

export const PROPOSAL_VOTING = 1;
export const PROPOSAL_FINISHED = 6;
export const PROPOSAL_REJECTED= 4;
