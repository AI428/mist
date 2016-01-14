# Mist
A JavaScript statement, for scoped style in _JS_.

```js
mist('selector').style.add({

  left: mist('body').on('click').then(

    function(event) {

      return `${ event.clientX }px`;
    }),

  position: 'absolute',

  top: mist('body').on('click').then(

    function(event) {

      return `${ event.clientY }px`;
    }),

  transform: 'translate(-50%,-50%)'
});
```

When you click on the body, "selector" elements are moved to the click point.

## Scope
How to scope,

```js
var statement = mist('selector');
var statement = mist(HTMLElement);
```

If you later add a selector,

```js
var statement = mist('div,main').concat('::after');
```

This is mean the "div::after,main::after".

## Style
How to style, You can take two way.

```js
var statement = mist('selector');
var css = {

  border: '1px solid red',
  opacity: .5
};

statement.style.set(css);
```

One of the _set_ that will be forced.

```js
var statement = mist('selector');
var css = {

  border: '1px solid blue',
  color: statement.on('click').then(

    function() {

      return `hsl(${ Math.random() * 360 },50%,50%)`;
    })
};

statement.style.add(css);
```

The other is _add_. It can take a _Promise_ like argument.

```js
var frames_of_duration = 30;

statement.style.add(css, frames_of_duration);
```

If you pass the _frames_of_duration_, It will be removed after _requestAnimationFrame()_ has been called 30 times. And to continue after,

```js
statement.style.add(css, frames_of_duration).then(
  function() {
    // your code.
  });
```

It will be sort of.

# License
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
