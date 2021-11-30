"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _User = require("./entity/User");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, ui;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manager = connection.manager;
            ui = new _User.User();
            ui.username = 'qinglin';
            ui.passwordDigest = 'yueue';
            _context.next = 6;
            return manager.save(ui);

          case 6:
            console.log('ui.id', ui.id); //   const Posts = await connection.manager.find(Post)
            // if (Posts.length === 0) {
            //   await connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
            //     return new Post({title:`title${item}`,content:`这是我的弟${item}数据库`})
            //   }))
            // 这是第一种也是常规写法
            // p.id = 123;
            // p.title = "qinglin";
            // p.content = "我的数据库"
            // 这种第二种写法，对应Posts.ts 中的public写法
            // await connection.manager.save([
            //   new Post(this, { 'qinglin0', '我的数据库0'}),
            //   new Post('qinglin1', '我的数据库1'),
            //   new Post('qinglin2', '我的数据库2'),
            //   new Post('qinglin3', '我的数据库3'),
            // ]);
            // } else {
            // }
            // connection.close()

          case 7:
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