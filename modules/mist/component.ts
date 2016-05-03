namespace Mist {

    /**
    * @class Component
    * @summary factory
    */
    export class Component {

        static responses: any = {};

        /**
        * @param {} modular
        * @param {} o
        */
        static create<T>(modular: any, ...o: any[]): T {

            // ser response.

            var m = ser([modular]);
            var n = ser(o);

            // initialize.

            this.responses[m] || (this.responses[m] = {});

            // inher response.

            if (!this.responses[m][n]) {
                this.responses[m][n] = new (
                    modular.bind.apply(
                        modular, [modular].concat([].slice.apply(o))
                    )
                );
            }

            // lasting response.
            return this.responses[m][n];
        }
    }

    /**
    * @access private
    * @static
    */
    var sessions = 0;

    /**
    * @access private
    * @static
    */
    function ser(response: any[]) {

        return JSON.stringify(

            // [] response.
            response.map(

                function(v) {
                    return v instanceof Object ?
                        v.sessions || (v.sessions = sessions++) :
                        v;
                })
        );
    }
}
