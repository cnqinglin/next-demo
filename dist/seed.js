"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var Posts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_Post.Post);

          case 2:
            Posts = _context.sent;

            if (!(Posts.length === 0)) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (item) {
              return new _Post.Post({
                title: "title".concat(item),
                content: "\u8FD9\u662F\u6211\u7684\u5F1F".concat(item, "\u6570\u636E\u5E93")
              });
            }));

          case 6:
            _context.next = 8;
            break;

          case 8:
            connection.close();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});