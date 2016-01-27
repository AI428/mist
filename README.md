![MIST](https://github.com/AI428/mist.js/blob/master/logos/mist_1600_1180.png)

> _JavaScript statement, for scoped style in JS._

```js
var screen = mist('body');

mist('selector').style.add({

  left: screen.on('tap').then(

    function(response) {

      return `${ response.clientX }px`;
    }),

  position: 'absolute',

  top: screen.on('tap').then(

    function(response) {

      return `${ response.clientY }px`;
    }),

  transform: 'translate(-50%,-50%)',
});
```

When you tap on the body, 'selector' elements are moved to the pointer.

# USAGE
## SCOPED

```js
var element = document.getElementById('id');

// Element or selector.
var statement = mist(element);
var statement = mist('selector');
```

If you want to narrow the scope then

### _EACH_

```js
var statement = mist('selector');

statement.each(
  function(element) {
    var child_statement = mist(element);
    // your code.
  });
```

If you later add a selector then

### _CONCAT_

```js
var statement = mist('div, main').concat('::after');
var statement = mist('div::after, main::after'); // same.
```

## STYLE
### _SET_

```js
var statement = mist('selector');

var css_of_statement = {

  background: '#000',

  opacity: 1 / 2
};

statement.style.set(css_of_statement);
```

### _ADD_
This can take a argument is [Promise](#promise).

```js
var statement = mist('selector');

var css_of_statement = {

  background: '#000',

  color: statement.on('tap').then(

    function(response) {

      return `hsl(${ response.clientX % 360 },50%,50%)`;
    })
};

statement.style.add(css_of_statement);
```

It's supported [Duration](#duration).

## CLASS
Like a [classList](//developer.mozilla.org/docs/Web/API/Element/classList). It's supported multiple.

### _ADD_

```js
var statement = mist('selector');

statement.class.add([

  'class_name'
]);
```

And one more thing

### _REMOVE_

```js
statement.class.remove([

  'class_name'
]);
```

It's supported [Duration](#duration).

### _TOGGLE_

```js
var statement = mist('selector');

statement.class.toggle([

  'class_name'
]);
```

## EVENT
### _ON_

```js
var statement = mist('selector');

statement.on('tap').then(
  function(response) {
    // your code.
  });
```

It's supported [Recognizer](#recognizer)

## OPTION
### _DURATION_

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

statement.on('tap').then(
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

All respond this properties.

### _PAN_
Emit when the pointer is moved.
- pandown
- panend
- panleave
- panleft
- panmove
- panright
- panstart
- panup

### _SWIPE_
Emit when the pointer is moving fast.
- swipe
- swipedown
- swipeleft
- swiperight
- swipeup

### _TAP_
Emit when the pointer is doing a touch or click.
- tap

# API
## PROMISE
Like a [Promise/A+](//developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise). It has been some extension.

### _RESUME_

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

### _WHEN_

```js
responsor.when(
  function(date) {
    // your code.
  });
```

# LICENSE
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
