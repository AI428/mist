![MIST](https://github.com/AI428/mist.js/blob/master/logos/mist_1600_1180.png)

_JavaScript statement, for scoped style in JS._

```js
var screen = mist('body');

mist('selector').style.add({

  position: 'absolute',
  transform: 'translate(-50%,-50%)',
  left: screen.on('click').then(
    function(event) { return `${ event.clientX }px`; }),
  top: screen.on('click').then(
    function(event) { return `${ event.clientY }px`; })
});
```

When you click on the body, 'selector' elements are moved to the click point.

# USAGE
## SCOPE

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

This is same mean the 'div::after, main::after'.

## STYLE
### SET

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

### ADD

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

This can take a argument [Promise](#promise). It's supported [Duration](#duration).

## CLASS
### ADD
### REMOVE

```js
var statement = mist('selector');

var names_of_class = [
  'class_name'
];

statement.class.add(names_of_class);
statement.class.remove(names_of_class);
```

It's supported [Duration](#duration).

### TOGGLE

```js
var statement = mist('selector');

var names_of_class = [
  'class_name'
];

statement.class.toggle(names_of_class);
```

## EVENT
### ON

```js
var statement = mist('selector');

var name_of_event = 'click';

statement.on(name_of_event).then(
  function(e) {
    // your code.
  });
```

## OPTION
### DURATION

```js
var frames_of_duration = 30;

statement.style.add(css, frames_of_duration);
```

If you pass the frames of duration, It will be removed after  [requestAnimationFrame](//developer.mozilla.org/docs/Web/API/Window/requestAnimationFrame) has been called past times. And to continue after,

```js
statement.style.add(css, frames_of_duration).then(
  function() {
    // your code.
  });
```

It will be sort of.

# API
## PROMISE
This is like a [Promise/A+](//developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise). It has been some extension.

### RESUME

```js
var responsor = new Mist.Promise(

  function(succeed, erred) {

    // lazy example.
    function clock() {

      succeed(new Date());
      setTimeout(clock, 100);
    }

    clock();
  });
```

At this time,

```js
responsor.then(
  function(date) {
    // your code.
    responsor.resume();
  });
```

The callback function will be called only once, But it can be reused in this. Also, it's same as the next code.

### WHEN

```js
responsor.when(
  function(date) {
    // your code.
  });
```

# LICENSE
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
