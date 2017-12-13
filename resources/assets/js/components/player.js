import Vue from 'vue'

Vue.component('player', {
    data: function (){
        return {
            as: null,
            player: null,
            tracks: [],
            isShufle: false,
            isRepeat: false,
        };
    },

    mounted () {
        console.log("mounted");
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
            that.player = as[0];

            //test puporses
            that.player.load("/uploads/tracks/fa9d55a067eafe16d022d05c7a3654f4.mp3");

            that.$refs.loader.style.display = "none";
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
        }
    }
});

/**
 * init Vue at the element
 */
document.getElementById('js-vue-player') && new Vue({
    el: '#js-vue-player'
})