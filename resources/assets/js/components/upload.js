import Vue from 'vue'
import store from '../store'


let $ = require('jquery');
let tracksCount = 0;

var bus = new Vue();

$(document).ready(() => {
    let $modal = $('#uploadModal'),
        $formContainer = $modal.find('.js-form-container');
    $('.js-upload-track').click((e) => {
        let $btn = $(e.target);
        $btn.addClass('loading');
        $btn.addClass('disabled');

        let url = laroute.route('track.create');
        axios.get(url)
            .then((response) => {
                $formContainer.html(response.data);
                initDropzone();
                $btn.removeClass('loading');
                $btn.removeClass('disabled');
                $modal.modal("show");
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
                let maxFiles = 6;

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

function trackUploaded(file, response) {
    tracksCount++;
    file.id = response.track.id;
    store.commit('addTrack', response.data.track);
}

function trackRemoved(file) {
    tracksCount--;

    if (typeof (file.id) === 'undefined') {
        return;
    }

    let url = laroute.route('track.destroy', {track : file.id});

    axios.delete(url)
        .then(response => {
            store.commit('removeTrack', response.data.track);
        });
}