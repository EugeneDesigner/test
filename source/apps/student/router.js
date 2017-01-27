import {Router} from 'backbone'
import controller from './controller'

export default Router.extend({
    routes: {
        '(/)': controller.scheduleRoute,
        'student(/)': controller.studentRoute,
    }
})
