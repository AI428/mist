/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var Mist;
(function (Mist) {
    /**
    * @class Component
    * @description factory
    */
    var Component = (function () {
        function Component() {
        }
        /**
        * @constructor
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
        /**
        * @access private
        * @static
        */
        Component.responses = {};
        return Component;
    })();
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
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
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
            var s = this.succeed;
            var e = this.erred;
            // initialize.
            this.resume();
            // lazy response.
            process(s.bind(this), e.bind(this));
        }
        /**
        * @access public
        * @static
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
                    p = i;
                });
            });
        };
        /**
        * @access public
        * @static
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
        * @description for loop
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
                    response instanceof Object ? response.then ?
                        // lazy response.
                        response.then(m) :
                        // passthru.
                        m(response) :
                        m(response);
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
                    response instanceof Object ? response.then ?
                        // lazy response.
                        response.then(m) :
                        // passthru.
                        m(response) :
                        m(response);
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
    })();
    Mist.Promise = Promise;
})(Mist || (Mist = {}));
/// <reference path='promise.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var Mist;
(function (Mist) {
    /**
    * @class Frame
    * @description queuing
    */
    var Frame = (function () {
        function Frame() {
        }
        /**
        * @access public
        * @static
        */
        Frame.at = function (responsor, delay) {
            if (delay === void 0) { delay = 0; }
            // initialize.
            var response = [];
            response.push(delay);
            response.push(responsor);
            // patch response.
            this.txs.push(response);
            this.tx();
        };
        /**
        * @access public
        * @static
        */
        Frame.on = function (responsor, delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            return new Mist.Promise(function (succeed, erred) {
                // initialize.
                var response = [];
                response.push(delay);
                response.push(function () {
                    try {
                        // commit response.
                        succeed(responsor());
                    }
                    catch (e) {
                        // fail response.
                        erred(e);
                    }
                });
                // patch response.
                _this.txs.push(response);
                _this.tx();
            });
        };
        /**
        * @access private
        * @static
        */
        Frame.tx = function () {
            var _this = this;
            // begin response.
            this.txd || (function () {
                _this.txd = true;
                var _;
                // lazy response.
                (_ = function () {
                    var p = [];
                    var responsor;
                    while (responsor = _this.txs.pop()) {
                        responsor[0]-- < 0 ? responsor[1]() : p.push(responsor);
                    }
                    // end response.
                    _this.txs.push.apply(_this.txs, p) ? requestAnimationFrame(_) : (_this.txd = false);
                })();
            })();
        };
        Frame.txs = [];
        return Frame;
    })();
    Mist.Frame = Frame;
})(Mist || (Mist = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
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
            this.composite = composite;
            this.xs = [];
            _super.call(this, function (succeed, erred) {
                // initialize.
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
    })(Mist.Promise);
    Mist.Value = Value;
})(Mist || (Mist = {}));
/// <reference path='frame.ts'/>
/// <reference path='promise.ts'/>
/// <reference path='statement.ts'/>
/// <reference path='value.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var Mist;
(function (Mist) {
    /**
    * @access private
    * @static
    */
    var Command;
    (function (Command) {
        Command[Command["A"] = 0] = "A";
        Command[Command["R"] = 1] = "R";
        Command[Command["T"] = 2] = "T";
    })(Command || (Command = {}));
    ;
    /**
    * @class Class
    * @description accessor
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
                for (var name in o) {
                    var k = o[name];
                    // format response.
                    response[k] || (response[k] = []);
                    response[k].push(name);
                    // initialize.
                    delete o[name];
                }
                this.statement.each(function (e) {
                    var m = e.classList;
                    var n;
                    // patch response.
                    !(n = response[Command.A]) || m.add.apply(m, n);
                    !(n = response[Command.R]) || m.remove.apply(m, n);
                    !(n = response[Command.T]) || n.forEach(function (name) {
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
        Class.prototype.add = function (names, dur) {
            var _this = this;
            if (dur === void 0) { dur = 0; }
            return new Mist.Promise(function (responsor) {
                var c = _this.value.compose(function (o) {
                    // composer.
                    names.forEach(function (name) {
                        // tagged response.
                        o[name] = Command.A;
                    });
                    // {} response.
                    return o;
                });
                // dur response.
                dur > 0 ? Mist.Frame.on(_this.remove.bind(_this, names), dur).then(function (c) {
                    c.then(responsor);
                }) : c.then(responsor);
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
                var c = _this.value.compose(function (o) {
                    // composer.
                    names.forEach(function (name) {
                        // tagged response.
                        o[name] = Command.R;
                    });
                    // {} response.
                    return o;
                });
                // dur response.
                dur > 0 ? Mist.Frame.on(_this.add.bind(_this, names), dur).then(function (c) {
                    c.then(responsor);
                }) : c.then(responsor);
            });
        };
        /**
        * @param {} names
        * @return {}
        */
        Class.prototype.toggle = function (names) {
            return this.value.compose(function (o) {
                // composer.
                names.forEach(function (name) {
                    switch (o[name]) {
                        case Command.A:
                            // tagged response.
                            o[name] = Command.R;
                            break;
                        case Command.R:
                            // tagged response.
                            o[name] = Command.A;
                            break;
                        case Command.T:
                            // tagged response.
                            delete o[name];
                            break;
                        default:
                            // tagged response.
                            o[name] = Command.T;
                    }
                });
                // {} response.
                return o;
            });
        };
        return Class;
    })();
    Mist.Class = Class;
})(Mist || (Mist = {}));
/// <reference path='statement.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
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
        * @access public
        * @static
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
    })();
    Mist.Emitter = Emitter;
})(Mist || (Mist = {}));
/// <reference path='emitter.ts'/>
/// <reference path='promise.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
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
    })(Mist.Promise);
    Mist.Emission = Emission;
})(Mist || (Mist = {}));
/// <reference path='frame.ts' />
/// <reference path='promise.ts' />
/// <reference path='statement.ts' />
/// <reference path='value.ts' />
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var Mist;
(function (Mist) {
    /**
    * @class Style
    * @description accessor
    */
    var Style = (function () {
        /**
        * @constructor
        * @param {} statement
        */
        function Style(statement) {
            this.statement = statement;
            var s = document.createElement('style');
            var t = document.createTextNode('');
            s.appendChild(t);
            document.head.appendChild(s);
            // initialize.
            this.value = new Mist.Value([{}]);
            this.value.when(function (o) {
                var response = o.map(function (p) {
                    var response = [];
                    // format response.
                    for (var name in p) {
                        response.push(hycase(name) + ':' + p[name]);
                    }
                    // a response.
                    return statement.selector()
                        + '{'
                        + response.join(';')
                        + '}';
                });
                // inner response.
                s.innerHTML = response.join('');
            });
        }
        /**
        * @param {} css
        * @param {} dur
        * @return {}
        */
        Style.prototype.add = function (css, dur) {
            var _this = this;
            if (dur === void 0) { dur = 0; }
            return new Mist.Promise(function (responsor) {
                var c = _this.value.compose(function (o) {
                    // initialize.
                    var response = dur > 0 ? {} : o[0];
                    // composer.
                    for (var name in css) {
                        response[name] = css[name];
                    }
                    // dur response.
                    if (dur > 0) {
                        o.push(response);
                        // lazy response.
                        var c = Mist.Frame.on(function () {
                            return _this.value.compose(function (o) {
                                // composer.
                                var i = o.indexOf(response);
                                i < 0 || o.splice(i, 1);
                                // [] response.
                                return o;
                            });
                        }, dur);
                        // [] response.
                        c.then(responsor);
                    }
                    // {} response.
                    return o;
                });
                // passthru.
                dur > 0 || c.then(responsor);
            });
        };
        /**
        * @description scoped style
        * @return {}
        */
        Style.prototype.get = function () {
            // [] response.
            return this.value.composite;
        };
        /**
        * @param {} css
        * @return {}
        */
        Style.prototype.set = function (css) {
            return this.value.compose(function () {
                var response = {};
                // composer.
                for (var name in css) {
                    response[name] = css[name];
                }
                // [] response.
                return [response];
            });
        };
        return Style;
    })();
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
/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        /**
        * @class Pan
        * @description recognizer
        */
        var Pan = (function () {
            /**
            * @constructor
            * @param {} emitter
            */
            function Pan(emitter) {
                this.emitter = emitter;
                // initialize.
                var txd = false;
                (function () {
                    var m = new Mist.Emission(emitter, 'mousedown');
                    var t = new Mist.Emission(emitter, 'touchstart');
                    var responsor = Mist.Promise.race([m, t]);
                    responsor.when(function (e) {
                        emitter.emit('panstart', e);
                        // begin response.
                        txd = true;
                        // loop response.
                        m.resume();
                        t.resume();
                    });
                })();
                (function () {
                    var m = new Mist.Emission(emitter, 'mousemove');
                    var t = new Mist.Emission(emitter, 'touchmove');
                    var responsor = Mist.Promise.race([m, t]);
                    responsor.when(function (e) {
                        if (txd) {
                            emitter.emit('panmove', e);
                            // dir response.
                            if (e.movementX < 0)
                                emitter.emit('panleft', e);
                            if (e.movementX > 0)
                                emitter.emit('panright', e);
                            if (e.movementY < 0)
                                emitter.emit('panup', e);
                            if (e.movementY > 0)
                                emitter.emit('pandown', e);
                        }
                        // loop response.
                        m.resume();
                        t.resume();
                    });
                })();
                (function () {
                    var m = new Mist.Emission(emitter, 'mouseup');
                    var c = new Mist.Emission(emitter, 'touchcancel');
                    var t = new Mist.Emission(emitter, 'touchend');
                    var responsor = Mist.Promise.race([m, c, t]);
                    responsor.when(function (e) {
                        emitter.emit('panend', e);
                        // end response.
                        txd = false;
                        // loop response.
                        m.resume();
                        c.resume();
                        t.resume();
                    });
                })();
            }
            return Pan;
        })();
        Recognizer.Pan = Pan;
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
/// <reference path='../emission.ts'/>
/// <reference path='../emitter.ts'/>
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        /**
        * @class Tap
        * @description recognizer
        */
        var Tap = (function () {
            /**
            * @constructor
            * @param {} emitter
            */
            function Tap(emitter) {
                this.emitter = emitter;
                var m = new Mist.Emission(emitter, 'mouseup');
                var t = new Mist.Emission(emitter, 'touchend');
                var responsor = Mist.Promise.race([m, t]);
                responsor.when(function (e) {
                    emitter.emit('tap', e);
                    // loop response.
                    m.resume();
                    t.resume();
                });
            }
            return Tap;
        })();
        Recognizer.Tap = Tap;
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
/// <reference path='class.ts' />
/// <reference path='emission.ts' />
/// <reference path='emitter.ts' />
/// <reference path='style.ts' />
/// <reference path='recognizer/pan.ts' />
/// <reference path='recognizer/tap.ts' />
/**
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 */
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
            this.class = new Mist.Class(this);
            this.emitter = new Mist.Emitter(this);
            this.style = new Mist.Style(this);
            // recognizer.
            new Mist.Recognizer.Pan(this.emitter);
            new Mist.Recognizer.Tap(this.emitter);
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
        * @description each elements
        * @param {} listener
        */
        Statement.prototype.each = function (listener) {
            this.elements().forEach(listener);
        };
        /**
        * @description mapped elements
        * @return {}
        */
        Statement.prototype.elements = function () {
            var s = this.statement;
            // mapped.
            var response;
            if (s instanceof HTMLElement) {
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
        * @param {} name
        * @return {}
        */
        Statement.prototype.on = function (name) {
            // {} response.
            return new Mist.Emission(this.emitter, name);
        };
        /**
        * @description mapped selector
        * @return {}
        */
        Statement.prototype.selector = function () {
            var s = this.statement;
            // mapped.
            var response;
            if (s instanceof HTMLElement) {
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
    })();
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
                element.setAttribute('mid', response);
                // selector response.
                return '[mid="'
                    + response
                    + '"]';
            })());
    }
})(Mist || (Mist = {}));
/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />
/*!
 * @copyright 2015 AI428
 * @description multi event, style accessor
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.2.1
 */
/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement) {
    return Mist.Component.create(Mist.Statement, statement);
}
/**
* @class Element
* @method Element.matches
*/
(function (Element) {
    Element.matches = Element.matches
        || Element.mozMatchesSelector
        || Element.msMatchesSelector
        || Element.webkitMatchesSelector;
})(Element.prototype);
/**
* @class Element
* @method Element.closest
*/
(function (Element) {
    Element.closest = Element.closest || function (selector) {
        var element = this;
        // closest.
        while (element) {
            if (element.matches(selector))
                break;
            element = element.parentElement;
        }
        // {} response.
        return element;
    };
})(Element.prototype);
