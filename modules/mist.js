var Mist;
(function (Mist) {
    /**
     * @class Component
   * @description component factory.
     * @since 0.1.0
     */
    var Component = (function () {
        function Component() {
        }
        /**
         * @constructor
         * @return {Function}
         */
        Component.create = function (module) {
            var options = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                options[_i - 1] = arguments[_i];
            }
            var o = this.hash(options);
            var m = this.hash([
                module
            ]);
            // initialize.
            if (!this.components[m]) {
                this.components[m] = {};
            }
            // inher response.
            if (!this.components[m][o]) {
                this.components[m][o] = new (module.bind.apply(module, [module].concat([].slice.apply(options))));
            }
            // {} response.
            return this.components[m][o];
        };
        /**
         * @access private
         * @static
         */
        Component.hash = function (options) {
            var _this = this;
            return JSON.stringify(options.map(function (o) {
                if (o instanceof Element)
                    if (o.id)
                        return o.id;
                if (o instanceof Object)
                    return o._ID || (o._ID = _this.identities.push(0));
                // passthru.
                return o;
            }));
        };
        /**
         * @access private
         * @static
         */
        Component.components = {};
        Component.identities = [];
        return Component;
    })();
    Mist.Component = Component;
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    /**
     * @class Promise
   * @description responsive.
     * @since 0.1.0
     */
    var Promise = (function () {
        /**
         * @constructor
         * @param {} process
         */
        function Promise(process) {
            var _this = this;
            this.resolver = function (r) {
                if (_this.resolver.statement) {
                    _this.resolver.statement(r);
                }
                else {
                    _this.resolver.completor = function () {
                        _this.resolver(r);
                    };
                }
            };
            // prev response.
            this.rejector = process.rejector || (function (r) {
                if (_this.rejector.statement) {
                    _this.rejector.statement(r);
                }
                else {
                    _this.rejector.completor = function () {
                        _this.rejector(r);
                    };
                }
            });
            // lazy response.
            process(this.resolver, this.rejector);
        }
        /**
         * @param {} rejector
     * @return {Promise}
         */
        Promise.prototype.catch = function (rejector) {
            var _this = this;
            // lazy response.
            var process = function (resolver, rejector) {
                // next process.
                process.resolver = resolver;
                process.rejector = resolver;
                // invoke response.
                if (_this.rejector.completor) {
                    _this.rejector.completor();
                }
            };
            // initialize.
            this.rejector.statement = function (r) {
                try {
                    var response = rejector(r);
                    if (response != null) {
                        // next process.
                        process.resolver(response);
                    }
                }
                catch (e) {
                    // next process.
                    process.rejector(e);
                }
            };
            // {} response.
            return new Promise(process);
        };
        /**
         * @param {} resolver
         * @param {} rejector
     * @return {Promise}
         */
        Promise.prototype.then = function (resolver, rejector) {
            var _this = this;
            // lazy response.
            var process = function (resolver) {
                // next process.
                process.resolver = resolver;
                // invoke response.
                if (_this.resolver.completor) {
                    _this.resolver.completor();
                }
            };
            // prev response.
            process.rejector = this.rejector;
            // initialize.
            this.resolver.statement = function (r) {
                try {
                    var response = resolver(r);
                    if (response != null) {
                        // next process.
                        process.resolver(response);
                    }
                }
                catch (e) {
                    if (rejector) {
                        var response = rejector(e);
                        if (response != null) {
                            // next process.
                            process.resolver(response);
                        }
                    }
                    else {
                        // next process.
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
})(Mist || (Mist = {}));
/// <reference path='../promise.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mist;
(function (Mist) {
    /**
     * @class Listener
     * @extends Promise
     * @since 0.1.0
     */
    var Listener = (function (_super) {
        __extends(Listener, _super);
        /**
         * @constructor
         */
        function Listener() {
            var _this = this;
            _super.call(this, function (resolver, rejector) {
                _this.compute = function (r) {
                    if (!_this.paused) {
                        try {
                            resolver(r);
                        }
                        catch (e) {
                            rejector(e);
                        }
                    }
                };
            });
        }
        /**
         */
        Listener.prototype.pause = function () {
            // pause listener.
            this.paused = true;
        };
        /**
         */
        Listener.prototype.resume = function () {
            // resume listener.
            this.paused = false;
        };
        return Listener;
    })(Mist.Promise);
    Mist.Listener = Listener;
})(Mist || (Mist = {}));
/// <reference path='../statement.ts' />
var Mist;
(function (Mist) {
    /**
     * @class CSSClass
     * @description classing.
     * @since 0.1.0
     */
    var CSSClass = (function () {
        /**
         * @constructor
         * @param {Statement} statement
         */
        function CSSClass(statement) {
            this.statement = statement;
        }
        /**
         * @param {string[]} names
         */
        CSSClass.prototype.add = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            this.statement.each(function (element) {
                element.classList.add.apply(element.classList, names);
            });
        };
        /**
         * @param {string[]} names
         */
        CSSClass.prototype.remove = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            this.statement.each(function (element) {
                element.classList.remove.apply(element.classList, names);
            });
        };
        /**
         * @param {string[]} names
         */
        CSSClass.prototype.toggle = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            this.statement.each(function (element) {
                names.forEach(function (name) {
                    element.classList.toggle(name);
                });
            });
        };
        return CSSClass;
    })();
    Mist.CSSClass = CSSClass;
})(Mist || (Mist = {}));
/// <reference path='../promise.ts'/>
var Mist;
(function (Mist) {
    /**
     * @class Value
     * @extends Promise
     * @since 0.1.0
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
            _super.call(this, function (resolver, rejector) {
                _this.compute = function () {
                    if (!_this.computed) {
                        // begin.
                        _this.computed = true;
                        // lazy response.
                        requestAnimationFrame(function () {
                            try {
                                resolver(_this.composite);
                            }
                            catch (e) {
                                rejector(e);
                            }
                            finally {
                                // commit.
                                _this.computed = false;
                            }
                        });
                    }
                };
            });
        }
        /**
         * @param {} composer
         */
        Value.prototype.compose = function (composer) {
            this.composite = composer(this.composite);
            this.compute();
        };
        return Value;
    })(Mist.Promise);
    Mist.Value = Value;
})(Mist || (Mist = {}));
/// <reference path='../promise/value.ts' />
/// <reference path='../statement.ts' />
var Mist;
(function (Mist) {
    /**
     * @class CSSStyle
     * @description styling.
     * @since 0.1.0
     */
    var CSSStyle = (function () {
        /**
         * @constructor
         * @param {Statement} statement
         */
        function CSSStyle(statement) {
            this.value = new Mist.Value({});
            this.value.then(function (style) {
                statement.each(function (element) {
                    for (var name in style) {
                        if (element.style.hasOwnProperty(name)) {
                            element.style[name] = style[name];
                        }
                    }
                });
                // initialize.
                style = {};
            });
        }
        /**
         * @param {string[]} names
         */
        CSSStyle.prototype.remove = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            this.value.compose(function (style) {
                names.forEach(function (name) {
                    style[name] = '';
                });
                // {} response.
                return style;
            });
        };
        /**
         * @param {} options
         */
        CSSStyle.prototype.set = function (options) {
            this.value.compose(function (style) {
                for (var name in options) {
                    style[name] = options[name];
                }
                // {} response.
                return style;
            });
        };
        return CSSStyle;
    })();
    Mist.CSSStyle = CSSStyle;
})(Mist || (Mist = {}));
/// <reference path='promise/listener.ts' />
var Mist;
(function (Mist) {
    /**
     * @class Stream
     * @description publisher / subscriber.
     * @since 0.1.0
     */
    var Stream = (function () {
        function Stream() {
            this.listeners = [];
        }
        /**
         * @param {} response
         */
        Stream.prototype.add = function (response) {
            this.listeners.forEach(function (listener) {
                listener.compute(response);
            });
        };
        /**
         * @param {Listener} listener
         */
        Stream.prototype.cancel = function (listener) {
            var i = this.listeners.indexOf(listener);
            i < 0 || this.listeners.splice(i, 1);
        };
        /**
         * @override
         */
        Stream.prototype.initialize = function () {
        };
        /**
         * @return {Listener}
         */
        Stream.prototype.listen = function () {
            var listener = new Mist.Listener();
            // initialize.
            this.listeners.length || this.initialize();
            this.listeners.push(listener);
            // {} response.
            return listener;
        };
        return Stream;
    })();
    Mist.Stream = Stream;
})(Mist || (Mist = {}));
/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>
var Mist;
(function (Mist) {
    /**
     * @class All
     * @extends Stream
     * @since 0.1.0
     */
    var All = (function (_super) {
        __extends(All, _super);
        /**
         * @constructor
         * @param {Promise[]} promises
         */
        function All(promises) {
            var _this = this;
            _super.call(this);
            // initialize.
            var response = [];
            this.initialize = function () {
                var l = promises.length;
                // lazy response.
                promises.map(function (promise, i) {
                    promise.then(function (r) {
                        response[i] = r;
                        if (response.length == l)
                            _this.add(response);
                        if (response.length == l) {
                            // initialize.
                            response = [];
                        }
                    });
                });
            };
        }
        return All;
    })(Mist.Stream);
    Mist.All = All;
})(Mist || (Mist = {}));
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
            // match response.
            if (element.matches(selector))
                break;
            // no response.
            element = element.parentElement;
        }
        return element;
    };
})(Element.prototype);
/// <reference path='../element.ts'/>
/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>
var Mist;
(function (Mist) {
    /**
     * @class Emitter
     * @extends Stream
     * @since 0.1.0
     */
    var Emitter = (function (_super) {
        __extends(Emitter, _super);
        /**
         * @constructor
         * @param {string} name
         * @param {string} selector
         */
        function Emitter(name, selector) {
            var _this = this;
            _super.call(this);
            // lazy response.
            document.addEventListener(name, function (e) {
                var element = e.target;
                if (element instanceof Element) {
                    if (element.closest(selector)) {
                        _this.add(e instanceof CustomEvent ?
                            e.detail :
                            e);
                    }
                }
            });
        }
        /**
         * @access public
         * @static
         */
        Emitter.customize = function (name, options) {
            var e = document.createEvent('CustomEvent');
            // initialize.
            e.initCustomEvent(name, options.bubbles || true, options.cancelable || true, options.detail);
            // {} response.
            return e;
        };
        return Emitter;
    })(Mist.Stream);
    Mist.Emitter = Emitter;
})(Mist || (Mist = {}));
/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>
var Mist;
(function (Mist) {
    /**
     * @class Order
     * @extends Stream
     * @since 0.1.0
     */
    var Order = (function (_super) {
        __extends(Order, _super);
        /**
         * @constructor
         * @param {Promise[]} promises
         */
        function Order(promises) {
            var _this = this;
            _super.call(this);
            // initialize.
            var response = [];
            this.initialize = function () {
                var l = promises.length;
                var s = new Mist.Stream();
                var t = [];
                for (var i = l; i-- > 0;)
                    t[i] = s.listen();
                for (var i = l; i-- > 1;) {
                    var resolver = function (i, r) {
                        response.push(r);
                        t[i - 1].pause();
                        t[i].resume();
                        return response;
                    };
                    t[i - 1].pause();
                    t[i - 1].then(resolver.bind(resolver, i));
                }
                // end.
                t[l - 1].pause();
                t[l - 1].then(function (r) {
                    response.push(r);
                    t[l - 1].pause();
                    t[0].resume();
                    // [] response.
                    _this.add(response);
                    // initialize.
                    response = [];
                });
                // lazy response.
                promises.map(function (promise, i) {
                    promise.then(function (r) {
                        // a response.
                        s.add(r);
                    });
                });
                // begin.
                t[0].resume();
            };
        }
        return Order;
    })(Mist.Stream);
    Mist.Order = Order;
})(Mist || (Mist = {}));
/// <reference path='../promise.ts'/>
/// <reference path='../stream.ts'/>
var Mist;
(function (Mist) {
    /**
     * @class Race
     * @extends Stream
     * @since 0.1.0
     */
    var Race = (function (_super) {
        __extends(Race, _super);
        /**
         * @constructor
         * @param {Promise[]} promises
         */
        function Race(promises) {
            var _this = this;
            _super.call(this);
            // initialize.
            var response = [];
            this.initialize = function () {
                var l = promises.length;
                // lazy response.
                promises.map(function (promise, i) {
                    promise.then(function (r) {
                        response[i] = r;
                        if (response.length == 1)
                            _this.add(r);
                        if (response.length == l) {
                            // initialize.
                            response = [];
                        }
                    });
                });
            };
        }
        return Race;
    })(Mist.Stream);
    Mist.Race = Race;
})(Mist || (Mist = {}));
/// <reference path='promise/value.ts'/>
/// <reference path='element.ts'/>
var Mist;
(function (Mist) {
    /**
     * @class Matrix
     * @description matrix composer.
     * @since 0.1.0
     */
    var Matrix = (function () {
        /**
         * @constructor
         * @param {HTMLElement} element
         */
        function Matrix(element) {
            this.value = new Mist.Value((function () {
                var c = getComputedStyle(element);
                // [a,b,c,d,x,y] response.
                var response = (c.transform ||
                    c.mozTransform ||
                    c.webkitTransform).match(/matrix\((.*?)\)/);
                // [a,b,c,d,x,y] response.
                return response ? response[1].split(/\s?,\s?/).map(parseFloat) : [1, 0, 0, 1, 0, 0];
            })());
            this.value.then(function (matrix) {
                var c = getComputedStyle(element);
                // [a,b,c,d,x,y] response.
                var response = (c.transform ||
                    c.mozTransform ||
                    c.webkitTransform);
                response = [
                    response.replace(/(matrix\(.*?\)|none)/, ''), [
                        'matrix(', matrix
                            .join(), ')'
                    ].join('')
                ].join(' ');
                // a response.
                element.style.transform = response;
                element.style.mozTransform = response;
                element.style.webkitTransform = response;
            });
        }
        /**
         * @description [a,b,c,d,x,y]
         * @param {number[]} matrix
         */
        Matrix.prototype.add = function (matrix) {
            this.value.compose(function (o) {
                return [
                    o[0] + (matrix[0] || 0),
                    o[1] + (matrix[1] || 0),
                    o[2] + (matrix[2] || 0),
                    o[3] + (matrix[3] || 0),
                    o[4] + (matrix[4] || 0),
                    o[5] + (matrix[5] || 0)
                ];
            });
        };
        /**
         * @description [a,b,c,d,x,y]
         * @return {number[]}
         */
        Matrix.prototype.get = function () {
            return this.value.composite;
        };
        /**
         * @description [a,b,c,d,x,y]
         * @param {number[]} matrix
         */
        Matrix.prototype.set = function (matrix) {
            this.value.compose(function (o) {
                return [
                    Matrix.assert(matrix[0], o[0]),
                    Matrix.assert(matrix[1], o[1]),
                    Matrix.assert(matrix[2], o[2]),
                    Matrix.assert(matrix[3], o[3]),
                    Matrix.assert(matrix[4], o[4]),
                    Matrix.assert(matrix[5], o[5])
                ];
            });
        };
        /**
         * @access private
         * @static
         */
        Matrix.assert = function (master, slave) {
            return null != master ? master : slave;
        };
        return Matrix;
    })();
    Mist.Matrix = Matrix;
})(Mist || (Mist = {}));
/// <reference path='promise/listener.ts' />
/// <reference path='statement/cssclass.ts' />
/// <reference path='statement/cssstyle.ts' />
/// <reference path='stream/all.ts' />
/// <reference path='stream/emitter.ts' />
/// <reference path='stream/order.ts' />
/// <reference path='stream/race.ts' />
/// <reference path='component.ts' />
/// <reference path='matrix.ts' />
var Mist;
(function (Mist) {
    /**
     * @class Statement
     * @description mist statement.
     * @since 0.1.0
     */
    var Statement = (function () {
        /**
         * @constructor
         * @param {string} selector
         */
        function Statement(selector) {
            this.selector = selector;
            this.cssc = new Mist.CSSClass(this);
            this.csss = new Mist.CSSStyle(this);
        }
        /**
         * @param {string[]} names
         * @return {Listener}
         */
        Statement.prototype.all = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return new Mist.All(this.listen(names)).listen();
        };
        /**
         * @param {} listener
         */
        Statement.prototype.each = function (listener) {
            [].forEach.call(this.query(), listener);
        };
        /**
         * @param {string} name
         * @param {} detail
         */
        Statement.prototype.emit = function (name, detail) {
            var e = Mist.Emitter.customize(name, { detail: detail || {} });
            this.each(function (element) {
                element.dispatchEvent(e);
            });
        };
        /**
         * @param {string} name
         * @return {Listener}
         */
        Statement.prototype.on = function (name) {
            return Mist.Component.create(Mist.Emitter, name, this.selector).listen();
        };
        /**
         * @param {string[]} names
         * @return {Listener}
         */
        Statement.prototype.order = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return new Mist.Order(this.listen(names)).listen();
        };
        /**
         * @param {string[]} names
         * @return {Listener}
         */
        Statement.prototype.race = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i - 0] = arguments[_i];
            }
            return new Mist.Race(this.listen(names)).listen();
        };
        /**
        * @param {number} deg
        */
        Statement.prototype.rotate = function (deg) {
            var m = [
                Math.cos(deg),
                Math.sin(deg),
                Math.sin(deg) / -1,
                Math.cos(deg),
                null,
                null
            ];
            this.each(function (element) {
                Mist.Component.create(Mist.Matrix, element).add(m);
            });
        };
        /**
         * @param {} comparer
         * @return {boolean}
         */
        Statement.prototype.some = function (comparer) {
            return [].some.call(this.query(), comparer);
        };
        /**
         * @param {number} x
         * @param {number} y
         */
        Statement.prototype.translate = function (x, y) {
            var m = [
                null,
                null,
                null,
                null,
                x,
                y
            ];
            this.each(function (element) {
                Mist.Component.create(Mist.Matrix, element).add(m);
            });
        };
        /**
         * @access private
         */
        Statement.prototype.listen = function (names) {
            var _this = this;
            return names.map(function (name) { return _this.on(name); });
        };
        /**
         * @access private
         */
        Statement.prototype.query = function () {
            return document.querySelectorAll(this.selector);
        };
        return Statement;
    })();
    Mist.Statement = Statement;
})(Mist || (Mist = {}));
/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />
/*!
 * @copyright 2015 AI428
 * @description for multi gestures
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.1.0
 */
/**
 * @param {string} selector
 * @return {Statement}
 */
function mist(selector) {
    return Mist.Component.create(Mist.Statement, selector);
}
