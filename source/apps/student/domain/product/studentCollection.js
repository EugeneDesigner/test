import {Collection} from 'backbone'
import StudentModel from './studentModel.js'

export default Collection.extend({
    model: StudentModel,
    setAttr(name, value) {
        this.each(model => {
            model.set(name, value)
        })
    },

    setAttrModel(name, value, id) {
        const model = this.findWhere({id})
        model.set(name, value)
    }
})
