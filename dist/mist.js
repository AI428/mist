var Mist;
(function (Mist) {
    /**
    * @class Component
    * @summary factory
    */
    var Component = (function () {
        function Component() {
        }
        /**
        * @param {} modular
        * @param {} o
        */
        Component.create = function (modular) {
            // ser response.
            var o = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                o[_i - 1] = arguments[_i];
            }
            var m = ser([modular]);
            var n = ser(o);
            // initialize.
            this.responses[m] || (this.responses[m] = {});
            // inher response.
            if (!this.responses[m][n]) {
                this.responses[m][n] = new (modular.bind.apply(modular, [modular].concat([].slice.apply(o))));
            }
            // lasting response.
            return this.responses[m][n];
        };
        Component.responses = {};
        return Component;
    }());
    Mist.Component = Component;
    /**
    * @access private
    * @static
    */
    var sessions = 0;
    /**
    * @access private
    * @static
    */
    function ser(response) {
        return JSON.stringify(
        // [] response.
        response.map(function (v) {
            return v instanceof Object ?
                v.sessions || (v.sessions = sessions++) :
                v;
        }));
    }
})(Mist || (Mist = {}));
/**
* @class Element
* @method Element.matches
*/
(function () {
    var o = Element.prototype;
    o.matches = o.matches
        || o.mozMatchesSelector
        || o.msMatchesSelector
        || o.webkitMatchesSelector;
})();
/**
* @class Element
* @method Element.closest
*/
(function () {
    var o = Element.prototype;
    o.closest = o.closest || function (selector) {
        var s = this;
        while (s) {
            if (s.matches(selector))
                break;
            s = s.parentElement;
        }
        // {} response.
        return s;
    };
})();
/// <reference path='element.ts'/>
/// <reference path='statement.ts'/>
var Mist;
(function (Mist) {
    /**
    * @class Emitter
    * @summary for event
    */
    var Emitter = (function () {
        /**
        * @constructor
        * @param {} statement
        */
        function Emitter(statement) {
            this.statement = statement;
            this.emits = {};
            this.obss = {};
        }
        /**
        * @param {} name
        * @param {} options
        * @return {}
        */
        Emitter.customize = function (name, options) {
            if (options === void 0) { options = {}; }
            var e = document.createEvent('CustomEvent');
            // initialize.
            e.initCustomEvent(name, options.bubbles || true, options.cancelable || true, options.detail);
            // {} response.
            return e;
        };
        /**
        * @param {} name
        * @param {} listener
        */
        Emitter.prototype.add = function (name, listener) {
            this.obss[name] || (this.obss[name] = []);
            this.obss[name].push(listener);
            // lasting response.
            this.ready(name);
        };
        /**
        * @param {} name
        * @param {} response
        */
        Emitter.prototype.emit = function (name, response) {
            for (var i in this.obss[name]) {
                this.obss[name][i](response);
            }
        };
        /**
        * @param {} name
        * @param {} listener
        */
        Emitter.prototype.remove = function (name, listener) {
            var o = this.obss[name];
            function composer() {
                // composer.
                var i = o.indexOf(listener);
                i < 0 || o.splice(i, 1);
            }
            // composer.
            o && listener ? composer() : o = null;
        };
        /**
        * @access private
        */
        Emitter.prototype.ready = function (name) {
            var _this = this;
            var o = this.emits;
            // lasting response.
            o[name] || document.addEventListener(name, o[name] = function (e) {
                var element = e.target;
                if (element instanceof Element) {
                    if (element.closest(_this.selector())) {
                        _this.emit(name, e instanceof CustomEvent ?
                            e.detail :
                            e);
                    }
                }
            });
        };
        /**
        * @access private
        */
        Emitter.prototype.selector = function () {
            var response;
            var s = this.statement;
            // mapped.
            if (s instanceof Mist.Statement) {
                // a response.
                response = s.selector();
            }
            else {
                // a response.
                response = s;
            }
            // mapped response.
            return response;
        };
        return Emitter;
    }());
    Mist.Emitter = Emitter;
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    /**
    * @class Promise
    * @summary thenable
    */
    var Promise = (function () {
        /**
        * @constructor
        * @param {} process
        */
        function Promise(process) {
            // bind response.
            var s = this.succeed;
            var e = this.erred;
            // initialize.
            this.resume();
            // lazy response.
            process(s.bind(this), e.bind(this));
        }
        /**
        * @param {} commits
        */
        Promise.all = function (commits) {
            return new Promise(function (succeed, erred) {
                var p;
                var response = [];
                function composer(a) {
                    // composer.
                    if (response.push(a) > p) {
                        try {
                            // commit response.
                            succeed(response);
                        }
                        catch (e) {
                            // fail response.
                            erred(e);
                        }
                        // initialize.
                        response = [];
                    }
                }
                commits.map(function (commit, i) {
                    commit.when(composer);
                    // bind response.
                    p = i;
                });
            });
        };
        /**
        * @param {} commits
        */
        Promise.race = function (commits) {
            return new Promise(function (succeed, erred) {
                // initialize.
                commits.forEach(function (commit) {
                    commit.when(function (response) {
                        try {
                            // commit response.
                            succeed(response);
                        }
                        catch (e) {
                            // fail response.
                            erred(e);
                        }
                    });
                });
            });
        };
        /**
        * @param {} err
        */
        Promise.prototype.catch = function (err) {
            var _this = this;
            return new Promise(function (succeed, erred) {
                // initialize.
                _this.err = function (response) {
                    try {
                        // commit response.
                        succeed(err(response));
                    }
                    catch (e) {
                        // fail response.
                        erred(e);
                    }
                };
                // fixed response.
                _this.tx();
            });
        };
        /**
        * @summary for loop
        */
        Promise.prototype.resume = function () {
            // initialize.
            this.txg = null;
            this.txr = null;
        };
        /**
        * @param {} success
        * @param {} err
        */
        Promise.prototype.then = function (success, err) {
            var _this = this;
            return new Promise(function (succeed, erred) {
                // compose.
                _this.err = erred;
                // initialize.
                _this.success = function (response) {
                    try {
                        // commit respoonse.
                        succeed(success(response));
                    }
                    catch (e) {
                        // fail response.
                        err ? succeed(err(e)) : erred(e);
                    }
                };
                // fixed response.
                _this.tx();
            });
        };
        /**
        * @param {} success
        * @param {} err
        */
        Promise.prototype.when = function (success, err) {
            var _this = this;
            var s = function (response) {
                var p = success(response);
                // loop response.
                _this.resume();
                // passthru.
                return p;
            };
            var e = err ? function (response) {
                var p = err(response);
                // loop response.
                _this.resume();
                // passthru.
                return p;
            } : err;
            // {} response.
            return this.then(s, e);
        };
        /**
        * @access private
        */
        Promise.prototype.erred = function (response) {
            var _this = this;
            if (!this.txg) {
                var m = this.err;
                if (m) {
                    this.txg = true;
                    // fail response.
                    if (response instanceof Promise) {
                        // lazy response
                        response.then(m);
                    }
                    else {
                        // passthru.
                        m(response);
                    }
                }
                else {
                    // initialize.
                    this.txr = function () {
                        // fixed response.
                        _this.erred(response);
                    };
                }
            }
            console.log(response);
        };
        /**
        * @access private
        */
        Promise.prototype.succeed = function (response) {
            var _this = this;
            if (!this.txg) {
                var m = this.success;
                if (m) {
                    this.txg = true;
                    // commit response.
                    if (response instanceof Promise) {
                        // lazy response
                        response.then(m);
                    }
                    else {
                        // passthru.
                        m(response);
                    }
                }
                else {
                    // initialize.
                    this.txr = function () {
                        // fixed response.
                        _this.succeed(response);
                    };
                }
            }
        };
        /**
        * @access private
        */
        Promise.prototype.tx = function () {
            var responsor;
            if (responsor = this.txr) {
                responsor();
            }
        };
        return Promise;
    }());
    Mist.Promise = Promise;
})(Mist || (Mist = {}));
/// <reference path='emitter.ts'/>
/// <reference path='promise.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mist;
(function (Mist) {
    /**
    * @class Emission
    */
    var Emission = (function (_super) {
        __extends(Emission, _super);
        /**
        * @constructor
        * @param {} emitter
        * @param {} name
        */
        function Emission(emitter, name) {
            _super.call(this, function (succeed, erred) {
                emitter.add(name, function (response) {
                    try {
                        // commit response.
                        succeed(response);
                    }
                    catch (e) {
                        // fail response.
                        erred(e);
                    }
                });
            });
            this.emitter = emitter;
            this.name = name;
        }
        return Emission;
    }(Mist.Promise));
    Mist.Emission = Emission;
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        /**
        * @class Detail
        * @namespace Recognizer
        */
        var Detail = (function () {
            /**
            * @constructor
            * @param {} e
            */
            function Detail(e) {
                this.e = e;
                var s = this;
                // mapped.
                if (e instanceof MouseEvent) {
                    // no response.
                    s.mouse(e);
                }
                else if (e instanceof TouchEvent) {
                    // no response.
                    s.touch(e);
                }
                session(s);
            }
            /**
            * @access private
            */
            Detail.prototype.mouse = function (e) {
                var p = e;
                // rec response.
                var s = session();
                // passed milliseconds.
                var passed = s ? e.timeStamp - s.e.timeStamp : 0;
                // move response.
                var x = s ? p.pageX - s.page.x : 0;
                var y = s ? p.pageY - s.page.y : 0;
                // initialize.
                this.set(p, passed, x, y);
            };
            /**
            * @access private
            */
            Detail.prototype.set = function (p, passed, x, y) {
                this.client = { x: p.clientX, y: p.clientY };
                this.move = { x: x, y: y };
                this.mpms = passed ? (x * x + y * y) / passed : 0;
                this.page = { x: p.pageX, y: p.pageY };
                this.passed = passed;
            };
            /**
            * @access private
            */
            Detail.prototype.touch = function (e) {
                var p = e.changedTouches[0];
                // rec response.
                var s = session();
                // passed milliseconds.
                var passed = s ? e.timeStamp - s.e.timeStamp : 0;
                // move response.
                var x = s ? p.pageX - s.page.x : 0;
                var y = s ? p.pageY - s.page.y : 0;
                // initialize.
                this.set(p, passed, x, y);
            };
            return Detail;
        }());
        Recognizer.Detail = Detail;
        /**
        * @access private
        * @static
        */
        var sessions;
        /**
        * @access private
        * @static
        */
        function session(v) {
            return v ? (sessions = v) : sessions;
        }
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>
/// <reference path='../statement.ts'/>
/// <reference path='detail.ts'/>
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        /**
        * @class Pan
        * @namespace Recognizer
        */
        var Pan = (function () {
            /**
            * @constructor
            * @param {} emitter
            */
            function Pan(emitter) {
                this.emitter = emitter;
                this.end();
                this.move();
                this.start();
            }
            /**
            * @access private
            */
            Pan.prototype.end = function () {
                var s = this;
                function responsor(e) {
                    var r = new Recognizer.Detail(e);
                    // disp response.
                    s.emitter.emit('pan', r);
                    s.emitter.emit('panend', r);
                    // end response.
                    s.txg = false;
                }
                new Mist.Emission(Mist.Component.create(Mist.Emitter, '*'), 'mouseup').when(responsor);
                new Mist.Emission(s.emitter, 'touchend').when(prevent).when(responsor);
            };
            /**
            * @access private
            */
            Pan.prototype.move = function () {
                var s = this;
                function responsor(e) {
                    if (s.txg) {
                        var r = new Recognizer.Detail(e);
                        // disp response.
                        s.emitter.emit('pan', r);
                        s.emitter.emit('panmove', r);
                        // dir response.
                        if (r.move.x < 0)
                            s.emitter.emit('panleft', r);
                        if (r.move.x > 0)
                            s.emitter.emit('panright', r);
                        if (r.move.y < 0)
                            s.emitter.emit('panup', r);
                        if (r.move.y > 0)
                            s.emitter.emit('pandown', r);
                    }
                }
                new Mist.Emission(s.emitter, 'mousemove').when(responsor);
                new Mist.Emission(s.emitter, 'touchmove').when(prevent).when(responsor);
            };
            /**
            * @access private
            */
            Pan.prototype.start = function () {
                var s = this;
                function responsor(e) {
                    var r = new Recognizer.Detail(e);
                    // disp response.
                    s.emitter.emit('pan', r);
                    s.emitter.emit('panstart', r);
                    // begin response.
                    s.txg = true;
                }
                new Mist.Emission(s.emitter, 'mousedown').when(responsor);
                new Mist.Emission(s.emitter, 'touchstart').when(prevent).when(responsor);
            };
            return Pan;
        }());
        Recognizer.Pan = Pan;
        /**
        * @access private
        * @static
        */
        function prevent(e) {
            e.preventDefault();
            // passthru.
            return e;
        }
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>
/// <reference path='detail.ts'/>
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        /**
        * @class Swipe
        * @namespace Recognizer
        */
        var Swipe = (function () {
            /**
            * @constructor
            * @param {} emitter
            */
            function Swipe(emitter) {
                this.emitter = emitter;
                new Mist.Emission(emitter, 'panend').when(function (response) {
                    var s = Swipe.mpms / 2;
                    var v = Swipe.mpms;
                    // filt response.
                    if (v < response.mpms) {
                        emitter.emit('swipe', response);
                        // filt response.
                        if (s < (response.move.x *
                            response.move.x) / response.passed) {
                            // dir response.
                            if (response.move.x < 0)
                                emitter.emit('swipeleft', response);
                            if (response.move.x > 0)
                                emitter.emit('swiperight', response);
                        }
                        // filt response.
                        if (s < (response.move.y *
                            response.move.y) / response.passed) {
                            // dir response.
                            if (response.move.y < 0)
                                emitter.emit('swipeup', response);
                            if (response.move.y > 0)
                                emitter.emit('swipedown', response);
                        }
                    }
                });
            }
            /**
            * @access public
            * @static
            * @summary move per milliseconds
            */
            Swipe.mpms = 24;
            return Swipe;
        }());
        Recognizer.Swipe = Swipe;
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        /**
        * @class Voker
        * @namespace Wrapper
        */
        var Voker = (function () {
            /**
            * @constructor
            * @param {} component
            */
            function Voker(component) {
                this.component = component;
                var s = this;
                var _loop_1 = function(name_1) {
                    if (component[name_1] instanceof Function) {
                        // lazy response.
                        function composer() {
                            var o = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                o[_i - 0] = arguments[_i];
                            }
                            return s.compose$(component[name_1].bind(component), o);
                        }
                        // {} response.
                        s[name_1] = composer;
                    }
                };
                for (var name_1 in component) {
                    _loop_1(name_1);
                }
            }
            /**
            * @param {} composer
            * @param {} o
            * @summary for override
            */
            Voker.prototype.compose$ = function (composer, o) {
                return composer.apply(composer, o);
            };
            return Voker;
        }());
        Wrapper.Voker = Voker;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
/// <reference path='voker.ts'/>
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        /**
        * @class Pulser
        * @namespace Wrapper
        */
        var Pulser = (function (_super) {
            __extends(Pulser, _super);
            /**
            * @constructor
            * @param {} component
            * @param {} dur
            */
            function Pulser(component, dur) {
                if (dur === void 0) { dur = 0; }
                _super.call(this, component);
                this.dur = dur;
            }
            /**
            * @param {} composer
            * @param {} o
            */
            Pulser.prototype.compose$ = function (composer, o) {
                var s = this;
                return new Mist.Promise(function (succeed, erred) {
                    (function responsor() {
                        try {
                            // commit response.
                            succeed(composer.apply(composer, o));
                            // lazy response.
                            !s.dur || setTimeout(responsor, s.dur);
                        }
                        catch (e) {
                            // fail response.
                            erred(e);
                        }
                    })();
                });
            };
            return Pulser;
        }(Wrapper.Voker));
        Wrapper.Pulser = Pulser;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
/// <reference path='voker.ts'/>
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        /**
        * @class Timer
        * @namespace Wrapper
        */
        var Timer = (function (_super) {
            __extends(Timer, _super);
            /**
            * @constructor
            * @param {} component
            * @param {} dur
            */
            function Timer(component, dur) {
                if (dur === void 0) { dur = 0; }
                _super.call(this, component);
                this.dur = dur;
            }
            /**
            * @param {} composer
            * @param {} o
            */
            Timer.prototype.compose$ = function (composer, o) {
                var s = this;
                return new Mist.Promise(function (succeed, erred) {
                    function responsor() {
                        try {
                            // commit response.
                            succeed(composer.apply(composer, o));
                        }
                        catch (e) {
                            // fail response.
                            erred(e);
                        }
                    }
                    // lazy response.
                    !s.dur || setTimeout(responsor, s.dur);
                });
            };
            return Timer;
        }(Wrapper.Voker));
        Wrapper.Timer = Timer;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
/// <reference path='promise.ts'/>
var Mist;
(function (Mist) {
    /**
    * @class Frame
    * @summary queuer
    */
    var Frame = (function () {
        function Frame() {
        }
        /**
        * @param {} responsor
        * @param {} delay
        */
        Frame.at = function (responsor, delay) {
            if (delay === void 0) { delay = 0; }
            this.txs.push(function () {
                var r = 0 > delay--;
                if (r) {
                    // commit response.
                    responsor();
                }
                return r;
            });
            this.tx();
        };
        /**
        * @param {} responsor
        * @param {} delay
        */
        Frame.on = function (responsor, delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            return new Mist.Promise(function (succeed, erred) {
                _this.txs.push(function () {
                    var r = 0 > delay--;
                    if (r) {
                        try {
                            // commit response.
                            succeed(responsor());
                        }
                        catch (e) {
                            // fail response.
                            erred(e);
                        }
                    }
                    return r;
                });
                _this.tx();
            });
        };
        /**
        * @access private
        * @static
        */
        Frame.tx = function () {
            var _this = this;
            this.txg || (function () {
                _this.txg = true;
                var s = _this;
                (function composer() {
                    // initialize.
                    var o = [];
                    var responsor;
                    while (responsor = s.txs.shift()) {
                        responsor() || o.push(responsor);
                    }
                    if (s.txg =
                        !!s.txs.push.apply(s.txs, o)) {
                        requestAnimationFrame(composer);
                    }
                })();
            })();
        };
        Frame.txs = [];
        return Frame;
    }());
    Mist.Frame = Frame;
})(Mist || (Mist = {}));
/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
var Mist;
(function (Mist) {
    /**
    * @class Value
    * @summary composer
    */
    var Value = (function (_super) {
        __extends(Value, _super);
        /**
        * @constructor
        * @param {} composite
        */
        function Value(composite) {
            var _this = this;
            _super.call(this, function (succeed, erred) {
                _this.xr = function () {
                    _this.xg || (function () {
                        _this.xg = true;
                        // ser response.
                        Mist.Frame.at(function () {
                            var responsor;
                            try {
                                // commit response.
                                succeed(_this.composite);
                            }
                            catch (e) {
                                // fail response.
                                erred(e);
                            }
                            while (responsor = _this.xs.shift()) {
                                responsor(_this.composite);
                            }
                            _this.xg = false;
                        });
                    })();
                };
            });
            this.composite = composite;
            this.xs = [];
        }
        /**
        * @param {} composer
        */
        Value.prototype.compose = function (composer) {
            var _this = this;
            return new Mist.Promise(function (responsor) {
                // ser response.
                Mist.Frame.at(function () {
                    // a response.
                    _this.composite = composer(_this.composite);
                    // queues.
                    _this.xs.push(responsor);
                    _this.xr();
                });
            });
        };
        return Value;
    }(Mist.Promise));
    Mist.Value = Value;
})(Mist || (Mist = {}));
/// <reference path='wrapper/pulser.ts' />
/// <reference path='wrapper/timer.ts' />
/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
/// <reference path='statement.ts'/>
/// <reference path='value.ts'/>
var Mist;
(function (Mist) {
    var ADD = 1;
    var REMOVE = 2;
    var TOGGLE = 3;
    var NEXT = 4;
    var PREVIOUS = 5;
    /**
    * @class Class
    */
    var Class = (function () {
        /**
        * @constructor
        * @param {} statement
        */
        function Class(statement) {
            this.statement = statement;
            this.value = new Mist.Value({});
            this.value.when(function (o) {
                var response = [];
                for (var name_2 in o) {
                    var i = o[name_2];
                    // format response.
                    response[i] || (response[i] = []);
                    response[i].push(name_2);
                    // reposit.
                    delete o[name_2];
                }
                var queues = [];
                statement.each(function (e) {
                    var classes = e.classList;
                    response.map(function (names, i) {
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
                                names.forEach(function (name) {
                                    classes.toggle(name);
                                });
                                break;
                            case NEXT:
                                var o = (e.nextElementSibling || statement.first()).classList;
                                // filt response.
                                names = names.filter(function (name) {
                                    var r = classes.contains(name);
                                    if (r)
                                        classes.remove(name);
                                    // is response.
                                    return r;
                                });
                                if (names.length) {
                                    queues.push(function () {
                                        // lazy response.
                                        o.add.apply(o, names);
                                    });
                                }
                                break;
                            case PREVIOUS:
                                var o = (e.previousElementSibling || statement.last()).classList;
                                // filt response.
                                names = names.filter(function (name) {
                                    var r = classes.contains(name);
                                    if (r)
                                        classes.remove(name);
                                    // is response.
                                    return r;
                                });
                                if (names.length) {
                                    queues.push(function () {
                                        // lazy response.
                                        o.add.apply(o, names);
                                    });
                                }
                                break;
                        }
                    });
                });
                queues.forEach(function (responsor) {
                    responsor();
                });
            });
        }
        /**
        * @param {} names
        */
        Class.prototype.add = function () {
            var _this = this;
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return this.value.compose(function (o) {
                // {} response.
                return _this.compose(names, ADD, o);
            });
        };
        /**
        * @param {} names
        */
        Class.prototype.next = function () {
            var _this = this;
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return this.value.compose(function (o) {
                // {} response.
                return _this.compose(names, NEXT, o);
            });
        };
        /**
        * @param {} names
        */
        Class.prototype.prev = function () {
            var _this = this;
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return this.value.compose(function (o) {
                // {} response.
                return _this.compose(names, PREVIOUS, o);
            });
        };
        /**
        * @param {} dur
        */
        Class.prototype.pulse = function (dur) {
            // wrapper response.
            return new Mist.Wrapper.Pulser(this, dur);
        };
        /**
        * @param {} names
        */
        Class.prototype.remove = function () {
            var _this = this;
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return this.value.compose(function (o) {
                // {} response.
                return _this.compose(names, REMOVE, o);
            });
        };
        /**
        * @param {} dur
        */
        Class.prototype.time = function (dur) {
            // wrapper response.
            return new Mist.Wrapper.Timer(this, dur);
        };
        /**
        * @param {} names
        */
        Class.prototype.toggle = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return this.value.compose(function (o) {
                names.forEach(
                // composer.
                function (name) {
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
        };
        /**
        * @param {} names
        * @param {} command
        */
        Class.prototype.compose = function (names, command, response) {
            if (response === void 0) { response = {}; }
            names.forEach(function (name) {
                response[name] = command;
            });
            // {} response.
            return response;
        };
        return Class;
    }());
    Mist.Class = Class;
})(Mist || (Mist = {}));
/// <reference path='wrapper/pulser.ts' />
/// <reference path='wrapper/timer.ts' />
/// <reference path='frame.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />
var Mist;
(function (Mist) {
    /**
    * @class Style
    */
    var Style = (function () {
        /**
        * @constructor
        * @param {} statement
        */
        function Style(statement) {
            var _this = this;
            this.statement = statement;
            this.value = new Mist.Value({});
            this.value.when(function (o) {
                var response = [];
                // format response.
                for (var name_3 in o) {
                    response.push(hycase(name_3) + ':' + o[name_3]);
                }
                // inner response.
                _this.create().innerHTML = statement.selector()
                    + '{'
                    + response.join(';')
                    + '}';
            });
        }
        /**
        * @summary conv
        */
        Style.rem = function () {
            var e = document.body;
            var s = getComputedStyle(e);
            // conv response.
            return parseInt(s.fontSize, 10);
        };
        /**
        * @param {} css
        */
        Style.prototype.add = function (css) {
            var _this = this;
            return this.value.compose(function (o) {
                // {} response.
                return _this.compose(css, o);
            });
        };
        /**
        * @summary scoped
        */
        Style.prototype.get = function () {
            var response = {};
            var s = this;
            // composer.
            for (var name_4 in s.value.composite) {
                response[name_4] = s.value.composite[name_4];
            }
            // {} response.
            return response;
        };
        /**
        * @param {} dur
        */
        Style.prototype.pulse = function (dur) {
            // wrapper response.
            return new Mist.Wrapper.Pulser(this, dur);
        };
        /**
        * @param {} css
        */
        Style.prototype.set = function (css) {
            var _this = this;
            return this.value.compose(function () {
                // {} response.
                return _this.compose(css);
            });
        };
        /**
        * @param {} dur
        */
        Style.prototype.time = function (dur) {
            // wrapper response.
            return new Mist.Wrapper.Timer(this, dur);
        };
        /**
        * @access private
        */
        Style.prototype.compose = function (css, response) {
            if (response === void 0) { response = {}; }
            var s = this;
            // composer.
            for (var name_5 in css) {
                var p = css[name_5];
                if (p instanceof Mist.Promise) {
                    function composer(name, v) {
                        var response = {};
                        response[name] = v;
                        // reposit.
                        s.add(response);
                    }
                    // lazy response.
                    p.when(composer.bind(s, name_5));
                }
                else if (p instanceof Function) {
                    // a response.
                    response[name_5] = p();
                }
                else {
                    // passthru.
                    response[name_5] = p;
                }
            }
            // {} response.
            return response;
        };
        /**
        * @access private
        */
        Style.prototype.create = function () {
            if (!this.e) {
                var s = document.createElement('style');
                var t = document.createTextNode('');
                s.appendChild(t);
                document.head.appendChild(s);
                this.e = s;
            }
            // lasting response.
            return this.e;
        };
        return Style;
    }());
    Mist.Style = Style;
    /**
    * @access private
    * @static
    */
    function hycase(name) {
        // hy response.
        return name.replace(/[A-Z]/g, function (m) {
            return '-' + m.toLowerCase();
        });
    }
})(Mist || (Mist = {}));
/// <reference path='recognizer/pan.ts' />
/// <reference path='recognizer/swipe.ts' />
/// <reference path='class.ts' />
/// <reference path='component.ts' />
/// <reference path='emission.ts' />
/// <reference path='emitter.ts' />
/// <reference path='style.ts' />
var Mist;
(function (Mist) {
    /**
    * @class Statement
    */
    var Statement = (function () {
        /**
        * @constructor
        * @param {} statement
        */
        function Statement(statement) {
            this.statement = statement;
            // initialize.
            this.class = new Mist.Class(this);
            this.emitter = new Mist.Emitter(this);
            this.style = new Mist.Style(this);
            // recognizer.
            new Mist.Recognizer.Pan(this.emitter);
            new Mist.Recognizer.Swipe(this.emitter);
        }
        /**
        * @param {} selector
        */
        Statement.prototype.concat = function (selector) {
            var s = this.selector();
            // [] response.
            var response = s.split(',').map(function (p) {
                return p.trim() + selector;
            });
            // lasting response.
            return Mist.Component.create(Statement, response.join());
        };
        /**
        * @param {} listener
        */
        Statement.prototype.each = function (listener) {
            this.elements().forEach(listener);
        };
        /**
        * @summary mapped
        */
        Statement.prototype.elements = function () {
            var response;
            var s = this.statement;
            // mapped.
            if (s instanceof Element) {
                // [] response.
                response = [s];
            }
            else if (s instanceof Statement) {
                // [] response.
                response = s.elements();
            }
            else {
                // [] response.
                response = [].map.call(document.querySelectorAll(s), function (element) { return element; });
            }
            // mapped response.
            return response;
        };
        /**
        * @summary mapped
        */
        Statement.prototype.first = function () {
            var response;
            var s = this.statement;
            // mapped.
            if (s instanceof Element) {
                // a response.
                response = s;
            }
            else if (s instanceof Statement) {
                // a response.
                response = s.first();
            }
            else {
                // a response.
                response = document.querySelector(s);
            }
            // mapped response.
            return response;
        };
        /**
        * @summary mapped
        */
        Statement.prototype.last = function () {
            var response;
            var s = this.statement;
            // mapped.
            if (s instanceof Element) {
                // a response.
                response = s;
            }
            else if (s instanceof Statement) {
                // a response.
                response = s.last();
            }
            else {
                // a response.
                response = document.querySelector(s.match(/[^,]*$/).concat('last-child').join(':'));
            }
            // mapped response.
            return response;
        };
        /**
        * @param {} name
        */
        Statement.prototype.on = function (name) {
            // {} response.
            return new Mist.Emission(this.emitter, name);
        };
        /**
        * @param {} name
        */
        Statement.prototype.once = function (name) {
            // lasting response.
            return Mist.Component.create(Mist.Emission, this.emitter, name);
        };
        /**
        * @summary mapped
        */
        Statement.prototype.selector = function () {
            var response;
            var s = this.statement;
            // mapped.
            if (s instanceof Element) {
                // [] response.
                response = ser(s);
            }
            else if (s instanceof Statement) {
                // a response.
                response = s.selector();
            }
            else {
                // a response.
                response = s;
            }
            // mapped response.
            return response;
        };
        return Statement;
    }());
    Mist.Statement = Statement;
    /**
    * @access private
    * @static
    */
    var sessions = 0;
    /**
    * @access private
    * @static
    */
    function ser(element) {
        return element.id ? '#' + element.id : ((function () {
            var response;
            if (element.hasAttribute('mid')) {
                // a response.
                response = '[mid="'
                    + element.getAttribute('mid')
                    + '"]';
            }
            // selector response.
            return response;
        })() ||
            (function () {
                var response = sessions++;
                element.setAttribute('mid', '' + response);
                // selector response.
                return '[mid="'
                    + response
                    + '"]';
            })());
    }
})(Mist || (Mist = {}));
/**
 * @copyright AI428
 * @description Reactive CSS Framework
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.5.0
 */
/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />
/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement) {
    return Mist.Component.create(Mist.Statement, statement);
}
