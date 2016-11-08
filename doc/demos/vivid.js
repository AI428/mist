(function(d) {

    var dur = 1000; // milliseconds

    var vivid = {
        background: () => `hsl(${Math.random() * 360}, 66%, 66%)`
    };

    var statement = mist('#vivid');

    statement.on('click').when(() => {

        statement
            .set(vivid).time(dur)
            .set(vivid).time(dur)
            .clear();
    });

})(document);
