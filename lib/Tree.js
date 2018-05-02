'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _TreeHelpers = require('./TreeHelpers');

var _DropPositions = require('./DropPositions');

var dropPositions = _interopRequireWildcard(_DropPositions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_React$Component) {
    _inherits(Tree, _React$Component);

    function Tree(props) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

        _this.state = {
            expandedIds: (0, _TreeHelpers.getExpandedIds)(props.children),
            dragOverNodeId: 0,
            dropPosition: null
        };

        _this.renderTreeNode = _this.renderTreeNode.bind(_this);
        _this.onNodeSelect = _this.onNodeSelect.bind(_this);
        _this.onNodeExpand = _this.onNodeExpand.bind(_this);
        _this.onNodeDragStart = _this.onNodeDragStart.bind(_this);
        _this.onNodeDragEnd = _this.onNodeDragEnd.bind(_this);
        _this.onNodeDragEnter = _this.onNodeDragEnter.bind(_this);
        _this.onNodeDragOver = _this.onNodeDragOver.bind(_this);
        _this.onNodeDragLeave = _this.onNodeDragLeave.bind(_this);
        _this.onNodeDrop = _this.onNodeDrop.bind(_this);
        return _this;
    }

    _createClass(Tree, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                renderTreeNode: this.renderTreeNode,
                onNodeSelect: this.onNodeSelect,
                onNodeExpand: this.onNodeExpand,
                onNodeDragStart: this.onNodeDragStart,
                onNodeDragEnd: this.onNodeDragEnd,
                onNodeDragEnter: this.onNodeDragEnter,
                onNodeDragOver: this.onNodeDragOver,
                onNodeDragLeave: this.onNodeDragLeave,
                onNodeDrop: this.onNodeDrop
            };
        }
    }, {
        key: 'renderTreeNode',
        value: function renderTreeNode(child, index) {
            var _props = this.props,
                draggable = _props.draggable,
                children = _props.children;
            var _state = this.state,
                _state$expandedIds = _state.expandedIds,
                expandedIds = _state$expandedIds === undefined ? [] : _state$expandedIds,
                dragOverNodeId = _state.dragOverNodeId,
                dropPosition = _state.dropPosition;
            var nodeId = child.props.nodeId;


            return _react2.default.cloneElement(child, {
                className: (0, _classnames2.default)('tree-node', this.dragNode && this.dragNode.props.nodeId === nodeId && 'drag-source'),
                draggable: draggable,
                expanded: expandedIds.indexOf(nodeId) !== -1,
                isLeaf: !child.props.children || child.props.children.length === 0,
                dropPosition: dragOverNodeId === nodeId ? dropPosition : null
            });
        }
    }, {
        key: 'onNodeSelect',
        value: function onNodeSelect(event, treeNode) {
            var onSelect = this.props.onSelect;


            if (onSelect) {
                var _treeNode$props = treeNode.props,
                    nodeId = _treeNode$props.nodeId,
                    title = _treeNode$props.title;

                onSelect({ eventType: 'select', nodeId: nodeId, title: title });
            }
        }
    }, {
        key: 'onNodeExpand',
        value: function onNodeExpand(event, treeNode) {
            var onExpand = this.props.onExpand;
            var _state$expandedIds2 = this.state.expandedIds,
                expandedIds = _state$expandedIds2 === undefined ? [] : _state$expandedIds2;
            var _treeNode$props2 = treeNode.props,
                nodeId = _treeNode$props2.nodeId,
                title = _treeNode$props2.title;


            var index = expandedIds.indexOf(nodeId);

            if (index === -1) {
                expandedIds.push(nodeId);
                this.setState({ expandedIds: expandedIds });
            } else {
                var clone = expandedIds.slice();
                var foundIndex = clone.indexOf(nodeId);

                if (foundIndex >= 0) {
                    clone.splice(foundIndex, 1);
                    this.setState({
                        expandedIds: clone
                    });
                }
            }

            if (onExpand) {
                onExpand({ eventType: 'expand', nodeId: nodeId, title: title });
            }
        }
    }, {
        key: 'onNodeDragStart',
        value: function onNodeDragStart(event, treeNode) {
            var onDragStart = this.props.onDragStart;


            this.dragNode = treeNode;

            if (onDragStart) {
                var _treeNode$props3 = treeNode.props,
                    nodeId = _treeNode$props3.nodeId,
                    title = _treeNode$props3.title;

                onDragStart({ eventType: 'dragstart', nodeId: nodeId, title: title });
            }
        }
    }, {
        key: 'onNodeDragEnd',
        value: function onNodeDragEnd(event, treeNode) {
            this.setState({
                dragOverNodeId: 0,
                dropPosition: null
            });

            this.dragNode = null;

            var onDragEnd = this.props.onDragEnd;


            if (onDragEnd) {
                var _treeNode$props4 = treeNode.props,
                    nodeId = _treeNode$props4.nodeId,
                    title = _treeNode$props4.title;

                onDragEnd({ eventType: 'dragend', nodeId: nodeId, title: title });
            }
        }
    }, {
        key: 'onNodeDragEnter',
        value: function onNodeDragEnter(event, treeNode) {
            var _this2 = this;

            var onDragEnter = this.props.onDragEnter;
            var _treeNode$props5 = treeNode.props,
                nodeId = _treeNode$props5.nodeId,
                title = _treeNode$props5.title;


            var dropPosition = (0, _TreeHelpers.calculateDropPosition)(event, treeNode);

            if (this.dragNode.props.nodeId === nodeId && dropPosition === dropPositions.DROP_HINT_BORDER) {
                this.setState({
                    dragOverNodeId: 0,
                    dropPosition: null
                });
                return;
            }

            setTimeout(function () {
                _this2.setState({
                    dragOverNodeId: nodeId,
                    dropPosition: dropPosition
                });

                if (!_this2.delayDragEnterLogic) {
                    _this2.delayDragEnterLogic = {};
                }

                Object.keys(_this2.delayDragEnterLogic).forEach(function (key) {
                    clearTimeout(_this2.delayDragEnterLogic[key]);
                });

                _this2.delayDragEnterLogic[nodeId] = setTimeout(function () {
                    if (onDragEnter) {
                        onDragEnter({ eventType: 'dragenter', nodeId: nodeId, title: title });
                    }
                }, 500);
            }, 0);
        }
    }, {
        key: 'onNodeDragOver',
        value: function onNodeDragOver(event, treeNode) {
            var _treeNode$props6 = treeNode.props,
                nodeId = _treeNode$props6.nodeId,
                title = _treeNode$props6.title;


            if (this.dragNode && this.state.dragOverNodeId === nodeId) {
                var dropPosition = (0, _TreeHelpers.calculateDropPosition)(event, treeNode);
                if (dropPosition === this.state.dropPosition) return;

                this.setState({
                    dropPosition: dropPosition
                });

                var onDragOver = this.props.onDragOver;

                if (onDragOver) {
                    onDragOver({ eventType: 'dragover', nodeId: nodeId, title: title });
                }
            }
        }
    }, {
        key: 'onNodeDragLeave',
        value: function onNodeDragLeave(event, treeNode) {
            var _treeNode$props7 = treeNode.props,
                nodeId = _treeNode$props7.nodeId,
                title = _treeNode$props7.title;


            this.setState({
                dragOverNodeId: 0
            });

            var onDragLeave = this.props.onDragLeave;


            if (onDragLeave) {
                onDragLeave({ eventType: 'dragleave', nodeId: nodeId, title: title });
            }
        }
    }, {
        key: 'onNodeDrop',
        value: function onNodeDrop(event, treeNode) {
            var _state2 = this.state,
                dragOverNodeId = _state2.dragOverNodeId,
                dropPosition = _state2.dropPosition;
            var onDrop = this.props.onDrop;
            var _treeNode$props8 = treeNode.props,
                nodeId = _treeNode$props8.nodeId,
                title = _treeNode$props8.title;


            if (onDrop) {
                onDrop(this.dragNode.props.nodeId, dragOverNodeId, dropPosition);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;


            return _react2.default.createElement(
                'ul',
                null,
                _react2.default.Children.map(children, this.renderTreeNode)
            );
        }
    }]);

    return Tree;
}(_react2.default.Component);

Tree.childContextTypes = {
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

Tree.defaultProps = {
    draggable: false
};

exports.default = Tree;