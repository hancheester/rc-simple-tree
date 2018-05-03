'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getExpandedIds = getExpandedIds;
exports.traverseTreeNodes = traverseTreeNodes;
exports.calculateDropPosition = calculateDropPosition;

var _dropPositions = require('./drop-positions');

var dropPositions = _interopRequireWildcard(_dropPositions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getExpandedIds(treeNodes) {
    var expandedIds = [];
    if (treeNodes && treeNodes.length > 0) {
        treeNodes.forEach(function (treeNode) {
            traverseTreeNodes(treeNode, function (_ref) {
                var nodeId = _ref.nodeId;
                return expandedIds.push(nodeId);
            });
        });
    }

    return expandedIds;
}

function traverseTreeNodes(treeNode, callback) {
    var info = {
        node: treeNode,
        key: treeNode.key,
        nodeId: treeNode.props.nodeId
    };

    var children = treeNode.props.children;

    var childrenNodes = [];

    if (children && children.length > 0) {
        children.forEach(function (node) {
            childrenNodes.push({
                node: node,
                nodeId: treeNode.props.nodeId,
                key: node.key,
                parent: treeNode
            });

            traverseTreeNodes(node, callback);
        });
    }

    info.childrenNodes = childrenNodes;

    callback(info);
}

function calculateDropPosition(event, treeNode) {
    var clientY = event.clientY;

    var _treeNode$selectNodeH = treeNode.selectNodeHandler.getBoundingClientRect(),
        top = _treeNode$selectNodeH.top,
        bottom = _treeNode$selectNodeH.bottom,
        height = _treeNode$selectNodeH.height;

    var DRAG_SIDE_RANGE = 0.15;
    var DRAG_MIN_GAP = 2;

    var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

    if (clientY <= top + des) {
        return dropPositions.DROP_HINT_TOP;
    } else if (clientY >= bottom - des) {
        return dropPositions.DROP_HINT_BOTTOM;
    }

    return dropPositions.DROP_HINT_BORDER;
}