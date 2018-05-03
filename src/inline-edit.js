import React from 'react';

class InlineEdit extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            editing: props.editing,
            text: props.text
        };

        this.keyDown = this.keyDown.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.startEditing = this.startEditing.bind(this);
        this.finishEditing = this.finishEditing.bind(this);
        this.commitEditing = this.commitEditing.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
    }

    keyDown(e) {
        const CARRIAGE_RETURN = 13;
        const ESCAPE = 27;

        if (e.keyCode === CARRIAGE_RETURN) {
            this.finishEditing();
        } else if (e.keyCode === ESCAPE) {
            this.cancelEditing();
        }
    }

    textChanged(e) {
        this.setState({text: e.target.value.trim()});
    }

    startEditing(e) {
        if (this.props.stopPropagation) {
            e.stopPropagation();
        }
        this.setState({editing: true, text: this.props.text});
    }

    finishEditing() {
        if (this.props.text != this.state.text) {
            this.commitEditing();
        } else if (this.props.text === this.state.text) {
            this.cancelEditing();
        }
    }

    commitEditing() {
        this.setState({editing: false, text: this.state.text});
        let newProp = {};
        newProp[this.props.paramName] = this.state.text;
        this.props.onChange(newProp);
    }

    cancelEditing() {
        this.setState({editing: false, text: this.props.text});
    }

    render() {
        if (!this.state.editing) {
            const Element = this.props.staticElement;
            return (<Element
                className={this.props.className}
                onDoubleClick={this.startEditing}>
                {this.state.text || this.props.placeholder}
            </Element>);
        } else {
            const Element = this.props.editingElement;
            return (<Element
                onKeyDown={this.keyDown}
                onBlur={this.finishEditing}
                defaultValue={this.state.text}
                onChange={this.textChanged}/>);
        }
    }
}

InlineEdit.defaultProps = {
    staticElement: 'span',
    editingElement: 'input',
    editing: false
};

export default InlineEdit;