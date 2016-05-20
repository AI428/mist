# MIST

> _Modular CSS in JS_

Mist is a modular CSS library that uses JavaScript.

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

### _If you want to define a more interactive modular CSS_

If you want to define a more interactive modular CSS, pass the `Function` and `Mist.Promise` to the value of CSS. `Function` is evaluated just to pass. `Mist.Promise` is evaluated each time the callback function is called.

```javascript
var redden = {

  // When clicked, to red the background

  background: statement.on('click').then(

    function() {

      return 'red';
    }
  )
};

statement.style.set(redden);
```

### _If you want timing control_

Validation, etc., if you want to apply for a few seconds CSS, you need timing control.

```javascript
var redden = {

  background: 'red'
};

// Only 3 seconds if you want to red background

statement.style.set(redden).then(

  function() {

    statement.style.time(3000).set({});
});
```

It can also be unflag.

```javascript
// At 3 seconds intervals

statement.style.pulse(3000).set(redden).when(

  function() {

    statement.style.time(1500).set({});
});
```

## SELECT WHAT YOU WANT TO STYLE

### _any_

This like a `:matches` of CSS Selectors Level 4.

```javascript
var statement = mist('a, b').any('.a, .b');
var statement = mist('a.a, a.b, b.a, b.b'); // same as
```

### _not_

This like a `:not` of CSS Selectors Level 4.

```javascript
var statement = mist('a, b').not('.a, .b');
var statement = mist('a:not(.a), a:not(.b), b:not(.a), b:not(.b)'); // same as
```

### _th_

If you select multiple times `:nth-of-type`, to use.

```javascript
var statements = mist('a').th(1, 2); // pass start, end number
var statements = [ mist('a:nth-of-type(1)'), mist('a:nth-of-type(2)') ]; // same as
```

## USING THE EVENT

### _on_

If you define a more interactive modular CSS using the event, to use.

```javascript
var promise = mist('a').on('click');

promise.then(

  function(event) {

    // your process.
  }
);
```

## LICENSE

This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
