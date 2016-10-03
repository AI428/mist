'use strict';

document.addEventListener('DOMContentLoaded',

    function() {

        var h = document.querySelector('header');

        describe('Mist.Statement',

            function() {

                it('Selector',

                    function() {

                        var statement = mist('body');

                        expect(statement.any('> footer,> header').selector())
                            .toEqual('body> footer,body> header');

                        expect(statement.not('> footer,> header').selector())
                            .toEqual('body:not(> footer),body:not(> header)');
                    });

                it('Using Modular CSS',

                    function() {

                        var statement = mist('header');

                        statement.set({
                            background: 'red'
                        }, {
                            color: function() {
                                return 'blue';
                            }
                        });

                        var computed;

                        computed = getComputedStyle(h);

                        expect(computed.backgroundColor)
                            .toBe('rgb(255, 0, 0)');

                        expect(computed.color)
                            .toBe('rgb(0, 0, 255)');

                        statement.clear();

                        computed = getComputedStyle(h);

                        expect(computed.backgroundColor)
                            .toBe('rgba(0, 0, 0, 0)');
                        expect(computed.color)
                            .toBe('rgb(0, 0, 0)');

                        var statement = mist('body> *');

                        statement.setAll({
                            background: 'red'
                        }, {
                            color: function(element, i, all) {

                                expect(element)
                                    .toEqual(jasmine.any(Element));
                                expect(i)
                                    .toEqual(jasmine.any(Number));
                                expect(all)
                                    .toEqual(jasmine.any(Array));

                                return 'blue';
                            }
                        });

                        computed = getComputedStyle(h);

                        expect(computed.backgroundColor)
                            .toBe('rgb(255, 0, 0)');
                        expect(computed.color)
                            .toBe('rgb(0, 0, 255)');

                        statement.clearAll();

                        computed = getComputedStyle(h);

                        expect(computed.backgroundColor)
                            .toBe('rgba(0, 0, 0, 0)');
                        expect(computed.color)
                            .toBe('rgb(0, 0, 0)');
                    });

                it('Timing Control',

                    function(done) {

                        var dur = 100;

                        var statement = mist('header');

                        statement.set({
                            background: 'red'
                        }).time(dur).clear();

                        setTimeout(

                            function() {

                                var computed = getComputedStyle(h);

                                expect(computed.backgroundColor)
                                    .toBe('rgba(0, 0, 0, 0)');
                                expect(computed.color)
                                    .toBe('rgb(0, 0, 0)');

                                done();
                            }, dur);
                    });
            });
    });
