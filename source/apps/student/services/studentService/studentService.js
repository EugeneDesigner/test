import ajaxRequest from 'core/helpers/ajaxRequest'
import StudentModel from '../../domain/product/studentModel'

const model = new StudentModel(null, {bindEvents: true});

export default {
    clearModel: function() {
        model.clear()
    },

    getData: function() {
        return model.toJSON()
    },

    setAttr: function(name, value) {
        model.set(name, value)
    },

    onChange: function(callback) {
        model.on('change', callback)
    },

    offChange: function(callback) {
        model.off('change', callback)
    },

    isValid: function() {
        return model.isValid()
    },

    getValidationError: function() {
        return model.validationError
    },

    save: function() {
        const saveOptions = this._getSaveOptions()
        return ajaxRequest(saveOptions)
    },

    _getSaveOptions: function() {
        const data = this.getData();
        return {
            type: 'POST',
            url: '/product/save',
            data
        };
    }
};
