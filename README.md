![mist.svg](https://rawgit.com/AI428/mist/master/doc/img/icon.png)

[![npm version](https://badge.fury.io/js/mist.js.svg)](https://badge.fury.io/js/mist.js)

# MIST

> _Motion Design in Modular CSS_

Mist is a motion design library that uses modular CSS

## Quick start

```
npm install mist.js --save
```

## Features

- _Using Modular CSS_
- _Using Style Tag_
- _State Control_
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

// modular
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

// motion
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

  - [_any_](#any-selector-new)
  - [_not_](#not-selector-new)

- _Using Modular CSS, Style Tag_

  - [_clear_](#clear-self)
  - [_clearAll_](#clearall-self)
  - [_set_](#set-css-self)
  - [_setAll_](#setall-css-self)

- _State Control_

  - [_story_](#story-name-story)

- _Timing Control_

  - [_on_](#on-name-promise)
  - [_time_](#time-dur-self)

### _`any( selector ): new`_

_param_  | _type_
-------- | ----------
selector | `string`
new      | new `mist`

Same as **:any** selector

### _`not( selector ): new`_

_param_  | _type_
-------- | ----------
selector | `string`
new      | new `mist`

Same as **:not** selector

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

    /* your process */

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

    /* your process */
  });
```

## Using story

This library's story like a state machine

```javascript

var misty = mist('div');

// make story

var A = misty.story('A');
var B = misty.story('B');

// connect story

A
  .next(B)
  .next(A).start();
```

Every time you click, the process move to a another story

```javascript

mist('*').on('click').when(

  function() {

    // move to alternate

    A.move(

      function() {

        /* your process */
      }) ||
    B.move(

      function() {

        /* your process */
      });
});
```

Help in double transmission prevention, etc

### _`move( succeed ): be`_

_param_ | _type_
------- | --------------------
succeed | `() => void`
be      | success as `boolean`

Move story

### _`next( story ): story`_

_param_ | _type_
------- | ------------
story   | next `story`

Connect story to next

### _`prev( story ): story`_

_param_ | _type_
------- | ------------
story   | prev `story`

Connect story to prev

### _`start()`_

Start story, it's to be moved

## License

[MIT](//opensource.org/licenses/MIT) © AI428
