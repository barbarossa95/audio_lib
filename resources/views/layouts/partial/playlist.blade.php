<playlist inline-template id="js-vue-playlist" class='playlist' v-on:track-selected="trackSelected" ref="{{ $ref }}">
    <div>
        <div v-cloak>
            <ul ref="playlist" v-for="track, index in tracks" :key="index">
                <li class="playlist_item" v-on:click="selectTrack($event, index, track)">@{{ track.original_filename }}</li>
            </ul>
        </div>
        <div ref="loader" class="loader"></div>
        <div class="error">
            <span ref="error"></span>
        </div>
    </div>
</playlist>
