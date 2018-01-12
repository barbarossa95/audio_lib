import Vue from 'vue'

Vue.component('playlist', {

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
            this.$store.dispatch('removeTrack', track)
        },

        selectTrack: function (event, index, track) {
            this.$store.commit('selectTrack', { index, track });
            this.$emit('track-selected', track);
        },

        options: function (event, index, track) {
            $(event.target).parent().dropdown();
        },

        getNext: function () {
            this.$store.commit('getNext');
        },

        getPrev: function () {
            this.$store.commit('getPrev');
        },

        shuffle: function () {
            this.$store.commit('shuffle');
        },

        unshuffle: function () {
            this.$store.commit('unshuffle');
        },
    }
});