import Vue from 'vue'
import bootstrap from './vendor/bootstrap'
import Dropzone from 'dropzone'

//Components
import $upload from './components/upload.js'
import $playlist from './components/playlist.js'
import $player from './components/player.js'

//Store
import store from './store'

document.getElementById('js-vue-player') && new Vue({
    el: '#app',
    store,
})