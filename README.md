# Mist
A JavaScript statement, for scoped style in JS.

```js
var statement = mist('some selector');

statement.style.add({

  position: 'absolute',

  left: mist('body').on('click').then(

    function(e) {

      return e.clientX + 'px';
    }),

  top: mist('body').on('click').then(

    function(e) {

      return e.clientY + 'px';
    }),

  transform: 'translate(-50%,-50%)'
});
```
When you click on the body, "some selector" elements are moved to the click point.

# License
This is released under the [MIT License](//opensource.org/licenses/MIT). © AI428
