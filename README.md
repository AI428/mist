![MIST](https://github.com/AI428/mist.js/blob/master/logos/mist_1600_1180.png)

> Reactive CSS framework

This is a solution for the development of CSS library. In order to control the CSS, Do you use such heavy weight library of Angular and React? With the MIST, you can define the reactive style without the code, such as {} on your dom.

# USAGE

## Add MIST to your project

Download the latest version. After only load.

```html
<script src=mist.min.js></script>
```

## Define CSS class

Any of the selector, or the element style specify. The following code is a class that red elements when you click.

```js
mist('*').on('click').then(function() {

  mist('.redden').style.set({ background: 'red' });
});
```

Add this class to any selector.

```js
mist('any selector').style.add('redden');
```

# LICENSE
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
