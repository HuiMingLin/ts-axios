// @ts-ignore
const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function () {
  return JasmineCore
}
// @ts-ignore
require('jasmine-ajax')
