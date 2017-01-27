'use strict';

import React  from 'react';

export default React.createClass({
    render: function() {
        let className = 'btn ' + (this.props.className || 'btn-default');
        return (
            <button type="button" className={className} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
});
