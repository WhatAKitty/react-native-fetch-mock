'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  '/api/users': function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', {
                data: [{
                  name: 'John',
                  age: 15
                }, {
                  name: 'Lily',
                  age: 16
                }]
              });

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function apiUsers() {
      return _ref.apply(this, arguments);
    };
  }()
};
