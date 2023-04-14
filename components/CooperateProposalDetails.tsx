import { useState } from "react";
import { doExecuteProposal } from "../contracts/CooperateProposalApi";
import {
  CooperateProposalProps,
  PROPOSAL_KIND,
  PROPOSAL_STATUS,
} from "../types/ProposalManagerType";

const CooprateProposalDetails = (props: CooperateProposalProps) => {
    const [divideList,setDivideList]= useState("");

    const _executeProposal = async () => {
        await doExecuteProposal(divideList,props.targetProposal);
    }
  return (
    <div className="flex flex-col text-center">
      <table className="table-auto border-collapse border border-white">
        <tr>
          <td>Proposal Id:</td>
          <td>{String(props.targetProposal.proposalId)}</td>
        </tr>
        <tr>
          <td>Title:</td>
          <td>{props.targetProposal.title}</td>
        </tr>
        <tr>
          <td>Kind:</td>
          <td>{PROPOSAL_KIND[props.targetProposal.cooperateProposalKind]}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>{PROPOSAL_STATUS[props.targetProposal.proposalStatus]}</td>
        </tr>
        <tr>
          <td>Outline:</td>
          <td>{props.targetProposal.outline}</td>
        </tr>
        <tr>
          <td>Github Url:</td>
          <td>{props.targetProposal.githubURL}</td>
        </tr>
        <tr>
          <td rowSpan={props.targetProposal.daoAddressList.length}>
            Cooperate Dao List:
          </td>
          {typeof props.targetProposal.daoAddressList !== "undefined" ? (
            props.targetProposal.daoAddressList.map((dao) => {
              <>
                <td>{dao}</td>
              </>;
            })
          ) : (
            <td></td>
          )}
        </tr>
        <tr>
          <td rowSpan={props.targetProposal.relatedProposalIdList.length}>
            Related Proposal Id List:
          </td>
          {typeof props.targetProposal.relatedProposalIdList !== "undefined" ? (
            props.targetProposal.relatedProposalIdList.map((proposalId) => {
              <>
                <td>{proposalId}</td>
              </>;
            })
          ) : (
            <td></td>
          )}
        </tr>
        <tr>
          <td rowSpan={props.targetProposal.targetAddressList.length}>
            Target Address List:
          </td>
          {typeof props.targetProposal.targetAddressList !== "undefined" ? (
            props.targetProposal.targetAddressList.map((targetAddress) => {
              <>
                <td>{targetAddress}</td>
              </>;
            })
          ) : (
            <td></td>
          )}
        </tr>
        <tr>
          <td>Target Amount:</td>
          <td>{props.targetProposal.targetAmount}</td>
        </tr>
        <tr>
          <td>Address Of Proposal:</td>
          <td>{props.targetProposal.addressOfThisContract}</td>
        </tr>
      </table>
      <div className="p-5"></div>
      {props.targetProposal.isDaoMemeber && (
        <>
            <div className="text-green-400 text-40px">Execute Proposal</div>
            <table>
            <td>
                Divide List Of Amount(Note:CSV Fromat):
            </td>
            <td>
            <input
                className="text-black text-14px px-2 py-1"
                onChange={(e) => setDivideList(e.target.value)}
              ></input>
            </td>
            </table>
            <div className="">
                <button
                    onClick={_executeProposal}
                >
                    Execute Proposal
                </button>
            </div>
        </>
      )}
    </div>
  );
};

export default CooprateProposalDetails;
