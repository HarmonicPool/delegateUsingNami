
/**
 * *.wasm module can only be imported asyncronously
 * Loader class allow to load the cardano serializaton lib once and make it aviable every time
 */
class Loader {
  
  // always call this method to be shure the wasm has been loaded;
  async load() {

    //load once
    if (this._wasm) return;

    /**
     * @private
     */
    this._wasm = await import(
      "@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib"
    );
  }

  get Cardano() {
    return this._wasm;
  }
}
  
module.exports.Loader = new Loader();