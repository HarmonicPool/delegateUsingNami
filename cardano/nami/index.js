
const {
  blockfrostRequest,
  initTx,
  getPoolId,
  delegationTx,
  signTx,
  submitTx,
  getDelegation
} = require("./transaction");


private_namiInterface_hasBeenInitialized = false;

class NamiInterface
{
  /**
   * @private
   */
  static _api_key;

  /**
   * 
   * @param {string} blockfrost_project_id 
   */
  static init( blockfrost_project_id )
  {
    if( private_namiInterface_hasBeenInitialized ) return;

    if( typeof blockfrost_project_id !== "string" ) throw Error("blockfrost_project_id must be a string")

    NamiInterface._api_key = blockfrost_project_id;

    private_namiInterface_hasBeenInitialized = true;
  }

  /**
   * 
   * @param {string} targetPoolId 
   * @returns 
   */
  static createDelegationTransaction( targetPoolId )
  {
    if( !private_namiInterface_hasBeenInitialized ) throw Error("NamiInterface.init must be called before using any other method");

    if( typeof targetPoolId !== "string" ) throw Error("poolId must be a string")
    
    return NamiInterface.getCurrentDelegation()
    .then( currnetDelegation => 
      delegationTx({
        blockfrost_project_id: NamiInterface._api_key
      })( currnetDelegation, targetPoolId )
    )
  }

  static gotPoolId( poolId )
  {
    if( !private_namiInterface_hasBeenInitialized ) throw Error("NamiInterface.init must be called before using any other method");

    if( typeof poolId !== "string" ) throw Error("poolId must be a string")

    return getPoolId( poolId )
  }

  /**
   * 
   * @param {Transaction} transactionObj 
   * @returns 
   */
  static signTransaction( transactionObj )
  {
    if( !private_namiInterface_hasBeenInitialized ) throw Error("NamiInterface.init must be called before using any other method");

    return signTx( transactionObj );
  }

  /**
   * 
   * @param {Transaction} transactionObj 
   * @returns 
   */
  static submitTransaction( transactionObj )
  {
    if( !private_namiInterface_hasBeenInitialized ) throw Error("NamiInterface.init must be called before using any other method");

    return submitTx( transactionObj );
  }

  static getCurrentDelegation()
  {
    if( !private_namiInterface_hasBeenInitialized ) throw Error("NamiInterface.init must be called before using any other method");

    return getDelegation({
      blockfrost_project_id: NamiInterface._api_key
    })();
  }

  static makeBlockfrostRequest( endpoint, request_headers, request_body )
  {
    if( !private_namiInterface_hasBeenInitialized ) throw Error("NamiInterface.init must be called before using any other method");

    return blockfrostRequest({
      blockfrost_project_id: NamiInterface._api_key
    })(endpoint, request_headers, request_body);
  }
}

module.exports = NamiInterface;