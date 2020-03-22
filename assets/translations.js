// make sure it is always set.
if(!localStorage.getItem('activeLanguage')) {
    localStorage.setItem('activeLanguage','nl');
}

function getTranslation(key) {
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
function setLanguage(lang) {
    localStorage.setItem('activeLanguage', lang);
    $('[key]').each(function(index, item) {
        let keyValue = $(this).attr('key');
        $(this).html(getTranslation(keyValue));
    });
}

function setLanguageDutch() {
    setLanguage('nl');
}

function setLanguageEnglish() {
    setLanguage('en');
}

var translations = {
    'javascript-disabled': {
        'nl': 'Je hebt Javascript uitgeschakeld. Javascript is noodzakelijk voor Praatbox.',
        'en': 'You have disable Javascript. Javascript is required for Praatbox'
    },
    'intro': {
        'nl': 'Met Praatbox kan je videobellen met iemand waar je geen fysiek contact mee mag hebben.',
        'en': "Praatbox allows you to videocall someone you can't have physical contact with."
    },
    'how-to-use': {
        'nl': 'Hoe gebruik je de Praatbox?',
        'en': "How to use Praatbox?"
    },
    'steps-1': {
        'nl': 'Geef je Praatbox een naam. Bedenk een naam en vul die in het eerste veld in, of vul de naam in die je hebt gekregen.',
        'en': 'Give your Praatbox a name. Make up a name and type it in the first field. <br/>  For an existing Praatbox, fill in the name you got from your contact.'
    },
    'steps-2': {
        'nl': 'Geef je Praatbox een locatie. Vul dit in het tweede veld in, of vul hier de locatie in die je hebt gekregen.',
        'en': 'Give your Praatbox a location. Type your location into the second field. <br/> For an existing Praatbox, fill in the location you got from your contact.'
    },
    'steps-3': {
        'nl': 'Kies een willekeurig woord, of hou de automatisch gemaakte keuze. Wil je deelnemen aan een bestaande Praatbox, kies dan het woord dat je hebt gekregen.',
        'en': 'Either choose a random word, or keep the automatically generated one. <br/>  For an existing Praatbox, choose the word you got from your contact.'
    },
    'steps-4': {
        'nl': 'Als je de vorige stappen hebt ondernomen, klik je op "Start de praatbox',
        'en': 'If you have executed the steps above, click the "Start Praatbox" button'
    },
    'steps-5': {
        'nl': 'De Praatbox start op! <br />(Daarna kan je eventueel je praatbox beveiligen met een paswoord. Zie <i class="fas fa-info-circle"></i> rechts onderaan)',
        'en': 'The Praatbox is starting! <br />(Afterwards, you can secure it with a password. See <i class="fas fa-info-circle"></i> bottom-right corner)'
    },
    'steps-6': {
        'nl': 'Je kan deze praatbox nu delen op allerlei verschillende manieren, het enige wat je moet doen is de link kopiëren.',
        'en': 'Je kan deze praatbox nu delen op allerlei verschillende manieren, het enige wat je moet doen is de link kopiëren.'
    },
    'steps-more-questions': {
        'nl': 'Heb je nog vragen? Misschien vind je ze terug bij de <a href="/vragen.html">veelgestelde vragen</a>.',
        'en': 'Got more questions? Maybe you can find an answer in the <a href="/vragen.html">frequently asked questions</a>.'
    },
    'start-a-box': {
        'nl': 'Start een Praatbox',
        'en': 'Start Praatbox'
    },
    'name-limitations': {
        'nl': 'Opgelet! <br><span>Gebruik enkel cijfers en letters in de velden</span>',
        'en': 'Beware! <br><span>Only use numbers and letters in the input fields</span>'
    },
    'input-too-long': {
        'nl': 'Input te lang',
        'en': 'Input is too long',
    },
    'praatbox-name': {
        'nl': 'Naam van je Praatbox',
        'en': 'Name of your Praatbox',
    },
    'praatbox-location': {
        'nl': 'Locatie van je Praatbox',
        'en': 'Location of your Praatbox',
    },
    'random-word': {
        'nl': 'Willekeurig woord',
        'en': 'Random word',
    },
    'start-praatbox': {
        'nl': 'Start de Praatbox',
        'en': 'Start the Praatbox',
    },
    'how-to-use': {
        'nl': 'Hoe gebruik je de Praatbox?',
        'en': 'How do you use the Praatbox?',
    },
    'faq': {
        'nl': 'Veelgestelde vragen',
        'en': 'Frequently asked questions',
    },
    'meeting-header-text': {
        'nl': 'Vul op <strong><a href="https://www.praatbox.be">www.praatbox.be</a></strong><span class="wrd_disp" id="wrd_disp_a"></span> <span class="wrd_disp" id="wrd_disp_b"></span> <span class="wrd_disp" id="wrd_disp_c"></span> in om mee te doen.',
        'en': 'Enter on <strong><a href="https://www.praatbox.be">www.praatbox.be</a></strong><span class="wrd_disp" id="wrd_disp_a"></span> <span class="wrd_disp" id="wrd_disp_b"></span> <span class="wrd_disp" id="wrd_disp_c"></span> to participate.'
    },
    'copy-link': {
        'nl': 'Kopieer link',
        'en': 'Copy link',
    },
    'reload': {
        'nl': 'Herladen',
        'en': 'Reload',
    },

    // Technical errors
    'no_webrtc': {
        'nl': 'Je browser ondersteunt videobellen niet. Je gebruikt best Chrome voor Praatbox.',
        'en': "Your browser doesn't support videoconferencing. We recommend using Praatbox with Chrome."
    },
    'no_cam': {
        'nl': 'Praatbox kan geen camera (webcam) vinden. Je hebt een camera nodig om Praatbox te gebruiken.',
        'en': "Praatbox could not find a webcam. You need a camera if you want to use Praatbox."
    },
    'no_mic': {
        'nl': 'Praatbox kan geen microfoon vinden. Je hebt een microfoon nodig om Praatbox te gebruiken.',
        'en': "Praatbox could not find a microphone. You need a microphone if you want to use Praatbox."
    },
    'no_chrome': {
        'nl': 'Je gebruikt een andere webbrowser dan <a href="https://www.google.com/intl/nl/chrome/">Chrome</a>. Praatbox werkt het best in <a href="https://www.google.com/intl/nl/chrome/">Chrome</a>.',
        'en': 'You are using a different webbrowser than <a href="https://www.google.com/intl/nl/chrome/">Chrome</a>. Praatbox works best with <a href="https://www.google.com/intl/nl/chrome/">Chrome</a>.',
    },
    'mobile': {
        'nl': 'Het lijkt erop dat je op een <strong>mobiel toestel</strong> werkt. Gelieve eerst te controleren of je de applicatie al hebt geïnstalleerd.',
        'en': "If looks like you are using Praatbox on a <strong>mobiel device</strong>. Please check if you have installed the required application."
    },
    'install_app': {
        'nl': 'Installeer de app',
        'en': "Install the app"
    },
    'errors': {
        'nl': 'Je praatbox werkt mogelijk niet goed',
        'en': "Your praatbox doesn't seem to be working correctly"
    },
    'link_copied': {
        'nl': 'Link gekopieerd',
        'en': "Link copied"
    },
    'max_chars': {
        'nl': 'Gelieve de naam en locatie van je praatbox te beperken tot maximaal 100 letters of cijfers.',
        'en': 'Please limit the name and the location of your praatbox to a maximum of 100 numbers or letters.'
    },
    'min_chars': {
        'nl': 'Gelieve voor de naam van je praatbox minstens 5 letters of cijfers te voorzien.',
        'en': 'Please provide at least 5 numbers or letters for the name of your praatbox.'
    },

    //FAQ
    'faq_1': {
        'nl': 'Wat gebeurt er als ik geen paswoord instel?',
        'en': 'What happens if I do not configure a password?'
    },
    'faq_1_a': {
        'nl': 'Indien je geen paswoord instelt kan iedereen ter wereld het videogesprek bijwonen. Het is alsof de virtuele voordeur openstaat en iedereen plots in een gesprek kan inspringen. Dit kan soms verschieten zijn, dus we raden sterk aan om een paswoord in te stellen (ook voor privacy redenen kan dit noodzakelijk zijn).',
        'en': "If you do not configure a password anyone in the world can join your video call. You can compare it to leaving your virtual door open. Anyone can join the conversation. This is most often not what you want. This is why we recommend setting a password."
    },
    'faq_2': {
        'nl': 'Hoe kan ik een paswoord toevoegen aan mijn praatbox?',
        'en': "How can I configure a password for my praatbox?"
    },
    'faq_2_a': {
        'nl': 'De eerste persoon die de praatbox opstart kan een paswoord toe voegen door:',
        'en': "The first person to enter the praatbox can enter a password by:"
    },
    'faq_2_a_li_1': {
        'nl': 'te klikken op <i class="fas fa-info-circle"></i> (rechts onderaan in je scherm te vinden)',
        'en': 'clicking <i class="fas fa-info-circle"></i> (bottom right corner of the screen)',
    },
    'faq_2_a_li_2': {
        'nl': 'vervolgens op "Add password" klikken. Typ een sterk paswoord in het veld en druk op enter.',
        'en': 'click "Add password". Type a password in the field and press enter.'
    },
    'faq_2_a_end': {
        'nl': 'Het paswoord is pas actief als je de tekst "cancel password" niet meer ziet, of ook als je de tekst "remove password" ziet.',
        'en': 'Het password will be active as soon as you no longer see the "cancel password", or if you see "remove password"'
    },
    'faq_2_img': {
        'nl': 'Beeld: Screenshot',
        'en': 'Image: Screenshot'
    },
    'faq_3': {
        'nl': 'Kan ik een paswoord terug verwijderen?',
        'en': 'Can I remove a password after I added it?'
    },
    'faq_3_a': {
        'nl': 'Ja, de eerste persoon (laptop / computer) die het videogesprek aangemaakt heeft kan een paswoord verwijderen door te klikken op "remove password".',
        'en': 'Yes! The person who created the Praatbox can remove the password again by clicking "Remove Password".'
    },
    'faq_4': {
        'nl': 'Wat is een sterk paswoord?',
        'en': 'What is a good password?'
    },
    'faq_4_a': {
        'nl': 'Minstens 8 karakters, liefst een mix van letters en cijfers. Nog sterker is om een leesteken toe te voegen, maar dat is niet noodzakelijk.',
        'en': 'Use at least 8 characters, preferably a mix of letters and numbers. Using other symbols is a plus, but not required.'
    },
    'faq_5': {
        'nl': 'Voor rusthuizen/ziekenhuizen: Is het mogelijk om per bewoner een babbelbox sessie op te zetten, enkel voor zijn/haar familie?',
        'en': 'For retirement homes/hospitals: Is it possible to create a Praatbox for a single person and his/her family?'
    },
    'faq_5_a': {
        'nl': 'Door slim om te gaan met het laatste keuzewoord, kan je zelf een schema opstellen wanneer welke bewoner een babbelbox contactmoment heeft met enkel zijn/haar familie. <br/>Voorbeeld: <br/>Eerste woord: naam van je WZC<br/>Tweede woord: gemeente of iets anders<br/>Derde woord: dit kies je op voorhand voor elke bewoner. <br/><br/>Je spreekt dan bijvoorbeeld een schema af<br/>14:00 Bewoner Anna, derde woord is kip<br/>14:30 Bewoner Bert, derde woord is kat',
        'en': 'By being creative with the last word of choice, you can setup a schedule for all the inhabitants and their families. <br/>Example: <br/>First word: name of your hospital/retirement home<br/>Second word: your location<br/>Third word: choose this for each specific inhabitant. <br/><br/>This way, you can determine a shedule: <br/>14:00 Inhabitant Anna, 3rd word is "kip"<br/>14:30 Inhabitant Bert, 3rd word is kat'
    },
    'faq_6': {
        'nl': 'Ik krijg geen beeld te zien en/of mensen horen me niet',
        'en': "I am not seeing anything and/or people can't hear me"
    },
    'faq_6_a': {
        'nl': 'Bij het openen van het videogesprek vraagt je internetbrowser om toegang tot je microfoon en camera. Druk hier steeds op toestaan (allow). Het popupvenster dat je hiervoor te zien krijgt ziet er verschillend uit afhankelijk van je internet browser of besturingssysteem.',
        'en': 'When you open the video-call, your internetbrowser will ask you for permission to access your microphone and camera. Make sure you press "allow" on the following screen. It may look slightly different based on what browser you are using.'
    },
    'faq_6_ttl_img': {
        'nl': 'Enkele voorbeelden:',
        'en': 'A few examples:'
    },
    'faq_6_a_end': {
        'nl': 'Indien het niet lukt, probeer dan een andere internetbrowser om het videogesprek te openen. <br/><a href="https://www.google.com/intl/nl/chrome/">Google Chrome</a> geeft (doorgaans) het minste problemen en kan je downloaden via <a href="https://www.google.com/intl/nl/chrome/">https://www.google.com/intl/nl/chrome/</a>.<br/>De Safari browser (standaard op Apple producten) wordt afgeraden.',
        'en': 'In case it is not working, try a different internetbrowser. <br/><a href="https://www.google.com/intl/nl/chrome/">Google Chrome</a> is recommended. You can download it at <a href="https://www.google.com/intl/nl/chrome/">https://www.google.com/intl/nl/chrome/</a>.<br/>The Safari browser (standard on Apple products) is not recommended.'
    },
    'faq_7': {
        'nl': 'Hoe ziet een Praatbox sessie met meerdere deelnemers er uit?',
        'en': "What does a Praatbox session with multiple participants look like?"
    },
    'faq_7_a': {
        'nl': 'De verschillende beelden komen dan naast en onder elkaar te staan:',
        'en': 'The different images will be placed next to eachother'
    },
    'faq_7_ttl_img': {
        'nl': 'Beeld: Mozaïekbeeld van video',
        'en': 'Image: Example of multi-person call'
    },
    'faq_8': {
        'nl': 'Hoe stel ik de taal in?',
        'en': "How do I configure a language?"
    },
    'faq_8_a': {
        'nl': 'Klik op "Settings" (instellingen), vervolgens op "More" (meer) en in het Language (taal) menu kan je bijvoorbeeld "Dutch"(nederlands) (of een andere taal) selecteren. Klik op OK.',
        'en': 'Click "Settings", then "More" and in the Language menu you can choose a different language. To complete the change, click OK.'
    },
    'faq_9': {
        'nl': 'Het beeld hapert soms',
        'en': "The screen sometimes hangs"
    },
    'faq_9_a': {
        'nl': 'Verlaag de kwaliteit van de video. <br/>Bij laptop of computer met echt toetsenbord: Druk op A en verlaag de kwaliteit tot lage resolutie.<br/>Bij mobiele toestellen: druk op de 3 puntjes, kies voor modus "Alleen audio" inschakelen (dan is er geen video voor deze mobiele deelnemer).',
        'en': 'Lower the quality of the video. <br/>Using a computer or laptop: press "A" on your keyboard and lower the resolution.<br/>For mobile devices: press the 3 dots and select "audio only". Other people will not be able to see you anymore.'
    },
    'faq_10': {
        'nl': 'Wat zijn de minimum specificaties?',
        'en': "What are the minimum requirements?"
    },
    'faq_10_a': {
        'nl': 'De app "Jitsi Meet" heeft op Apple iPad of iPhone toestellen minimum iOS 11.0 of hoger nodig: <a href="https://itunes.apple.com/us/app/jitsi-meet/id1165103905">https://itunes.apple.com/us/app/jitsi-meet/id1165103905</a>.<br/>op Android toestellen heeft de app minimum Android 5.0 of hoger nodig. <a href="https://play.google.com/store/apps/details?id=org.jitsi.meet">https://play.google.com/store/apps/details?id=org.jitsi.meet</a>.<br/>Op een gewone laptop of PC gebruik je best een recente versie van <a href="https://www.google.com/intl/nl/chrome/">Google Chrome</a>.',
        'en': 'The app "Jitsi Meet" for Apple iPad or iPhone needs at least iOS 11.0 or higher: <a href="https://itunes.apple.com/us/app/jitsi-meet/id1165103905">https://itunes.apple.com/us/app/jitsi-meet/id1165103905</a>.<br/> For Android deviced the app needs Android 5.0 or higher. <a href="https://play.google.com/store/apps/details?id=org.jitsi.meet">https://play.google.com/store/apps/details?id=org.jitsi.meet</a>.<br/>On laptop or desktop we recommend the latest version of <a href="https://www.google.com/intl/nl/chrome/">Google Chrome</a>.'
    },
    'faq_11': {
        'nl': 'Ik krijg in de Chrome browser een venster rechts boven, wat moet ik doen?',
        'en': "In Google Chrome, I get a window in the top right corner. What should I do?"
    },
    'faq_11_a': {
        'nl': 'Klik op het vakje naast "Don’t show me this again" en vervolgens op het kruisje rechtsboven. Dit hoef je niet te installeren.',
        'en': "Click \"Don't show me this again\" and close the window. You don't need to install anything."
    },
    'faq_12': {
        'nl': 'ik krijg in Chrome de meldingen “error obtaining microphone permission" en "Error obtaining camera permission"',
        'en': "In Chrome I get the messages “error obtaining microphone permission\" and \"Error obtaining camera permission\""
    },
    'faq_12_a': {
        'nl': 'Klik op het slotje naast de url “praatbox.be” en kies voor zowel de microfoon als camera voor toestaan. Klik op het kruisje om de popup te sluiten. Klik op “opnieuw laden”.',
        'en': "Click the lock icon next to the url “praatbox.be” and choose to allow both your microphone and camera. Close the popup. Click “reload”."
    },



};