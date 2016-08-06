(function() {

    var d = document.createElement('div');

    d.setAttribute('style', 'left: 1em; position: absolute; top: 1em;');

    var a = document.createElement('a');

    a.setAttribute('alt', 'MIST');
    a.setAttribute('href', '//github.com/AI428/mist');
    a.setAttribute('title', 'MIST, Motion Design in Modular CSS');

    var i = document.createElement('img');

    i.setAttribute('src', '//rawgit.com/AI428/mist/master/doc/img/icon.png');
    i.setAttribute('style', 'height: 2em; width: 2em;');

    a.appendChild(i);
    d.appendChild(a);

    document.body.appendChild(d);
})();
