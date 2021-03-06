$(document).ready(init);

function init() {
	console.log('Welcome to Kevin Bandy\'s web development portfolio. I just want to touch on a few technologies I have experience with and give you an overview of my skills.');
	console.log(technologies);

	technologies.forEach(function assembleTechnologiesList(technology) {
		$('#technologies-list').append(buildTechnologyBlock(technology));
	});

	$('body').mousemove(function (e) {
		parallax(e, $('.parallax-browser')[0], 1);
		parallax(e, $('.parallax-browser-content')[0], 2);
		parallax(e, $('.parallax-scatter-small')[0], .5);
		parallax(e, $('.parallax-scatter-large')[0], 4);
	});

	$('.profile-image').pressure({
		start: function startPressure() {
			$('.profile-image').addClass('being-pressed');
			$('.rpm-readout').addClass('being-pressed');
		},
		end: function release() {
			$('.profile-image').removeClass('being-pressed');
			$('.rpm-readout').removeClass('being-pressed');
			$('.tachometer-needle').css('transform', 'translateX(-50%) rotate(-90deg) scale(0.95)');
		},
		change: function(force, event) {
			var angle = $.pressureMap(force, 0, 1, -90, 85);
			var rpm = $.pressureMap(force, 0, 1, 800, 9000);
			$('.rpm-readout').text(Math.floor(rpm) + ' RPM');
			$('.tachometer-needle').css('transform', 'translateX(-50%) rotate(' + angle + 'deg) scale(0.95)');
		}
	});

	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler);
	}

	function deviceMotionHandler(e) {
		var inputX = Math.floor(e.accelerationIncludingGravity.x * 10);
		var inputY = Math.floor(e.accelerationIncludingGravity.y * 10 + 70);
		$('.parallax-browser').css('transform', 'translate(' + inputX + 'px, ' + (inputY * -1) + 'px)');
		$('.parallax-browser-content').css('transform', 'translate(' + (inputX * 2) + 'px, ' + (inputY * -2) + 'px)');
		$('.parallax-scatter-small').css('transform', 'translate(' + (inputX * .5) + 'px, ' + (inputY * -.5) + 'px)');
		$('.parallax-scatter-large').css('transform', 'translate(' + (inputX * 4) + 'px, ' + (inputY * -4) + 'px)');
	}
}

function parallax(e, target, multiplier) {
	var layer_coeff = 100 / multiplier;
	var x = (e.pageX - ($(window).width() / 2)) / layer_coeff;
	var y = (e.pageY - ($(window).height() / 2)) / layer_coeff;
	$(target).css('transform', 'translate(' + x + 'px,' + y + 'px)');
}

function buildTechnologyBlock(technology) {
	var $outerDiv = $('<li>');
	var $progressBar = $('<div>');
	var $progressBarValue = $('<div>');
	var $innerDiv = $('<div>');
	var $image = $('<img>');
	var $contentArea = $('<div>');
	var $heading = $('<h5>');
	var $tag = $('<strong>');
	var $description = $('<p>');

	$outerDiv.addClass('technology technology-' + generateSlug(technology.technology));
	$innerDiv.addClass('technology-content');
	
	$progressBar.addClass('technology-competence-bar')
	$progressBarValue
		.addClass('technology-competence-bar-value')
		.css({
			width: technology.competence + '%',
			background: technology.primaryColor
		});

	$image
		.addClass('technology-logo')
		.attr("src", getLogoUri(technology.logo));
	$heading
		.addClass('technology-heading')
		.text(technology.technology);
	$description
		.addClass('technology-description')
		.text(technology.description);
	$tag
		.text(technology.level)
		.addClass('technology-level technology-level-' + generateSlug(technology.level));

	$progressBar.append($progressBarValue)
	$outerDiv.append($progressBar);
	$innerDiv.append($image);
	$heading.append($tag);
	$contentArea.append($heading);
	$contentArea.append($description);
	$innerDiv.append($contentArea);
	$outerDiv.append($innerDiv);

	return $outerDiv;
}

function generateSlug(inputString) {
	var spaceReplacedString = inputString.replace(/\/|\s|-|_/g, ' ');
	var spaceReducedString = spaceReplacedString.replace(/\s+/g, ' ');

	return spaceReducedString.split(' ').join('-').toLowerCase();
}

function getLogoUri(logoSlug) {
	return "images/logo_" + logoSlug + ".svg";
}