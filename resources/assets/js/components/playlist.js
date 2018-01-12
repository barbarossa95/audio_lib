import Vue from 'vue'

Vue.component('playlist', {
    data: function (){
        return {
        };
    },
    props: ['isPlaying'],

    computed: {
        tracks () {
            return this.$store.state.tracks;
        },
        currentTrack () {
            return this.$store.state.currentTrack;
        },
        currentTrackIndex () {
            return this.$store.state.currentTrackIndex;
        },
    },

    mounted () {
        this.$store.dispatch('initStore', e => this.$refs.loader.style.display = "none");
    },

    methods: {
        removeTrack: function (track) {
            if (track.id === this.currentTrack.id) this.getNext();
            this.$store.dispatch('removeTrack')
        },

        selectTrack: function (event, index, track) {
            this.$store.commit('selectTrack', { index, track });
            this.$emit('track-selected', track);
        },

        getNext: function () {
            this.$store.commit('getNext');
        },

        getPrev: function () {
            if (--this.currentTrackIndex < 0) this.currentTrackIndex = this.tracks.length-1;
            return this.currentTrack = this.tracks[this.currentTrackIndex];
        },

        shuffle: function () {
            this.$store.commit('shuffle');

            this.tracks = _.shuffle(this.tracks);
            this.currentTrackIndex = _.indexOf(this.tracks, this.currentTrack);
        },

        unshuffle: function () {
            this.tracks = _.sortBy(this.tracks, (o) => o.created_at);
            this.currentTrackIndex = _.indexOf(this.tracks, this.currentTrack);
        },
    }
});