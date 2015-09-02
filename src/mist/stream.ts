/// <reference path='promise/listener.ts' />

module Mist {

  /**
   * @class Stream
   * @description publisher / subscriber.
   * @since 0.1.0
   */
  export class Stream {

    private listeners: Listener[] = [];

    /**
     * @param {} response
     */
    add(response) {

      this.listeners.forEach(function(listener) {
        listener.compute(response);
      });
    }

    /**
     * @param {Listener} listener
     */
    cancel(listener: Listener) {

      var i = this.listeners.indexOf(listener);
      i < 0 || this.listeners.splice(i, 1);
    }

    /**
     * @override
     */
    initialize() {
    }

    /**
     * @return {Listener}
     */
    listen(): Listener {

      var listener = new Listener();

      // initialize.
      this.listeners.length || this.initialize();
      this.listeners.push(listener);

      // {} response.
      return listener;
    }
  }
}
