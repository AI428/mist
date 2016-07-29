![mist.svg](https://rawgit.com/AI428/mist/master/doc/img/icon.png)

[![npm version](https://badge.fury.io/js/mist.js.svg)](https://badge.fury.io/js/mist.js)

# MIST

> _Motion Design in Modular CSS_

Mist is a motion design library that uses modular CSS

## QUICK START

```
npm install mist.js --save
```

## FEATURES

- _Using Modular CSS_
- _Using Style Tag_
- _State Control_
- _Timing Control_

TL;DR [demo](//github.com/AI428/mist/tree/master/doc)

## SUPPORTED BROWSER

- _Chrome_
- _Edge_
- _Firefox_
- _IE_
- _Safari_

## USAGE

Make modular CSS

```javascript
var vivid = {

  background: function() {

    var h = (Math.random() * 360).toFixed(0);

    return `hsl(${h}, 50%, 50%)`;
  }
}
```

Design motion

```javascript
mist('div')

  .set(vivid).time(1000)
  .set(vivid).time(1000).clear();
```

### `mist(statement): new`

New instance

_param_   | _type_
--------- | ----------------------------
statement | selector `string`, `element`
new       | new `mist`

## API

### `any(selector): new`

Same as :any selector

_param_  | _type_
-------- | ----------
selector | `string`
new      | new `mist`

### `not(selector): new`

Same as :not selector

_param_  | _type_
-------- | ----------
selector | `string`
new      | new `mist`

### `clear(): self`

Clear modular CSS

### `clearAll(): self`

Clear modular CSS each elements

### `on(name): promise`

Listen event emission

_param_ | _type_
------- | -------------------------
name    | `string`
promise | [see](#using-the-promise)

### `set(...css): self`

Set modular CSS

_param_ | _type_
------- | ---------------------------------------------------
css     | `{ "name": string }`, `{ "name": (now) => string }`

### `setAll(...css): self`

Set modular CSS each elements

_param_ | _type_
------- | ---------------------------------------------------------------
css     | `{ "name": string }`, `{ "name": (element, i, all) => string }`

### `story(name): story`

Make story

_param_ | _type_
------- | -----------------------
name    | `string`
story   | [see](#using-the-story)

### `time(dur): self`

Delay execution

_param_ | _type_
------- | ---------------------
dur     | milliseconds `number`

## USING THE PROMISE

This library's promise like a [Promise / A+](//promisesaplus.com/), it's extended functions

### `resume()`

The fullfilled or rejected promise back to pending

```javascript
mist('div').on('click').then(function(e) { /** your process */ mist('div').on('click').resume(); });
```

### `when(success, err?): promise`

If you want to reuse callback function, to use

_param_ | _type_
------- | -------------------
success | `(response) => any`
err     | `(response) => any`

```javascript
mist('div').on('click').when(function(e) { /** your process */ });
mist('div').on('click').then(function(e) { /** your process */ mist('div').on('click').resume(); }); // same as
```

## USING THE STORY

This library's story like a state machine

```javascript
var m = mist('div');

m.story('A')

  .next(m.story('B'))
  .next(m.story('A')).start();
```

Every time you click, the process move to a another story

```javascript
mist('*').on('click').when(function() {

  // connect to B > A > B > A > ...

  m.story('A').move(function() { /** your process on A story */ }) ||
  m.story('B').move(function() { /** your process on B story */ });
});
```

### `move(succeed): be`

Move story

_param_ | _type_
------- | --------------------
succeed | `() => void`
be      | success as `boolean`

```javascript
mist('div').story('A').move(function() { /** your process on A story */ }) ||
mist('div').story('B').move(function() { /** your process on B story */ });
```

### `next(story): story`

Connect story to next

_param_ | _type_
------- | ------------
story   | next `story`

```javascript
var m = mist('div');

m.story('A')

  .next(m.story('B'))
  .next(m.story('C'));
```

### `prev(story): story`

Connect story to prev

_param_ | _type_
------- | ------------
story   | prev `story`

```javascript
var m = mist('div');

m.story('C')

  .prev(m.story('B'))
  .prev(m.story('A'));
```

### `start()`

Start story, it's to be moved

```javascript
mist('div').story('A').start();
mist('div').story('A').move(function() { /** your process on A story */ });
```

## LICENSE

[MIT](//opensource.org/licenses/MIT) © AI428
