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

function getLink(){
	return "https://www.praatbox.be/"+generatePraatboxURL(getParameterByName("wrd_a"), getParameterByName("wrd_b"), getParameterByName("wrd_c"));
}

function sendWhatsapp(){
	let link = getLink();
	window.open("https://api.whatsapp.com/send?text="+escape(link), '_blank');
}

function sendMail(){
	let link = getLink();
	window.open("mailto:?body=" + escape(link), '_blank');
}

function reloadPraatbox(){
	window.location.reload(false);
}

// Translation Part.
if(!localStorage.getItem('activeLanguage')) {
	localStorage.setItem('activeLanguage','nl');
}

// Fill in translations with Jekyll data.
let translations = {"javascript-disabled":{"nl":"Je hebt Javascript uitgeschakeld. Javascript is noodzakelijk voor Praatbox.","en":"You have disabled Javascript. Javascript is required for Praatbox","fr":"Vous avez désactivé Javascript. Javascript est nécessaire pour Praatbox"},"intro":{"nl":"Met Praatbox kan je videobellen met iemand waar je geen fysiek contact mee mag hebben.","en":"Praatbox allows you to videocall someone you can't have physical contact with.","fr":"Avec Praatbox, vous pouvez passer des appels vidéo à une personne avec laquelle vous n'êtes pas autorisé à avoir un contact physique."},"how-to-use":{"nl":"Hoe gebruik je de Praatbox?","en":"How do you use the Praatbox?","fr":"Comment utiliser la Praatbox?"},"steps-1":{"nl":"Geef je Praatbox een naam. Bedenk een naam en vul die in het eerste veld in, of vul de naam in die je hebt gekregen.","en":"Give your Praatbox a name. Make up a name and type it in the first field. <br/>  For an existing Praatbox, fill in the name you got from your contact.","fr":"Donnez un nom à votre Praatbox. Trouvez un nom et saisissez-le dans le premier champ, ou saisissez le nom que quelqu'un vous a donné."},"steps-2":{"nl":"Geef je Praatbox een locatie. Vul dit in het tweede veld in, of vul hier de locatie in die je hebt gekregen.","en":"Give your Praatbox a location. Type your location into the second field. <br/> For an existing Praatbox, fill in the location you got from your contact.","fr":"Donnez une localisation à votre Praatbox. Tapez votre localisation dans le deuxième champ. Pour une Praatbox existante, indiquez la localisation que vous avez obtenu de votre contact."},"steps-3":{"nl":"Kies een willekeurig woord, of hou de automatisch gemaakte keuze. Wil je deelnemen aan een bestaande Praatbox, kies dan het woord dat je hebt gekregen.","en":"Either choose a random word, or keep the automatically generated one. <br/>  For an existing Praatbox, choose the word you got from your contact.","fr":"Choisissez un mot au hasard ou conservez celui qui est généré automatiquement. Pour une Praatbox existante, choisissez le mot que vous avez obtenu de votre contact."},"steps-4":{"nl":"Als je de vorige stappen hebt ondernomen, klik je op \"Start de praatbox","en":"If you have executed the steps above, click the \"Start Praatbox\" button","fr":"Si vous avez exécuté les étapes ci-dessus, cliquez sur le bouton \"Start Praatbox\"."},"steps-5":{"nl":"De Praatbox start op! <br />(Daarna kan je eventueel je praatbox beveiligen met een paswoord. Zie <i class=\"fas fa-info-circle\"></i> rechts onderaan)","en":"The Praatbox is starting! <br />(Afterwards, you can secure it with a password. See <i class=\"fas fa-info-circle\"></i> bottom-right corner)","fr":"Le Praatbox commence ! <br />(Ensuite, vous pouvez la sécuriser avec un mot de passe. Voir <i class=\"fas fa-info-circle\"></i> coin inférieur droit)"},"steps-6":{"nl":"Je kan deze praatbox nu delen op allerlei verschillende manieren, het enige wat je moet doen is de link kopiëren.","en":"You can now share this praatbox in a lot of different ways, the only thing you need to do is copy the link","fr":"Vous pouvez maintenant partager cette praatbox de différentes manières, la seule chose à faire est de copier le lien"},"steps-more-questions":{"nl":"Heb je nog vragen? Misschien vind je ze terug bij de <a href=\"/vragen.html\">veelgestelde vragen</a>.","en":"Got more questions? Maybe you can find an answer in the <a href=\"/vragen.html\">frequently asked questions</a>.","fr":"Vous avez d'autres questions ? Vous trouverez peut-être une réponse dans la <a href=\"/vragen.html\">foire aux questions</a>."},"start-a-box":{"nl":"Start een Praatbox","en":"Start a Praatbox","fr":"Démarrez un Praatbox"},"name-limitations":{"nl":"Opgelet! <br><span>Gebruik enkel cijfers en letters in de velden</span>","en":"Beware! <br><span>Only use numbers and letters in the input fields</span>","fr":"Attention ! <br><span>Utilisez uniquement des chiffres et des lettres dans les champs</span>"},"input-too-long":{"nl":"Input te lang","en":"Input is too long","fr":"Entrée trop longue"},"praatbox-name":{"nl":"Naam van je Praatbox","en":"Name of your Praatbox","fr":"Nom de votre Praatbox"},"praatbox-location":{"nl":"Locatie van je Praatbox","en":"Location of your Praatbox","fr":"Localisation de votre Praatbox"},"random-word":{"nl":"Willekeurig woord","en":"Random word","fr":"Mot aléatoire"},"start-praatbox":{"nl":"Start de Praatbox","en":"Start the Praatbox","fr":"Démarrez la Praatbox"},"faq":{"nl":"Veelgestelde vragen","en":"Frequently asked questions","fr":"Foire aux questions"},"meeting-header-text":{"nl":"Vul op <strong><a href=\"https://www.praatbox.be\">www.praatbox.be</a></strong><span class=\"wrd_disp\" id=\"wrd_disp_a\"></span> <span class=\"wrd_disp\" id=\"wrd_disp_b\"></span> <span class=\"wrd_disp\" id=\"wrd_disp_c\"></span> in om mee te doen.","en":"Enter on <strong><a href=\"https://www.praatbox.be\">www.praatbox.be</a></strong><span class=\"wrd_disp\" id=\"wrd_disp_a\"></span> <span class=\"wrd_disp\" id=\"wrd_disp_b\"></span> <span class=\"wrd_disp\" id=\"wrd_disp_c\"></span> to participate.","fr":"Remplissez sur <strong><a href=\"https://www.praatbox.be\">www.praatbox.be</a></strong><span class=\"wrd_disp\" id=\"wrd_disp_a\"></span> <span class=\"wrd_disp\" id=\"wrd_disp_b\"></span> <span class=\"wrd_disp\" id=\"wrd_disp_c\"></span> pour participer"},"copy-link":{"nl":"Kopieer link","en":"Copy link","fr":"Copier le lien"},"reload":{"nl":"Herladen","en":"Reload","fr":"Rafraîchir"},"no_webrtc":{"nl":"Je browser ondersteunt videobellen niet. Je gebruikt best Chrome voor Praatbox.","en":"Your browser doesn't support videoconferencing. We recommend using Praatbox with Chrome.","fr":"Votre navigateur ne prend pas en charge la vidéoconférence. Nous recommandons d'utiliser Praatbox avec Chrome"},"no_cam":{"nl":"Praatbox kan geen camera (webcam) vinden. Je hebt een camera nodig om Praatbox te gebruiken.","en":"Praatbox could not find a webcam. You need a camera if you want to use Praatbox.","fr":"Praatbox ne trouve pas de caméra (webcam). Vous avez besoin d'un appareil photo pour utiliser la Praatbox"},"no_mic":{"nl":"Praatbox kan geen microfoon vinden. Je hebt een microfoon nodig om Praatbox te gebruiken.","en":"Praatbox could not find a microphone. You need a microphone if you want to use Praatbox.","fr":"Praatbox ne trouve pas de micro. Vous avez besoin d'un micro pour utiliser la Praatbox"},"no_chrome":{"nl":"Je gebruikt een andere webbrowser dan <a href=\"https://www.google.com/intl/nl/chrome/\">Chrome</a>. Praatbox werkt het best in <a href=\"https://www.google.com/intl/nl/chrome/\">Chrome</a>.","en":"You are using a different webbrowser than <a href=\"https://www.google.com/intl/nl/chrome/\">Chrome</a>. Praatbox works best with <a href=\"https://www.google.com/intl/nl/chrome/\">Chrome</a>.","fr":"Vous utilisez un navigateur web autre que <a href=\"https://www.google.com/intl/nl/chrome/\">Chrome</a>. Praatbox fonctionne mieux dans <a href=\"https://www.google.com/intl/nl/chrome/\">Chrome</a>."},"mobile":{"nl":"Het lijkt erop dat je op een <strong>mobiel toestel</strong> werkt. Gelieve eerst te controleren of je de applicatie al hebt geïnstalleerd.","en":"It looks like you are using Praatbox on a <strong>mobile device</strong>. Please check if you have installed the required application.","fr":"On dirait que vous travaillez sur un <strong> appareil mobile</strong>. Veuillez d'abord vérifier si vous avez déjà installé l'application"},"install_app":{"nl":"Installeer de app","en":"Install the app","fr":"Installer l'application"},"errors":{"nl":"Je praatbox werkt mogelijk niet goed","en":"Your praatbox doesn't seem to be working correctly","fr":"Votre praatbox ne semble pas fonctionner correctement"},"link_copied":{"nl":"Link gekopieerd","en":"Link copied","fr":"Lien copié"},"max_chars":{"nl":"Gelieve de naam en locatie van je praatbox te beperken tot maximaal 100 letters of cijfers.","en":"Please limit the name and the location of your praatbox to a maximum of 100 numbers or letters.","fr":"Veuillez limiter le nom et l'emplacement de votre boîte de discussion à un maximum de 100 lettres ou chiffres."},"min_chars":{"nl":"Gelieve voor de naam van je praatbox minstens 5 letters of cijfers te voorzien.","en":"Please provide at least 5 numbers or letters for the name of your praatbox.","fr":"Veuillez fournir au moins 5 lettres ou chiffres pour le nom de votre boîte de discussion."},"faq_1":{"nl":"Wat gebeurt er als ik geen paswoord instel?","en":"What happens if I do not configure a password?","fr":"Que se passe-t-il si je ne définis pas de mot de passe?"},"faq_1_a":{"nl":"Indien je geen paswoord instelt kan iedereen ter wereld het videogesprek bijwonen. Het is alsof de virtuele voordeur openstaat en iedereen plots in een gesprek kan inspringen. Dit kan soms verschieten zijn, dus we raden sterk aan om een paswoord in te stellen (ook voor privacy redenen kan dit noodzakelijk zijn).","en":"If you do not configure a password anyone in the world can join your video call. You can compare it to leaving your virtual door open. Anyone can join the conversation. This is most often not what you want. This is why we recommend setting a password.","fr":"Si vous ne définissez pas de mot de passe, tout le monde peut assister à l'appel vidéo. C'est comme si la porte d'entrée virtuelle était ouverte et que tout le monde pouvait soudainement se lancer dans une conversation. Cela peut parfois être terrible, c'est pourquoi nous recommandons vivement de définir un mot de passe (cela peut également être nécessaire pour des raisons de confidentialité)"},"faq_2":{"nl":"Hoe kan ik een paswoord toevoegen aan mijn praatbox?","en":"How can I configure a password for my praatbox?","fr":"Comment puis-je ajouter un mot de passe à ma Praatbox ?"},"faq_2_a":{"nl":"De eerste persoon die de praatbox opstart kan een paswoord toe voegen door:","en":"The first person to enter the praatbox can enter a password by:","fr":"La première personne à lancer la praatbox peut ajouter un mot de passe en :"},"faq_2_a_li_1":{"nl":"te klikken op <i class=\"fas fa-info-circle\"></i> (rechts onderaan in je scherm te vinden)","en":"clicking <i class=\"fas fa-info-circle\"></i> (bottom right corner of the screen)","fr":"cliquant sur <i class=\"fas fa-info-circle\"></i> (en bas à droite de votre écran)"},"faq_2_a_li_2":{"nl":"vervolgens op \"Add password\" klikken. Typ een sterk paswoord in het veld en druk op enter.","en":"click \"Add password\". Type a password in the field and press enter.","fr":"et ensuite sur \"Add password\". Tapez un mot de passe dans le champ et appuyez sur la touche Entrée"},"faq_2_a_end":{"nl":"Het paswoord is pas actief als je de tekst \"cancel password\" niet meer ziet, of ook als je de tekst \"remove password\" ziet.","en":"Het password will be active as soon as you no longer see the \"cancel password\", or if you see \"remove password\"","fr":"Le mot de passe n'est actif que lorsque vous ne voyez plus le texte \"annuler le mot de passe\", ou lorsque vous voyez également le texte \"supprimer le mot de passe\"."},"faq_2_img":{"nl":"Beeld: Screenshot","en":"Image: Screenshot","fr":"Image : Capture d'écran"},"faq_3":{"nl":"Kan ik een paswoord terug verwijderen?","en":"Can I remove a password after I added it?","fr":"Puis-je à nouveau supprimer un mot de passe ?"},"faq_3_a":{"nl":"Ja, de eerste persoon (laptop / computer) die het videogesprek aangemaakt heeft kan een paswoord verwijderen door te klikken op \"remove password\".","en":"Yes! The person who created the Praatbox can remove the password again by clicking \"Remove Password\".","fr":"Oui, la première personne à passer l'appel vidéo peut supprimer un mot de passe en cliquant sur \"supprimer le mot de passe\"."},"faq_4":{"nl":"Wat is een sterk paswoord?","en":"What is a good password?","fr":"Qu'est-ce qu'un mot de passe fort ?"},"faq_4_a":{"nl":"Minstens 8 karakters, liefst een mix van letters en cijfers. Nog sterker is om een leesteken toe te voegen, maar dat is niet noodzakelijk.","en":"Use at least 8 characters, preferably a mix of letters and numbers. Using other symbols is a plus, but not required.","fr":"Au moins 8 caractères, de préférence un mélange de lettres et de chiffres. Il est encore plus fort si vous ajoutez un signe de ponctuation, mais ce n'est pas nécessaire"},"faq_5":{"nl":"Voor rusthuizen/ziekenhuizen: Is het mogelijk om per bewoner een babbelbox sessie op te zetten, enkel voor zijn/haar familie?","en":"For retirement homes/hospitals: Is it possible to create a Praatbox for a single person and his/her family?","fr":"Pour les maisons de retraite/hôpitaux : est-il possible de créer une Praatbox pour une personne et sa famille ?"},"faq_5_a":{"nl":"Door slim om te gaan met het laatste keuzewoord, kan je zelf een schema opstellen wanneer welke bewoner een babbelbox contactmoment heeft met enkel zijn/haar familie. <br/>Voorbeeld: <br/>Eerste woord: naam van je WZC<br/>Tweede woord: gemeente of iets anders<br/>Derde woord: dit kies je op voorhand voor elke bewoner. <br/><br/>Je spreekt dan bijvoorbeeld een schema af<br/>14:00 Bewoner Anna, derde woord is kip<br/>14:30 Bewoner Bert, derde woord is kat","en":"By being creative with the last word of choice, you can setup a schedule for all the inhabitants and their families. <br/>Example: <br/>First word: name of your hospital/retirement home<br/>Second word: your location<br/>Third word: choose this for each specific inhabitant. <br/><br/>This way, you can determine a shedule: <br/>14:00 Inhabitant Anna, 3rd word is \"kip\"<br/>14:30 Inhabitant Bert, 3rd word is kat","fr":"En utilisant intelligemment le dernier mot, vous pouvez établir un schéma où chaque résident a une session de chat avec uniquement sa famille. <br/>Par exemple : <br/>Premier mot : nom de votre hôpital<br/>Deuxième mot : localisation ou autre chose <br/>Troisième mot : vous le choisissez à l'avance pour chaque résident. <br/><br/>Vous convenez ensuite d'un horaire, par exemple<br/>14:00 Occupant Anna, le troisième mot est poulet<br/>14:30 Occupant Bert, le troisième mot est chat."},"faq_6":{"nl":"Ik krijg geen beeld te zien en/of mensen horen me niet","en":"I am not seeing anything and/or people can't hear me","fr":"Je ne vois rien et/ou les gens ne peuvent pas m'entendre"},"faq_6_a":{"nl":"Bij het openen van het videogesprek vraagt je internetbrowser om toegang tot je microfoon en camera. Druk hier steeds op toestaan (allow). Het popupvenster dat je hiervoor te zien krijgt ziet er verschillend uit afhankelijk van je internet browser of besturingssysteem.","en":"When you open the video-call, your internetbrowser will ask you for permission to access your microphone and camera. Make sure you press \"allow\" on the following screen. It may look slightly different based on what browser you are using.","fr":"Lors de l'ouverture de l'appel vidéo, votre navigateur Internet vous demande d'accéder à votre microphone et à votre caméra. Appuyez toujours sur autoriser (allow). La fenêtre contextuelle (pop-up) que vous verrez aura un aspect différent selon votre navigateur internet ou votre système d'exploitation."},"faq_6_ttl_img":{"nl":"Enkele voorbeelden:","en":"A few examples:","fr":"Quelques exemples"},"faq_6_a_end":{"nl":"Indien het niet lukt, probeer dan een andere internetbrowser om het videogesprek te openen. <br/><a href=\"https://www.google.com/intl/nl/chrome/\">Google Chrome</a> geeft (doorgaans) het minste problemen en kan je downloaden via <a href=\"https://www.google.com/intl/nl/chrome/\">https://www.google.com/intl/nl/chrome/</a>.<br/>De Safari browser (standaard op Apple producten) wordt afgeraden.","en":"In case it is not working, try a different internetbrowser. <br/><a href=\"https://www.google.com/intl/nl/chrome/\">Google Chrome</a> is recommended. You can download it at <a href=\"https://www.google.com/intl/nl/chrome/\">https://www.google.com/intl/nl/chrome/</a>.<br/>The Safari browser (standard on Apple products) is not recommended.","fr":"Si cela ne fonctionne pas, essayez un autre navigateur internet pour ouvrir l'appel vidéo. <br/><a href=\"https://www.google.com/intl/nl/chrome/\">Google Chrome</a> donne (généralement) le moins de problèmes et peut être téléchargé à partir de <a href=\"https://www.google.com/intl/nl/chrome/\">https://www.google.com/intl/nl/chrome/</a>.<br/>Le navigateur Safari (standard sur les produits Apple) n'est pas recommandé."},"faq_7":{"nl":"Hoe ziet een Praatbox sessie met meerdere deelnemers er uit?","en":"What does a Praatbox session with multiple participants look like?","fr":"À quoi ressemble une session Praatbox à plusieurs participants ?"},"faq_7_a":{"nl":"De verschillende beelden komen dan naast en onder elkaar te staan:","en":"The different images will be placed next to eachother","fr":"Les différentes images seront côte à côte et en dessous les unes des autres :"},"faq_7_ttl_img":{"nl":"Beeld: Mozaïekbeeld van video","en":"Image: Example of multi-person call","fr":"Image : Exemple d'appel à plusieurs personnes"},"faq_8":{"nl":"Hoe stel ik de taal in?","en":"How do I configure a language?","fr":"Comment définir la langue ?"},"faq_8_a":{"nl":"Klik op \"Settings\" (instellingen), vervolgens op \"More\" (meer) en in het Language (taal) menu kan je bijvoorbeeld \"Dutch\"(nederlands) (of een andere taal) selecteren. Klik op OK.","en":"Click \"Settings\", then \"More\" and in the Language menu you can choose a different language. To complete the change, click OK.","fr":"Cliquez sur \"Settings\" (paramètres), puis sur \"More\" (plus) et dans le menu \"Language\" (langue), vous pouvez choisir une autre langue. Pour terminer le changement, cliquez sur OK"},"faq_9":{"nl":"Het beeld hapert soms","en":"The screen sometimes hangs","fr":"L'image subit parfois des ralentissements"},"faq_9_a":{"nl":"Verlaag de kwaliteit van de video. <br/>Bij laptop of computer met echt toetsenbord: Druk op A en verlaag de kwaliteit tot lage resolutie.<br/>Bij mobiele toestellen: druk op de 3 puntjes, kies voor modus \"Alleen audio\" inschakelen (dan is er geen video voor deze mobiele deelnemer).","en":"Lower the quality of the video. <br/>Using a computer or laptop: press \"A\" on your keyboard and lower the resolution.<br/>For mobile devices: press the 3 dots and select \"audio only\". Other people will not be able to see you anymore.","fr":"Réduire la qualité de la vidéo. <br/> Pour un ordinateur portable ou un ordinateur avec un vrai clavier : appuyez sur A et réduisez la qualité à une faible résolution.<br/>Pour les appareils mobiles : appuyez sur les 3 points, choisissez le mode \"Audio only\" (il n'y a alors pas de vidéo pour ce participant mobile)."},"faq_10":{"nl":"Wat zijn de minimum specificaties?","en":"What are the minimum requirements?","fr":"Quelles sont les spécifications minimales ?"},"faq_10_a":{"nl":"De app \"Jitsi Meet\" heeft op Apple iPad of iPhone toestellen minimum iOS 11.0 of hoger nodig: <a href=\"https://itunes.apple.com/us/app/jitsi-meet/id1165103905\">https://itunes.apple.com/us/app/jitsi-meet/id1165103905</a>.<br/>op Android toestellen heeft de app minimum Android 5.0 of hoger nodig. <a href=\"https://play.google.com/store/apps/details?id=org.jitsi.meet\">https://play.google.com/store/apps/details?id=org.jitsi.meet</a>.<br/>Op een gewone laptop of PC gebruik je best een recente versie van <a href=\"https://www.google.com/intl/nl/chrome/\">Google Chrome</a>.","en":"The app \"Jitsi Meet\" for Apple iPad or iPhone needs at least iOS 11.0 or higher: <a href=\"https://itunes.apple.com/us/app/jitsi-meet/id1165103905\">https://itunes.apple.com/us/app/jitsi-meet/id1165103905</a>.<br/> For Android deviced the app needs Android 5.0 or higher. <a href=\"https://play.google.com/store/apps/details?id=org.jitsi.meet\">https://play.google.com/store/apps/details?id=org.jitsi.meet</a>.<br/>On laptop or desktop we recommend the latest version of <a href=\"https://www.google.com/intl/nl/chrome/\">Google Chrome</a>.","fr":"L'application \"Jitsi Meet\" sur les appareils Apple iPad ou iPhone nécessite au minimum iOS 11.0 ou supérieur : <a href=\"https://itunes.apple.com/us/app/jitsi-meet/id1165103905\">https://itunes.apple.com/us/app/jitsi-meet/id1165103905</a>.<br/> Sur les appareils Android, l'application nécessite au minimum Android 5.0 ou supérieur. <a href=\"https://play.google.com/store/apps/details?id=org.jitsi.meet\">https://play.google.com/store/apps/details?id=org.jitsi.meet</a>.<br/>Sur un ordinateur portable ou PC ordinaire, il est préférable d'utiliser une version récente de <a href=\"https://www.google.com/intl/nl/chrome/\">Google Chrome</a>."},"faq_11":{"nl":"Ik krijg in de Chrome browser een venster rechts boven, wat moet ik doen?","en":"In Google Chrome, I get a window in the top right corner. What should I do?","fr":"Une fenêtre apparaît en haut à droite (dans le navigateur Chrome). Que dois-je faire ?"},"faq_11_a":{"nl":"Klik op het vakje naast \"Don’t show me this again\" en vervolgens op het kruisje rechtsboven. Dit hoef je niet te installeren.","en":"Click \"Don't show me this again\" and close the window. You don't need to install anything.","fr":"Cliquez sur la case à côté de \"Don't show me this again\" et ensuite sur la croix en haut à droite. Vous n'avez pas besoin d'installer ceci."},"faq_12":{"nl":"ik krijg in Chrome de meldingen \"error obtaining microphone permission\" en \"Error obtaining camera permission\"","en":"In Chrome I get the messages \"error obtaining microphone permission\" and \"Error obtaining camera permission\"","fr":"Dans Chrome, je reçois les messages \"error obtaining microphone permission\" et \"Error obtaining camera permission\""},"faq_12_a":{"nl":"Klik op het slotje naast de url \"praatbox.be\" en kies voor zowel de microfoon als camera voor toestaan. Klik op het kruisje om de popup te sluiten. Klik op “opnieuw laden”.","en":"Click the lock icon next to the url \"praatbox.be\" and choose to allow both your microphone and camera. Close the popup. Click “reload”.","fr":"Cliquez sur le cadenas à côté de l'url \"praatbox.be\" et choisissez à la fois le microphone et la caméra pour autoriser l'accès. Cliquez sur la croix pour fermer le popup. Cliquez sur \"recharger\"."},"placeholder-name":{"nl":"Deze naam kan je helemaal zelf kiezen","en":"You can choose this name yourself","fr":"Vous pouvez choisir ce nom tout seul"},"placeholder-location":{"nl":"Verwijzing naar je locatie","en":"Reference to your location","fr":"Référence à votre lieu de résidence"},"go-back":{"nl":"Terug","en":"Back","fr":"Retourner"}};

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
