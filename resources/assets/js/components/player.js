import Vue from 'vue'

Vue.component('player', {
    data: function (){
        return {
            as: null,
            player: null
        };
    },

    beforeMount() {
        console.log("beforeMount");
    },

    mounted () {
        let that = this; // vue instance
        // Waiting audiojs library
        audiojs.events.ready(function() {
            let $playlist = $(that.$refs.playlist);

            let as = audiojs.createAll({
                trackEnded: function() {
                    let next = $playlist.find('li.playing').next();
                    if (!next.length) next = $playlist.find('li').first();
                    next.addClass('playing').siblings().removeClass('playing');
                    player.load($('a', next).attr('data-src'));
                    player.play();
                },
                createPlayer: {
                    markup: '\
                  <div class="play-controls"> \
                      <div @click="playPrev" class="play-prev" ></div>\
                      <div class="play-pause"> \
                        <p class="play"></p> \
                        <p class="pause"></p> \
                        <p class="loading"></p> \
                        <p class="error"></p> \
                      </div> \
                      <div @click="playNext" class="play-next"></div>\
                  </div> \
                  <div class="scrubber"> \
                    <div class="progress"></div> \
                    <div class="loaded"></div> \
                  </div> \
                  <div class="time"> \
                    <em class="played">00:00</em>/<strong class="duration">00:00</strong> \
                  </div> \
                  <div class="error-message"></div>',
                    playPauseClass: 'play-pause',
                    scrubberClass: 'scrubber',
                    progressClass: 'progress',
                    loaderClass: 'loaded',
                    timeClass: 'time',
                    durationClass: 'duration',
                    playedClass: 'played',
                    errorMessageClass: 'error-message',
                    playingClass: 'playing',
                    loadingClass: 'loading',
                    errorClass: 'error'
                }
            });

            that.player = as[0];

            $playlist.find('li').click(function(e) {
                e.preventDefault();
                $(this).addClass('playing').siblings().removeClass('playing');
                that.player.load($('a', this).attr('data-src'));
                that.player.play();
            });
        });
    },

    methods: {
        playNext: function (event) {
            console.log('playNext');
            let $playlist = $(this.$refs.playlist);
            this.player.pause();
            let next = $playlist.find('li.playing').next();
            if (!next.length) next = $playlist.find('li').first();
            next.addClass('playing').siblings().removeClass('playing');
            this.player.load($('a', next).attr('data-src'));
            this.player.play();
        },

        playPrev: function (event) {
            console.log('playPrev');
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