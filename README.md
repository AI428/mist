![MIST](https://github.com/AI428/mist.js/blob/master/logos/mist_1600_1180.png)

> Reactive CSS framework

This is a solution for the development of CSS library.

In order to control the CSS, Do you use such heavy weight library of Angular and React? With the MIST, you can define the reactive style without the code, such as {} on your dom.

## USAGE
### Install
Download the latest version. After only load.

```html
<script src=mist.min.js></script>
```

### Define class
Any of the selector, or the element style define.

The following code is a class that red elements when you click. `redden` is still non-existent class.

```js
mist('*').on('click').then(

  function() {

    mist('.redden').style.set({

      background: 'red'
    });
  }
);
```

### Add this
Add this class to any selector.

```js
mist('any selector').class.add('redden');
```

So, try red flashes the element to use this class. The following code will flashes at one second intervals.

```js
mist('any selector').class.pulse(1000).toggle('redden');
```

You can also remove.

```js
mist('any selector').class.remove('redden');
```

One second later.

```js
mist('any selector').class.time(1000).remove('redden');
```

### React to style
The style, in addition to the string, you can pass a function or `Mist.Promise`.

Function is evaluated just to pass the element. `Mist.Promise` in the return value, such as `mist.on` function, is thenable module, is evaluated each time the callback function is called.The code that red elements when you click is rewritten as follows.

```js
mist('.redden').style.set({

  background: mist('*').on('click').then(
  
    function() {

      return 'red';
    }
  )
});
```

## LICENSE
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
