/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>

namespace Mist {

    /**
    * @class Value
    */
    export class Value extends Promise {

        private xs: ((response: any) => void)[] = [];
        private xd: boolean;
        private xr: () => void;

        /**
        * @constructor
        * @param {} composite
        */
        constructor(public composite?: any) {

            super((

                succeed,
                erred
            ) => {

                this.xr = () => {
                    this.xd || (() => {
                        this.xd = true;

                        Frame.at(() => {

                            var responsor: (response: any) => void;

                            try {
                                // commit response.
                                succeed(this.composite);

                            } catch (e) {

                                // fail response.
                                erred(e);
                            }

                            while (

                                responsor = this.xs.shift()) {
                                responsor(this.composite);
                            }

                            this.xd = false;
                        });
                    })();
                }
            });
        }

        /**
        * @param {} composer
        */
        compose(composer: (composite: any) => any): Promise {

            return new Promise(

                (responsor) => {

                    Frame.at(() => {

                        // a response.
                        this.composite = composer(this.composite);
                        this.xs.push(responsor);
                        this.xr();
                    });
                });
        }
    }
}
