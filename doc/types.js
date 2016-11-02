(function(d) {

    var e = d.getElementById('types');

    e.innerHTML = e.innerText.split('').map((s) => {

        // wrapped response
        return '<span>' + s + '</span>';

    }).join('');

    var g = '#313131';

    mist('#types > span').setAll({

        color: 'transparent'

    }).time(0).setAll({

        background: g,
        color: g,

        transition: (e, i) => {

            var t = 50;
            var s = t * i;

            mist(e).time(s + t).set({

                background: 'none',
                transition: `${t}ms ease`
            })

            return `${t}ms ease ${s}ms`;
        }
    });
})(document);
