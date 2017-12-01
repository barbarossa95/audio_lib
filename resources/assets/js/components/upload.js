
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

    watch: {
        test: function (val, oldVal) {
            console.log('value in input ' + val);
        },
    },

});

$(document).ready(() => {
    $('.js-upload-track').click(() => {
        let $modal = $('#uploadModal'),
            $formContainer = $modal.find('.js-form-container');

        let url = laroute.route('track.create');
        axios.get(url)
            .then((response) => {
                $formContainer.html(response.data);
                $modal.modal("show");

                new Vue({
                    el: '#js-vue-upload'
                });
            });
    });
});