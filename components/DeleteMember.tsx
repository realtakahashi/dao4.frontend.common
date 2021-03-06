import { useState } from "react";
import { deleteMember }  from "../contracts/membermanager_api";
import { MemberInfo } from "../types/MemberManagerType";

interface DeleteMemberParameter {
  daoAddress:string
  memberInfo:MemberInfo
}

const DeleteMember = (props: DeleteMemberParameter) => {
  const memberManagerAddress = process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS ?? "";
  const [proposalId, setProposalId] = useState("0");

  const _deleteMember = async () => {

    await deleteMember(props.memberInfo, Number(proposalId),memberManagerAddress,props.daoAddress);
  };

  return (
    <>
      <div className="p-2"></div>
      <div className="flex justify-center text-24px text-blue-200">
        <label>You are trying to remove the following members:</label>
      </div>
      <div className="p-2 flex justify-center">
        <table>
          <tr className="">
            <th className="px-2 py-4 text-24px text-white flex justify-end ">
              Name:
            </th>
            <td className="px-2 py-4 text-24px text-white ">
              {props.memberInfo.name}
            </td>
          </tr>
          <tr className="">
            <th className="px-2 py-4 text-24px text-white flex justify-end ">
              Member Id:
            </th>
            <td className="px-2 py-4 text-24px text-white ">
              {String(props.memberInfo.memberId)}
            </td>
          </tr>
          <tr className="">
            <th className="px-2 py-4 text-24px text-white flex justify-end ">
              Address:
            </th>
            <td className="px-2 py-4 text-14px text-white ">
              {props.memberInfo.eoaAddress}
            </td>
          </tr>
          <tr className="">
            <th className="flex justify-end px-2 py-4 text-white text-24px ">
              Proposal Id:
            </th>
            <td className="px-2 py-4 text-14px text-white ">
              <input
                className="text-black text-14px px-2 py-2"
                onChange={(e) => setProposalId(e.target.value)}
              ></input>
            </td>
          </tr>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
          onClick={() => _deleteMember()}
        >
          Execute
        </button>
      </div>
    </>
  );
};

export default DeleteMember;
