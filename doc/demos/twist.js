(function(d) {

    var dur = 1000; // milliseconds

    var scale = {
        transform: 'scale(2)',
        transition: `${dur}ms ease`
    };

    var rotate = {
        transform: (now) => `${now.transform} rotateZ(45deg)`
    };

    var statement = mist('#twist');

    statement.on('click').when(() => {

        statement
            .set(scale).time(dur)
            .set(rotate).time(dur)
            .clear();
    });

})(document);
