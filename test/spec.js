'use strict';

document.addEventListener('DOMContentLoaded', function() {

    var statement = mist('body');

    var size = statement.elements().length;

    var f = document.querySelector('footer');
    var h = document.querySelector('header');

    describe('Mist.Statement', function() {

        it('a', function() {

            expect(statement.a()).toBe(document.body);
        });

        it('any', function() {

            var q = '> header,> footer';

            expect(statement.any(q).a()).toBe(h);
        });

        it('elements', function() {

            expect(statement.elements().length).toBe(1);
            expect(statement.elements().pop()).toBe(document.body);
        });

        it('last', function() {

            var q = '> header,> footer';

            expect(statement.any(q).last()).toBe(f);
        });

        it('not', function() {

            var q = '> *';

            expect(statement.any(q).not('header').last()).toBe(f);
        });

        it('th', function() {

            var q = '> *';

            expect(statement.any(q).th(1, size).pop().a()).toBe(h);
        });
    });

    describe('Mist.Style', function() {

        var m = {

            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
        };

        it('add', function(done) {

            statement.style.add({}, m).then(function() {

                var css = getComputedStyle(statement.a());

                expect(css.backfaceVisibility).toEqual('hidden');

                done();
            });
        });

        it('get', function() {

            expect(statement.style.get()).toEqual(m);
        });

        it('pulse', function(done) {

            var d = 1000 / 60;
            var n = 0;

            var t = Date.now() + d;

            statement.style.pulse(d).add({

                opacity: function() {

                    return ++n;
                }

            }).when(function(s) {

                s.pulse(d).dur = 0; // stopped

                if (n > 1) {

                    expect(Date.now()).toBeGreaterThan(t);

                    var css = getComputedStyle(statement.a());

                    expect(css.opacity).toEqual('1');

                    done(); // lazy
                }
            });
        });

        it('set', function(done) {

            statement.style.set({}, {}).then(function() {

                var s = getComputedStyle(statement.a());

                expect(s.backfaceVisibility).toEqual('visible');

                done(); // lazy
            });
        });

        it('time', function(done) {

            var d = 1000 / 60;

            var t = Date.now() + d;

            statement.style.time(d).add(m).when(function() {

                expect(Date.now()).toBeGreaterThan(t);

                var css = getComputedStyle(statement.a());

                expect(css.backfaceVisibility).toEqual('hidden');

                done(); // lazy
            });
        });
    });
});
