'use strict';

import React  from 'react';
import ReactDOM  from 'react-dom';

export default class CheckboxView extends React.Component {
    componentDidMount() {
        if (this.props.indeterminate) {
            _setIndeterminate.call(this, true);
        }
    }

    componentDidUpdate(previousProps) {
        _setIndeterminate.call(this, this.props.indeterminate);
    }

    render() {
        const checkedLink = _getCheckedLink.call(this);
        return (
            <input type="checkbox" checkedLink={checkedLink} />
        );
    }
}

function _getCheckedLink() {
    const view = this;
    const {checked} = this.props;
    return {
        value: checked,
        requestChange: (checked) => {
            _onChange.call(view, checked);
        }
    };
}

function _onChange(checked) {
    const handlers = this.props.handlers || {};
    if (handlers.onChangeChecked) {
        handlers.onChangeChecked(checked);
    }
}

function _setIndeterminate(indeterminate) {
    const node = ReactDOM.findDOMNode(this);
    node.indeterminate = indeterminate;
}

