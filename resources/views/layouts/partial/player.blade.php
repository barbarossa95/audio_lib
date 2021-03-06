<player inline-template id="js-vue-player" class='player'>
    <div>
        <div v-cloak>
            <div class="player_time">
                <span ref="played" class="player_time-played">00:00</span>
                <span ref="duration" class="player_time-duration">00:00</span>
            </div>
            <audio></audio>
            <div class="player_controls">
                <div class="player_controls-center">
                    <div v-on:click="playPrev" class="player_controls-prev" ><span class="glyphicon glyphicon-step-backward"></span></div>
                    <div v-on:click="togglePlay" class="player_controls-pause" >
                        <span ref="play"
                            class="glyphicon"
                            v-bind:class="{ 'glyphicon-pause': isPlaying, 'glyphicon-play': !isPlaying }"></span>
                    </div>
                    <div v-on:click="playNext" class="player_controls-next" ><span class="glyphicon glyphicon-step-forward"></span></div>
                </div>

                <div class="player_controls-wrapper">
                    <div class="player_controls-left">
                        <div v-on:click="toggleShuffle"
                            class="player_controls-shuffle"
                            v-bind:class="{ 'active': isShufle }" >
                            <span ref="shuffle" class="glyphicon glyphicon-random"></span>
                        </div>
                        <div v-on:click="toggleRepeat"
                            class="player_controls-repeat"
                            v-bind:class="{ 'active': isRepeat }" >
                            <span ref="repeat" class="glyphicon glyphicon-retweet"></span>
                        </div>
                    </div>
                    <div class="player_controls-right">
                        <div v-on:click="toggleMuted" class="player_controls-mute">
                            <span ref="mute" class="glyphicon" v-bind:class="{ 'glyphicon-volume-off': isMuted, 'glyphicon-volume-up': !isMuted}"></span>
                        </div>
                    </div>
                </div>
            </div>
            @include('layouts.partial.playlist', ['ref' => 'playlist'])
        </div>
        <div ref="loader" class="loader"></div>
    </div>
</player>