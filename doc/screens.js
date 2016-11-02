(function(d) {

    var css = {

        background: function(element, i, all) {

            // vivid
            return 'hsl(' + (360 / all.length) * i + ', 66%, 66%)';
        },

        transform: function(element) {

            var r = [
                // x px
                Math.random(),
                // y px
                Math.random(),
                // z px
                Math.random(),
                // rad
                Math.random() * 2 * Math.PI
            ];

            var p = element.parentElement;

            var t = [
                // x px
                r[0] * p.clientWidth,
                // y px
                r[1] * p.clientHeight,
                // z px
                0
            ];

            return 'translate3d(' +
                t.join('px,') + ') rotate3d(' +
                r.join() + 'rad) scale(' + (
                    r[0] +
                    r[1]
                ) + ')';
        }
    };

    mist('.screens > div').setAll(css);

})(document);
