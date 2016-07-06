'use strict';

document.addEventListener('DOMContentLoaded', function() {

    var statement = mist('body');

    var size = statement.elements().length;

    var f = document.querySelector('footer');
    var h = document.querySelector('header');

    /*
     * @summary Mist.Statemen
     */
    describe('Mist.Statement', function() {

        /*
         * @summary Statement.a()
         */
        it('a', function() {

            expect(statement.a()).toBe(document.body);
        });

        /*
         * @summary Statement.any()
         */
        it('any', function() {

            var q = '> header,> footer';

            expect(statement.any(q).a()).toBe(h);
        });

        /*
         * @summary Statement.elements()
         */
        it('elements', function() {

            expect(statement.elements().length).toBe(1);
            expect(statement.elements().pop()).toBe(document.body);
        });

        /*
         * @summary Statement.last()
         */
        it('last', function() {

            var q = '> header,> footer';

            expect(statement.any(q).last()).toBe(f);
        });

        /*
         * @summary Statement.not()
         */
        it('not', function() {

            var q = '> *';

            expect(statement.any(q).not('header').last()).toBe(f);
        });

        /*
         * @summary Statement.story()
         */
        it('story', function() {

            statement.story('A')
                .next(statement.story('B'))
                .next(statement.story('C'));

            expect(function() {

                statement.story('A').on('click');

            }).toThrowError('Forbidden, story has not started yet');

            expect(function() {

                statement.scene.start('A');

                statement.story('A').on('click');
                statement.story('C').on('click');

            }).toThrowError('Forbidden, "A" > "C" story');

            expect(function() {

                statement.scene.start('A');

                statement.story('A').on('click');
                statement.story('B').on('click');
                statement.story('C').on('click');

                statement.scene.end();

            }).not.toThrow();
        });

        /*
         * @summary Statement.th()
         */
        it('th', function() {

            var q = '> *';

            expect(statement.any(q).th(1, size).pop().a()).toBe(h);
        });
    });

    /*
     * @summary Mist.Style
     */
    describe('Mist.Style', function() {

        var m = {

            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
        };

        /*
         * @summary Style.add()
         */
        it('add', function(done) {

            statement.style.add({}, m).then(function() {

                var css = getComputedStyle(statement.a());

                // is apply

                expect(css.backfaceVisibility).toEqual('hidden');

                // lazy response

                done();
            });
        });

        /*
         * @summary Style.get()
         */
        it('get', function() {

            expect(statement.style.get()).toEqual(m);
        });

        /*
         * @summary Style.pulse()
         */
        it('pulse', function(done) {

            var d = 1000 / 60;
            var n = 0;

            var t = Date.now() + d;

            statement.style.pulse(d).add({

                opacity: function() {

                    return ++n;
                }

            }).when(function(s) {

                s.pulse(d).stop();

                if (n > 0) {

                    expect(Date.now()).toBeGreaterThan(t);

                    var css = getComputedStyle(statement.a());

                    // apply

                    expect(css.opacity).toEqual('1');

                    // lazy response

                    done();
                }
            });
        });

        /*
         * @summary Style.set()
         */
        it('set', function(done) {

            statement.style.set({}, {}).then(function() {

                var s = getComputedStyle(statement.a());

                // apply

                expect(s.backfaceVisibility).toEqual('visible');

                // lazy response

                done();
            });
        });

        /*
         * @summary Style.time()
         */
        it('time', function(done) {

            var d = 1000 / 60;

            var t = Date.now() + d;

            statement.style.time(d).add(m).when(function() {

                expect(Date.now()).toBeGreaterThan(t);

                var css = getComputedStyle(statement.a());

                // apply

                expect(css.backfaceVisibility).toEqual('hidden');

                // lazy response

                done();
            });
        });
    });
});
