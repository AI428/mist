/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />

/**
 * @copyright AI428
 * @description for scoped style in JS
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.3.1
 */

/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement): Mist.Statement {
  return Mist.Component.create<Mist.Statement>(
    Mist.Statement, statement);
}
