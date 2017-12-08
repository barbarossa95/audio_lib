// Waiting audiojs library
audiojs.events.ready(function() {
    let $playlist = $('.playlist');

    let as = audiojs.createAll({
        trackEnded: function() {
            let next = $playlist.find('li.playing').next();
            if (!next.length) next = $playlist.find('li').first();
            next.addClass('playing').siblings().removeClass('playing');
            console.log(next);
            player.load($('a', next).attr('data-src'));
            player.play();
        }
    });

    let player = as[0];

    $playlist.find('li').click(function(e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        player.load($('a', this).attr('data-src'));
        player.play();
    });
});
