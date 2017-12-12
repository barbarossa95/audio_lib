<player inline-template id="js-vue-player" class='player'>
    <div>
        <div v-cloak>
            <div class="player_time">
                <span ref="played"      class="player_time-played">00:00</span>
                <span ref="duration"    class="player_time-duration">00:00</span>
            </div>
            <audio></audio>
            <div class="player_contols">
                <div v-on:click="playPrev"      class="player_contols-prev" ><span class="glyphicon glyphicon-backward"></span></div>
                <div v-on:click="togglePlay"    class="player_contols-pause" ><span class="glyphicon glyphicon-play"></span></div>
                <div v-on:click="playNext"      class="player_contols-next" ><span class="glyphicon glyphicon-forward"></span></div>
                <div v-on:click="toggleMuted"    class="player_contols-mute" ><span class="glyphicon glyphicon-volume-off"></span></div>
            </div>
            <ul ref="playlist" class="playlist" v-for="track in tracks">
                <li>
                    <a href="#" :src="track.url" >@{{ track.original_filename }}</a>
                </li>
            </ul>
        </div>
        <div ref="loader" class="loader"></div>
    </div>
</player>