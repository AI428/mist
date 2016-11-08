(function(d) {

    var dur = 1000; // milliseconds

    var scale = {
        transform: 'scale(2)',
        transition: `${dur}ms ease`
    };

    var rotate = {
        transform: (now) => `${now.transform} rotateZ(45deg)`
    };

    var statement = mist('#play');

    var emission = statement.on('click');

    var pause = () => (statement.pause(),
        emission.when(resume));
    var prev = () => (statement.clear(),
        emission.when(play));
    var play = () => (statement.set(scale).time(dur).set(rotate).time(dur).call(prev),
        emission.when(pause));
    var resume = () => (statement.resume(),
        emission.when(pause));

    prev();

})(document);
