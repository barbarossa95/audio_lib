<playlist inline-template id="js-vue-playlist" class='playlist' v-on:track-selected="trackSelected" v-bind:is-playing="isPlaying" ref="{{ $ref }}">
    <div>
        <div v-cloak>
            <ul ref="playlist">
                <li class="playlist_item"
                    v-for="track, index in tracks" :key="index"
                    v-on:click="selectTrack($event, index, track)"
                    v-bind:class="{ 'played': index === currentTrackIndex }" >
                    <span class="playlist_item_playing glyphicon"
                        v-bind:class="{
                            'glyphicon-music': !(index === currentTrackIndex && isPlaying),
                            'glyphicon-play': index === currentTrackIndex && isPlaying,
                        }" >
                    @{{ track.original_filename }}
                </li>
            </ul>
        </div>
        <div ref="loader" class="loader"></div>
        <div class="error">
            <span ref="error"></span>
        </div>
    </div>
</playlist>
