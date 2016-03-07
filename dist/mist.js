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
        * @return {}
        */
        Component.create = function (modular) {
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
        * @return {}
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
                    commit.then(composer);
                    // bind response.
                    p = i;
                });
            });
        };
        /**
        * @param {} commits
        * @return {}
        */
        Promise.race = function (commits) {
            return new Promise(function (succeed, erred) {
                // initialize.
                commits.forEach(function (commit) {
                    commit.then(function (response) {
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
        * @return {}
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
            this.txd = null;
            this.txr = null;
        };
        /**
        * @param {} success
        * @param {} err
        * @return {}
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
        * @return {}
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
            // begin response.
            if (!this.txd) {
                var m = this.err;
                if (m) {
                    // end response.
                    this.txd = true;
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
        };
        /**
        * @access private
        */
        Promise.prototype.succeed = function (response) {
            var _this = this;
            // begin response.
            if (!this.txd) {
                var m = this.success;
                if (m) {
                    // end response.
                    this.txd = true;
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
            // patch response.
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
        * @param {} frames
        * @summary frames per second
        */
        Frame.fps = function (frames) {
            this.mspf = 1000 / frames;
        };
        /**
        * @param {} responsor
        * @param {} delay
        * @return {}
        */
        Frame.on = function (responsor, delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            return new Mist.Promise(function (succeed, erred) {
                // patch response.
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
        Frame.request = function (responsor) {
            var s = this;
            var t = Date.now();
            // filt response.
            if (t - s.times > s.mspf) {
                s.times = t;
            }
            else {
                // skip response.
                responsor = s.request.bind(s, responsor);
            }
            requestAnimationFrame(responsor);
        };
        /**
        * @access private
        * @static
        */
        Frame.tx = function () {
            var _this = this;
            this.txd || (function () {
                _this.txd = true;
                var s = _this;
                (function composer() {
                    // initialize.
                    var o = [];
                    var responsor;
                    while (responsor = s.txs.pop()) {
                        responsor() || o.push(responsor);
                    }
                    if (s.txd
                        = s.txs.push.apply(s.txs, o) > 0) {
                        s.request(composer);
                    }
                })();
            })();
        };
        /**
        * @access public
        * @static
        * @summary milliseconds per frame
        */
        Frame.mspf = 1000 / 120;
        /**
        * @access public
        * @static
        * @summary timestamp
        */
        Frame.times = 0;
        Frame.txs = [];
        return Frame;
    }());
    Mist.Frame = Frame;
})(Mist || (Mist = {}));
/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mist;
(function (Mist) {
    /**
    * @class Value
    * @extends Promise
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
                _this.composite = composite;
                // initialize.
                _this.xs = [];
                _this.xr = function () {
                    // begin response.
                    _this.xd || (function () {
                        _this.xd = true;
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
                            while (responsor = _this.xs.pop()) {
                                responsor(_this.composite);
                            }
                            // end response.
                            _this.xd = false;
                        });
                    })();
                };
            });
        }
        /**
        * @param {} composer
        * @return {}
        */
        Value.prototype.compose = function (composer) {
            var _this = this;
            return new Mist.Promise(function (responsor) {
                // ser response.
                Mist.Frame.at(function () {
                    // a response.
                    _this.composite = composer(_this.composite);
                    // patch response.
                    _this.xs.push(responsor);
                    _this.xr();
                });
            });
        };
        return Value;
    }(Mist.Promise));
    Mist.Value = Value;
})(Mist || (Mist = {}));
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
    * @summary commands
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
                // initialize.
                var response = [];
                for (var name_1 in o) {
                    var i = o[name_1];
                    // format response.
                    response[i] || (response[i] = []);
                    response[i].push(name_1);
                    // reposit.
                    delete o[name_1];
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
        * @param {} dur
        * @return {}
        */
        Class.prototype.add = function (names, dur) {
            var _this = this;
            if (dur === void 0) { dur = 0; }
            return new Mist.Promise(function (responsor) {
                var r = _this.value.compose(function (o) {
                    names.forEach(
                    // composer.
                    function (name) {
                        // tagged response.
                        o[name] = ADD;
                    });
                    // {} response.
                    return o;
                });
                // dur response.
                dur > 0 ? Mist.Frame.on(_this.remove.bind(_this, names), dur).then(responsor) :
                    // passthru.
                    r.then(responsor);
            });
        };
        /**
        * @param {} names
        * @return {}
        */
        Class.prototype.next = function (names) {
            return this.value.compose(function (o) {
                names.forEach(
                // composer.
                function (name) {
                    // tagged response.
                    o[name] = NEXT;
                });
                // {} response.
                return o;
            });
        };
        /**
        * @param {} names
        * @return {}
        */
        Class.prototype.prev = function (names) {
            return this.value.compose(function (o) {
                names.forEach(
                // composer.
                function (name) {
                    // tagged response.
                    o[name] = PREVIOUS;
                });
                // {} response.
                return o;
            });
        };
        /**
        * @param {} names
        * @param {} dur
        * @return {}
        */
        Class.prototype.remove = function (names, dur) {
            var _this = this;
            if (dur === void 0) { dur = 0; }
            return new Mist.Promise(function (responsor) {
                var r = _this.value.compose(function (o) {
                    names.forEach(
                    // composer.
                    function (name) {
                        // tagged response.
                        o[name] = REMOVE;
                    });
                    // {} response.
                    return o;
                });
                // dur response.
                dur > 0 ? Mist.Frame.on(_this.add.bind(_this, names), dur).then(responsor) :
                    // passthru.
                    r.then(responsor);
            });
        };
        /**
        * @param {} names
        * @return {}
        */
        Class.prototype.toggle = function (names) {
            return this.value.compose(function (o) {
                names.forEach(
                // composer.
                function (name) {
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
        };
        return Class;
    }());
    Mist.Class = Class;
})(Mist || (Mist = {}));
/**
* @class Element
* @method Element.matches
*/
(function (p) {
    p.matches = p.matches
        || p.mozMatchesSelector
        || p.msMatchesSelector
        || p.webkitMatchesSelector;
})(Element.prototype);
/**
* @class Element
* @method Element.closest
*/
(function (p) {
    p.closest =
        p.closest || function (selector) {
            var s = this;
            while (s) {
                if (s.matches(selector))
                    break;
                s = s.parentElement;
            }
            // {} response.
            return s;
        };
})(Element.prototype);
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
                    if (element.closest(_this.statement.selector())) {
                        _this.emit(name, e instanceof CustomEvent ?
                            e.detail :
                            e);
                    }
                }
            });
        };
        return Emitter;
    }());
    Mist.Emitter = Emitter;
})(Mist || (Mist = {}));
/// <reference path='emitter.ts'/>
/// <reference path='promise.ts'/>
var Mist;
(function (Mist) {
    /**
    * @class Emission
    * @extends Promise
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
/// <reference path='frame.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />
var Mist;
(function (Mist) {
    /**
    * @class Style
    * @summary commands
    */
    var Style = (function () {
        /**
        * @constructor
        * @param {} statement
        */
        function Style(statement) {
            var _this = this;
            this.statement = statement;
            this.value = new Mist.Value([{}]);
            this.value.when(function (o) {
                var response = o.map(function (p) {
                    var response = [];
                    // format response.
                    for (var name_2 in p) {
                        response.push(hycase(name_2) + ':' + p[name_2]);
                    }
                    // a response.
                    return statement.selector()
                        + '{'
                        + response.join(';')
                        + '}';
                });
                // inner response.
                _this.create().innerHTML = response.join('');
            });
        }
        /**
        * @return {}
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
        * @param {} dur
        * @return {}
        */
        Style.prototype.add = function (css, dur) {
            var _this = this;
            if (dur === void 0) { dur = 0; }
            return new Mist.Promise(function (responsor) {
                var s = _this;
                var r = s.value.compose(function (o) {
                    // initialize.
                    var response = s.composer(css, dur, dur > 0 ? {} : o[0]);
                    // dur response.
                    if (dur > 0) {
                        o.push(response);
                        // lazy response.
                        var r = Mist.Frame.on(function () {
                            return s.value.compose(function (o) {
                                // composer.
                                var i = o.indexOf(response);
                                i < 0 || o.splice(i, 1);
                                // [] response.
                                return o;
                            });
                        }, dur);
                        // connect.
                        r.then(responsor);
                    }
                    // [] response.
                    return o;
                });
                // passthru.
                dur > 0 || r.then(responsor);
            });
        };
        /**
        * @param {} key
        * @param {} responsor
        * @return {}
        */
        Style.prototype.bind = function (key, responsor) {
            var e = new RegExp('.*?\\/\\*+\\s*(.*?)\\{\\s*(' + key + '\\S*)\\s*\\}(.*?)\\s*\\*+\\/');
            var s = this;
            var r = responsor.when(function (v) {
                // bind response.
                eval('var _' + key + '=v;');
                return s.value.compose(function (o) {
                    o.forEach(function (p) {
                        // composer.
                        for (var name_3 in p) {
                            p[name_3] = p[name_3].replace(e, function (_, $1, $2, $3) {
                                return [$1, eval('_' + $2), $3, '/*', $1, '{', $2, '}', $3, '*/'].join('');
                            });
                        }
                    });
                    // [] response.
                    return o;
                });
            });
            // passthru.
            return r;
        };
        /**
        * @return {}
        * @summary scoped
        */
        Style.prototype.get = function () {
            var response = {};
            this.value.composite.forEach(function (css) {
                // composer.
                for (var name_4 in css) {
                    response[name_4] = css[name_4];
                }
            });
            // {} response.
            return response;
        };
        /**
        * @param {} css
        * @return {}
        */
        Style.prototype.set = function (css) {
            var s = this;
            var r = s.value.compose(function () {
                // [] response.
                return [s.composer(css)];
            });
            // passthru.
            return r;
        };
        /**
        * @access private
        */
        Style.prototype.composer = function (css, dur, response) {
            if (dur === void 0) { dur = 0; }
            if (response === void 0) { response = {}; }
            var s = this;
            // composer.
            for (var name_5 in css) {
                if (css[name_5] instanceof Mist.Promise) {
                    function composer(name, v) {
                        var response = {};
                        response[name] = v;
                        // reset response.
                        s.add(response, dur);
                    }
                    // lazy response.
                    css[name_5].when(composer.bind(s, name_5));
                }
                else {
                    // passthru.
                    response[name_5] = css[name_5];
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
            * @param {} src
            * @param {} prev?
            */
            function Detail(src, prev) {
                this.src = src;
                this.prev = prev;
                /**
                * @access public
                */
                this.client = { x: 0, y: 0 };
                /**
                * @access public
                */
                this.move = { x: 0, y: 0 };
                /**
                * @access public
                */
                this.page = { x: 0, y: 0 };
                /**
                * @access public
                */
                this.screen = { x: 0, y: 0 };
                // mapped.
                if (src instanceof MouseEvent) {
                    // no response.
                    this.mouse(src, prev);
                }
                else if (src instanceof TouchEvent) {
                    // no response.
                    this.touch(src, prev);
                }
            }
            /**
            * @param {} src
            * @param {} prev
            */
            Detail.prototype.mouse = function (src, prev) {
                var f = prev;
                var t = src;
                // passed milliseconds.
                var s = prev ? src.timeStamp - prev.timeStamp : 0;
                var x = prev ? t.pageX - f.pageX : 0;
                var y = prev ? t.pageY - f.pageY : 0;
                var v = Math.sqrt(x * x + y * y);
                // initialize.
                this.set(t, s, x, y, v);
            };
            /**
            * @param {} t
            * @param {} s
            * @param {} x
            * @param {} y
            * @param {} v
            */
            Detail.prototype.set = function (t, s, x, y, v) {
                this.client.x = t.clientX;
                this.client.y = t.clientY;
                this.move.x = x;
                this.move.y = y;
                this.mpms = s ? v / s : 0;
                this.page.x = t.pageX;
                this.page.y = t.pageY;
                this.passed = s;
                this.screen.x = t.screenX;
                this.screen.y = t.screenY;
                this.vector = v;
            };
            /**
            * @param {} src
            * @param {} prev
            */
            Detail.prototype.touch = function (src, prev) {
                var f = prev ? prev.changedTouches[0] : null;
                var t = src.changedTouches[0];
                // passed milliseconds.
                var s = prev ? src.timeStamp - prev.timeStamp : 0;
                var x = prev ? t.pageX - f.pageX : 0;
                var y = prev ? t.pageY - f.pageY : 0;
                var v = Math.sqrt(x * x + y * y);
                // initialize.
                this.set(t, s, x, y, v);
            };
            return Detail;
        }());
        Recognizer.Detail = Detail;
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
                this.enter();
                this.leave();
                this.move();
                this.start();
            }
            /**
            * @access private
            */
            Pan.prototype.end = function () {
                var s = this;
                function responsor(e) {
                    var r = new Recognizer.Detail(e, s.txv);
                    s.emitter.emit('pan', r);
                    s.emitter.emit('panend', r);
                    // end response.
                    s.txd = false;
                    s.txv = e;
                }
                new Mist.Emission(s.emitter, 'mouseup').when(responsor);
                new Mist.Emission(s.emitter, 'touchcancel').when(responsor);
                new Mist.Emission(s.emitter, 'touchend').when(prevent).when(responsor);
            };
            /**
            * @access private
            */
            Pan.prototype.enter = function () {
                var s = this;
                function responsor(e) {
                    var r = new Recognizer.Detail(e, s.txv);
                    s.emitter.emit('pan', r);
                    s.emitter.emit('panenter', r);
                    // begin response.
                    s.txd = true;
                    s.txv = e;
                }
                new Mist.Emission(s.emitter, 'mouseenter').when(responsor);
                new Mist.Emission(s.emitter, 'touchenter').when(prevent).when(responsor);
            };
            /**
            * @access private
            */
            Pan.prototype.leave = function () {
                var s = this;
                function responsor(e) {
                    if (s.txd) {
                        var r = new Recognizer.Detail(e, s.txv);
                        s.emitter.emit('pan', r);
                        s.emitter.emit('panleave', r);
                        // end response.
                        s.txd = false;
                        s.txv = e;
                    }
                }
                new Mist.Emission(s.emitter, 'mouseout').when(responsor);
                new Mist.Emission(s.emitter, 'touchleave').when(prevent).when(responsor);
            };
            /**
            * @access private
            */
            Pan.prototype.move = function () {
                var s = this;
                function responsor(e) {
                    if (s.txd) {
                        var r = new Recognizer.Detail(e, s.txv);
                        // filt response.
                        if (Pan.upper < r.vector) {
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
                            s.txv = e;
                        }
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
                    s.emitter.emit('pan', r);
                    s.emitter.emit('panstart', r);
                    // begin response.
                    s.txd = true;
                    s.txv = e;
                }
                new Mist.Emission(s.emitter, 'mousedown').when(responsor);
                new Mist.Emission(s.emitter, 'touchstart').when(prevent).when(responsor);
            };
            /**
            * @access public
            * @static
            * @summary for error
            */
            Pan.upper = 10;
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
                    var s = Swipe.mpms / Math.SQRT2;
                    var v = Swipe.mpms;
                    // filt response.
                    if (v < response.mpms) {
                        emitter.emit('swipe', response);
                        // filt response.
                        if (s < Math.sqrt((response.move.x *
                            response.move.x)) / response.passed) {
                            // dir response.
                            if (response.move.x < 0)
                                emitter.emit('swipeleft', response);
                            if (response.move.x > 0)
                                emitter.emit('swiperight', response);
                        }
                        // filt response.
                        if (s < Math.sqrt((response.move.y *
                            response.move.y)) / response.passed) {
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
            Swipe.mpms = 0.65;
            return Swipe;
        }());
        Recognizer.Swipe = Swipe;
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
/// <reference path='class.ts' />
/// <reference path='component.ts' />
/// <reference path='emission.ts' />
/// <reference path='emitter.ts' />
/// <reference path='style.ts' />
/// <reference path='recognizer/pan.ts' />
/// <reference path='recognizer/swipe.ts' />
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
        * @return {}
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
        * @return {}
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
        * @return {}
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
        * @return {}
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
        * @return {}
        */
        Statement.prototype.on = function (name) {
            // {} response.
            return new Mist.Emission(this.emitter, name);
        };
        /**
        * @param {} name
        * @return {}
        */
        Statement.prototype.once = function (name) {
            // lasting response.
            return Mist.Component.create(Mist.Emission, this.emitter, name);
        };
        /**
        * @return {}
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
 * @version 0.4.3
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
