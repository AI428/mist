/// <reference path='statement.ts'/>

namespace Mist {

    /**
    * @class Scene
    */
    export class Scene {

        /**
        * @access public
        * @summary story position
        */
        pos: string;

        /**
        * @access private
        */
        private conns: any = {};

        /**
        * @constructor
        * @param {} statement
        */
        constructor(private statement: Statement) {
        }

        /**
        * @param {} s
        * @param {} e
        */
        connect(s: string, e: string) {

            this.conns[s] || (this.conns[s] = {});
            this.conns[s][e] = e;
        }

        /**
        * @summary for reuse
        */
        end() {

            this.pos = null;
        }

        /**
        * @param {} name
        */
        move(name: string) {

            var response: boolean = false;

            var s = this;

            var conns = s.conns[s.pos] || {};

            // mapped
            if (s.pos == name) {
                response = true;
            } else if (conns[name]) {
                response = true;
                s.pos = name;
            }

            // a response
            return response;
        }

        /**
        * @param {} name
        */
        start(name: string) {

            this.pos = name;
        }
    }
}
