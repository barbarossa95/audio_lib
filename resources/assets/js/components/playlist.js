import Vue from 'vue'
import { EventBus } from './event-bus.js'

Vue.component('playlist', {
    data: function (){
        return {
            tracks: [],
            currentTrack: null,
            currentTrackIndex: -1,
        };
    },
    props: ['isPlaying'],

    mounted () {
        EventBus.$on('track-uploaded', this.trackUploaded);
        EventBus.$on("track-removed", this.trackRemoved);

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
        trackUploaded: function (track) {
            this.tracks.push(track);
        },

        trackRemoved: function (track) {
            if (track.id === this.currentTrack.id) this.getNext();
            this.tracks = _.without(this.tracks, track);
        },

        selectTrack: function (event, index, track) {
            this.currentTrackIndex = index;
            this.currentTrack = track;
            this.$emit('track-selected', track);
        },

        getNext: function () {
            if (++this.currentTrackIndex >= this.tracks.length) this.currentTrackIndex = 0;
            return this.currentTrack = this.tracks[this.currentTrackIndex];
        },

        getPrev: function () {
            if (--this.currentTrackIndex < 0) this.currentTrackIndex = this.tracks.length-1;
            return this.currentTrack = this.tracks[this.currentTrackIndex];
        },

        shuffle: function () {
            this.tracks = _.shuffle(this.tracks);
            this.currentTrackIndex = _.indexOf(this.tracks, this.currentTrack);
        },

        unshuffle: function () {
            this.tracks = _.sortBy(this.tracks, (o) => o.created_at);
            this.currentTrackIndex = _.indexOf(this.tracks, this.currentTrack);
        },
    }
});