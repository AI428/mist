namespace Mist {

    /**
    * @class Promise
    */
    export class Promise {

        private err: (response: any) => any;
        private success: (response: any) => any;
        private txd: boolean;
        private txr: () => void;

        /**
        * @constructor
        * @param {} process
        */
        constructor(process: (

            succeed
                : (response: any) => void,
            erred
                : (response: any) => void

        ) => void) {

            // bind response
            var s = this.succeed;
            var e = this.erred;

            // initialize
            this.resume();

            // lazy response
            process(

                s.bind(this),
                e.bind(this));
        }

        /**
        * @param {} commits
        * @returns {}
        */
        static all(commits: Promise[]): Promise {

            return new Promise(

                function(

                    succeed,
                    erred
                ) {

                    var p: number;
                    var response: any[] = [];

                    function composer(a: any) {

                        // composer
                        if (response.push(a) > p) {

                            try {
                                succeed(response);

                            } catch (e) {

                                // fail response
                                erred(e);
                            }

                            // initialize
                            response = [];
                        }
                    }

                    commits.map(

                        function(commit, i) {

                            commit.when(composer);

                            // bind response
                            p = i;
                        });
                });
        }

        /**
        * @param {} commits
        * @returns {}
        */
        static race(commits: Promise[]): Promise {

            return new Promise(

                function(

                    succeed,
                    erred
                ) {

                    commits.forEach(

                        function(commit) {

                            commit.when(

                                function(response: any) {

                                    try {
                                        succeed(response);

                                    } catch (e) {

                                        // fail response
                                        erred(e);
                                    }
                                });
                        });
                });
        }

        /**
        * @param {} err
        * @returns {}
        */
        catch(err: (response: any) => any): Promise {

            return new Promise((

                succeed,
                erred

            ) => {

                // initialize
                this.err = function(response) {

                    try {
                        succeed(err(response));

                    } catch (e) {

                        // fail response
                        erred(e);
                    }
                };

                // fixed response
                this.tx();
            });
        }

        resume() {

            this.txd = false;
            this.txr = null;
        }

        /**
        * @param {} success
        * @param {} err
        * @returns {}
        */
        then(success: (response: any) => any, err?: (response: any) => any): Promise {

            return new Promise((

                succeed,
                erred

            ) => {

                this.err = erred;

                // initialize
                this.success = function(response) {

                    try {
                        succeed(success(response));

                    } catch (e) {

                        // fail response
                        err ? succeed(err(e)) : erred(e);
                    }
                };

                // fixed response
                this.tx();
            });
        }

        /**
        * @param {} success
        * @param {} err
        * @returns {}
        */
        when(success: (response: any) => any, err?: (response: any) => any): Promise {

            var s = (response: any) => {

                var p = success(response);

                // loop response
                this.resume();

                // passthru
                return p;
            };

            var e = err ? (response: any) => {

                var p = err(response);

                // loop response
                this.resume();

                // passthru
                return p;

            } : err;

            // {} response
            return this.then(s, e);
        }

        /**
        * @access private
        */
        private erred(response: any) {

            if (!this.txd) {

                if (this.err) {

                    // transact
                    this.txd = true;

                    // fail response
                    if (response instanceof Promise) {

                        // lazy response
                        response.when(this.err);

                    } else {
                        // passthru
                        this.err(response);
                    }
                } else {

                    // initialize
                    this.txr = (
                    ) => {

                        // fixed response
                        this.erred(response);
                    }
                }
            }

            console.log(response);
        }

        /**
        * @access private
        */
        private succeed(response: any) {

            if (!this.txd) {

                if (this.success) {

                    // transact
                    this.txd = true;

                    // commit response
                    if (response instanceof Promise) {

                        // lazy response
                        response.when(this.success);

                    } else {
                        // passthru
                        this.success(response);
                    }
                } else {

                    // initialize
                    this.txr = (
                    ) => {

                        // fixed response
                        this.succeed(response);
                    }
                }
            }
        }

        /**
        * @access private
        */
        private tx() {

            var responsor = this.txr;
            if (responsor) responsor();
        }
    }
}
