![mist.svg](https://rawgit.com/AI428/mist/master/doc/img/icon.png)

[![npm version](https://badge.fury.io/js/mist.js.svg)](https://badge.fury.io/js/mist.js)

# MIST

> _Motion Design in Modular CSS_

Mist is a motion design library that uses modular CSS

<br>

## QUICK START

    npm install mist.js --save

<br>

## FEATURES

-   _Using Modular CSS_
-   _Using Style Tag_
-   _State Control_
-   _Timing Control_

TL;DR [demo](//codepen.io/AI428/pen/dXjVKg)

<br>

## SUPPORTED BROWSER

-   _Chrome_
-   _Edge_
-   _Firefox_
-   _IE_
-   _Safari_

<br>

## USAGE

Make modular CSS

```javascript
var vivid = {

  background: function() {

    var h = (Math.random() * 360).toFixed(0);

    // random color
    return `hsl(${h}, 50%, 50%)`;
  }
}
```

Design motion

```javascript
mist('div')

  // set random color, wait 1s
  .set(vivid).time(1000)

  // set random color, wait 1s
  .set(vivid).time(1000)

  // clear style
  .clear();
```

For more information

<br>

### `mist(statement): new`

New instance

| _param_   | _type_                       |
| --------- | ---------------------------- |
| statement | selector `string`, `element` |
| new       | new `mist`                   |

<br>

## API

<br>

### `any(selector): new`

Same as :any selector

| _param_  | _type_     |
| -------- | ---------- |
| selector | `string`   |
| new      | new `mist` |

<br>

### `not(selector): new`

Same as :not selector

| _param_  | _type_     |
| -------- | ---------- |
| selector | `string`   |
| new      | new `mist` |

<br>

### `clear(): self`

Clear modular CSS

<br>

### `clearAll(): self`

Clear modular CSS each elements

<br>

### `on(name): promise`

Listen event emission

| _param_ | _type_                    |
| ------- | ------------------------- |
| name    | `string`                  |
| promise | [see](#using-the-promise) |

<br>

### `set(...css): self`

Set modular CSS

| _param_ | _type_                                              |
| ------- | --------------------------------------------------- |
| css     | `{ "name": string }`, `{ "name": (now) => string }` |

<br>

### `setAll(...css): self`

Set modular CSS each elements

| _param_ | _type_                                                          |
| ------- | --------------------------------------------------------------- |
| css     | `{ "name": string }`, `{ "name": (element, i, all) => string }` |

<br>

### `story(name): story`

Make story

| _param_ | _type_                  |
| ------- | ----------------------- |
| name    | `string`                |
| story   | [see](#using-the-story) |

<br>

### `time(dur): self`

Delay execution

| _param_ | _type_                |
| ------- | --------------------- |
| dur     | milliseconds `number` |

<br>

## USING THE PROMISE

This library's promise like a [Promise / A+](//promisesaplus.com/), it's extended functions

<br>

### `resume()`

The fullfilled or rejected promise back to pending

```javascript
var misty = mist('div');

misty.on('click').then(

  function(e) {

    /** your process */

    misty.on('click').resume();
  });
```

<br>

### `when(success, err?): promise`

If you want to reuse callback function, to use

| _param_ | _type_              |
| ------- | ------------------- |
| success | `(response) => any` |
| err     | `(response) => any` |

```javascript
var misty = mist('div');

misty.on('click').when(

  function(e) {

    /** your process */
  });

// same as

misty.on('click').then(

  function(e) {

    /** your process */

    misty.on('click').resume();
  });
```

<br>

## USING THE STORY

This library's story like a state machine

```javascript
var misty = mist('div');

// rotation story
misty.story('A').next(
  misty.story('B')).next(
    misty.story('A')).start();
```

Every time you click, the process move to a another story

```javascript
mist('*').on('click').when(

  function() {

    // connect to B, A, B, ...
    misty.story('A').move(function() {
      /** your process on A story */ }) ||
    misty.story('B').move(function() {
      /** your process on B story */ });
});
```

<br>

### `move(succeed): be`

Move story

| _param_ | _type_               |
| ------- | -------------------- |
| succeed | `() => void`         |
| be      | success as `boolean` |

<br>

### `next(story): story`

Connect story to next

| _param_ | _type_       |
| ------- | ------------ |
| story   | next `story` |

<br>

### `prev(story): story`

Connect story to prev

| _param_ | _type_       |
| ------- | ------------ |
| story   | prev `story` |

<br>

### `start()`

Start story, it's to be moved

<br>

## LICENSE

[MIT](//opensource.org/licenses/MIT) © AI428
