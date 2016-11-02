(function(d) {

    var scale = {
        transform: 'scale(2)',
        transition: '1s ease'
    };

    var rotate = {
        transform: (now) => `${now.transform} rotateZ(45deg)`
    };

    var statement = mist('#multi');

    statement.on('click').when(() => {

        statement
            .set(scale).time(1000)
            .set(rotate).time(1000)
            .clear();
    });

})(document);
