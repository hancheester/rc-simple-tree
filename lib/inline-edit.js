'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineEdit = function (_React$Component) {
    _inherits(InlineEdit, _React$Component);

    function InlineEdit(props, context) {
        _classCallCheck(this, InlineEdit);

        var _this = _possibleConstructorReturn(this, (InlineEdit.__proto__ || Object.getPrototypeOf(InlineEdit)).call(this, props, context));

        _this.state = {
            editing: props.editing,
            text: props.text
        };

        _this.keyDown = _this.keyDown.bind(_this);
        _this.textChanged = _this.textChanged.bind(_this);
        _this.startEditing = _this.startEditing.bind(_this);
        _this.finishEditing = _this.finishEditing.bind(_this);
        _this.commitEditing = _this.commitEditing.bind(_this);
        _this.cancelEditing = _this.cancelEditing.bind(_this);
        return _this;
    }

    _createClass(InlineEdit, [{
        key: 'keyDown',
        value: function keyDown(e) {
            var CARRIAGE_RETURN = 13;
            var ESCAPE = 27;

            if (e.keyCode === CARRIAGE_RETURN) {
                this.finishEditing();
            } else if (e.keyCode === ESCAPE) {
                this.cancelEditing();
            }
        }
    }, {
        key: 'textChanged',
        value: function textChanged(e) {
            this.setState({ text: e.target.value.trim() });
        }
    }, {
        key: 'startEditing',
        value: function startEditing(e) {
            if (this.props.stopPropagation) {
                e.stopPropagation();
            }
            this.setState({ editing: true, text: this.props.text });
        }
    }, {
        key: 'finishEditing',
        value: function finishEditing() {
            if (this.props.text != this.state.text) {
                this.commitEditing();
            } else if (this.props.text === this.state.text) {
                this.cancelEditing();
            }
        }
    }, {
        key: 'commitEditing',
        value: function commitEditing() {
            this.setState({ editing: false, text: this.state.text });
            var newProp = {};
            newProp[this.props.paramName] = this.state.text;
            this.props.onChange(newProp);
        }
    }, {
        key: 'cancelEditing',
        value: function cancelEditing() {
            this.setState({ editing: false, text: this.props.text });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.editing) {
                var Element = this.props.staticElement;
                return _react2.default.createElement(
                    Element,
                    {
                        className: this.props.className,
                        onDoubleClick: this.startEditing },
                    this.state.text || this.props.placeholder
                );
            } else {
                var _Element = this.props.editingElement;
                return _react2.default.createElement(_Element, {
                    onKeyDown: this.keyDown,
                    onBlur: this.finishEditing,
                    defaultValue: this.state.text,
                    onChange: this.textChanged });
            }
        }
    }]);

    return InlineEdit;
}(_react2.default.Component);

InlineEdit.defaultProps = {
    staticElement: 'span',
    editingElement: 'input',
    editing: false
};

exports.default = InlineEdit;