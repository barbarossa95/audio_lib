export const state = {
    tracks: [],
    currentTrackIndex: -1,
    currentTrack: null,
};

export const mutations = {
    setTracks (state, tracks) {
        state.tracks = tracks;
    },

    addTrack (state, track) {
        state.tracks.push(track);
    },

    removeTrack (state, track) {
        if (track.id === state.currentTrack.id) state.currentTrack = getNext();
        state.tracks = _.without(state.tracks, track);
    },

    selectTrack (state, { index, track }) {
        state.currentTrackIndex = index;
        state.currentTrack = track;
    },

    shuffle (state) {
        state.tracks = _.shuffle(state.tracks);
        state.currentTrackIndex = _.indexOf(state.tracks, state.currentTrack);

    },

    unshuffle (state) {
        state.tracks = _.sortBy(state.tracks, (o) => o.created_at);
    },

    getNext (state) {
        if (++this.currentTrackIndex >= this.tracks.length) this.currentTrackIndex = 0;
        return this.currentTrack = this.tracks[this.currentTrackIndex];
    },
};

export const actions = {
    initStore (context, done) {
        let url = laroute.route('track.index');

        axios.get(url)
        .then((response) => {
            context.commit('setTracks', response.data);
            done();
        }).catch((error) => {
            console.error(error);
        });
    },

    removeTrack (context, track) {
        let url = laroute.route('track.destroy', {track : track.id});

        axios.delete(url)
            .then(response => context.commit('removeTrack', track));
    },
};