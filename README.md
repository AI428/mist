# Mist
A JavaScript statement, for scoped style in JS.

```js
mist('CSS Selector').style.add({

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

## Scope
How to scope,

```js
var statement = mist('CSS Selector');
var statement = mist(HTMLElement);
```

If you later add a selector,

```js
var statement = mist('div,main').concat('::after');
```

This is mean the 'div::after,main::after'.

# License
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
