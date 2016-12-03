'use strict';

document.addEventListener('DOMContentLoaded', () => {

    var h = document.querySelector('header');

    function style() {

        return getComputedStyle(h);
    }

    /**
     * @summary for statement
     */
    describe('mist.statement', () => {

        it('Selector', () => {

            var statement = mist('body');

            var q = '>footer,>header';

            expect(statement.any(q).selector()).toEqual('body>footer,body>header');
            expect(statement.not(q).selector()).toEqual('body:not(>footer),body:not(>header)');
        });

        it('Using Modular CSS', () => {

            // a response

            var statement = mist('header');

            statement.set({

                background: 'red'
            }, {
                color: () => 'blue'
            });

            expect(style().color).toBe('rgb(0, 0, 255)');

            statement.clear();

            expect(style().color).toBe('rgb(0, 0, 0)');

            // [] response

            var statement = mist('body>*');

            statement.setAll({

                background: 'red'
            }, {
                color: (e, i, a) => {

                    expect(e).toEqual(jasmine.any(Element));
                    expect(i).toEqual(jasmine.any(Number));
                    expect(a).toEqual(jasmine.any(Array));

                    return 'blue';
                }
            });

            expect(style().color).toBe('rgb(0, 0, 255)');

            statement.clearAll();

            expect(style().color).toBe('rgb(0, 0, 0)');
        });

        it('Timing Control', (done) => {

            var css = {
                background: 'red'
            };

            var dur = 100;
            var statement = mist('header');

            statement.set(css).time(dur).clear();

            setTimeout(() => (expect(style().color).toBe('rgb(0, 0, 0)'), done()), dur);
        });
    });
});
