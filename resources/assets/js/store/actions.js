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
            .then(response => {
                if (track.id === context.currentTrack.id) context.commit('getNext');
                context.commit('removeTrack', track)
            });
    },
};