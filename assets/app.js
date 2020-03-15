$(document).ready(function () {
	$("#alert_js").addClass("hidden");
	$("#roomdata").removeClass("hidden");
	let alerts = [];

	if (
		location.protocol !== "https:" &&
		location.hostname !== "localhost" &&
		location.hostname !== "127.0.0.1" &&
		location.hostname !== "0.0.0.0"
	) {
		location.replace(
			`https:${location.href.substring(location.protocol.length)}`
		);
	}

	const domain = "meet.jit.si";
	var room = getParameterByName("kamer");
	if (room) {
		$("body").addClass("fullscreen");
		$("#chan").removeClass("hidden");
		$("#roomdata").addClass("hidden");
		const options = {
			roomName: room,
			parentNode: document.getElementById("meet")
		};

		$("#wrd_disp_a").html(getParameterByName("wrd_a"));
		$("#wrd_disp_b").html(getParameterByName("wrd_b"));
		$("#wrd_disp_c").html(getParameterByName("wrd_c"));

		var api = new JitsiMeetExternalAPI(domain, options);
	} else {
		rnd_id = Math.floor($('#c option').length * Math.random());
		$('#c>option:eq(' + rnd_id + ')').attr('selected', true);
	}

	$('[data-toggle="tooltip"]').tooltip();


	// detect whether user has webcam and microphone

	DetectRTC.load(function () {

		if (false === DetectRTC.isWebRTCSupported) {
			alerts.push('Je browswer ondersteunt videobellen niet. Je gebruikt best Chrome voor Praatbox.');
		} else {
			if ('chrome' === detectBrowser()) {
				if (0 === DetectRTC.videoInputDevices.length) {
					alerts.push('Praatbox kan geen camera (webcam) vinden. Je hebt een camera nodig om Praatbox te gebruiken.');
				}

				if (0 === DetectRTC.audioInputDevices.length) {
					alerts.push('Praatbox kan geen microfoon vinden. Je hebt een microfoon nodig om Praatbox te gebruiken.');
				}
			} else {
				alerts.push('Je gebruikt een andere webbrowser dan Chrome. Praatbox werkt het best in Chrome.');
			}
		}

	});

	let alerttext = '<p>Je praatbox werkt mogelijk niet goed:</p>';

	if (alerts.length > 0) {
		alerttext += '<ul>';
		alerts.forEach(function (a) {
			alerttext += '<li>' + a + '</li>';
		});
		alerttext += '</ul>';
		$("#alert_rtc .alert").html(alerttext);
		$("#alert_rtc").removeClass("hidden");
	}

	autoToggleButtons();
});

function detectBrowser() {
	//Check if browser is IE
	if (navigator.userAgent.search("MSIE") >= 0) {
		return 'msie';
	}
	//Check if browser is Chrome
	else if (navigator.userAgent.search("Chrome") >= 0) {
		return 'chrome';
	}
	//Check if browser is Firefox
	else if (navigator.userAgent.search("Firefox") >= 0) {
		return 'firefox';
	}
	//Check if browser is Safari
	else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
		return 'safari';
	}
	//Check if browser is Opera
	else if (navigator.userAgent.search("Opera") >= 0) {
		return 'opera';
	}

	return 'unknown';
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function copy() {
	let link = "www.praatbox.be/"+generatePraatboxURL(getParameterByName("wrd_a"), getParameterByName("wrd_b"), getParameterByName("wrd_c"));
	navigator.clipboard.writeText(link).then(function(){
		//copying succeeded
	}, function (){
		//workaround if the Permissions API is not available.
		$('#praatboxlink').val(link);
		$('#praatboxlink').select();
		document.execCommand("copy");
	});
}

function generateName(firstInputField, secondInputField, thirdInputField) {
	firstInputField = removeCharacters(firstInputField);
	secondInputField = removeCharacters(secondInputField);
	thirdInputField = removeCharacters(thirdInputField);
	return firstInputField + secondInputField + thirdInputField;
}

function removeCharacters(inputField) {
	const invalidChars = ['?', '&', ':', '\'', '%', '#'];
	invalidChars.forEach(element => {
		inputField.replace(element, '');
	});
	return inputField.trim()
}

function generatePraatboxURL(a,b,c){
	if (
		a !== null &&
		b !== null &&
		c !== null
	) {
		const roomName = generateName(a, b, c);
		return "?kamer=" + roomName + "&wrd_a=" + removeCharacters(a) + "&wrd_b=" + removeCharacters(b) + "&wrd_c=" + removeCharacters(c);
	}
}

function redirectToRoom() {
	var firstInputField = document.getElementById("a").value;
	var secondInputField = document.getElementById("b").value;
	var thirdInputField = document.getElementById("c").value;
	window.location = generatePraatboxURL(firstInputField, secondInputField, thirdInputField);

	$("#chan").removeClass("hidden");
	$("#roomdata").addClass("hidden");
}

function autoToggleButtons() {
	$('.enableOnInput').prop('disabled', true);

	$('#a').keyup(function(){
		if($('#a').val()!=="" && $('#b').val()!==""){
			$('.enableOnInput').prop('disabled', false);
		}else{
			$('.enableOnInput').prop('disabled', true);
		}
	});
	$('#b').keyup(function(){
		if($('#a').val()!=="" && $('#b').val()!==""){
			$('.enableOnInput').prop('disabled', false);
		}else{
			$('.enableOnInput').prop('disabled', true);
		}
	});
}
