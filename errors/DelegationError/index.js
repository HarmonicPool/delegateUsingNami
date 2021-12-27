

class NamiDelegationError extends Error
{
    /**
     * @private
     */
    _errorCode;
    /**
     * readonly error code
     */
    get errorCode()
    {
        return this._errorCode;
    }

    /**
     * 
     * @param {string | undefined} message error message
     * @param {number} errorCode easy to use error detection
     */
    constructor(message, errorCode = 0)
    {
        super(message)
        this._errorCode = errorCode;
    }

    /**
     * 
     * @param {number} errorCode
     * @returns {string} an error code description
     */
    static getErrorCodeDescription( errorCode )
    {
        switch( errorCode )
        {
            case -1:
                return "tried to use Nami outside of browser environment,\n to prevent this error to appen use \"process.browser === true\" or \" typeof window !== \"undefined\" \" to check if the execution environment is the browser";
            break;
            case 0:
                return "general Error, see the error message if any";
            break;
            case 1:
                return "the user does not have the Nami extension";
            break;
            case 2:
                return "wrong pool id provvided, make shure is the bech_32 form, aka the one starting with \"pool\"";
            break;
            case 3:
                return "Nami is not connected to the website, make sure that window.cardano.isEnabled() returns true and call window.cardano.enable() otherwise";
            break;
            default:
                return "no error code found for " + errorCode.toString();
        }
    }

    /**
     * @returns {string} an error code description
     */
    get errorCodeDescription()
    {
        return NamiDelegationError.getErrorCodeDescription( this._errorCode );
    }
}

module.exports.NamiDelegationError = NamiDelegationError;