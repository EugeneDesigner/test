import {Model} from 'backbone'
import StudentCollection from '../../domain/product/studentCollection'

export default Model.extend({
    defaults: {
        fetchMode: 'append',
        loading: false,
    },

    initialize() {
        this.studentCollection = new StudentCollection();
    }
});
