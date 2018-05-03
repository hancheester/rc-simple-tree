import React, {PropTypes} from 'react';
import classNames from 'classnames';
import TreeNode from './tree-node';
import {traverseTreeNodes, getExpandedIds,
        calculateDropPosition} from './utils';
import * as dropPositions from './drop-positions';

class Tree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedIds: getExpandedIds(props.children),
            dragOverNodeId: 0,
            dropPosition: null
        };

        this.renderTreeNode = this.renderTreeNode.bind(this);
        this.onNodeSelect = this.onNodeSelect.bind(this);
        this.onNodeExpand = this.onNodeExpand.bind(this);
        this.onNodeDragStart = this.onNodeDragStart.bind(this);
        this.onNodeDragEnd = this.onNodeDragEnd.bind(this);
        this.onNodeDragEnter = this.onNodeDragEnter.bind(this);
        this.onNodeDragOver = this.onNodeDragOver.bind(this);
        this.onNodeDragLeave = this.onNodeDragLeave.bind(this);
        this.onNodeDrop = this.onNodeDrop.bind(this);
    }

    getChildContext() {
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

    renderTreeNode(child, index) {
        const {draggable, children} = this.props;
        const {expandedIds = [], dragOverNodeId, dropPosition} = this.state;
        const {nodeId, isLeaf} = child.props;

        return React.cloneElement(child, {
            className: classNames('tree-node', this.dragNode && this.dragNode.props.nodeId === nodeId && 'drag-source'),
            draggable: draggable,
            expanded: expandedIds.indexOf(nodeId) !== -1,
            isLeaf: isLeaf || (child.props.children && child.props.children.length === 0),
            dropPosition: dragOverNodeId === nodeId ? dropPosition : null
        });
    }

    onNodeSelect(event, treeNode) {
        const {onSelect} = this.props;

        if (onSelect) {
            const {nodeId, title} = treeNode.props;
            onSelect({eventType: 'select', nodeId, title});
        }
    }

    onNodeExpand(event, treeNode) {
        const {onExpand, onLoadData} = this.props;
        const {expandedIds = []} = this.state;
        const {nodeId, title} = treeNode.props;
        
        const index = expandedIds.indexOf(nodeId);

        if (index === -1) {
            expandedIds.push(nodeId);
            this.setState({expandedIds});
        } else {
            const clone = expandedIds.slice();
            const foundIndex = clone.indexOf(nodeId);

            if (foundIndex >= 0) {
                clone.splice(foundIndex, 1);
                this.setState({
                    expandedIds: clone
                });
            }
        }

        if (onExpand) {
            onExpand({eventType: 'expand', nodeId, title});
        }

        if (onLoadData) {
            onLoadData(nodeId);
        }
    }

    onNodeDragStart(event, treeNode) {
        const {onDragStart} = this.props;

        this.dragNode = treeNode;

        if (onDragStart) {
            const {nodeId, title} = treeNode.props;
            onDragStart({eventType: 'dragstart', nodeId, title});
        }
    }

    onNodeDragEnd(event, treeNode) {
        this.setState({
            dragOverNodeId: 0,
            dropPosition: null
        });

        this.dragNode = null;

        const {onDragEnd} = this.props;

        if (onDragEnd) {
            const {nodeId, title} = treeNode.props;
            onDragEnd({eventType: 'dragend', nodeId, title});
        }
    }

    onNodeDragEnter(event, treeNode) {
        const {onDragEnter} = this.props;
        const {nodeId, title} = treeNode.props;

        const dropPosition = calculateDropPosition(event, treeNode);

        if (this.dragNode.props.nodeId === nodeId && dropPosition === dropPositions.DROP_HINT_BORDER) {
            this.setState({
                dragOverNodeId: 0,
                dropPosition: null
            });
            return;
        }

        setTimeout(() => {
            this.setState({
                dragOverNodeId: nodeId,
                dropPosition
            });
    
            if (!this.delayDragEnterLogic) {
                this.delayDragEnterLogic = {};
            }

            Object.keys(this.delayDragEnterLogic).forEach((key) => {
                clearTimeout(this.delayDragEnterLogic[key]);
            });

            this.delayDragEnterLogic[nodeId] = setTimeout(() => {
                if (onDragEnter) {
                    onDragEnter({eventType: 'dragenter', nodeId, title});
                }
            }, 500);
        }, 0);
    }

    onNodeDragOver(event, treeNode) {
        const {nodeId, title} = treeNode.props;

        if (this.dragNode && this.state.dragOverNodeId === nodeId) {
            const dropPosition = calculateDropPosition(event, treeNode);
            if (dropPosition === this.state.dropPosition) 
                return;

            this.setState({
                dropPosition
            });

            const {onDragOver} = this.props;
            if (onDragOver) {
                onDragOver({eventType: 'dragover', nodeId, title});
            }
        }
    }

    onNodeDragLeave(event, treeNode) {
        const {nodeId, title} = treeNode.props;

        this.setState({
            dragOverNodeId: 0
        });

        const {onDragLeave} = this.props;

        if (onDragLeave) {
            onDragLeave({eventType: 'dragleave', nodeId, title});
        }
    }

    onNodeDrop(event, treeNode) {
        const {dragOverNodeId, dropPosition} = this.state;
        const {onDrop} = this.props;
        const {nodeId, title} = treeNode.props;

        if (onDrop) {
            onDrop(this.dragNode.props.nodeId, dragOverNodeId, dropPosition);
        }
    }

    render() {
        const {children} = this.props;

        return (
            <ul>
                {React.Children.map(children, this.renderTreeNode)}
            </ul>
        );
    }
}

Tree.childContextTypes = {
    renderTreeNode: PropTypes.func,
    onNodeSelect: PropTypes.func,
    onNodeExpand: PropTypes.func,
    onNodeDragStart: PropTypes.func,
    onNodeDragEnd: PropTypes.func,
    onNodeDragEnter: PropTypes.func,
    onNodeDragOver: PropTypes.func,
    onNodeDragLeave: PropTypes.func,
    onNodeDrop: PropTypes.func
};

Tree.defaultProps = {
    draggable: false
};

export default Tree;