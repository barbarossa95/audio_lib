import Vue from 'vue'

Vue.component('playlist', {
    data: function (){
        return {
            tracks: [],
        };
    },

    mounted () {
        console.log("mounted");
        let url = laroute.route('track.index');
        axios.get(url)
            .then((response) => {

            })
            .catch()
    },

    methods: {

    }
});

/**
 * init Vue at the element
 */
document.getElementById('js-vue-playlist') && new Vue({
    el: '#js-vue-playlist'
})