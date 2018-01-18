export const getters = {
    currentTrack: (state) => {
        return state.currentTrack;
    },

    getTrackById: (state) => (id) => {
        return state.tracks.find(track => track.id === id)
    }
};