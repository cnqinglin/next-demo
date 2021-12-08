"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _getDataBaseConnection = require("lib/getDataBaseConnection");

var _lodash = _interopRequireDefault(require("lodash"));

var _User = require("src/entity/User");

var _md = _interopRequireDefault(require("md5"));

// 这个model也是个类，但不同于entity 类（注册有关）的区别是不会存储到数据库中，只是关于登录
var SignIn = /*#__PURE__*/function () {
  function SignIn() {
    (0, _classCallCheck2["default"])(this, SignIn);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "user", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: []
    });
  }

  (0, _createClass2["default"])(SignIn, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.username.trim() === '') {
                  this.errors.username.push('请填写用户名');
                }

                _context.next = 3;
                return (0, _getDataBaseConnection.getDatabaseConnection)();

              case 3:
                connection = _context.sent;
                _context.next = 6;
                return connection.manager.findOne(_User.User, {
                  where: {
                    username: this.username
                  }
                });

              case 6:
                user = _context.sent;
                this.user = user; // 为了在成功的情况下展示user 的信息而写的

                if (user) {
                  if ((0, _md["default"])(this.password) !== user.passwordDigest) {
                    this.errors.password.push('密码不匹配');
                  }
                } else {
                  this.errors.username.push('用户名不存在');
                } //   if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
                //     this.errors.username.push('用户名格式不合法');
                //   }
                //   if (this.username.trim().length > 42) {
                //     this.errors.username.push('太长');
                //   }
                //   if (this.username.trim().length <= 3) {
                //     this.errors.username.push('用户名太短');
                //   }
                // const found = await (await getDatabaseConnection()).manager.find(User, { username:this.username });
                // if (found.length > 0) {
                //   this.errors.username.push('已存在，不能重复注册');
                // }


                if (this.password === '') {
                  this.errors.password.push('不能为空');
                }

                if (this.password) {// this.errors.passwordConfirmation.push('密码不匹配');
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "hasErrors",
    value: function hasErrors() {
      return !!Object.values(this.errors).find(function (v) {
        return v.length > 0;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return _lodash["default"].omit(this, ['password', 'errors']);
    }
  }]);
  return SignIn;
}();

exports.SignIn = SignIn;