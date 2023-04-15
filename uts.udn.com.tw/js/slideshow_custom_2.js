$(document).ready(function(){
  $('.hero-slider').slick({
	arrows: true,
  });
});




var vPlayer = [];
var videoSrc = [];

$(function(){
	$(".hero .v-player").each(function(){
		vPlayer.push( $(this).attr("id") );
		videoSrc.push( $(this).data("src") );
	});
});



// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var players = [];

function onYouTubePlayerAPIReady() {
	for (var i = 0; i < vPlayer.length; i++) {
		players[ vPlayer[i] ] = new YT.Player(vPlayer[i], {
			height: '360',
			width: '640',
			videoId: videoSrc[i]
		});
	}
}

$(function(){
	function stop() {
		$(".slick-active").siblings().each(function(){
			if ( $(this).find(".v-player").length > 0 ) {
				players[$(this).find(".v-player").attr("id")].stopVideo();
				//console.log($(this).find(".v-player").attr("id"));
			}
		});
	}
	
	$(".slick-prev, .slick-next").add(".slick-dots li").click(function(){
		stop();
	});
	
	$(".slick-slide").on("dragstart", function(){
		stop();
	});
	
	setTimeout(function(){
		$(".hero iframe").height( $(".hero-photo").height() - $(".hero-content").innerHeight() );
	}, 2000);
	
	// stop videos which are not current
	setInterval(function(){
		stop();
	}, 1000);
});

$(window).resize(function(){
	setTimeout(function(){
		$(".hero iframe").height( $(".hero-photo").height() - $(".hero-content").innerHeight() );
	}, 500);
});




