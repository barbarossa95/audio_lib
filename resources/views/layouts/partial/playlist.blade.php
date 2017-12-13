<playlist inline-template id="js-vue-playlist" class='playlist'>
    <div>
        <div v-cloak>
            <ul ref="playlist" class="playlist" v-for="track in tracks">
                <li>
                    <a href="#" :src="track.url" >@{{ track.original_filename }}</a>
                </li>
            </ul>
        </div>
        <div ref="loader" class="loader"></div>
        <div class="error">
            <span ref="error"></span>
        </div>
    </div>

</playlist>
