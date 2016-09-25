![mist.svg](https://rawgit.com/AI428/mist/master/doc/img/icon.png)

[![npm version](https://badge.fury.io/js/mist.js.svg)](https://badge.fury.io/js/mist.js)

# MIST

> _Motion Design in Modular CSS_

Mist is a motion design library that uses modular CSS

## Quick start

```
npm install mist.js --save
```

Or [download](//github.com/AI428/mist/releases/latest)

## Features

- _Using Modular CSS_
- _Using Style Tag_
- _Timing Control_

TL;DR [demo](//codepen.io/collection/DNzaQb/)

## Supported browser

- _Chrome_
- _Edge_
- _Firefox_
- _IE_
- _Safari_

## Usage

Make modular CSS

```javascript

var vivid = {

  background: function() {

    var h = (Math.random() * 360).toFixed(0);

    // vivid color
    return `hsl(${h}, 50%, 50%)`;
  }
}
```

Design motion

```javascript

mist('div')

  // set color, wait 1s
  .set(vivid).time(1000)

  // set color, wait 1s
  .set(vivid).time(1000)

  // clear style
  .clear();
```

Repeat this two-step, to build an interaction

### _`mist( statement ): new`_

_param_   | _type_
--------- | ----------------------------
statement | selector `string`, `element`
new       | new `mist`

New instance

## API

- _Selector_

  - [_any_](#any-selector--new)
  - [_not_](#not-selector--new)

- _Using Modular CSS, Style Tag_

  - [_clear_](#clear-self)
  - [_clearAll_](#clearall-self)
  - [_set_](#set-css--self)
  - [_setAll_](#setall-css--self)

- _Timing Control_

  - [_on_](#on-name--promise)
  - [_time_](#time-dur--self)

### _`any( selector ): new`_

_param_  | _type_
-------- | ----------
selector | `string`
new      | new `mist`

Same as :any selector

### _`not( selector ): new`_

_param_  | _type_
-------- | ----------
selector | `string`
new      | new `mist`

Same as :not selector

### _`clear(): self`_

Clear modular CSS

### _`clearAll(): self`_

Clear modular CSS each elements

### _`set( ...css ): self`_

_param_ | _type_
------- | ---------------------------------------------------
css     | `{ "name": string }`, `{ "name": (now) => string }`

Set modular CSS

### _`setAll( ...css ): self`_

_param_ | _type_
------- | ---------------------------------------------------------------
css     | `{ "name": string }`, `{ "name": (element, i, all) => string }`

Set modular CSS each elements

### _`story( name ): story`_

_param_ | _type_
------- | -------------------
name    | `string`
story   | [see](#using-story)

Make story

### _`on( name ): promise`_

_param_ | _type_
------- | ---------------------
name    | `string`
promise | [see](#using-promise)

Listen event emission

### _`time( dur ): self`_

_param_ | _type_
------- | ---------------------
dur     | milliseconds `number`

Delay execution

## Using promise

This library's promise like a [Promise / A+](//promisesaplus.com/), it's extended functions

### _`resume()`_

The fullfilled or rejected promise back to pending

```javascript

var promise = mist('div').on('click');

promise.then(

  function(e) {

    // your process

    promise.resume();
  });
```

### _`when( success, err? ): promise`_

_param_ | _type_
------- | -------------------
success | `(response) => any`
err     | `(response) => any`

If you want to reuse callback function, to use

```javascript

mist('div').on('click').when(

  function(e) {

    // your process
  });
```

## License

[MIT](//opensource.org/licenses/MIT) © AI428
