import { useState } from "react";
import { doChangeStatusForCooperateProposal } from "../contracts/CooperateProposalApi";
import { CooperateProposalProps } from "../types/ProposalManagerType";
import CooperateProposalParts from "./CooperateProposalParts";

const CooperateChangeStatusOfProposal = (props: CooperateProposalProps) => {
  const [changeStatus, setChangeStatus] = useState("0");

  const selectChangeStatus = (status: string) => {
    setChangeStatus(status);
  };

  const _doChangeStatus = async () => {
    await doChangeStatusForCooperateProposal(
      Number(changeStatus),
      props.targetProposal,
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white"
          key={props.targetProposal.title}
        >
          <CooperateProposalParts targetProposal={props.targetProposal} ></CooperateProposalParts>
          <label className="text-15px text-blue-400 px-4 py-5">
            Change To :
          </label>
          <select
            className="font-bold"
            name="Status"
            value={changeStatus}
            onChange={(e) => selectChangeStatus(e.target.value)}
          >
            <option value="1">Voting</option>
            <option value="2">Pending</option>
            <option value="5">FinishedVoting</option>
          </select>
          <div className="p-3"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
          onClick={() => _doChangeStatus()}
        >
          Change
        </button>
      </div>
    </>
  );
};

export default CooperateChangeStatusOfProposal;
