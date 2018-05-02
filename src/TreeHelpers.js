import * as dropPositions from './DropPositions';

export function getExpandedIds(treeNodes) {
    const expandedIds = [];
    if (treeNodes && treeNodes.length > 0) {
        treeNodes.forEach(child => {
            traverseTreeNodes(child, ({nodeId}) => expandedIds.push(nodeId));
        });
    }

    return expandedIds;
}

export function traverseTreeNodes(treeNode, callback) {
    const info = {
        node: treeNode,
        key: treeNode.key,
        nodeId: treeNode.props.nodeId
    };
    
    const {children} = treeNode.props;
    const childrenNodes = [];

    if (children && children.length > 0) {
        children.forEach(node => {
            childrenNodes.push({
                node,
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

export function calculateDropPosition(event, treeNode) {
    const {clientY} = event;
    const {top, bottom, height} = treeNode.selectNodeHandler.getBoundingClientRect();
    const DRAG_SIDE_RANGE = 0.15;
    const DRAG_MIN_GAP = 2;

    const des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

    if (clientY <= top + des) {
        return dropPositions.DROP_HINT_TOP;
    } else if (clientY >= bottom - des) {
        return dropPositions.DROP_HINT_BOTTOM;
    }

    return dropPositions.DROP_HINT_BORDER;
}