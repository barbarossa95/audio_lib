import Vue from 'vue'

let $ = require('jquery');

Vue.component('upload-form', {
    data(){
        return {
            test: 'test text in input',
        };
    },

    mounted() {
        initDropzone();
    },

    watch: {
        test: function (val, oldVal) {
            console.log('value in input ' + val);
        },
    },

});

$(document).ready(() => {
    $('.js-upload-track').click((e) => {
        $(e.target).addClass('loading');
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

function initDropzone() {
    let dZone = new Dropzone('#dropzone', {
        url: laroute.route('track.store'),
        paramName: 'track',
        maxFilesize: 20,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        addRemoveLinks: true,
        init: function () {
            this.on('success', trackUploaded);
            this.on('removedfile', trackRemoved);
            this.on('addedfile', function (file) {
                let maxFiles = 5;

                if (typeof(this.files[maxFiles]) !== 'undefined'){
                    this.removeFile(this.files[maxFiles]);
                    alert('Max file quantity is ' + maxFiles + '!');
                }
            });
        },
        // Only *mp3
        accept: function (file, done) {
            if ((file.type).toLowerCase() !== 'audio/mp3') {
                done('Invalid file');
            } else {
                done();
            }
        },
    });
}

function trackUploaded() {

}

function trackRemoved() {

}