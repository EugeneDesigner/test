'use strict';

const preloading = App.Data.Preloading;

export default {
    get
};

function get(name) {
    return name ? preloading[name] : preloading;
}
