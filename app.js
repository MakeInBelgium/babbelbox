---
---
$(document).ready(function () {
	$("#alert_js").addClass("hidden");
	$("#roomdata").removeClass("hidden");
	let alerts = [];

	let lang = '';

	if(!localStorage.getItem('activeLanguage')) {
		localStorage.setItem('activeLanguage','nl');
		lang = 'nl'
	} else {
		lang = localStorage.getItem('activeLanguage');
	}

	if ( 'fr' !== lang && 'en' !== lang && 'nl' !== lang ) {
		lang='nl';
	} else {
		localStorage.setItem('activeLanguage',lang);
	}
	
	console.log( lang );

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

		$("#roomurl").val( "https://www.praatbox.be/"+generatePraatboxURL(getParameterByName("wrd_a"), getParameterByName("wrd_b"), getParameterByName("wrd_c")) );

		var api = new JitsiMeetExternalAPI(domain, options);
	} else {
		rnd_id = Math.floor($('#c option').length * Math.random());
		$('#c>option:eq(' + rnd_id + ')').attr('selected', true);
	}

	$('[data-toggle="tooltip"]').tooltip();

	

	// detect whether user has webcam and microphone

	DetectRTC.load(function () {

		if (false === DetectRTC.isWebRTCSupported) {
			alerts.push(getTranslation('no_webrtc'));
		} else {
			if ('chrome' === detectBrowser()) {
				if (0 === DetectRTC.videoInputDevices.length) {
					alerts.push(getTranslation('no_cam'));
				}

				if (0 === DetectRTC.audioInputDevices.length) {
					alerts.push(getTranslation('no_mic'));
				}
			} else {
				alerts.push(getTranslation('no_chrome'));
			}
		}

	});

	// Nakijken of we mobiel bezig zijn, en indien het Android of iOS is, meteen de juiste downloadlink meegeven.
	if(isMobile.any()) {
		var mobileWarning = getTranslation('mobile');
		
		mobileWarning += isMobile.Android() ?
			'<p class="my-2"><a class="btn btn-info" href="https://play.google.com/store/apps/details?id=org.jitsi.meet&hl=nl" target="_blank" rel="noopener nofollow">'+getTranslation("install_app")+'</a></p>' :
			isMobile.iOS() ?
			'<p class="my-2"><a class="btn btn-info" href="https://apps.apple.com/be/app/jitsi-meet/id1165103905?l=nl" target="_blank" rel="noopener nofollow">'+getTranslation("install_app")+'</a></p>' :
			''
		;
		
		alerts.push(mobileWarning);
	}

	let alerttext = '<p>'+getTranslation('errors')+'</p>';

	if (alerts.length > 0) {
		alerttext += '<ul>';
		alerts.forEach(function (a) {
			alerttext += '<li>' + a + '</li>';
		});
		alerttext += '</ul>';
		$("#alert_rtc .alert-warning").html(alerttext);
		$("#alert_rtc .alert-warning").removeClass("hidden");
		$("#alert_rtc").removeClass("hidden");
	}
	autoToggleButtons(alerts.length > 0);


	// Tonen of verbergen uitleg hoe praatbox gebruiken.
	if (document.cookie.indexOf('_ga') < 0 ) {
        $('.hide-for-old-visitors').removeClass('collapse');
        $('.hide-for-old-visitors').addClass('collapse-show');
	}

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

/**
 * Detecting mobile browsers, a KISS way.
 * @see https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$("#linkbtn").click(
	function() {
		let link = "https://www.praatbox.be/"+generatePraatboxURL(getParameterByName("wrd_a"), getParameterByName("wrd_b"), getParameterByName("wrd_c"));
		$("#roomurl").select();

		const el = document.createElement('textarea');
		el.value = link;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		$(this).addClass("clicked");
		$(this).html(getTranslation('link_copied'));
	}
);

function generateName(firstInputField, secondInputField, thirdInputField) {
	let rawname = firstInputField + secondInputField + thirdInputField;
	return cleanInput( rawname );
}

function cleanInput(inputValue) {
	output = inputValue.toLowerCase();
	output = output.replace( /[^a-zA-Z0-9]/g, '' );
	return output;
}

function removeCharacters(inputField) {
	return encodeURIComponent(inputField.trim());
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

	if (
		firstInputField !== null &&
		secondInputField !== null &&
		thirdInputField !== null
	) {
		const roomName = generateName(firstInputField, secondInputField, thirdInputField);

		window.location = "?kamer=" + roomName + "&wrd_a=" + removeCharacters(firstInputField) + "&wrd_b=" + removeCharacters(secondInputField) + "&wrd_c=" + removeCharacters(thirdInputField);

		$("#chan").removeClass("hidden");
		$("#roomdata").addClass("hidden");
	}

}

function showError(input, hasWarnings){
	if (!hasWarnings){
		$("#alert_rtc").removeClass("hidden");
	}
	$("#alert_rtc .alert-danger").html(input)
	$("#alert_rtc .alert-danger").removeClass("hidden");
	$('.enableOnInput').addClass( "hidden" );
}

function checkIfInput(hasWarnings){
	let name = $('#a').val();
	let location = $('#b').val();
	// values too long
	if (name.length + location.length > 200){
		showError('<p>'+getTranslation('max_chars')+'</p>', hasWarnings)
	}
	// name too short
	else if (name.length < 5 && location.length){
		showError('<p>'+getTranslation('min_chars')+'</p>', hasWarnings)
	}
	// incomplete
	else if (!name.length || !location.length) {
		$("#alert_rtc .alert-danger").addClass("hidden");
		$('.enableOnInput').addClass( "hidden" );
		if (!hasWarnings){
			$("#alert_danger").addClass("hidden");
		}
	// should show
	} else {
		$('.enableOnInput').removeClass( "hidden" );
		$("#alert_rtc .alert-danger").addClass("hidden");
		if (!hasWarnings){
			$("#alert_danger").addClass("hidden");
		}
	}
}

function autoToggleButtons(hasWarnings) {
	checkIfInput(hasWarnings);
	
	$('#roomdata input[type=text]').on( "keyup change touchend", function(e){
		checkIfInput(hasWarnings);
	});

}

function sendWhatsapp(){
	let link = "https://www.praatbox.be/"+generatePraatboxURL(getParameterByName("wrd_a"), getParameterByName("wrd_b"), getParameterByName("wrd_c"));
	window.open("https://api.whatsapp.com/send?text="+escape(link), '_blank');
}

function reloadPraatbox(){
	window.location.reload(false);
}

// Translation Part.
if(!localStorage.getItem('activeLanguage')) {
	localStorage.setItem('activeLanguage','nl');
}

// Fill in translations with Jekyll data.
let translations = {{site.data.languages | jsonify }};

function getTranslation(key) {
	if(!translations) {
		console.warn("Translations not loaded yet. Returning key as default message.")
		return key;
	}
	let keyValues = translations[key];
	if(!keyValues) {
		console.error("KEY '" + key + "' 'not found in translations.");
		return "";
	}
	let activeLanguage = localStorage.getItem('activeLanguage');
	let translationValue = keyValues[activeLanguage];
	if(!translationValue) {
		console.error("No translation found for KEY '" + key + "' and language '" + activeLanguage +"'");
		return "";
	}
	return translationValue;
}

// Process translation
function setPageLanguage(lang) {
	localStorage.setItem('activeLanguage', lang);
}
