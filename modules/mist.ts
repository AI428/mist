/**
 * @copyright AI428
 * @description Reactive CSS Framework
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.5.0
 */

/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />

/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement: Element): Mist.Statement;

/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement: string): Mist.Statement;

/**
 * @param {} statement
 * @return {Mist.Statement}
 */
function mist(statement: any): Mist.Statement {
  return Mist.Component.create<Mist.Statement>(
    Mist.Statement, statement);
}
