var Mist;
(function (Mist) {
    /**
    * @class Component
    */
    var Component = (function () {
        function Component() {
        }
        /**
        * @param {} component
        * @param {} o
        */
        Component.create = function (component) {
            var o = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                o[_i - 1] = arguments[_i];
            }
            var m = ser([component]);
            var n = ser(o);
            // initialize.
            this.responses[m] || (this.responses[m] = {});
            // inher response.
            if (!this.responses[m][n]) {
                this.responses[m][n] = new (component.bind.apply(component, [component].concat([].slice.apply(o))));
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
    function ser(conv) {
        return JSON.stringify(conv.map(function (v) {
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
    o.closest = o.closest
        || function (selector) {
            var response = this;
            while (response) {
                if (response.matches(selector))
                    break;
                response = response.parentElement;
            }
            return response;
        };
})();
/// <reference path='element.ts'/>
/// <reference path='statement.ts'/>
var Mist;
(function (Mist) {
    /**
    * @class Emitter
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
            this.on(name);
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
        Emitter.prototype.on = function (name) {
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
            this.txd = false;
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
            if (!this.txd) {
                if (this.err) {
                    this.txd = true;
                    // fail response.
                    if (response instanceof Promise) {
                        // lazy response
                        response.then(this.err);
                    }
                    else {
                        // passthru.
                        this.err(response);
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
            if (!this.txd) {
                if (this.success) {
                    this.txd = true;
                    // commit response.
                    if (response instanceof Promise) {
                        // lazy response
                        response.then(this.success);
                    }
                    else {
                        // passthru.
                        this.success(response);
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
        * @class Summary
        */
        var Summary = (function () {
            /**
            * @constructor
            * @param {} event
            */
            function Summary(event) {
                this.event = event;
                /**
                * @access public
                * @summary moved from prev
                */
                this.move = { x: 0, y: 0 };
                /**
                * @access public
                * @summary moved per milliseconds
                */
                this.mpms = 0;
                /**
                * @access public
                * @summary milliseconds from prev
                */
                this.passed = 0;
                var response;
                var s = this;
                // mapped.
                if (event instanceof MouseEvent) {
                    // {} response.
                    response = event;
                }
                else if (event instanceof TouchEvent) {
                    // {} response.
                    response = event.changedTouches[0];
                }
                s.set(response);
            }
            /**
            * @param {} event
            */
            Summary.prototype.diff = function (event) {
                var s = this;
                var response = new Summary(event);
                // milliseconds from prev.
                var passed = event.timeStamp - s.event.timeStamp;
                response.passed = passed;
                // moved response.
                var x = response.page.x - s.page.x;
                var y = response.page.y - s.page.y;
                response.move = { x: x, y: y };
                // moved per milliseconds.
                response.mpms = passed ? Math.sqrt(x * x + y * y) / passed : 0;
                // {} response.
                return response;
            };
            /**
            * @param {} element
            */
            Summary.prototype.measure = function (element) {
                var r = element.getBoundingClientRect();
                // dist response.
                var x = this.client.x - r.left - r.width / 2;
                var y = this.client.y - r.top - r.height / 2;
                // {} response.
                return { x: x, y: y };
            };
            /**
            * @access private
            */
            Summary.prototype.set = function (response) {
                this.client = {
                    x: response.clientX,
                    y: response.clientY
                };
                this.page = {
                    x: response.pageX,
                    y: response.pageY
                };
            };
            return Summary;
        }());
        Recognizer.Summary = Summary;
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
/// <reference path='../component.ts'/>
/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>
/// <reference path='../statement.ts'/>
/// <reference path='summary.ts'/>
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        /**
        * @class Pan
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
                    if (s.txd) {
                        var r = s.prev.diff(e);
                        // disp response.
                        s.emitter.emit('pan', r);
                        s.emitter.emit('panend', r);
                        s.txd = false;
                    }
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
                    if (s.txd) {
                        var r = s.prev.diff(e);
                        // disp response.
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
                        s.prev = r;
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
                    var r = new Recognizer.Summary(e);
                    // disp response.
                    s.emitter.emit('panstart', r);
                    s.prev = r;
                    s.txd = true;
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
/// <reference path='summary.ts'/>
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        /**
        * @class Swipe
        */
        var Swipe = (function () {
            /**
            * @constructor
            * @param {} emitter
            */
            function Swipe(emitter) {
                this.emitter = emitter;
                this.end();
                this.move();
            }
            /**
            * @access private
            */
            Swipe.prototype.end = function () {
                var s = this;
                new Mist.Emission(s.emitter, 'panend').when(function (response) {
                    if (s.txd) {
                        var r = s.prev.diff(response.event);
                        // filt response.
                        if (Swipe.passed > r.passed) {
                            // disp response.
                            s.emitter.emit('swipe', r);
                            var x = r.move.x * r.move.x;
                            var y = r.move.y * r.move.y;
                            if (x < y) {
                                // dir response.
                                if (r.move.y < 0)
                                    s.emitter.emit('swipeup', r);
                                if (r.move.y > 0)
                                    s.emitter.emit('swipedown', r);
                            }
                            else {
                                // dir response.
                                if (r.move.x < 0)
                                    s.emitter.emit('swipeleft', r);
                                if (r.move.x > 0)
                                    s.emitter.emit('swiperight', r);
                            }
                        }
                        s.txd = false;
                    }
                });
            };
            /**
            * @access private
            */
            Swipe.prototype.move = function () {
                var s = this;
                new Mist.Emission(s.emitter, 'panmove').when(function (response) {
                    if (!s.txd) {
                        // filt response.
                        if (Swipe.mpms < response.mpms) {
                            s.prev = response;
                            s.txd = true;
                        }
                    }
                });
            };
            /**
            * @access public
            * @static
            * @summary moved per milliseconds
            */
            Swipe.mpms = 0.8;
            /**
            * @access public
            * @static
            * @summary milliseconds from prev
            */
            Swipe.passed = 64;
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
                /**
                * @access private
                */
                this.id = 0;
            }
            /**
            * @param {} composer
            * @param {} o
            */
            Pulser.prototype.compose$ = function (composer, o) {
                var s = this;
                clearTimeout(s.id);
                // {} response.
                return new Mist.Promise(function (succeed, erred) {
                    (function responsor() {
                        try {
                            // commit response.
                            succeed(composer.apply(composer, o));
                            // lazy response.
                            !s.dur || (s.id = setTimeout(responsor, s.dur));
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
/// <reference path='../promise.ts'/>
/// <reference path='voker.ts'/>
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        /**
        * @class Timer
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
                /**
                * @access private
                */
                this.id = 0;
            }
            /**
            * @param {} composer
            * @param {} o
            */
            Timer.prototype.compose$ = function (composer, o) {
                var s = this;
                clearTimeout(s.id);
                // {} response.
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
                    !s.dur || (s.id = setTimeout(responsor, s.dur));
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
    */
    var Frame = (function () {
        function Frame() {
        }
        /**
        * @param {} responsor
        */
        Frame.at = function (responsor) {
            this.success.push(responsor);
            this.tx();
        };
        /**
        * @access private
        * @static
        */
        Frame.tx = function () {
            var _this = this;
            this.txd || (function () {
                _this.txd = true;
                // initialize.
                var txr = [];
                var s = _this;
                (function composer() {
                    var i = 0;
                    var responsor;
                    while (responsor = txr.shift()) {
                        responsor();
                    }
                    while (responsor = s.success.shift()) {
                        // loop response.
                        i = txr.push(responsor);
                    }
                    // lazy response.
                    s.txd = i > 0;
                    s.txd && requestAnimationFrame(composer);
                })();
            })();
        };
        Frame.success = [];
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
                    _this.xd || (function () {
                        _this.xd = true;
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
                            _this.xd = false;
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
                Mist.Frame.at(function () {
                    // a response.
                    _this.composite = composer(_this.composite);
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
/// <reference path='component.ts' />
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
                for (var name_2 in o) {
                    response.push(hycase(name_2) + ':' + o[name_2]);
                }
                // inner response.
                _this.create().innerHTML = statement.selector()
                    + '{'
                    + response.join(';')
                    + '}';
            });
        }
        /**
        * @param {} css
        */
        Style.prototype.add = function () {
            var _this = this;
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            return this.value.compose(
            // composer.
            function (o) { return _this.compose(assign(css), o); }).then(
            // for composition.
            function () { return _this; });
        };
        /**
        * @summary scoped
        */
        Style.prototype.get = function () {
            var response = {};
            var s = this;
            // format response.
            for (var name_3 in s.value.composite) {
                response[name_3] = s.value.composite[name_3];
            }
            // {} response.
            return response;
        };
        /**
        * @param {} dur
        * @summary lazy responsor
        */
        Style.prototype.pulse = function (dur) {
            return new Mist.Wrapper.Pulser(this, dur);
        };
        /**
        * @param {} css
        */
        Style.prototype.set = function () {
            var _this = this;
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            return this.value.compose(
            // composer.
            function () { return _this.compose(assign(css)); }).then(
            // for composition.
            function () { return _this; });
        };
        /**
        * @param {} dur
        * @summary lazy responsor
        */
        Style.prototype.time = function (dur) {
            return new Mist.Wrapper.Timer(this, dur);
        };
        /**
        * @access private
        */
        Style.prototype.compose = function (css, response) {
            if (response === void 0) { response = {}; }
            for (var name_4 in css) {
                var p = css[name_4];
                // mapped.
                if (p instanceof Mist.Promise) {
                    // lazy response.
                    p.when(this.composer.bind(this, name_4));
                }
                else if (p instanceof Function) {
                    // a response.
                    response[name_4] = p();
                }
                else {
                    // passthru.
                    response[name_4] = p;
                }
            }
            // {} response.
            return response;
        };
        /**
        * @access private
        */
        Style.prototype.composer = function (name, v) {
            var response = {};
            response[name] = v;
            // {} response.
            this.add(response);
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
    function assign(o) {
        var response = {};
        o.map(function (a) {
            // format response.
            for (var name_5 in a) {
                response[name_5] = a[name_5];
            }
        });
        // {} response.
        return response;
    }
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
            this.emitter = new Mist.Emitter(this);
            this.style = new Mist.Style(this);
            new Mist.Recognizer.Pan(this.emitter);
            new Mist.Recognizer.Swipe(this.emitter);
        }
        /**
        * @summary mapped
        */
        Statement.prototype.a = function () {
            var response;
            var s = this.statement;
            // mapped.
            if (s instanceof Element) {
                // a response.
                response = s;
            }
            else {
                // a response.
                response = document.querySelector(s);
            }
            return response;
        };
        /**
        * @param {} selector
        */
        Statement.prototype.any = function (selector) {
            // lasting response.
            return Mist.Component.create(Statement, this.selector().split(',').map(function (s) {
                return selector.split(',').map(function (term) {
                    return s.trim()
                        + term.trim();
                }).join();
            }).join());
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
            else {
                // [] response.
                response = [].map.call(document.querySelectorAll(s), function (element) { return element; });
            }
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
            else {
                // a response.
                response = document.querySelector(s.match(/[^,]*$/).concat('last-child').join(':'));
            }
            return response;
        };
        /**
        * @param {} selector
        */
        Statement.prototype.not = function (selector) {
            // lasting response.
            return this.any(selector.split(',').map(function (s) {
                return ':not('
                    + s.trim()
                    + ')';
            }).join());
        };
        /**
        * @param {} name
        */
        Statement.prototype.on = function (name) {
            // {} response.
            return new Mist.Emission(this.emitter, name);
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
            else {
                // a response.
                response = s;
            }
            return response;
        };
        /**
        * @param {} s
        * @param {} e
        */
        Statement.prototype.th = function (s, e) {
            var response = [];
            for (var n = s; n <= e; n++) {
                response.push(this.any(Statement.nth
                    + '('
                    + n
                    + ')'));
            }
            // [] response.
            return response;
        };
        /**
        * @access public
        * @summary th selector
        */
        Statement.nth = ':nth-of-type';
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
 * @description Modular CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.6.0
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
