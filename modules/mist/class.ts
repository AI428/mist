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
  * @summary commands
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

          // initialize.

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
    * @param {} dur
    * @return {}
    */
    add(names: string[], dur: number = 0): Promise {

      return new Promise((responsor) => {

        var r = this.value.compose(

          function(o) {

            names.forEach(

              // composer.
              function(name) {

                // tagged response.
                o[name] = ADD;
              });

            // {} response.
            return o;
          });

        // dur response.
        dur > 0 ? Frame.on(
          this.remove.bind(
            this, names), dur).then(responsor) :

          // passthru.
          r.then(responsor);
      });
    }

    /**
    * @param {} names
    * @return {}
    */
    next(names: string[]): Promise {

      return this.value.compose(

        function(o) {

          names.forEach(

            // composer.
            function(name) {

              // tagged response.
              o[name] = NEXT;
            });

          // {} response.
          return o;
        });
    }

    /**
    * @param {} names
    * @return {}
    */
    prev(names: string[]): Promise {

      return this.value.compose(

        function(o) {

          names.forEach(

            // composer.
            function(name) {

              // tagged response.
              o[name] = PREVIOUS;
            });

          // {} response.
          return o;
        });
    }

    /**
    * @param {} names
    * @param {} dur
    * @return {}
    */
    remove(names: string[], dur: number = 0): Promise {

      return new Promise((responsor) => {

        var r = this.value.compose(

          function(o) {

            names.forEach(

              // composer.
              function(name) {

                // tagged response.
                o[name] = REMOVE;
              });

            // {} response.
            return o;
          });

        // dur response.
        dur > 0 ? Frame.on(
          this.add.bind(
            this, names), dur).then(responsor) :

          // passthru.
          r.then(responsor);
      });
    }

    /**
    * @param {} names
    * @return {}
    */
    toggle(names: string[]): Promise {

      return this.value.compose(

        function(o) {

          names.forEach(

            // composer.
            function(name) {

              switch (o[name]) {

                case ADD:

                  // tagged response.
                  o[name] = REMOVE;

                  break;
                case REMOVE:

                  // tagged response.
                  o[name] = ADD;

                  break;
                case TOGGLE:

                  // tagged response.
                  delete o[name];

                  break;
                default:

                  // tagged response.
                  o[name] = TOGGLE;
              }
            });

          // {} response.
          return o;
        });
    }
  }
}
