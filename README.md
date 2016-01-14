# MIST
A JavaScript statement, for scoped style in JS.

```js
var screen = mist('body');

mist('selector').style.add({

  position: 'absolute',
  transform: 'translate(-50%,-50%)',
  left: screen.on('click').then(
    function(event) { return `${ event.clientX }px`; }),
  top: screen.on('click').then(
    function(event) { return `${ event.clientY }px`; }),
});
```

When you click on the body, "selector" elements are moved to the click point.

## HOW TO SCOPE

```js
var element = document.getElementById('id');

// HTMLElement or selector.
var statement = mist(element);
var statement = mist('selector');
```

If you later add a selector,

```js
var statement = mist('div,main').concat('::after');
```

This is same mean the next.

```js
var statement = mist('div::after,main::after');
```

## HOW TO STYLE

```js
var statement = mist('selector');

var css_of_statement = {

  // property as string.
  border: '1px solid red',
  // property as number.
  opacity: 0.5
};

statement.style.set(css_of_statement);
```

set() is one of the way that will be forced css\_of\_statement.

```js
var statement = mist('selector');

var css_of_statement = {

  // property as string.
  border: '1px solid blue',
  // property as dynamic string.
  color: statement.on('click').then(
    function() { return `hsl(${ Math.random() * 360 },50%,50%)`; })
};

statement.style.add(css_of_statement);
```

The other is add(). It can take a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) like argument.

```js
var frames_of_duration = 30;

statement.style.add(css, frames_of_duration);
```

If you pass the frames\_of\_duration, It will be removed after requestAnimationFrame() has been called 30 times.

And to continue after,

```js
statement.style.add(css, frames_of_duration).then(

  function() {
  
    // your code.
  });
```

It will be sort of.

# LICENSE
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
