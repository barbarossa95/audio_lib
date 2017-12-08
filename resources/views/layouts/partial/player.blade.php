<player inline-template id="js-vue-player" class='player' v-cloak>
    <div>
        <audio src="{{ $tracks->first()->url }}"></audio>

        <ul class="playlist">
            @foreach ($tracks as $track)
                <li>
                    <a href="#"
                        class="{{ $loop->first ? 'playing' : '' }}"
                        data-src="{{ $track->url }}">{{ $track->original_filename }}</a>
                </li>
            @endforeach
        </ul>
    </div>
</player>