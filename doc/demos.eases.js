(function(d) {

    var color = {
        background: '#006ab6'
    };

    var ease = {
        transition: (element, i, all) => `1s ease ${1000 * i / all.length}ms`
    };

    var statement = mist('#eases>*');

    statement.on('click').when(() => {

        statement
            .setAll(ease, color).time(1000).clearAll()
            .setAll(ease).time(1000).clearAll();
    });

})(document);
