import Vue from 'vue'

Vue.component('player', {
    data: function (){
        return {
            as: null,
            player: null,
            track: null,
            isShufle: false,
            isRepeat: false,
        };
    },

    mounted () {
        let that = this; // vue instance

        audiojs.events.ready(function() {
            let $playlist = $(that.$refs.playlist);

            let as = audiojs.createAll({
                trackEnded: that.playNext,
                updatePlayhead: function(b) {
                    let palyed = that.$refs.played
                      , a = this.settings.createPlayer
                      , c = document.getElementsByClassName(a.scrubberClass)[0];
                    document.getElementsByClassName(a.progressClass)[0].style.width = c.offsetWidth * b + "px";
                    c = this.duration * b;
                    b = Math.floor(c / 60);
                    c = Math.floor(c % 60);
                    palyed.innerHTML = (b < 10 ? "0" : "") + b + ":" + (c < 10 ? "0" : "") + c;
                },
                loadStarted: function() {
                    let duration = that.$refs.duration
                      , c = Math.floor(this.duration / 60)
                      , d = Math.floor(this.duration % 60);
                    this.wrapper.classList.remove(this.settings.createPlayer.loadingClass)
                    duration.innerHTML = (c < 10 ? "0" : "") + c + ":" + (d < 10 ? "0" : "") + d
                },
            });
            // init player
            that.player = as[0];

            // disable the loader
            that.$refs.loader.style.display = "none";
        });
    },

    methods: {
        playNext: function (event) {
            this.player.pause();
        },

        playPrev: function (event) {
            this.player.pause();
        },

        togglePlay: function (event) {
            if (this.player.playing) {
                this.player.pause(0);
                this.$refs.play.classList.remove("glyphicon-pause");
                this.$refs.play.classList.add("glyphicon-play");
            } else {
                this.player.play(1);
                this.$refs.play.classList.remove("glyphicon-play");
                this.$refs.play.classList.add("glyphicon-pause");
            }
        },

        toggleShuffle: function (event) {
            if (this.isShufle) this.$refs.shuffle.parentNode.classList.remove('active');
            else this.$refs.shuffle.parentNode.classList.add('active');
            this.isShufle = !this.isShufle;
        },

        toggleRepeat: function (event) {
            if (this.isRepeat) this.$refs.repeat.parentNode.classList.remove('active');
            else this.$refs.repeat.parentNode.classList.add('active');
            this.isRepeat = !this.isRepeat;
        },

        toggleMuted: function (event) {
            if (this.player.element.volume != 0) {
                this.player.setVolume(0);
                this.$refs.mute.classList.remove("glyphicon-volume-up");
                this.$refs.mute.classList.add("glyphicon-volume-off");
            } else {
                this.player.setVolume(1);
                this.$refs.mute.classList.remove("glyphicon-volume-off");
                this.$refs.mute.classList.add("glyphicon-volume-up");
            }
        },

        trackSelected: function (track) {
            this.track = track;
            this.player.load(track.url);
            this.player.play();
        }
    }
});

/**
 * init Vue at the element
 */
document.getElementById('js-vue-player') && new Vue({
    el: '#js-vue-player'
})