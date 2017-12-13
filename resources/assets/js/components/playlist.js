import Vue from 'vue'

Vue.component('playlist', {
    data: function (){
        return {
            tracks: [],
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
        selectTrack: function(event, track) {
            this.$emit('track-selected', track);
        },
    }
});

/**
 * init Vue at the element
 */
// document.getElementById('js-vue-playlist') && new Vue({
//     el: '#js-vue-playlist'
// })