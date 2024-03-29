import { useState } from "react";
import ProposalList from "./ProposalList";
import SubmitProposal from "./SubmitProposal";

interface ProposalParameter{
  daoAddress:string
}

const Proposal = (props:ProposalParameter) => {
  const [showListButton, setShowListButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showList, setShowList] = useState(true);
  const [showSubmitScreen, setShowSubmitScreen] = useState(false);
  const [showAllList, setShowAllList] = useState(false);

  const _manageShowing = (
    _listButton: boolean,
    _submitButton: boolean,
    _list: boolean,
    _submitScreen: boolean,
    _showAllList:boolean
  ) => {
    setShowListButton(_listButton);
    setShowSubmitButton(_submitButton);
    setShowList(_list);
    setShowSubmitScreen(_submitScreen);
    setShowAllList(_showAllList);
  };

  return (
    <>
      <div className="flex justify-center">
        {showListButton == true && (
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => _manageShowing(false, true, true, false,false)}
          >
            Back To List
          </button>
        )}
        {showSubmitButton == true && (
          <div>
          <button
            className="m-2 px-4 py-2 border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => _manageShowing(true, false, false, true,false)}
          >
            + Submit New
          </button>
          <button
          className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
          onClick={() => _manageShowing(false, true, true, false, !showAllList)}
        >
          All or Not Finished
        </button>
        </div>
        )}
      </div>
      <div>
        {showList == true && (
          <ProposalList 
            setShowSubmmitButton={setShowSubmitButton}
            setShowList={setShowList}
            setShowListButton={setShowListButton}
            setShowSubmitScreen={setShowSubmitScreen}
            showAllList={showAllList}
            daoAddress={props.daoAddress}
            />
        )}
        {showSubmitScreen == true && <SubmitProposal daoAddress={props.daoAddress}></SubmitProposal>}
      </div>
    </>
  );
};

export default Proposal;
