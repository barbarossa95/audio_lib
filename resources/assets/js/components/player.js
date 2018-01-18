import Vue from 'vue'

Vue.component('player', {
    data: function (){
        return {
            player: null,
            track: null,
            isShufle: false,
            isRepeat: false,
            isMuted: false,
            isPlaying: false
        };
    },

    mounted () {
        let that = this; // vue instance

        audiojs.events.ready(function() {
            let as = audiojs.createAll({
                trackEnded: function() {
                    if (!that.isRepeat) {
                        that.playNext();
                        return;
                    }
                    this.element.currentTime = 0;
                    this.play();
                },
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

    watch: {
        // whenever track changes, this function will start palying it
        track: function (newTrack) {
            this.player.pause();
            this.player.load(newTrack.url);
            this.player.play();
        }
    },

    methods: {
        playNext: function (event) {
            if (!this.isPlaying) this.isPlaying = true;
            this.$refs.playlist.getNext();
            this.track = this.$store.getters.currentTrack;
        },

        playPrev: function (event) {
            if (!this.isPlaying) this.isPlaying = true;
            this.$refs.playlist.getPrev();
            this.track = this.$store.getters.currentTrack;
        },

        togglePlay: function (event) {
            this.isPlaying = !this.player.playing;
            if (!this.track) return this.playNext();
            if (this.player.playing) this.player.pause();
            else this.player.play();
        },

        toggleShuffle: function (event) {
            if (this.isShufle) this.$refs.playlist.unshuffle();
            else this.$refs.playlist.shuffle();
            this.isShufle = !this.isShufle;
        },

        toggleRepeat: function (event) {
            this.isRepeat = !this.isRepeat;
        },

        toggleMuted: function (event) {
            if (this.isMuted) this.player.setVolume(1);
            else this.player.setVolume(0);
            this.isMuted = !this.isMuted;
        },

        trackSelected: function (track) {
            if (!this.isPlaying) this.isPlaying = true;
            this.track = track;
        }
    }
});
