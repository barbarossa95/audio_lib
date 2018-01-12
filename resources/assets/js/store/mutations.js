export const mutations = {
    setTracks (state, tracks) {
        state.tracks = tracks;
    },

    addTrack (state, track) {
        state.tracks.push(track);
    },

    removeTrack (state, track) {
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
        state.currentTrackIndex = _.indexOf(state.tracks, state.currentTrack);
    },

    getNext (state) {
        if (++state.currentTrackIndex >= state.tracks.length) state.currentTrackIndex = 0;
        state.currentTrack = state.tracks[state.currentTrackIndex];
    },

    getPrev (state) {
        if (--state.currentTrackIndex < 0) state.currentTrackIndex = state.tracks.length-1;
        state.currentTrack = state.tracks[state.currentTrackIndex];
    },

};