require('./bootstrap');

window.Dropzone = require('dropzone');

audiojs.events.ready(function() {
    let as = audiojs.createAll();
  });


$upload = require('./components/upload.js');