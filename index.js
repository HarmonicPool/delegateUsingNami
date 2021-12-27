import NamiDelegationError from "./errors/DelegationError";
import makeNamiInterface from "./cardano/nami"

export { NamiDelegationError, makeNamiInterface };

/**
 * 
 * @param {string} pool_id_bech_32 pool id to delegate to
 * @param {string} blockfrost_project_id refer to https://blockfrost.io to get your
 * @param {object | undefined} options alter the default behavior in case nami has not been enabled before calling the function,
 * if window.cardano.isEnabled() returns true you should not worry about this parameter
 * property to modify are:
 * 
 *     onNamiNotEnabled_shouldThrow, if true everything else is ignored and throws a NamiDelegationError if nami is not enabled;
 * 
 *     onNamiNotEnabled_shouldRequestEnable: if true calls window.cardano.enable() once
 *  
 * @returns the delegation transaction hash you can use to check the transaction state on cardano mainnet explorers
 */
export default async function delegateUsingNami(
    pool_id_bech_32,
    blockfrost_project_id,
    options = {}
)
{
    if( typeof window === "undefined" ) throw new NamiDelegationError("delegateUsingNami can work only in a browser context", -1);

    if( !window.cardano ) throw new NamiDelegationError("unable to detect the Nami browser extension", 1);

    if( typeof options !== "object" ) throw NamiDelegationError("invaid option");

    const _opt = {
        // default options
        onNamiNotEnabled_shouldThrow: true,
        onNamiNotEnabled_shouldRequestEnable: true,
        // overriding if any
        ...options
    }

    if( !( await window.cardano.isEnabled() ) )
    {
        console.warn("Nami wallet is present as browser extension but is not connected to this website");

        if( _opt.onNamiNotEnabled_shouldThrow )
        {
            throw new NamiDelegationError("nami wallet has not been enabled", 3);
        }

        if( _opt.onNamiNotEnabled_shouldRequestEnable )
        {
            window.cardano.enable();
        }

        if( _opt.onNamiNotEnabled_shouldRequestEnable === false && _opt.onNamiNotEnabled_shouldThrow == false )
        {
            // explicit request to do nothing
            // in any case if nami is not enabled no transaction can be done
            // exit silently

            return "";
        }
    }

    // removes any potential whitespace
    const _pool_id = formatString( pool_id_bech_32 );

    if( !_pool_id.startsWith("pool") )
    {
        throw new NamiDelegationError(
            "pool_id_bech_32 must start with the \"pool\" word, pheraps you provvided the hex pool Id? pool_id_bech_32 was: " + pool_id_bech_32 ,
            2
        );
    }

    // removes any potential whitespace
    const _blockfrost = formatString( blockfrost_project_id );

    const NamiInterface = makeNamiInterface( _blockfrost );

    // returns the transaction hash
    return (
        await NamiInterface.submitTx(
            await NamiInterface.signTx(
                await NamiInterface.delegationTx(
                    await NamiInterface.getDelegation(),
                    _pool_id
                )
            )
        )
    );
};

function formatString( str )
{
    if( typeof str !== "string" )
    {
        throw new Error("can't format a non string value, input: " + str );
    }

    // remove any potential whitespace
    return ( str.trim().split(" ").join("").split("\n").join("") );
}