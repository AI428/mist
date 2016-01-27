![MIST](https://github.com/AI428/mist.js/blob/master/logos/mist_1600_1180.png)

_JavaScript statement, for scoped style in JS._

```js
var screen = mist('body');

mist('selector').style.add({
  // as string.
  position: 'absolute',
  // as string.
  transform: 'translate(-50%,-50%)',
  // as dynamic string.
  left: screen.on('tap').then(
    function(e) { return `${ e.clientX }px`; }),
  // as dynamic string.
  top: screen.on('tap').then(
    function(e) { return `${ e.clientY }px`; })
});
```

When you click on the body, 'selector' elements are moved to the pointer.

# USAGE
## SCOPE

```js
var element = document.getElementById('id');

// Element or selector.
var statement = mist(element);
var statement = mist('selector');
```

If you later add a selector then

### CONCAT

```js
// Same as the next code.
var statement = mist('div, main').concat('::after');
var statement = mist('div::after, main::after');
```

If you want to narrow the scope then

### EACH

```js
var statement = mist('selector');

statement.each(
  function(element) {
    var child_statement = mist(element);
    // your code.
  });
```

## STYLE
### SET

```js
var statement = mist('selector');

var css_of_statement = {
  // as string.
  border: '1px solid red',
  // as number.
  opacity: 0.5
};

statement.style.set(css_of_statement);
```

### ADD
This can take a argument as [Promise](#promise).

```js
var statement = mist('selector');

var css_of_statement = {
  // as string.
  border: '1px solid blue',
  // as dynamic string.
  color: statement.on('click').then(
    function() { return `hsl(${ Math.random() * 360 },50%,50%)`; })
};

statement.style.add(css_of_statement);
```

It's supported [Duration](#duration).

## CLASS
### ADD

```js
var statement = mist('selector');

var names_of_class = [

  'class_name'
];

statement.class.add(names_of_class);
```

And one more thing

### REMOVE

```js
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

statement.on('tap').then(
  function(e) {
    // your code.
  });
```

It's supported [Recognizer](#recognizer)

## OPTION
### DURATION

```js
var frames_of_duration = 30;

statement.style.add(css, frames_of_duration);
```

If you pass the frames of duration, It will be removed after  [requestAnimationFrame](//developer.mozilla.org/docs/Web/API/Window/requestAnimationFrame) has been called past times. And to continue after

```js
statement.style.add(css, frames_of_duration).then(
  function() {
    // your code.
  });
```

It will be sort of.

## RECOGNIZER
For support touch gestures.

```js
var statement = mist('selector');

statement.on('pandown').then(
  function(e) {
    e.clientX;
    e.clientY;
    e.pageX;
    e.pageY;
    e.screenX;
    e.screenY;
    e.src;
    e.target;
    e.tpms; // trans per milliseconds.
    e.transTime;
    e.transV;
    e.transX;
    e.transY;
  });
```

All response this properties.

### PAN
Emit when the pointer is moved.
- pandown
- panend
- panleave
- panleft
- panmove
- panright
- panstart
- panup

### SWIPE
Emit when the pointer is moving fast.
- swipe
- swipedown
- swipeleft
- swiperight
- swipeup

### TAP
Emit when the pointer is doing a touch or click.
- tap

# API
## PROMISE
Like a [Promise/A+](//developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise). It has been some extension.

### RESUME

```js
var responsor = new Mist.Promise(
  function(succeed, erred) {
    function clock() {
      succeed(new Date());
      setTimeout(clock, 100);
    }

    // lazy response.
    clock();
  });
```

At this time

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
