'use strict';

import Backbone from 'backbone';
import _ from 'underscore';

export default Backbone.Model.extend({
    defaults: {
    	id: null,
    	name: '',
      image: 'source/common/images/invited.png',
      hours: '',
      invited: true,
      email: ''
    },

    initialize: function(attributes, options = {}) {
        const {bindEvents} = options;
        if (bindEvents) {
            this._bindEvents();
        }
    },

    _bindEvents: function() {
        this.on('change:name', this._updateCalory);
        this.on('change:email', this._updateCalory);
    },

    _updateCalory: function() {
        const name = this.get('name');
        const email = this.get('email');
    },

    validate: function(attrs, options) {
        let result = {};

        if (!attrs.name) {
            result.name = 'Please, write name of the student';
        }

        return  _.isEmpty(result) ? null : result;
    },


});
