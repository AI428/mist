/// <reference path='wrapper/pulser.ts' />
/// <reference path='wrapper/timer.ts' />

/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
/// <reference path='statement.ts'/>
/// <reference path='value.ts'/>

namespace Mist {

  const ADD
    : number = 1;

  const REMOVE
    : number = 2;

  const TOGGLE
    : number = 3;

  const NEXT
    : number = 4;

  const PREVIOUS
    : number = 5;

  /**
  * @class Class
  */
  export class Class {

    private value: Value;

    /**
    * @constructor
    * @param {} statement
    */
    constructor(private statement: Statement) {

      this.value = new Value({});
      this.value.when(

        function(o) {

          var response: string[][] = [];

          for (let name in o) {

            var i = o[name];

            // format response.

            response[i] || (response[i] = []);
            response[i].push(name);

            // reposit.

            delete o[name];
          }

          var queues: Function[] = [];

          statement.each(

            function(e) {

              var classes = e.classList;

              response.map(

                function(names, i) {

                  switch (i) {

                    case ADD:

                      // bulk response.

                      classes.add.apply(classes, names);

                      break;
                    case REMOVE:

                      // bulk response.

                      classes.remove.apply(classes, names);

                      break;
                    case TOGGLE:

                      names.forEach(

                        function(name) {

                          classes.toggle(name);
                        });

                      break;
                    case NEXT:

                      var o = (e.nextElementSibling || statement.first()).classList;

                      // filt response.

                      names = names.filter(

                        function(name) {

                          var r = classes.contains(name);
                          if (r) classes.remove(name);

                          // is response.

                          return r;
                        });

                      if (names.length) {

                        queues.push(

                          function() {

                            // lazy response.

                            o.add.apply(o, names);
                          });
                      }

                      break;
                    case PREVIOUS:

                      var o = (e.previousElementSibling || statement.last()).classList;

                      // filt response.

                      names = names.filter(

                        function(name) {

                          var r = classes.contains(name);
                          if (r) classes.remove(name);

                          // is response.

                          return r;
                        });

                      if (names.length) {

                        queues.push(

                          function() {

                            // lazy response.

                            o.add.apply(o, names);
                          });
                      }

                      break;
                  }
                });
            });

          queues.forEach(

            function(responsor) {

              responsor();
            });
        });
    }

    /**
    * @param {} names
    */
    add(...names: string[]): Promise {

      return this.value.compose((o) => {

        // {} response.

        return this.compose(names, ADD, o);
      });
    }

    /**
    * @param {} names
    */
    next(...names: string[]): Promise {

      return this.value.compose((o) => {

        // {} response.

        return this.compose(names, NEXT, o);
      });
    }

    /**
    * @param {} names
    */
    prev(...names: string[]): Promise {

      return this.value.compose((o) => {

        // {} response.

        return this.compose(names, PREVIOUS, o);
      });
    }

    /**
    * @param {} dur
    */
    pulse(dur: number): Wrapper.Pulser {

      // wrapper response.

      return new Wrapper.Pulser(this, dur);
    }

    /**
    * @param {} names
    */
    remove(...names: string[]): Promise {

      return this.value.compose((o) => {

        // {} response.

        return this.compose(names, REMOVE, o);
      });
    }

    /**
    * @param {} dur
    */
    time(dur: number): Wrapper.Timer {

      // wrapper response.

      return new Wrapper.Timer(this, dur);
    }

    /**
    * @param {} names
    */
    toggle(...names: string[]): Promise {

      return this.value.compose(

        function(o) {

          names.forEach(

            // composer.
            function(name) {

              switch (o[name]) {

                case ADD:

                  // ! response.
                  o[name] = REMOVE;

                  break;
                case REMOVE:

                  // ! response.
                  o[name] = ADD;

                  break;
                case TOGGLE:

                  // remove.
                  delete o[name];

                  break;
                default:

                  // passthru.
                  o[name] = TOGGLE;
              }
            });

          // {} response.
          return o;
        });
    }

    /**
    * @param {} names
    * @param {} command
    */
    private compose(names: string[], command: number, response: any = {}) {

      names.forEach(

        function(name) {

          response[name] = command;
        });

      // {} response.
      return response;
    }
  }
}
