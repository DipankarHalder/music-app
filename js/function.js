var audio;

// hide pause button
$('#pause').hide();

// initialize audio
initAudio($('#audio-playlist li:first-child'));

// initializer function
function initAudio(elem){
	var song = elem.attr('song');
	var title = elem.text();
	var cover = elem.attr('cover');
	var artist = elem.attr('artist');

	// create audio object
	audio = new Audio('media/' + song);

	// check and set default time in duration
	if(!audio.currentTime){
		$('#audio-duration').html('0.00');
	}

	// generate dynamic title of song
	$('#audio-player .audio-title').text(title);
	$('#audio-player .audio-artist').text("( " + artist + " )");

	// insert image
	$('img.audio-cover').attr('src', 'img/cover/' + cover);

	//remove active class from audio-playlist, also add class on it
	$('#audio-playlist li').removeClass('active');
	elem.addClass('active');
}

// volume control
$('#audio-volumn').change(function(){
	audio.volume = parseFloat(this.value / 20);
});

// time duration
function showDuration(){
	$(audio).bind('timeupdate', function(){

		//get hours & minutes
		var sec = parseInt(audio.currentTime % 60);
		var mnt = parseInt((audio.currentTime)/ 60) % 60;

		//add 0 if less than 100
		if(sec < 100){
			sec = '0' + sec;
		}
		$('#audio-duration').html(mnt + '.' + sec);
		var value = 0;
		if(audio.currentTime > 0){
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width', value + '%');
	});
}

// play audio
$('#play').on('click', function(){
	audio.play();
	$(this).hide();
	$('#pause').show();
	showDuration();
});

// pause audio
$('#pause').on('click', function(){
	audio.pause();
	$('#play').show();
	$(this).hide();
});

// stop audio
$('#stop').on('click', function(){
	audio.pause();
	audio.currentTime = 0;
	$('#play').show();
	$('#pause').hide();
	$('#audio-duration').html('0.00');
});

// next audio
$('#next').on('click', function(){
	audio.pause();
	var next = $('#audio-playlist li.active').next();
	if(next.length == 0){
		next = $('#audio-playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

// prev audio
$('#prev').on('click', function(){
	audio.pause();
	var prev = $('#audio-playlist li.active').prev();
	if(prev.length == 0){
		prev = $('#audio-playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

// list audio
$('#audio-playlist li').on('click', function(){
	audio.pause();
	initAudio($(this));
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});




