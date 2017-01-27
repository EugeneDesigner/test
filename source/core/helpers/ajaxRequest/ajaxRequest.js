import {ajax} from 'jquery';
import _ from 'underscore';
import {Promise} from 'es6-promise-polyfill';
import preloading from 'core/helpers/preloadingDataGetter';

let studentList = preloading.get('Students');
let studentId = studentList[studentList.length - 1].id + 1;

export default function ajaxRequest(options) {
    return new Promise((resolve, reject) => {

        switch (options.url) {
            case '/product/table': {
                const { groupType, query } = options.data;
                let list = groupType ? studentList.filter(item => item.type) : studentList;
                list = query ? list.filter(item => item.name === query) : list;
                setTimeout(() => {
                    resolve({
                        status: true,
                        list,
                        size: list.length
                    });
                }, 500);
                break;
            }

            case '/product/save': {
                const { id, name, image, hours, invited, email } = options.data;
                
                if (id) {
                    const result = studentList.filter(item => item.id === parseInt(id, 10));
                    result[0] = _.extend(result[0], {
                        name,
                        image,
                        hours,
                        invited,
                        email,
                    });
                } else {
                    studentList.push({
                        id: studentId++,
                        name,
                        image,
                        invited: true,
                        email,
                    });
                }
                resolve({
                    status: true,
                });
                break;
            }
        }
    });
}
