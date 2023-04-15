import { ethers } from "ethers";
import {
  AddCooperateProposalFormData,
  CooperateProposalInfo,
  CooperateProposalInfoPlus,
  CoProposalInfoForContractCall,
} from "../types/ProposalManagerType";
import { errorFunction } from "./commonFunctions";
import CooperateProposalContract from "./construct/CooperateProposal";
import CooperateProposalManagerContract from "./construct/CooperateProposalManager";

export const getCooperateProposalList = async (): Promise<
  Array<CooperateProposalInfo>
> => {
  const cooperateProposalManagerAddress =
    process.env.NEXT_PUBLIC_COOPERATE_PROPOSAL_MANAGER_CONTRACT_ADDRESS;
  const contractConstract = CooperateProposalManagerContract;

  let response: CooperateProposalInfo[] = [];
  if (
    typeof window.ethereum !== "undefined" &&
    cooperateProposalManagerAddress
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      cooperateProposalManagerAddress,
      contractConstract.abi,
      signer
    );
    response = await contract.getCooperateProposalList().catch((err: any) => {
      console.log(err);
      errorFunction(err);
    });
    console.log("### getCooperateProposalList Return: ", response);
  }
  return response;
};

export const getCooperateProposalListPlus = async (
  list: Array<CooperateProposalInfo>
): Promise<Array<CooperateProposalInfoPlus>> => {
  const contractConstract = CooperateProposalContract;

  let response: CooperateProposalInfoPlus[] = [];
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

//    list.forEach(async (item: CooperateProposalInfo) => {
    for (const item of list) {
      const contractAddress = item.addressOfThisContract ?? "";

      const contract = new ethers.Contract(
        contractAddress,
        contractConstract.abi,
        signer
      );
      console.log("### onlyEitherElectionCommision");
      const isElectoricalCommision: boolean = await contract
        .onlyEitherElectionCommision(item.daoAddressList)
        .catch((err: any) => {
          console.log(err);
          errorFunction(err);
        });
      console.log("### checkOnlyCooperateMemeber");
      const isDaoMember: boolean = await contract
        .checkOnlyCooperateMemeber(item.daoAddressList)
        .catch((err: any) => {
          console.log(err);
          errorFunction(err);
        });
      response.push({
        cooperateProposalKind: item.cooperateProposalKind,
        daoAddressList: item.daoAddressList,
        title: item.title,
        outline: item.outline,
        details: item.details,
        githubURL: item.githubURL,
        proposalId: item.proposalId,
        relatedProposalIdList: item.relatedProposalIdList,
        proposalStatus: item.proposalStatus,
        targetAddressList: item.targetAddressList,
        targetAmount: item.targetAmount,
        addressOfThisContract: item.addressOfThisContract,
        isElectoricalCommision: true,//isElectoricalCommision,
        isDaoMemeber: true,//isDaoMember,
      });
    }
  }
  console.log("### getCooperateProposalListPlus Return: ", response);
  return response;
};

export const doVoteForCooperateProposal = async (
  yes: boolean,
  targetProposal: CooperateProposalInfoPlus
) => {
  console.log("## doVote:yes: ", yes);
  const contractConstract = CooperateProposalContract;

  if (
    typeof window.ethereum !== "undefined" &&
    targetProposal.addressOfThisContract
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      targetProposal.addressOfThisContract,
      contractConstract.abi,
      signer
    );
    await contract.voteForProposal(yes).catch((err: any) => {
      console.log(err);
      errorFunction(err);
    });
  }
};

export const doChangeStatusForCooperateProposal = async (
  proposalStatus: number,
  targetProposal: CooperateProposalInfoPlus
) => {
  const contractConstract = CooperateProposalContract;

  if (
    typeof window.ethereum !== "undefined" &&
    targetProposal.addressOfThisContract
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      targetProposal.addressOfThisContract,
      contractConstract.abi,
      signer
    );
    await contract.changeProposalStatus(proposalStatus).catch((err: any) => {
      console.log(err);
      errorFunction(err);
    });
  }
};

export const doExecuteProposal = async (
  divieList: string,
  targetProposal: CooperateProposalInfoPlus
) => {
  const contractConstract = CooperateProposalContract;
  const data: string[] = divieList.split(",");

  if (
    typeof window.ethereum !== "undefined" &&
    targetProposal.addressOfThisContract
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      targetProposal.addressOfThisContract,
      contractConstract.abi,
      signer
    );
    await contract.divide(data).catch((err: any) => {
      console.log(err);
      errorFunction(err);
    });
  }
};

export const registerCooperateProposal = async (
  inputData: AddCooperateProposalFormData
) => {
  const contractConstract = CooperateProposalContract;
  const proposalData: CoProposalInfoForContractCall = {
    coProposalKind: inputData.cooperateProposalKind,
    daoAddressList: inputData.daoAddressList.split(","),
    title: inputData.title,
    outline: inputData.outline,
    details: inputData.details,
    githubURL: inputData.githubURL,
    proposalId: "0",
    relatedProposalIdList: inputData.relatedProposalIdList.split(","),
    proposalStatus: 0,
    targetAddressList: inputData.targetAddressList.split(","),
    targetAmount: inputData.targetAmount,
    addressOfThisContract: "0x0000000000000000000000000000000000000000",
  };

  console.log("## proposalData:", proposalData);

  const proposalManagerAddress =
    process.env.NEXT_PUBLIC_PROPOSAL_MANAGER_CONTRACT_ADDRESS;
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS;
  const cooperateProposalManagerAddress =
    process.env.NEXT_PUBLIC_COOPERATE_PROPOSAL_MANAGER_CONTRACT_ADDRESS;

  console.log("## proposalManagerAddress", proposalManagerAddress);
  console.log("## memberManagerAddress", memberManagerAddress);
  console.log(
    "## cooperateProposalManagerAddress",
    cooperateProposalManagerAddress
  );

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const factory = new ethers.ContractFactory(
      contractConstract.abi,
      contractConstract.bytecode,
      signer
    );
    const result: any = await factory
      .deploy(
        memberManagerAddress,
        proposalManagerAddress,
        cooperateProposalManagerAddress,
        proposalData
      )
      .catch((err: any) => {
        errorFunction(err);
      });
    console.log("result:", result);
    const ret = await result.deployed();
  }
};
