import { AddCooperateProposalFormData } from "../types/ProposalManagerType";
import { useState } from "react";
import { registerCooperateProposal } from "../contracts/CooperateProposalApi";

const CooperateSubmitProposal = () => {
  const [proposalValue, setProposalValue] =
    useState<AddCooperateProposalFormData>({
      cooperateProposalKind: 0,
      daoAddressList: "",
      title: "",
      outline: "",
      details: "",
      githubURL: "",
      proposalId: "",
      relatedProposalIdList: "",
      targetAddressList: "",
      targetAmount: "",
    });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProposalValue({
      ...proposalValue,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProposalValue({
      ...proposalValue,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProposalValue({
      ...proposalValue,
      [event.target.name]: event.target.value,
    });
    // console.log(formValue)
  };

  const _onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("## _onSubmit 1");
    event.preventDefault();
    await registerCooperateProposal(proposalValue);
  };

  return (
    <>
      <div className="p-3"></div>
      <div className="flex justify-center text-25px text-blue-200">
        <label>Enter the information of the coopereate proposal you want to add.</label>
      </div>
      <div className="p-3"></div>
      <form className="" onSubmit={_onSubmit}>
        <div className="p-3 flex flex-col">
          <table className="border-2">
            <tr className="border-2">
              <th className=" px-4 py-2 text-white border-2 w-1/4">
                Proposal Kind:
              </th>
              <td className=" px-4 py-2">
                <select
                  className="py-2 px-4  w-3/4"
                  name="cooperateProposalKind"
                  onChange={onChangeSelect}
                >
                  <option value="0">Use Of Funds</option>
                  <option value="1">Community Management</option>
                  <option value="2">Activities</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="  px-4 py-2 text-white border-2">List of co-proposed DAO addresses:</th>
              <td className=" px-4 py-2 border-2 text-white">
                <input
                  className="appearance-none rounded py-2 px-4 text-gray-700  w-3/4
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="daoAddressList"
                  type="text"
                  onChange={onChangeInput}
                ></input>
                &ensp;&ensp;Note: CSV Format
              </td>
            </tr>
            <tr>
              <th className=" px-4 py-2 text-white border-2">Title:</th>
              <td className=" px-4 py-2 border-2">
                <input
                  className="appearance-none rounded py-2 px-4 text-gray-700  w-3/4
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="title"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 text-white border-2">
                Outline:
              </th>
              <td className=" px-4 py-2 border-2">
                <textarea
                  className="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700  w-3/4
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="outline"
                  rows={5}
                  onInput={onChangeText}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th className=" px-4 py-2 text-white border-2">Detail:</th>
              <td className=" px-4 py-2 border-2">
                <textarea
                  className="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700  w-3/4
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="details"
                  rows={10}
                  onInput={onChangeText}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th className=" px-4 py-2 text-white border-2">
                Github URL:
              </th>
              <td className=" px-4 py-2 border-2">
                <input
                  className="appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700  w-3/4
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="githubURL"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th className=" px-4 py-2 text-white border-2">
              Acceptable proposals list for each DAO:
              </th>
              <td className=" px-4 py-2 border-2 text-white">
                <input
                  className="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700  w-3/4
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="relatedProposalIdList"
                  type="text"
                  onChange={onChangeInput}
                ></input>
                &ensp;&ensp;Note: CSV Format
              </td>
            </tr>
            <tr>
              <th className=" px-4 py-2 text-white border-2">
              Fund distribution list:
              </th>
              <td className=" px-4 py-2 border-2 text-white">
                <input
                  className="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 w-3/4 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="targetAddressList"
                  type="text"
                  onChange={onChangeInput}
                ></input>
                &ensp;&ensp;Note: CSV Format
              </td>
            </tr>
            <tr>
              <th className=" px-4 py-2 text-white border-2">
              Total funds distributed:
              </th>
              <td className=" px-4 py-2 border-2">
                <input
                  className="appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 w-3/4 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="targetAmount"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
          </table>
        </div>
        <div className="flex justify-center">
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
            onClick={() => _onSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CooperateSubmitProposal;
