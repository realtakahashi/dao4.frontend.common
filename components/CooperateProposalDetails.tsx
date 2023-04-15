import { useState } from "react";
import { doExecuteProposal } from "../contracts/CooperateProposalApi";
import {
  CooperateProposalProps,
  PROPOSAL_KIND,
  PROPOSAL_STATUS,
} from "../types/ProposalManagerType";

const CooprateProposalDetails = (props: CooperateProposalProps) => {
  const [divideList, setDivideList] = useState("");

  const _executeProposal = async () => {
    console.log("#### _setShow");
    await doExecuteProposal(divideList, props.targetProposal);
  };
  return (
    <div className="flex flex-col text-center px-20">
      <table className="border-2 border-white text-white">
        <tr className="border-2 border-white">
          <td  className="border-2 border-white">Proposal Id:</td>
          <td className="border-2 border-white">{String(props.targetProposal.proposalId)}</td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">Title:</td>
          <td className="border-2 border-white">{props.targetProposal.title}</td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">Kind:</td>
          <td className="border-2 border-white">{PROPOSAL_KIND[props.targetProposal.cooperateProposalKind]}</td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">Status:</td>
          <td className="border-2 border-white">{PROPOSAL_STATUS[props.targetProposal.proposalStatus]}</td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">Outline:</td>
          <td className="border-2 border-white">{props.targetProposal.outline}</td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">Github Url:</td>
          <td className="border-2 border-white">{props.targetProposal.githubURL}</td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">
            Cooperate Dao List:
          </td>
          <td className="border-2 border-white">
            {props.targetProposal.daoAddressList.map((dao) => {
                return(
                  <>
                {dao}<br/>
                </>
                );
            })}
            </td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">
            Related Proposal Id List:
          </td>
          <td className="border-2 border-white">
            {props.targetProposal.relatedProposalIdList.map((proposalId) => {
                return(
                  <>
                {String(proposalId)}<br/>
                </>
                );
            })}
            </td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">
            Target Address List:
          </td>
          <td className="border-2 border-white">
            {props.targetProposal.targetAddressList.map((targetAddress) => {
                return(
                <>
                {targetAddress}<br/>
                </>
                );
            })}
            </td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">Target Amount:</td>
          <td className="border-2 border-white">{String(props.targetProposal.targetAmount)}</td>
        </tr>
        <tr className="border-2 border-white">
          <td className="border-2 border-white">Address Of Proposal:</td>
          <td>{props.targetProposal.addressOfThisContract}</td>
        </tr>
      </table>
      <div className="p-5"></div>
      {props.targetProposal.isDaoMemeber && (
        <>
          <div className="text-green-400 text-40px">Execute Proposal</div>
          <table className="">
            <tr>
            <td className=" w-1/3 text-white">Divide List Of Amount(Note:CSV Fromat):</td>
            <td className="text-left  px-3 py-3">
              <textarea
                className="text-black text-14px px-2 py-1 w-2/3"
                onChange={(e) => setDivideList(e.target.value)}
              ></textarea>
            </td>
            </tr>
          </table>
          <div className="p-3">
            <button
              className="text-black bg-green-100 hover:bg-green-400 border-white border-2 px-5 py-3"
            onClick={_executeProposal}>Execute Proposal</button>
          </div>
          <div className="p-6"></div>
        </>
      )}
    </div>
  );
};

export default CooprateProposalDetails;
