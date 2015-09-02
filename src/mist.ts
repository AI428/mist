/// <reference path='mist/component.ts' />
/// <reference path='mist/statement.ts' />
/*!
 * @copyright 2015 AI428
 * @description for multi gestures
 * @license http://opensource.org/licenses/MIT
 * @namespace Mist
 * @version 0.1.0
 */
/**
 * @param {string} selector
 * @return {Statement}
 */
function mist(selector: string): Mist.Statement {
  return Mist.Component.create<Mist.Statement>(
    Mist.Statement, selector);
}
