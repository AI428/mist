/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
/// <reference path='statement.ts'/>
/// <reference path='value.ts'/>

module Mist {

  /**
  * @access private
  * @static
  */
  enum command { a, r, t };

  /**
  * @class Class
  * @description binder
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

          var response = [];

          for (var name in o) {

            var k = o[name];

            // mat response.
            response[k] || (response[k] = []);
            response[k].push(name);

            delete o[name];
          }

          statement.each(

            function(e) {

              var m = e.classList;
              var n;

              // patch response.
              !(n = response[command.a]) || m.add.apply(m, n);
              !(n = response[command.r]) || m.remove.apply(m, n);
              !(n = response[command.t]) || n.forEach(

                function(name) {

                  m.toggle(name);
                });
            });
        });
    }

    /**
    * @param {} names
    * @param {} dur
    * @return {}
    */
    add(names: string[], dur: number = 0): Promise {

      return new Promise(

        (responsor) => {

          var r = this.value.compose((o) => {

            // composer.
            names.forEach(
              function(name) {
                o[name] = command.a;
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
    * @param {} dur
    * @return {}
    */
    remove(names: string[], dur: number = 0): Promise {

      return new Promise(

        (responsor) => {

          var r = this.value.compose((o) => {

            // composer.
            names.forEach(
              function(name) {
                o[name] = command.r;
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

      return this.value.compose(function(o) {

        // composer.
        names.forEach(function(name) {

          switch (o[name]) {

            case command.a:

              // tagged response.
              o[name] = command.r;

              break;
            case command.r:

              // tagged response.
              o[name] = command.a;

              break;
            case command.t:

              // tagged response.
              delete o[name];

              break;
            default:

              // tagged response.
              o[name] = command.t;
          }
        });

        // {} response.
        return o;
      });
    }
  }
}
