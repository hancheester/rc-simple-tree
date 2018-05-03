'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _inlineEdit = require('./inline-edit');

var _inlineEdit2 = _interopRequireDefault(_inlineEdit);

var _dropPositions = require('./drop-positions');

var dropPositions = _interopRequireWildcard(_dropPositions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = function (_React$Component) {
    _inherits(TreeNode, _React$Component);

    function TreeNode(props) {
        _classCallCheck(this, TreeNode);

        var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

        _this.handleTitleChange = _this.handleTitleChange.bind(_this);
        _this.handleSelectorClick = _this.handleSelectorClick.bind(_this);
        _this.handleSwitcherClick = _this.handleSwitcherClick.bind(_this);
        _this.handleDragStart = _this.handleDragStart.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);
        _this.handleDragEnter = _this.handleDragEnter.bind(_this);
        _this.handleDragOver = _this.handleDragOver.bind(_this);
        _this.handleDragLeave = _this.handleDragLeave.bind(_this);
        _this.handleDrop = _this.handleDrop.bind(_this);

        _this.renderChildren = _this.renderChildren.bind(_this);
        _this.renderSelector = _this.renderSelector.bind(_this);
        _this.renderSwitcher = _this.renderSwitcher.bind(_this);

        _this.setSelectNodeHandler = _this.setSelectNodeHandler.bind(_this);
        return _this;
    }

    _createClass(TreeNode, [{
        key: 'handleTitleChange',
        value: function handleTitleChange(title) {
            console.log(title);
        }
    }, {
        key: 'handleSelectorClick',
        value: function handleSelectorClick(event) {
            event.preventDefault();
            var onNodeSelect = this.context.onNodeSelect;

            onNodeSelect(event, this);
        }
    }, {
        key: 'handleSwitcherClick',
        value: function handleSwitcherClick(event) {
            event.preventDefault();
            var onNodeExpand = this.context.onNodeExpand;

            onNodeExpand(event, this);
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(event) {
            event.stopPropagation();
            var onNodeDragStart = this.context.onNodeDragStart;

            onNodeDragStart(event, this);
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd(event) {
            event.stopPropagation();
            var onNodeDragEnd = this.context.onNodeDragEnd;

            onNodeDragEnd(event, this);
        }
    }, {
        key: 'handleDragEnter',
        value: function handleDragEnter(event) {
            event.preventDefault();
            event.stopPropagation();
            var onNodeDragEnter = this.context.onNodeDragEnter;

            onNodeDragEnter(event, this);
        }
    }, {
        key: 'handleDragOver',
        value: function handleDragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            var onNodeDragOver = this.context.onNodeDragOver;

            onNodeDragOver(event, this);
        }
    }, {
        key: 'handleDragLeave',
        value: function handleDragLeave(event) {
            event.stopPropagation();
            var onNodeDragLeave = this.context.onNodeDragLeave;

            onNodeDragLeave(event, this);
        }
    }, {
        key: 'handleDrop',
        value: function handleDrop(event) {
            event.preventDefault();
            event.stopPropagation();
            var onNodeDrop = this.context.onNodeDrop;

            onNodeDrop(event, this);
        }
    }, {
        key: 'setSelectNodeHandler',
        value: function setSelectNodeHandler(element) {
            this.selectNodeHandler = element;
        }
    }, {
        key: 'renderSwitcher',
        value: function renderSwitcher() {
            var _props = this.props,
                expanded = _props.expanded,
                isLeaf = _props.isLeaf;


            if (isLeaf) {
                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-user' })
                );
            }

            return _react2.default.createElement(
                'span',
                { onClick: this.handleSwitcherClick },
                _react2.default.createElement('i', { className: 'fa fa-chevron-' + (expanded ? 'down' : 'right') }),
                _react2.default.createElement('i', { className: 'fa fa-users' })
            );
        }
    }, {
        key: 'renderSelector',
        value: function renderSelector() {
            var _props2 = this.props,
                title = _props2.title,
                draggable = _props2.draggable;


            return _react2.default.createElement(
                'span',
                {
                    ref: this.setSelectNodeHandler,
                    draggable: draggable,
                    'aria-grabbed': draggable,
                    onClick: this.handleSelectorClick,
                    onDragStart: this.handleDragStart
                },
                _react2.default.createElement(
                    'span',
                    { className: 'ellipsis' },
                    _react2.default.createElement(_inlineEdit2.default, { onChange: this.handleTitleChange, className: 'tree-node-title', text: title })
                )
            );
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var _props3 = this.props,
                expanded = _props3.expanded,
                children = _props3.children;
            var renderTreeNode = this.context.renderTreeNode;


            if (children && children.length > 0) {
                return _react2.default.createElement(
                    'ul',
                    { className: (0, _classnames2.default)('tree-menu', !expanded && 'closed') },
                    _react2.default.Children.map(children, renderTreeNode)
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                title = _props4.title,
                className = _props4.className,
                dropPosition = _props4.dropPosition;


            return _react2.default.createElement(
                'li',
                {
                    className: (0, _classnames2.default)(className, {
                        'drop-hint-border': dropPosition === dropPositions.DROP_HINT_BORDER,
                        'drop-hint-top': dropPosition === dropPositions.DROP_HINT_TOP,
                        'drop-hint-bottom': dropPosition == dropPositions.DROP_HINT_BOTTOM
                    }),
                    onDragEnter: this.handleDragEnter,
                    onDragOver: this.handleDragOver,
                    onDragLeave: this.handleDragLeave,
                    onDragEnd: this.handleDragEnd,
                    onDrop: this.handleDrop
                },
                this.renderSwitcher(),
                this.renderSelector(),
                this.renderChildren()
            );
        }
    }]);

    return TreeNode;
}(_react2.default.Component);

TreeNode.propTypes = {
    expanded: _react.PropTypes.bool,
    isLeaf: _react.PropTypes.bool
};

TreeNode.contextTypes = {
    renderTreeNode: _react.PropTypes.func,
    onNodeSelect: _react.PropTypes.func,
    onNodeExpand: _react.PropTypes.func,
    onNodeDragStart: _react.PropTypes.func,
    onNodeDragEnd: _react.PropTypes.func,
    onNodeDragEnter: _react.PropTypes.func,
    onNodeDragOver: _react.PropTypes.func,
    onNodeDragLeave: _react.PropTypes.func,
    onNodeDrop: _react.PropTypes.func
};

exports.default = TreeNode;