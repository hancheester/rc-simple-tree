import React, {PropTypes} from 'react';
import classNames from 'classnames';
import InlineEdit from './inline-edit';
import * as dropPositions from './drop-positions';

const LOAD_STATUS_NONE = 0;
const LOAD_STATUS_LOADING = 1;
const LOAD_STATUS_LOADED = 2;

class TreeNode extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            loadStatus: LOAD_STATUS_NONE
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSelectorClick = this.handleSelectorClick.bind(this);
        this.handleSwitcherClick = this.handleSwitcherClick.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);

        this.renderChildren = this.renderChildren.bind(this);
        this.renderSelector = this.renderSelector.bind(this);
        this.renderSwitcher = this.renderSwitcher.bind(this);

        this.setSelectNodeHandler = this.setSelectNodeHandler.bind(this);
    }

    handleTitleChange(title) {
        console.log(title);
    }

    handleSelectorClick(event) {
        event.preventDefault();
        const {onNodeSelect} = this.context;
        onNodeSelect(event, this);
    }

    handleSwitcherClick(event) {
        event.preventDefault();
        const {onNodeExpand} = this.context;
        const callbackPromise = onNodeExpand(event, this);

        if (callbackPromise && callbackPromise.then) {
            this.setState({loadStatus: LOAD_STATUS_LOADING});

            callbackPromise.then(() => {
                this.setState({loadStatus: LOAD_STATUS_LOADED});
            }).catch(() => {
                this.setState({loadStatus: LOAD_STATUS_NONE});
            });
        }
    }

    handleDragStart(event) {
        event.stopPropagation();
        const {onNodeDragStart} = this.context;
        onNodeDragStart(event, this);
    }

    handleDragEnd(event) {
        event.stopPropagation();
        const {onNodeDragEnd} = this.context;
        onNodeDragEnd(event, this);
    }

    handleDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();
        const {onNodeDragEnter} = this.context;
        onNodeDragEnter(event, this);
    }

    handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        const {onNodeDragOver} = this.context;
        onNodeDragOver(event, this);
    }

    handleDragLeave(event) {
        event.stopPropagation();
        const {onNodeDragLeave} = this.context;
        onNodeDragLeave(event, this);
    }

    handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        const {onNodeDrop} = this.context;
        onNodeDrop(event, this);
    }

    setSelectNodeHandler(element) {
        this.selectNodeHandler = element;
    }

    renderSwitcher() {
        const {expanded, isLeaf} = this.props;
        
        if (isLeaf) {
            return (<span><i className="fa fa-user"></i></span>);
        }

        return (
            <span onClick={this.handleSwitcherClick}>
                <i className={`fa fa-chevron-${expanded ? 'down' : 'right'}`}></i>
                <i className="fa fa-users"></i>
                
            </span>
        );
    }

    renderSelector() {
        const {title, draggable} = this.props;
        const {loadStatus} = this.state;
        
        let loadingIcon;
        if (loadStatus === LOAD_STATUS_LOADING) {
            loadingIcon = (<i className="fa fa-spinner fa-pulse fa-fw"></i>);
        } else {
            loadingIcon = (<i></i>);
        }

        return (
            <span 
                ref={this.setSelectNodeHandler}
                draggable={draggable} 
                aria-grabbed={draggable}
                onClick={this.handleSelectorClick}
                onDragStart={this.handleDragStart}
            >
                <span className="ellipsis">
                    <InlineEdit onChange={this.handleTitleChange} className="tree-node-title" text={title}/>
                </span>
                {loadingIcon}
            </span>
        );
    }

    renderChildren() {
        const {expanded, children} = this.props;
        const {renderTreeNode} = this.context;

        if (children && children.length > 0) {
            return (
                <ul className={
                    classNames('tree-menu', !expanded && 'closed')
                }>
                    {React.Children.map(children, renderTreeNode)}
                </ul>
            );
        }
    }

    render() {
        const {title, className, dropPosition} = this.props;
        
        return (
            <li
                className={
                    classNames(className, {
                        'drop-hint-border': dropPosition === dropPositions.DROP_HINT_BORDER,
                        'drop-hint-top': dropPosition === dropPositions.DROP_HINT_TOP,
                        'drop-hint-bottom': dropPosition == dropPositions.DROP_HINT_BOTTOM
                    })}
                onDragEnter={this.handleDragEnter}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDragEnd={this.handleDragEnd}
                onDrop={this.handleDrop}
            >
                {this.renderSwitcher()}
                {this.renderSelector()}
                {this.renderChildren()}
            </li>
        );
    }
}

TreeNode.propTypes = {
    expanded: PropTypes.bool,
    isLeaf: PropTypes.bool
};

TreeNode.contextTypes = {
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

export default TreeNode;