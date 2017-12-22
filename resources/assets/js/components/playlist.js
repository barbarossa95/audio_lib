import Vue from 'vue'

Vue.component('playlist', {
    data: function (){
        return {
            tracks: [],
            currentTrack: null,
            currentTrackIndex: 0,
        };
    },

    mounted () {
        let url = laroute.route('track.index');
        axios.get(url)
            .then((response) => {
                this.tracks = response.data;
                this.$refs.loader.style.display = "none";
            })
            .catch((error) => {
                console.error(error);
            });
    },

    methods: {
        selectTrack: function (event, track) {
            this.currentTrack = track;
            this.$emit('track-selected', track);
        },

        getNext: function () {
            if (this.currentTrackIndex >= this.tracks.length) this.currentTrackIndex = 0;
            else this.currentTrackIndex++;
            return this.tracks[this.currentTrackIndex];
        },

        getPrev: function () {
            if (this.currentTrackIndex <= 0) this.currentTrackIndex = this.tracks.length-1;
            else this.currentTrackIndex--;
            return this.tracks[this.currentTrackIndex];
        }

    }
});