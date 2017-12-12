import Vue from 'vue'

Vue.component('player', {
    data: function (){
        return {
            as: null,
            player: null,
            tracks: [],
        };
    },

    mounted () {
        console.log("mounted");
        let that = this; // vue instance

        audiojs.events.ready(function() {
            let $playlist = $(that.$refs.playlist);

            let as = audiojs.createAll({
                trackEnded: that.playNext,
            });
            that.player = as[0];
        });
    },

    methods: {
        playTrack: function(trackSrc) {
            this.player.load(trackSrc);
            this.player.play();
        },

        playNext: function (event) {
            this.player.pause();
        },

        playPrev: function (event) {
            this.player.pause();
        },
    }
});




/**
 * init Vue at the element
 */
document.getElementById('js-vue-player') && new Vue({
    el: '#js-vue-player'
})