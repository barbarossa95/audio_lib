import Vue from 'vue'

Vue.component('player', {
    mounted () {
        // Waiting audiojs library
        audiojs.events.ready(function() {
            let $playlist = $('.playlist');

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
                  <div class="prev"></div>\
                  <div class="play-pause"> \
                    <p class="play"></p> \
                    <p class="pause"></p> \
                    <p class="loading"></p> \
                    <p class="error"></p> \
                  </div> \
                  <div class="next"></div>\
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

            let player = as[0];

            $playlist.find('li').click(function(e) {
                e.preventDefault();
                $(this).addClass('playing').siblings().removeClass('playing');
                player.load($('a', this).attr('data-src'));
                player.play();
            });

            console.log('mounted');

        });
    }
});




/**
 * init Vue at the element
 */
document.getElementById('js-vue-player') && new Vue({
    el: '#js-vue-player'
})