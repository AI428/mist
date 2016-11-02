(function(d) {

    var vivid = {
        background: () => `hsl(${Math.random() * 360}, 66%, 66%)`
    };

    var statement = mist('#vivid');

    statement.on('click').when(() => {

        statement
            .set(vivid).time(1000)
            .set(vivid).time(1000)
            .clear();
    });

})(document);
