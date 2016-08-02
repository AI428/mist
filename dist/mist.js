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
            var s = this;
            while (s) {
                if (s.matches(selector))
                    break;
                s = s.parentElement;
            }
            return s;
        };
})();
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
                        response.when(this.err);
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
                        response.when(this.success);
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
    var Style = (function () {
        function Style(statement) {
            this.statement = statement;
            this.value = {};
        }
        Style.prototype.clear = function () {
            this.value = {};
            this.apply();
        };
        Style.prototype.clearAll = function () {
            this.statement.elements().map(function (element) {
                Mist.Component.create(Mist.Statement, element).style.clear();
            });
        };
        Style.prototype.set = function () {
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            var o = this.value;
            var response = assign(css);
            for (var name_1 in response) {
                var p = response[name_1];
                if (p instanceof Function) {
                    o[name_1] = p(o);
                }
                else {
                    o[name_1] = p;
                }
            }
            this.apply();
        };
        Style.prototype.setAll = function () {
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            var response = assign(css);
            this.statement.elements().map(function (element, i, all) {
                var o = {};
                for (var name_2 in response) {
                    var p = response[name_2];
                    if (p instanceof Function) {
                        o[name_2] = p(element, i, all);
                    }
                    else {
                        o[name_2] = p;
                    }
                }
                Mist.Component.create(Mist.Statement, element).style.set(o);
            });
        };
        Style.prototype.apply = function () {
            var o = this.value;
            var response = [];
            for (var name_3 in o) {
                response.push(hycase(name_3) + ':' + o[name_3]);
            }
            this.create().innerHTML = this.statement.selector()
                + '{'
                + response.join(';')
                + '}';
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
        for (var _i = 0, o_1 = o; _i < o_1.length; _i++) {
            var s = o_1[_i];
            for (var name_4 in s) {
                response[name_4] = s[name_4];
            }
        }
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
    var Story = (function () {
        function Story(statement) {
            this.statement = statement;
            this.conns = {};
        }
        Story.prototype.connect = function (s, e) {
            this.conns[s] || (this.conns[s] = {});
            this.conns[s][e] = e;
        };
        Story.prototype.move = function (name) {
            var response = false;
            var s = this;
            var conns = s.conns[s.pos] || {};
            if (conns[name]) {
                s.pos = name;
                response = true;
            }
            return response;
        };
        Story.prototype.start = function (name) {
            this.pos = name;
        };
        return Story;
    }());
    Mist.Story = Story;
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        var Voker = (function () {
            function Voker(component$) {
                this.component$ = component$;
                var s = this;
                for (var name_5 in component$) {
                    if (component$[name_5] instanceof Function) {
                        s[name_5] = s.composer$.bind(s, name_5);
                    }
                    else {
                        Object.defineProperty(s, name_5, {
                            get: s.accessor$.bind(s, name_5)
                        });
                    }
                }
            }
            Voker.prototype.accessor$ = function (name) {
                return this.component$[name];
            };
            Voker.prototype.composer$ = function (name) {
                var o = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    o[_i - 1] = arguments[_i];
                }
                var c = this.component$;
                var m = this.component$[name];
                return m.apply(c, o);
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
        var Story = (function (_super) {
            __extends(Story, _super);
            function Story(statement, name$) {
                _super.call(this, statement);
                this.name$ = name$;
                this.story$ = Mist.Component.create(Mist.Story, statement);
            }
            Story.prototype.move = function (succeed) {
                var s = this.story$;
                var n = this.name$;
                var response = s.move(n);
                if (response)
                    succeed();
                return response;
            };
            Story.prototype.next = function (story) {
                var s = this.story$;
                var n = this.name$;
                s.connect(n, story.name$);
                return story;
            };
            Story.prototype.prev = function (story) {
                return story.next(this);
            };
            Story.prototype.start = function () {
                var s = this.story$;
                var n = this.name$;
                s.start(n);
            };
            return Story;
        }(Wrapper.Voker));
        Wrapper.Story = Story;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(component, dur$) {
                if (dur$ === void 0) { dur$ = 0; }
                _super.call(this, component);
                this.dur$ = dur$;
                this.id$ = 0;
            }
            Timer.prototype.composer$ = function (name) {
                var o = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    o[_i - 1] = arguments[_i];
                }
                var s = this;
                return new Wrapper.Defer(s.component$, new Mist.Promise(function (succeed, erred) {
                    var c = s.component$;
                    var m = s.component$[name];
                    function responsor() {
                        try {
                            succeed(m.apply(c, o));
                        }
                        catch (e) {
                            erred(e);
                        }
                    }
                    clearTimeout(s.id$);
                    s.id$ = setTimeout(responsor, s.dur$);
                }));
            };
            return Timer;
        }(Wrapper.Voker));
        Wrapper.Timer = Timer;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
var Mist;
(function (Mist) {
    var Statement = (function () {
        function Statement(statement) {
            this.statement = statement;
            this.emitter = new Mist.Emitter(this);
            this.style = new Mist.Style(this);
        }
        Statement.prototype.any = function (selector) {
            return Mist.Component.create(Statement, this.selector().split(',').map(function (s) {
                return selector.split(',').map(function (term) {
                    return s.trim()
                        + term.trim();
                }).join();
            }).join());
        };
        Statement.prototype.clear = function () {
            var s = this.style;
            var m = this.style.clear;
            m.apply(s);
            return this;
        };
        Statement.prototype.clearAll = function () {
            var s = this.style;
            var m = this.style.clearAll;
            m.apply(s);
            return this;
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
        Statement.prototype.set = function () {
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            var s = this.style;
            var m = this.style.set;
            m.apply(s, css);
            return this;
        };
        Statement.prototype.setAll = function () {
            var css = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                css[_i - 0] = arguments[_i];
            }
            var s = this.style;
            var m = this.style.setAll;
            m.apply(s, css);
            return this;
        };
        Statement.prototype.story = function (name) {
            return Mist.Component.create(Mist.Wrapper.Story, this, name);
        };
        Statement.prototype.time = function (dur) {
            return Mist.Component.create(Mist.Wrapper.Timer, this, dur);
        };
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
/*!
 * @copyright AI428
 * @description Motion Design in Modular CSS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.8.1
 */
function mist(statement) {
    return Mist.Component.create(Mist.Statement, statement);
}
var Mist;
(function (Mist) {
    var Wrapper;
    (function (Wrapper) {
        var Defer = (function (_super) {
            __extends(Defer, _super);
            function Defer(component, commit$) {
                _super.call(this, component);
                this.commit$ = commit$;
            }
            Defer.prototype.catch = function (err) {
                return new Defer(this.component$, this.commit$.catch(err));
            };
            Defer.prototype.composer$ = function (name) {
                var o = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    o[_i - 1] = arguments[_i];
                }
                var s = this;
                return new Defer(s.component$, s.commit$.when(function (response) {
                    var r;
                    if (response instanceof Wrapper.Voker) {
                        r = response[name].apply(response, o);
                    }
                    else {
                        r = s.component$[name].apply(s.component$, o);
                    }
                    if (r instanceof Defer) {
                        return r.commit$;
                    }
                    return r;
                }));
            };
            return Defer;
        }(Wrapper.Voker));
        Wrapper.Defer = Defer;
    })(Wrapper = Mist.Wrapper || (Mist.Wrapper = {}));
})(Mist || (Mist = {}));
