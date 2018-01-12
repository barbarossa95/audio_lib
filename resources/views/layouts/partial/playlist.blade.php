<playlist inline-template id="js-vue-playlist" class='playlist' v-on:track-selected="trackSelected" v-bind:is-playing="isPlaying" ref="{{ $ref }}">
    <div>
        <div v-cloak>
            <ul ref="playlist">
                <li class="playlist_item clearfix"
                    v-for="track, index in tracks" :key="index"
                    v-bind:class="{ 'played': index === currentTrackIndex }" >
                    <div class="pull-left">
                        <span class="playlist_item_playing glyphicon"
                            v-on:click="selectTrack($event, index, track)"
                            v-bind:class="{
                                'glyphicon-music': !(index === currentTrackIndex && isPlaying),
                                'glyphicon-play': index === currentTrackIndex && isPlaying,
                            }" >
                        <span v-on:click="selectTrack($event, index, track)">
                            @{{ track.original_filename }}
                        </span>
                    </div>


                    <div class="dropdown pull-right">
                      <div class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span v-on:click="options($event, index, track)"
                            data-toggle="dropdown"
                            class="glyphicon glyphicon-option-horizontal"></span>
                      </div>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <ul>
                            <li><a v-on:click="removeTrack(track)" class="dropdown-item" href="#">Remove track</a></li>
                        </ul>
                      </div>
                    </div>
                </li>
            </ul>
        </div>
        <div ref="loader" class="loader"></div>
        <div class="error">
            <span ref="error"></span>
        </div>
    </div>
</playlist>
