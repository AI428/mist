/// <reference path='promise/value.ts'/>
/// <reference path='element.ts'/>

module Mist {

  /**
   * @class Matrix
   * @description matrix composer.
   * @since 0.1.0
   */
  export class Matrix {

    private value: Value;

    /**
     * @constructor
     * @param {HTMLElement} element
     */
    constructor(element: HTMLElement) {

      this.value = new Value((function() {

        var c = getComputedStyle(element);

        // [a,b,c,d,x,y] response.

        var response = (

          c.transform ||
          c.mozTransform ||
          c.webkitTransform

          ).match(/matrix\((.*?)\)/);

        // [a,b,c,d,x,y] response.

        return response ? response[1].split(/\s?,\s?/).map(parseFloat) : [1, 0, 0, 1, 0, 0];
      })());

      this.value.then(function(matrix) {

        var c = getComputedStyle(element);

        // [a,b,c,d,x,y] response.

        var response = (
          c.transform ||
          c.mozTransform ||
          c.webkitTransform);

        response = [
          response.replace(/(matrix\(.*?\)|none)/, ''), [
            'matrix(', matrix
              .join(), ')'
          ].join('')
        ].join(' ');

        // a response.

        element.style.transform = response;
        element.style.mozTransform = response;
        element.style.webkitTransform = response;
      });
    }

    /**
     * @description [a,b,c,d,x,y]
     * @param {number[]} matrix
     */
    add(matrix: number[]) {

      this.value.compose(function(o) {

        return [
          o[0] + (matrix[0] || 0),
          o[1] + (matrix[1] || 0),
          o[2] + (matrix[2] || 0),
          o[3] + (matrix[3] || 0),
          o[4] + (matrix[4] || 0),
          o[5] + (matrix[5] || 0)
        ];
      });
    }

    /**
     * @description [a,b,c,d,x,y]
     * @return {number[]}
     */
    get(): number[] {

      return this.value.composite;
    }

    /**
     * @description [a,b,c,d,x,y]
     * @param {number[]} matrix
     */
    set(matrix: number[]) {

      this.value.compose(function(o) {

        return [
          Matrix.assert(matrix[0], o[0]),
          Matrix.assert(matrix[1], o[1]),
          Matrix.assert(matrix[2], o[2]),
          Matrix.assert(matrix[3], o[3]),
          Matrix.assert(matrix[4], o[4]),
          Matrix.assert(matrix[5], o[5])
        ];
      });
    }

    /**
     * @access private
     * @static
     */
    private static assert(master, slave) {

      return null != master ? master : slave;
    }
  }
}
