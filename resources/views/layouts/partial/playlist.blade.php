<playlist inline-template id="js-vue-playlist" class='playlist' v-on:track-selected="trackSelected" v-bind:is-playing="isPlaying" ref="{{ $ref }}">
    <div>
        <div v-cloak>
            <ul ref="playlist">
                <li class="playlist_item clearfix"
                    v-for="track, index in tracks" :key="index"
                    v-on:click="selectTrack($event, index, track)"
                    v-bind:class="{ 'played': index === currentTrackIndex }" >
                    <div class="pull-left">
                        <span class="playlist_item_playing glyphicon"
                            v-bind:class="{
                                'glyphicon-music': !(index === currentTrackIndex && isPlaying),
                                'glyphicon-play': index === currentTrackIndex && isPlaying,
                            }" >
                        <span>
                            @{{ track.original_filename }}
                        </span>
                    </div>
                    <span class="pull-right glyphicon glyphicon-option-horizontal"></span>
                </li>
            </ul>
        </div>
        <div ref="loader" class="loader"></div>
        <div class="error">
            <span ref="error"></span>
        </div>
    </div>
</playlist>
