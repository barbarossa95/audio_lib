export const actions = {
    initStore ({ commit }, done) {
        let url = laroute.route('track.index');

        axios.get(url)
        .then((response) => {
            commit('setTracks', response.data);
            done();
        }).catch((error) => {
            console.error(error);
        });
    },

    removeTrack ({commit, getters}, track) {
        let url = laroute.route('track.destroy', {track : track.id});

        axios.delete(url)
            .then(response => {
                if (getters.currentTrack && track.id === getters.currentTrack.id) commit('getNext');
                commit('removeTrack', track);
            });
    },
};