/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />

/**
 * @copyright AI428
 * @description statement for CSS in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.3.0
 */

/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement): Mist.Statement {
  return Mist.Component.create<Mist.Statement>(
    Mist.Statement, statement);
}
