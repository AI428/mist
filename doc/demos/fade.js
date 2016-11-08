(function(d) {

    var dur = 1000; // milliseconds

    var ease = {
        transition: (element, i, all) => `${dur}ms ease ${dur * i / all.length}ms`
    };

    var vivid = {
        background: () => `hsl(${Math.random() * 360}, 66%, 66%)`
    };

    var statement = mist('#fade > *');

    statement.on('click').when(() => {

        statement
            .setAll(ease, vivid).time(dur).clearAll()
            .setAll(ease).time(dur).clearAll();
    });

})(document);
