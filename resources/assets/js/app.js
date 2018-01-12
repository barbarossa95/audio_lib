import Vue from 'vue'
import bootstrap from './vendor/bootstrap'

//Store
import store from './store'

//Components
import $upload from './components/upload.js'
import $playlist from './components/playlist.js'
import $player from './components/player.js'


document.getElementById('js-vue-player') && new Vue({
    el: '#app',
    store,
})