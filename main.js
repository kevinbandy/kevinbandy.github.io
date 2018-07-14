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
		change: function(force, event){
			$('.parallax-browser').css('transform', 'scale(1 + ' + force + ')');
		}
	});

	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler);
	}

	function deviceMotionHandler(e) {
		var motion = smootheMotion(e.accelerationIncludingGravity.x * 100, e.accelerationIncludingGravity.y * 100);
		$('#output').html('v2 movement: ' + e.accelerationIncludingGravity.x + ', ' + e.accelerationIncludingGravity.y + 'translates to: x:' + motion.x + ', -' + motion.y );
		$('.parallax-browser').css('transform', 'translate(' + motion.x + 'px, ' + motion.y + 'px)');
	}

	var maxBufferSize = 5;
	var motionBuffer = {
		x: [],
		y: []
	};
	function smootheMotion(x,y) {
		motionBuffer.x.length >= maxBufferSize && motionBuffer.x.slice(0,1);
		motionBuffer.y.length >= maxBufferSize && motionBuffer.y.slice(0,1);

		motionBuffer.x.push(x);
		motionBuffer.y.push(y);

		return {
			x: arrayAverage(motionBuffer.x),
			y: arrayAverage(motionBuffer.y)
		}
	}

	function arrayAverage(inputArray) {
		return inputArray.reduce(function sumElements(accumulator, current) {
			return accumulator + current;
		}) / inputArray.length;
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