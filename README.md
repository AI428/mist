![mist.svg](https://rawgit.com/AI428/mist/master/img/icon.png)

[![npm version](https://badge.fury.io/js/mist.js.svg)](https://badge.fury.io/js/mist.js)

# MIST

> _Modular CSS in JS_

Mist is a modular CSS library that uses JavaScript.

```
npm install mist.js --save
```

## MAKE MODULAR CSS

First, a CSS in a primitive object.

```javascript

var center = {

  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate3d(-50%, -50%, 0)'
};
```

Next, select what you want to style in the CSS selector or `Element`. This is referred to as the `statement`.

```javascript

var statement = mist('div');

// After only pass the objects

statement.style.set(center);
```

This can be pass more than one object, if you want to overwrite only specific properties, is as follows.

```javascript

statement.style.set(center, {

  position: 'relative'
});
```

It's same as follows.

```javascript

statement.style.set(center);
statement.style.add({ position: 'relative' });
```

### _If you want to define a more interactive modular CSS_

If you want to define a more interactive modular CSS, pass the `Function` to the value of CSS. `Function` is evaluated just to pass.

```javascript

var vivid = {

  background: function() {

    var r = Math.random();
    var n = Math.ceil(r * 255);

    return `rgb(${n},${n},${n})`;
  }
};

statement.style.set(vivid);
```

### _If you want timing control_

Validation, etc., if you want to apply for a few seconds CSS, you need timing control.

```javascript

var redden = {

  background: 'red'
};

// Only 3 seconds if you want to red background

statement.style.set(redden).then(

  function(style) {

    style.time(3000).set({});
  }
);
```

It can also be unflag.

```javascript

// At 3 seconds intervals

statement.style.pulse(3000).set(redden).when(

  function(style) {

    style.time(1500).set({});
  }
);
```

If you want to stop the pulser, is as follows.

```javascript

var pulser = statement.style.pulse(3000);

pulser.stop();
```

## SELECT WHAT YOU WANT TO STYLE

### `any`

This like a `:matches` of CSS Selectors Level 4.

```javascript

var statement = mist('a, b').any('.c, .d');
var statement = mist('a.c, a.d, b.c, b.d'); // same as
```

### `not`

This like a `:not` of CSS Selectors Level 4.

```javascript

var statement = mist('a, b').not('.c, .d');
var statement = mist('a:not(.c), a:not(.d), b:not(.c), b:not(.d)'); // same as
```

### `th`

If you select multiple times `:nth-of-type`, to use.

```javascript

var statements = mist('a').th(1, 2); // pass start, end number
var statements = [
  mist('a:nth-of-type(1)'),
  mist('a:nth-of-type(2)')
]; // same as
```

## USING THE EVENT

### `on`

If you define a more interactive modular CSS using the event, to use.

```javascript

var promise = mist('a').on('click');

promise.then(

  function(event) {

    // your process
  }
);
`
```

## USING THE PROMISE

This like a [Promise / A+](//promisesaplus.com/). The results of the css updates and event control handled async. Here, explaining features this library is extended.

### `resume`

The fullfilled or rejected the promise back to pending.

```javascript

var promise = mist('a').on('click');

promise.then(

  function(event) {

    // If you want to reuse the callback function, to use

    promise.resume();
  }
);
```

### `when`

If you want to reuse the callback function, to use.

```javascript

var promise = mist('a').on('click');

promise.when(function(e) { /** your process */ });
promise.then(function(e) { /** your process */ promise.resume() }); // same as
```

## USE THE STORY

Login, prevention double-press of the button, etc., if you want to control in another, to use.

```javascript

// Build scene A > B > C

statement.story('A')
  .next(statement.story('B'))
  .next(statement.story('C'));

statement.story('C')
  .prev(statement.story('B'))
  .prev(statement.story('A')); // same as

// Throw error, because story has not started yet

statement.story('A').style.set({});

// Story A has started

statement.scene.start('A');

// Not throw error, because story has started

statement.story('A').style.set({});
```

If you move to the next story, just call the method or property.

```javascript

// Move to the story B

statement.story('B').style.set({});

// However, do not go back to the story A, throw error

statement.story('A').style.set({});
```

If you end the story, is as follows.

```javascript

statement.scene.end();
```

## LICENSE

This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
