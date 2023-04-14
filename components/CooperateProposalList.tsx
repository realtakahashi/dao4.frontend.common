import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import {
  getCooperateProposalList,
  getCooperateProposalListPlus,
} from "../contracts/CooperateProposalApi";
import { checkElectionComission } from "../contracts/membermanager_api";
import { getProposalList } from "../contracts/ProposalManagerApi";
import {
  PROPOSAL_VOTING,
  PROPOSAL_FINISHED,
  PROPOSAL_REJECTED,
  CooperateProposalInfo,
  CooperateProposalInfoPlus,
} from "../types/ProposalManagerType";
import ChangeStatusOfProposal from "./ChangeStatusOfProposal";
import CooperateChangeStatusOfProposal from "./CooperateChangeStatusOfProposal";
import CooprateProposalDetails from "./CooperateProposalDetails";
import CooperateProposalParts from "./CooperateProposalParts";
import CooperateVote from "./CooperateVote";
import ProposalParts from "./ProposalParts";
import Vote from "./Vote";

interface CooperateProposalListProps {
  setShowSubmmit: (flg: boolean) => void;
  setShowList: (flg: boolean) => void;
  showAllList: boolean;
}

const CooperateProposalList = (props: CooperateProposalListProps) => {
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS ?? "";
  const [proposalList, setProposalList] =
    useState<Array<CooperateProposalInfoPlus>>();
  const [showList, setShowList] = useState(true);
  const [showVote, setShowVote] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showProposalDetail, setShowProposalDetail] = useState(false);
  const [targetProposal, setTargetProposal] =
    useState<CooperateProposalInfoPlus>({
      cooperateProposalKind: 0,
      daoAddressList: [],
      title: "",
      outline: "",
      details: "",
      githubURL: "",
      proposalId: "",
      relatedProposalIdList: [],
      proposalStatus: 0,
      targetAddressList: [],
      targetAmount: "",
      addressOfThisContract: "",
      isElectoricalCommision: false,
      isDaoMemeber: false,
    });

  const _getProposalList = async () => {
    const result = await getCooperateProposalList();
    const resultPlus = await getCooperateProposalListPlus(result);
    setProposalList(resultPlus);
  };

  const _setShowAndSetTargetProposal = (
    _showList: boolean,
    _showVote: boolean,
    _showChangeStatus: boolean,
    _showBackButton: boolean,
    _clickBackButton: boolean,
    _showProposalDetail: boolean,
    _targetProposal: CooperateProposalInfoPlus
  ) => {
    _setShow(
      _showList,
      _showVote,
      _showChangeStatus,
      _showBackButton,
      _clickBackButton,
      _showProposalDetail
    );
    setTargetProposal(_targetProposal);
  };

  const _setShow = (
    _showList: boolean,
    _showVote: boolean,
    _showChangeStatus: boolean,
    _showBackButton: boolean,
    _clickBackButton: boolean,
    _showProposalDetail: boolean
  ) => {
    setShowList(_showList);
    setShowBackButton(_clickBackButton);
    _getProposalList();
    setShowVote(_showVote);
    setShowChangeStatus(_showChangeStatus);
    setShowProposalDetail(_showProposalDetail);
    if (_clickBackButton) {
      props.setShowList(true);
      props.setShowSubmmit(false);
    }
  };
  useEffect(() => {
    _getProposalList();
  }, []);

  return (
    <>
      {showBackButton == true && (
        <div className="flex justify-center">
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => _setShow(true, false, false, false, true, false)}
          >
            Back To List
          </button>
        </div>
      )}
      <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
        {showList == true && (
          <>
            {typeof proposalList !== "undefined" ? (
              proposalList.map((proposal) => {
                return (
                  <div key={proposal.title}>
                    {(props.showAllList == true ||
                      (props.showAllList == false &&
                        proposal.proposalStatus != PROPOSAL_FINISHED &&
                        props.showAllList == false &&
                        proposal.proposalStatus != PROPOSAL_REJECTED)) && (
                      <div className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white">
                        <CooperateProposalParts
                          targetProposal={proposal}
                        ></CooperateProposalParts>
                        <div className="px-6 py-4">
                          <button
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                            onClick={() =>
                              _setShowAndSetTargetProposal(
                                false,
                                false,
                                false,
                                true,
                                false,
                                true,
                                proposal
                              )
                            }
                          >
                            Show Detail
                          </button>
                          {proposal.isDaoMemeber &&
                            proposal.proposalStatus == PROPOSAL_VOTING && (
                              <button
                                className="inline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                onClick={() =>
                                  _setShowAndSetTargetProposal(
                                    false,
                                    true,
                                    false,
                                    false,
                                    false,
                                    false,
                                    proposal
                                  )
                                }
                              >
                                Vote
                              </button>
                            )}
                          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <Link href={proposal.githubURL}>
                              <a target={"_blank"} rel="noopener noreferrer">
                                Website
                              </a>
                            </Link>
                          </button>
                          {proposal.isElectoricalCommision == true && (
                            <button
                              className="inline-block bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                              onClick={() =>
                                _setShowAndSetTargetProposal(
                                  false,
                                  false,
                                  true,
                                  false,
                                  false,
                                  false,
                                  proposal
                                )
                              }
                            >
                              Change Status Of Proposal
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>
      <div>
        {showProposalDetail == true && (
          <CooprateProposalDetails
            targetProposal={targetProposal}
          ></CooprateProposalDetails>
        )}
      </div>
      <div>
        {showVote == true && (
          <CooperateVote targetProposal={targetProposal}></CooperateVote>
        )}
      </div>
      <div>
        {showChangeStatus == true && (
          <CooperateChangeStatusOfProposal
            targetProposal={targetProposal}
          ></CooperateChangeStatusOfProposal>
        )}
      </div>
    </>
  );
};
export default CooperateProposalList;
