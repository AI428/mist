/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>

module Mist {

  export module Recognizer {

    /**
    * @class Tap
    * @module recognizer
    */
    export class Tap {

      /**
      * @constructor
      * @param {} emitter
      */
      constructor(private emitter: Emitter) {

        new Emission(emitter, 'panend').when(

          function(m) {

            emitter.emit('tap', m);
          });
      }
    }
  }
}
