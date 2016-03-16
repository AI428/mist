![MIST](https://github.com/AI428/mist/blob/master/logos/mist_1600_1180.png)

# MIST
> _Reactive CSS Framework_

This is a solution for development of CSS library.

In order to control CSS, Do you use such heavy weight library of `Angular`, `jQuery` and `React`? With the **MIST**, you can define the reactive style without the code, such as {} on your DOM.

## USAGE
### INATALLATION
[Get](https://github.com/AI428/mist/releases) the latest version.

```html
<script src=mist.min.js></script>
```

### DEFINE CLASS
Any selector, or element style define. The following code is a class that red elements when you click. `redden` is still non-existent class.

```js
mist('*').on('click').then(

  function() {

    mist('.redden').style.set({

      background: 'red'
    });
  }
);
```

### ADD THIS
Add this class to any selector.

```js
mist('any selector').class.add('redden');
```

So, try red flashes the element to use this class. The following code will flashes at one second intervals.

```js
mist('any selector').class.pulse(1000).toggle('redden');
```

### REMOVE THIS
You can also remove.

```js
mist('any selector').class.remove('redden');
```

One second later.

```js
mist('any selector').class.time(1000).remove('redden');
```

### REACT TO STYLE
The style, in addition to string, you can pass a function or `Mist.Promise`.

Function is evaluated just to pass the element. `Mist.Promise` in the return value, such as `mist.on` function, is module like Promise/A+, is evaluated each time the callback function is called. The code that red elements when you click is rewritten as follows.

```js
mist('.redden').style.set({

  background: mist('*').on('click').then(

    function() {

      return 'red';
    }
  )
});
```

A combination of these to develop a CSS library.

## LICENSE
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
