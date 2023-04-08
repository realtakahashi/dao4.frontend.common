import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { checkElectionComission } from "../contracts/membermanager_api";
import { getProposalList } from "../contracts/ProposalManagerApi";
import {
  ProposalInfo,
  PROPOSAL_VOTING,
  PROPOSAL_FINISHED,
  PROPOSAL_REJECTED,
} from "../types/ProposalManagerType";
import ChangeStatusOfProposal from "./ChangeStatusOfProposal";
import ProposalParts from "./ProposalParts";
import Vote from "./Vote";

interface ProposalListReadOnlyProps {
  daoAddress: string;
  daoName: string;
}

const ProposalListReadOnly = (props: ProposalListReadOnlyProps) => {
  const [proposalList, setProposalList] = useState<Array<ProposalInfo>>();

  const _getProposalList = async () => {
    //console.log("## getSubDaoList call 1");
    const result = await getProposalList(props.daoAddress);
    //console.log("## memberList:",result);
    setProposalList(result);
  };

  useEffect(() => {
    _getProposalList();
  }, []);

  return (
    <>
      <div className="flex justify-center text-white text-30px font-bold">DAO Name: {props.daoName}</div>
      <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
          <>
            {typeof proposalList !== "undefined"
              ? proposalList.map((proposal) => {
                  return (
                    <div key={proposal.title}>
                        <div
                          className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white"    
                        >
                          <ProposalParts
                            targetProposal={proposal}
                            daoAddress={props.daoAddress}
                          ></ProposalParts>
                          <div className="px-6 py-4">
                            <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              <Link href={proposal.githubURL}>
                                <a target={"_blank"} rel="noopener noreferrer">
                                  Website
                                </a>
                              </Link>
                            </button>
                          </div>
                        </div>
                    </div>
                  );
                })
              : ""}
          </>
      </div>
    </>
  );
};

export default ProposalListReadOnly;
