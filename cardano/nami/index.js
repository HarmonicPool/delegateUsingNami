
import { getPoolId, delegationTx, signTx, submitTx, getDelegation, blockfrostRequest } from "./transaction";


const makeNamiInterface = blockfrost_project_id => {

  if( typeof blockfrost_project_id !== "string" ) throw Error("blockfrost_project_id must be a string")

  const ctx = {
    blockfrost_project_id
  }

  return {
    delegationTx: delegationTx(ctx),
    getPoolId,
    signTx,
    submitTx,
    /**
     * gets delegation infos of the user address
     * if the user has delegated to your pool then
     * " NamiInterface.getDelegation().pool_id === your_pool_id " evaluates to true
     */
    getDelegation: getDelegation(ctx),
    /**
     * returns an asyncornous function to use to do your own api requests
     */
    blockfrostRequest: blockfrostRequest(ctx),
    cardano: globalThis.cardano
  };
}

export default makeNamiInterface;