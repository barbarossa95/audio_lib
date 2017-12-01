
import Vue from 'vue'

let $ = require('jquery');

Vue.component('upload-form', {
    data(){
        return {
            test: 'test text in input',
        };
    },

    mounted() {
        console.log('component mounted');
    },

    whatch: {
        test: function (val, oldVal) {
            console.log('value in input ' + val);
        }
    }

});

$(document).ready(() => {
    $('.js-upload-track').click(() => {

    });
});