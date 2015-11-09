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
    * @description thenable
    */
    var Promise = (function () {
        /**
        * @constructor
        * @param {} process
        */
        function Promise(process) {
            var _this = this;
            /**
            * @access private
            * @param {} response
            */
            this.rejector = function (response) {
                var o = _this.rejector;
                // fail response.
                if (o.statement) {
                    o.statement(response);
                }
                else {
                    // fixed response.
                    o.completor = o.bind(o, response);
                }
            };
            /**
            * @access private
            * @param {} response
            */
            this.resolver = function (response) {
                var o = _this.resolver;
                // commit response.
                if (o.statement) {
                    o.statement(response);
                }
                else {
                    // fixed response.
                    o.completor = o.bind(o, response);
                }
            };
            // prev response.
            if (process.rejector) {
                this.rejector = process.rejector;
            }
            // lazy response.
            process(this.resolver, this.rejector);
        }
        /**
        * @access public
        * @static
        */
        Promise.all = function (promises) {
            return new Promise(function (resolver, rejector) {
                // initialize.
                var response = [];
                var m;
                promises.map(function (promise, n) {
                    m = n;
                    promise.then(function (o) {
                        // fast response?
                        if (!(n in response)) {
                            response[n] = o;
                            // commit response.
                            if (keys(response).length > m) {
                                resolver(response);
                                // initialize.
                                response = [];
                            }
                        }
                    }).catch(function (e) {
                        // initialize.
                        response = [];
                        // fail response.
                        rejector(e);
                    });
                });
            });
        };
        /**
        * @access public
        * @static
        */
        Promise.race = function (promises) {
            return new Promise(function (resolver, rejector) {
                // initialize.
                var response = [];
                var m;
                promises.map(function (promise, n) {
                    m = n;
                    promise.then(function (o) {
                        response[n] = o;
                        // commit response.
                        var l = keys(response).length;
                        // a response.
                        if (l < 2)
                            resolver(o);
                        if (l > m)
                            response = [];
                    }).catch(function (e) {
                        // initialize.
                        response = [];
                        // fail response.
                        rejector(e);
                    });
                });
            });
        };
        /**
        * @param {} rejector
        * @return {}
        */
        Promise.prototype.catch = function (rejector) {
            var o = this.rejector;
            // lazy response.
            var process = function (resolver) {
                process.resolver = resolver;
                process.rejector = resolver;
                // fixed response.
                if (o.completor)
                    o.completor();
            };
            // initialize.
            o.statement = function (response) {
                try {
                    var response = rejector(response);
                    if (response != null) {
                        // commit response.
                        process.resolver(response);
                    }
                }
                catch (e) {
                    // fail response.
                    process.rejector(e);
                }
            };
            // {} response.
            return new Promise(process);
        };
        /**
        * @param {} resolver
        * @param {} rejector
        * @return {}
        */
        Promise.prototype.then = function (resolver, rejector) {
            var o = this.resolver;
            var e = this.rejector;
            // lazy response.
            var process = function (resolver) {
                process.resolver = resolver;
                process.rejector = e;
                // fixed response.
                if (o.completor)
                    o.completor();
            };
            // initialize.
            o.statement = function (response) {
                try {
                    var response = resolver(response);
                    if (response != null) {
                        // commit response.
                        process.resolver(response);
                    }
                }
                catch (e) {
                    // catch response.
                    if (rejector) {
                        var response = rejector(e);
                        if (response != null) {
                            // commit response.
                            process.resolver(response);
                        }
                    }
                    else {
                        // fail response.
                        process.rejector(e);
                    }
                }
            };
            // {} response.
            return new Promise(process);
        };
        return Promise;
    })();
    Mist.Promise = Promise;
    /**
    * @access private
    * @static
    */
    function keys(response) {
        // [] response.
        return Object.keys(response);
    }
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
    * @description gear
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
            return new Mist.Promise(function (resolver, rejector) {
                // initialize.
                var response = [];
                response.push(delay);
                response.push(function () {
                    try {
                        // commit response.
                        resolver(responsor());
                    }
                    catch (e) {
                        // fail response.
                        rejector(e);
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
            this.txs = [];
            _super.call(this, function (resolver, rejector) {
                // initialize.
                _this.txr = function () {
                    // begin response.
                    _this.txd || (function () {
                        _this.txd = true;
                        // serial response.
                        Mist.Frame.at(function () {
                            var responsor;
                            try {
                                // commit response.
                                resolver(_this.composite);
                            }
                            catch (e) {
                                // fail response.
                                rejector(e);
                            }
                            while (responsor = _this.txs.pop()) {
                                responsor(_this.composite);
                            }
                            // end response.
                            _this.txd = false;
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
                // serial response.
                Mist.Frame.at(function () {
                    // a response.
                    _this.composite = composer(_this.composite);
                    // patch response.
                    _this.txs.push(responsor);
                    _this.txr();
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
    var List;
    (function (List) {
        List[List["ADD"] = 0] = "ADD";
        List[List["REMOVE"] = 1] = "REMOVE";
        List[List["TOGGLE"] = 2] = "TOGGLE";
    })(List || (List = {}));
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
            this.value.then(function (o) {
                var response = [];
                for (var name in o) {
                    // format response.
                    var k = o[name];
                    response[k] || (response[k] = []);
                    response[k].push(name);
                    // initialize.
                    delete o[name];
                }
                // () response.
                if (response[List.ADD]) {
                    function a(e) {
                        e.classList.add.apply(e.classList, response[List.ADD]);
                    }
                }
                // () response.
                if (response[List.REMOVE]) {
                    function r(e) {
                        e.classList.remove.apply(e.classList, response[List.REMOVE]);
                    }
                }
                // () response.
                if (response[List.TOGGLE]) {
                    function t(e) {
                        response[List.TOGGLE].forEach(function (name) {
                            e.classList.toggle(name);
                        });
                    }
                }
                this.statement.each(function (e) {
                    a && a(e);
                    r && r(e);
                    t && t(e);
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
                var f = dur > 0;
                var g = _this.value.compose(function (o) {
                    // composer.
                    [].forEach.call(names, function (name) {
                        // tagged response.
                        o[name] = List.ADD;
                    });
                    // {} response.
                    return o;
                });
                // dur response.
                f ? Mist.Frame.on(_this.remove.bind(_this, names), dur).then(function (g) {
                    // gear response.
                    g.then(responsor);
                }) : g.then(responsor);
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
                var f = dur > 0;
                var g = _this.value.compose(function (o) {
                    // composer.
                    [].forEach.call(names, function (name) {
                        // tagged response.
                        o[name] = List.REMOVE;
                    });
                    // {} response.
                    return o;
                });
                // dur response.
                f ? Mist.Frame.on(_this.add.bind(_this, names), dur).then(function (g) {
                    // gear response.
                    g.then(responsor);
                }) : g.then(responsor);
            });
        };
        /**
        * @param {} names
        * @return {}
        */
        Class.prototype.toggle = function (names) {
            return this.value.compose(function (o) {
                // composer.
                [].forEach.call(names, function (name) {
                    switch (o[name]) {
                        case List.ADD:
                            // tagged response.
                            o[name] = List.REMOVE;
                            break;
                        case List.REMOVE:
                            // tagged response.
                            o[name] = List.ADD;
                            break;
                        case List.TOGGLE:
                            // tagged response.
                            delete o[name];
                            break;
                        default:
                            // tagged response.
                            o[name] = List.TOGGLE;
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
            _super.call(this, function (resolver, rejector) {
                emitter.add(name, function (response) {
                    try {
                        // commit response.
                        resolver(response);
                    }
                    catch (e) {
                        // fail response.
                        rejector(e);
                    }
                });
            });
            this.emitter = emitter;
            this.name = name;
        }
        /**
        * @description for listener.
        */
        Emission.prototype.cancel = function () {
            this.then(null, null);
        };
        /**
        * @param {} resolver
        * @param {} rejector
        * @return {}
        */
        Emission.prototype.once = function (resolver, rejector) {
            var _this = this;
            // {} response.
            return this.then(function (response) {
                _this.cancel();
                // commit response.
                return resolver(response);
            }, function (response) {
                _this.cancel();
                // fail response.
                return rejector(response);
            });
        };
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
            this.value.then(function (o) {
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
                var f = dur > 0;
                var g = _this.value.compose(function (o) {
                    // initialize.
                    var response = f ? {} : o[0];
                    // composer.
                    for (var name in css) {
                        response[name] = css[name];
                    }
                    // dur response.
                    if (f) {
                        o.push(response);
                        // lazy response.
                        Mist.Frame.on(function () {
                            return _this.value.compose(function (o) {
                                // composer.
                                var i = o.indexOf(response);
                                i < 0 || o.splice(i, 1);
                                // [] response.
                                return o;
                            });
                        }, dur).then(function (g) {
                            // gear response.
                            g.then(responsor);
                        });
                    }
                    // {} response.
                    return o;
                });
                // dur response.
                f || g.then(responsor);
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
                Mist.Promise.race([
                    new Mist.Emission(emitter, 'mousedown'),
                    new Mist.Emission(emitter, 'touchstart')
                ]).then(function (e) {
                    emitter.emit('panstart', e);
                    // begin response.
                    txd = true;
                });
                Mist.Promise.race([
                    new Mist.Emission(emitter, 'mousemove'),
                    new Mist.Emission(emitter, 'touchmove')
                ]).then(function (e) {
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
                });
                Mist.Promise.race([
                    new Mist.Emission(emitter, 'mouseup'),
                    new Mist.Emission(emitter, 'touchcancel'),
                    new Mist.Emission(emitter, 'touchend')
                ]).then(function (e) {
                    emitter.emit('panend', e);
                    // end reponse.
                    txd = false;
                });
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
                Mist.Promise.race([
                    new Mist.Emission(emitter, 'mouseup'),
                    new Mist.Emission(emitter, 'touchend')
                ]).then(function (e) {
                    emitter.emit('tap', e);
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
