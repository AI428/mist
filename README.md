# MIST

> _Modular CSS in JS_

Mist is a modular CSS library that uses JavaScript.

## MODULAR CSS

First, a CSS in a primitive object.

```javascript
var center = {
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate3d(-50%, -50%, 0)'
};
```

Next, select what you want to style in the CSS selector or `Element`. This is on the MIST referred to as the `statement`. After only pass the primitive objects.

```javascript
var statement = mist('div'); statement.style.set(center);
```

This can be pass more than one object, if you want to overwrite only specific properties, is as follows.

```javascript
statement.style.set(center, {
  position: 'relative'
});
```

### _Interactive_

In order to define a more interactive modular CSS, the value of the CSS is in addition to the string, pass the `Function` and `Mist.Promise`. `Function` is evaluated just to pass. `Mist.Promise` is evaluated each time the callback function is called. When clicked, to red the background to the following manner.

```javascript
var redden = {
  background: statement.on('click').then(
    function() {
      return 'red';
    }
  )
};

statement.style.set(redden);
```

### _Timing_

Validation, etc., if you want to apply for a few seconds CSS, you need timing control. Only three seconds if you want to red background, is as follows.

```javascript
var redden = {
  background: 'red'
};

statement.style.set(redden).then(function() {
  statement.style.time(3000).set({});
});
```

It can also be unflag at regular intervals.

```javascript
var redden = {
  background: 'red'
};

statement.style.pulse(3000).set(redden).when(function() {
  statement.style.time(1500).set({});
});
```

## SELECT

What you want to style.

### _any_

This like a `:matches` of CSS Selectors Level 4.

```javascript
var statement = mist('a, b').any('.a, .b');
// same as
var statement = mist('a.a, a.b, b.a, b.b');
```

### _not_

This like a `:not` of CSS Selectors Level 4.

```javascript
var statement = mist('a, b').not('.a, .b');
// same as
var statement = mist('a:not(.a), a:not(.b), b:not(.a), b:not(.b)');
```

### _th_

If you select multiple times `:nth-of-type`, to use.

```javascript
// pass start, end number
var statements = mist('a').th(1, 2);
// same as
var statements = [
  mist('a:nth-of-type(1)'),
  mist('a:nth-of-type(2)')
];
```

## EVENT

### _on_

This like a `Element.addEventListener()`. If you define a more interactive modular CSS using the event, to use.

```javascript
var promise = mist('a').on('click');

promise.then(
  function(event) {
    // your process.
  }
);
```

## API

### _Mist.Promise_

This like a Promise / A+.

- #### _resume()_

- #### _when(success: (response: any) => any, err?: (response: any) => any) : Mist.Promise_

### _Mist.Style_

This can be accessed in the `mist().style`.

- #### _add(...css: Object) : Mist.Promise_

- #### _get() : Object_

- #### _pulse(dur: number) : Mist.Style_

- #### _set(...css: Object) : Mist.Promise_

- #### _time(dur: number) : Mist.Style_

## LICENSE

This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
