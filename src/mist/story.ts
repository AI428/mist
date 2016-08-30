/// <reference path='statement.ts'/>

namespace Mist {

    /**
    * @class Story
    */
    export class Story {

        pos: string;

        /**
        * @access private
        * @summary for narr
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
        * @param {} name
        */
        move(name: string): boolean {

            var response: boolean = false;

            var s = this;

            var conns = s.conns[s.pos] || {};

            // mapped
            if (conns[name]) {
                s.pos = name;
                response = true;
            }

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
