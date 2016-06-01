var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mist;
(function (Mist) {
    var Component = (function () {
        function Component() {
        }
        Component.create = function (component) {
            var o = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                o[_i - 1] = arguments[_i];
            }
            var m = ser([component]);
            var n = ser(o);
            this.responses[m] || (this.responses[m] = {});
            if (!this.responses[m][n]) {
                this.responses[m][n] = new (component.bind.apply(component, [component].concat([].slice.apply(o))));
            }
            return this.responses[m][n];
        };
        Component.responses = {};
        return Component;
    }());
    Mist.Component = Component;
    var sessions = 0;
    function ser(conv) {
        return JSON.stringify(conv.map(function (v) {
            return v instanceof Object ?
                v.sessions || (v.sessions = sessions++) :
                v;
        }));
    }
})(Mist || (Mist = {}));
(function () {
    var o = Element.prototype;
    o.matches = o.matches
        || o.mozMatchesSelector
        || o.msMatchesSelector
        || o.webkitMatchesSelector;
})();
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
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        var Summary = (function () {
            function Summary(event) {
                this.event = event;
                this.move = { x: 0, y: 0 };
                this.mpms = 0;
                this.passed = 0;
                var response;
                var s = this;
                if (event instanceof MouseEvent) {
                    response = event;
                }
                else if (event instanceof TouchEvent) {
                    response = event.changedTouches[0];
                }
                s.set(response);
            }
            Summary.prototype.diff = function (event) {
                var s = this;
                var response = new Summary(event);
                var passed = event.timeStamp - s.event.timeStamp;
                response.passed = passed;
                var x = response.page.x - s.page.x;
                var y = response.page.y - s.page.y;
                response.move = { x: x, y: y };
                response.mpms = passed ? Math.sqrt(x * x + y * y) / passed : 0;
                return response;
            };
            Summary.prototype.measure = function (element) {
                var r = element.getBoundingClientRect();
                var x = this.client.x - r.left - r.width / 2;
                var y = this.client.y - r.top - r.height / 2;
                return { x: x, y: y };
            };
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
var Mist;
(function (Mist) {
    var Recognizer;
    (function (Recognizer) {
        var Swipe = (function () {
            function Swipe(emitter) {
                this.emitter = emitter;
                this.end();
                this.move();
            }
            Swipe.prototype.end = function () {
                var s = this;
                new Mist.Emission(s.emitter, 'panend').when(function (response) {
                    if (s.txd) {
                        var r = s.prev.diff(response.event);
                        if (Swipe.passed > r.passed) {
                            s.emitter.emit('swipe', r);
                            var x = r.move.x * r.move.x;
                            var y = r.move.y * r.move.y;
                            if (x < y) {
                                if (r.move.y < 0)
                                    s.emitter.emit('swipeup', r);
                                if (r.move.y > 0)
                                    s.emitter.emit('swipedown', r);
                            }
                            else {
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
            Swipe.prototype.move = function () {
                var s = this;
                new Mist.Emission(s.emitter, 'panmove').when(function (response) {
                    if (!s.txd) {
                        if (Swipe.mpms < response.mpms) {
                            s.prev = response;
                            s.txd = true;
                        }
                    }
                });
            };
            Swipe.mpms = 0.8;
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
        var Voker = (function () {
            function Voker(component) {
                this.component = component;
                var s = this;
                var _loop_1 = function(name_1) {
                    if (component[name_1] instanceof Function) {
                        s[name_1] = function () {
                            var o = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                o[_i - 0] = arguments[_i];
                            }
                            return s.compose$(component[name_1].bind(component), o);
                        };
                    }
                };
                for (var name_1 in component) {
                    _loop_1(name_1);
                }
            }
            Voker.prototype.compose$ = function (composer, o) {
                return composer.apply(composer, o);
            };
            return Voker;
        }());
        Wrapper.Voker = Voker;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        var Pulser = (function (_super) {
            __extends(Pulser, _super);
            function Pulser(component, dur) {
                if (dur === void 0) { dur = 0; }
                _super.call(this, component);
                this.dur = dur;
                this.id = 0;
            }
            Pulser.prototype.compose$ = function (composer, o) {
                var s = this;
                clearTimeout(s.id);
                return new Mist.Promise(function (succeed, erred) {
                    (function responsor() {
                        try {
                            succeed(composer.apply(composer, o));
                            !s.dur || (s.id = setTimeout(responsor, s.dur));
                        }
                        catch (e) {
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
var Mist;
(function (Mist) {
    var Promise = (function () {
        function Promise(process) {
            var s = this.succeed;
            var e = this.erred;
            this.resume();
            process(s.bind(this), e.bind(this));
        }
        Promise.all = function (commits) {
            return new Promise(function (succeed, erred) {
                var p;
                var response = [];
                function composer(a) {
                    if (response.push(a) > p) {
                        try {
                            succeed(response);
                        }
                        catch (e) {
                            erred(e);
                        }
                        response = [];
                    }
                }
                commits.map(function (commit, i) {
                    commit.when(composer);
                    p = i;
                });
            });
        };
        Promise.race = function (commits) {
            return new Promise(function (succeed, erred) {
                commits.forEach(function (commit) {
                    commit.when(function (response) {
                        try {
                            succeed(response);
                        }
                        catch (e) {
                            erred(e);
                        }
                    });
                });
            });
        };
        Promise.prototype.catch = function (err) {
            var _this = this;
            return new Promise(function (succeed, erred) {
                _this.err = function (response) {
                    try {
                        succeed(err(response));
                    }
                    catch (e) {
                        erred(e);
                    }
                };
                _this.tx();
            });
        };
        Promise.prototype.resume = function () {
            this.txd = false;
            this.txr = null;
        };
        Promise.prototype.then = function (success, err) {
            var _this = this;
            return new Promise(function (succeed, erred) {
                _this.err = erred;
                _this.success = function (response) {
                    try {
                        succeed(success(response));
                    }
                    catch (e) {
                        err ? succeed(err(e)) : erred(e);
                    }
                };
                _this.tx();
            });
        };
        Promise.prototype.when = function (success, err) {
            var _this = this;
            var s = function (response) {
                var p = success(response);
                _this.resume();
                return p;
            };
            var e = err ? function (response) {
                var p = err(response);
                _this.resume();
                return p;
            } : err;
            return this.then(s, e);
        };
        Promise.prototype.erred = function (response) {
            var _this = this;
            if (!this.txd) {
                if (this.err) {
                    this.txd = true;
                    if (response instanceof Promise) {
                        response.then(this.err);
                    }
                    else {
                        this.err(response);
                    }
                }
                else {
                    this.txr = function () {
                        _this.erred(response);
                    };
                }
            }
            console.log(response);
        };
        Promise.prototype.succeed = function (response) {
            var _this = this;
            if (!this.txd) {
                if (this.success) {
                    this.txd = true;
                    if (response instanceof Promise) {
                        response.then(this.success);
                    }
                    else {
                        this.success(response);
                    }
                }
                else {
                    this.txr = function () {
                        _this.succeed(response);
                    };
                }
            }
        };
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
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(component, dur) {
                if (dur === void 0) { dur = 0; }
                _super.call(this, component);
                this.dur = dur;
                this.id = 0;
            }
            Timer.prototype.compose$ = function (composer, o) {
                var s = this;
                clearTimeout(s.id);
                return new Mist.Promise(function (succeed, erred) {
                    function responsor() {
                        try {
                            succeed(composer.apply(composer, o));
                        }
                        catch (e) {
                            erred(e);
                        }
                    }
                    !s.dur || (s.id = setTimeout(responsor, s.dur));
                });
            };
            return Timer;
        }(Wrapper.Voker));
        Wrapper.Timer = Timer;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Frame = (function () {
        function Frame() {
        }
        Frame.at = function (responsor) {
            this.success.push(responsor);
            this.tx();
        };
        Frame.tx = function () {
            var _this = this;
            this.txd || (function () {
                _this.txd = true;
                var s = _this;
                var txr = [];
                (function composer() {
                    var i = 0;
                    var responsor;
                    while (responsor = txr.shift()) {
                        responsor();
                    }
                    while (responsor = s.success.shift()) {
                        i = txr.push(responsor);
                    }
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
var Mist;
(function (Mist) {
    var Value = (function (_super) {
        __extends(Value, _super);
        function Value(composite) {
            var _this = this;
            _super.call(this, function (succeed, erred) {
                _this.xr = function () {
                    _this.xd || (function () {
                        _this.xd = true;
                        Mist.Frame.at(function () {
                            var responsor;
                            try {
                                succeed(_this.composite);
                            }
                            catch (e) {
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
        Value.prototype.compose = function (composer) {
            var _this = this;
            return new Mist.Promise(function (responsor) {
                Mist.Frame.at(function () {
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
var Mist;
(function (Mist) {
    var Style = (function () {
        function Style(statement) {
            var _this = this;
            this.statement = statement;
            this.value = new Mist.Value({});
            this.value.when(function (o) {
                var response = [];
                for (var name_2 in o) {
                    response.push(hycase(name_2) + ':' + o[name_2]);
                }
                _this.create().innerHTML = statement.selector()
                    + '{'
                    + response.join(';')
                    + '}';
            });
        }
        Style.prototype.add = function () {
            var _this = this;
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            return this.value.compose(function (o) { return _this.compose(assign(css), o); }).then(function () { return _this; });
        };
        Style.prototype.get = function () {
            var response = {};
            var s = this;
            for (var name_3 in s.value.composite) {
                response[name_3] = s.value.composite[name_3];
            }
            return response;
        };
        Style.prototype.pulse = function (dur) {
            return new Mist.Wrapper.Pulser(this, dur);
        };
        Style.prototype.pulsing = function (dur) {
            return Mist.Component.create(Mist.Wrapper.Pulser, this, dur);
        };
        Style.prototype.set = function () {
            var _this = this;
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            return this.value.compose(function () { return _this.compose(assign(css)); }).then(function () { return _this; });
        };
        Style.prototype.time = function (dur) {
            return new Mist.Wrapper.Timer(this, dur);
        };
        Style.prototype.timing = function (dur) {
            return Mist.Component.create(Mist.Wrapper.Timer, this, dur);
        };
        Style.prototype.compose = function (css, response) {
            if (response === void 0) { response = {}; }
            for (var name_4 in css) {
                var p = css[name_4];
                if (p instanceof Mist.Promise) {
                    p.when(this.composer.bind(this, name_4));
                }
                else if (p instanceof Function) {
                    response[name_4] = p();
                }
                else {
                    response[name_4] = p;
                }
            }
            return response;
        };
        Style.prototype.composer = function (name, v) {
            var response = {};
            response[name] = v;
            this.add(response);
        };
        Style.prototype.create = function () {
            if (!this.e) {
                var s = document.createElement('style');
                var t = document.createTextNode('');
                s.appendChild(t);
                document.head.appendChild(s);
                this.e = s;
            }
            return this.e;
        };
        return Style;
    }());
    Mist.Style = Style;
    function assign(o) {
        var response = {};
        o.map(function (a) {
            for (var name_5 in a) {
                response[name_5] = a[name_5];
            }
        });
        return response;
    }
    function hycase(name) {
        return name.replace(/[A-Z]/g, function (m) {
            return '-' + m.toLowerCase();
        });
    }
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Statement = (function () {
        function Statement(statement) {
            this.statement = statement;
            this.emitter = new Mist.Emitter(this);
            this.style = new Mist.Style(this);
            new Mist.Recognizer.Pan(this.emitter);
            new Mist.Recognizer.Swipe(this.emitter);
        }
        Statement.prototype.a = function () {
            var response;
            var s = this.statement;
            if (s instanceof Element) {
                response = s;
            }
            else {
                response = document.querySelector(s);
            }
            return response;
        };
        Statement.prototype.any = function (selector) {
            return Mist.Component.create(Statement, this.selector().split(',').map(function (s) {
                return selector.split(',').map(function (term) {
                    return s.trim()
                        + term.trim();
                }).join();
            }).join());
        };
        Statement.prototype.elements = function () {
            var response;
            var s = this.statement;
            if (s instanceof Element) {
                response = [s];
            }
            else {
                response = [].map.call(document.querySelectorAll(s), function (element) { return element; });
            }
            return response;
        };
        Statement.prototype.last = function () {
            var response;
            var s = this.statement;
            if (s instanceof Element) {
                response = s;
            }
            else {
                response = document.querySelector(s.match(/[^,]*$/).concat('last-child').join(':'));
            }
            return response;
        };
        Statement.prototype.not = function (selector) {
            return this.any(selector.split(',').map(function (s) {
                return ':not('
                    + s.trim()
                    + ')';
            }).join());
        };
        Statement.prototype.on = function (name) {
            return new Mist.Emission(this.emitter, name);
        };
        Statement.prototype.selector = function () {
            var response;
            var s = this.statement;
            if (s instanceof Element) {
                response = ser(s);
            }
            else {
                response = s;
            }
            return response;
        };
        Statement.prototype.th = function (s, e) {
            var response = [];
            for (var n = s; n <= e; n++) {
                response.push(this.any(Statement.nth
                    + '('
                    + n
                    + ')'));
            }
            return response;
        };
        Statement.nth = ':nth-of-type';
        return Statement;
    }());
    Mist.Statement = Statement;
    var sessions = 0;
    function ser(element) {
        return element.id ? '#' + element.id : ((function () {
            var response;
            if (element.hasAttribute('mid')) {
                response = '[mid="'
                    + element.getAttribute('mid')
                    + '"]';
            }
            return response;
        })() ||
            (function () {
                var response = sessions++;
                element.setAttribute('mid', '' + response);
                return '[mid="'
                    + response
                    + '"]';
            })());
    }
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Emitter = (function () {
        function Emitter(statement) {
            this.statement = statement;
            this.emits = {};
            this.obss = {};
        }
        Emitter.customize = function (name, options) {
            if (options === void 0) { options = {}; }
            var e = document.createEvent('CustomEvent');
            e.initCustomEvent(name, options.bubbles || true, options.cancelable || true, options.detail);
            return e;
        };
        Emitter.prototype.add = function (name, listener) {
            this.obss[name] || (this.obss[name] = []);
            this.obss[name].push(listener);
            this.on(name);
        };
        Emitter.prototype.emit = function (name, response) {
            for (var i in this.obss[name]) {
                this.obss[name][i](response);
            }
        };
        Emitter.prototype.remove = function (name, listener) {
            var o = this.obss[name];
            function composer() {
                var i = o.indexOf(listener);
                i < 0 || o.splice(i, 1);
            }
            o && listener ? composer() : o = null;
        };
        Emitter.prototype.on = function (name) {
            var _this = this;
            var o = this.emits;
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
        Emitter.prototype.selector = function () {
            var response;
            var s = this.statement;
            if (s instanceof Mist.Statement) {
                response = s.selector();
            }
            else {
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
    var Emission = (function (_super) {
        __extends(Emission, _super);
        function Emission(emitter, name) {
            _super.call(this, function (succeed, erred) {
                emitter.add(name, function (response) {
                    try {
                        succeed(response);
                    }
                    catch (e) {
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
        var Pan = (function () {
            function Pan(emitter) {
                this.emitter = emitter;
                this.end();
                this.move();
                this.start();
            }
            Pan.prototype.end = function () {
                var s = this;
                function responsor(e) {
                    if (s.txd) {
                        var r = s.prev.diff(e);
                        s.emitter.emit('pan', r);
                        s.emitter.emit('panend', r);
                        s.txd = false;
                    }
                }
                new Mist.Emission(Mist.Component.create(Mist.Emitter, '*'), 'mouseup').when(responsor);
                new Mist.Emission(s.emitter, 'touchend').when(prevent).when(responsor);
            };
            Pan.prototype.move = function () {
                var s = this;
                function responsor(e) {
                    if (s.txd) {
                        var r = s.prev.diff(e);
                        s.emitter.emit('panmove', r);
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
            Pan.prototype.start = function () {
                var s = this;
                function responsor(e) {
                    var r = new Recognizer.Summary(e);
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
        function prevent(e) {
            e.preventDefault();
            return e;
        }
    })(Recognizer = Mist.Recognizer || (Mist.Recognizer = {}));
})(Mist || (Mist = {}));
/*!
 * @copyright AI428
 * @description Modular CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.6.2
 */
function mist(statement) {
    return Mist.Component.create(Mist.Statement, statement);
}
