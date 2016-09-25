namespace Mist {

    /**
    * @class Component
    */
    export class Component {

        static responses: any = {};

        /**
        * @param {} component
        * @param {} o
        */
        static create<T>(component: any, ...o: any[]): T {

            var m = ser([component]);
            var n = ser(o);

            // initialize

            this.responses[m] || (this.responses[m] = {});

            // inher response

            if (!this.responses[m][n]) {
                this.responses[m][n] = new (
                    component.bind.apply(
                        component, [component].concat([].slice.apply(o))));
            }

            // lasting response

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
    function ser(conv: any[]) {

        return JSON.stringify(

            conv.map(

                function(v) {
                    return v instanceof Object ?
                        v.sessid || (v.sessid = sessions++) :
                        v;
                }));
    }
}
