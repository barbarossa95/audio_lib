<upload-form inline-template id="js-vue-upload" class='upgrades' v-cloak>
    <form action="{{ action('TrackController@store') }}" onsubmit="javascript:void(0);">
        <label for="test">Drop yours mp3 here:</label>
        <div id="dropzone" class="dropzone dz-clickable">
        </div>
    </form>
</upload-form>