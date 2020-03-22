// make sure it is always set.
if(!localStorage.getItem('activeLanguage')) {
    localStorage.setItem('activeLanguage','nl');
}
let translations;

function fillPageContent() {
    //Fetch will use caching
    fetch('./data/translations.json')
        .then((response) => response.json())
        .then((data) => {
            translations = data;
            // Replace existing text with text for the newly selected language
            replaceContent();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function replaceContent() {
    // Will find each element with the "key" attribute and will replace the HTML content with the translated value.
    $('[key]').each(function(index, item) {
        let keyValue = $(this).attr('key');
        $(this).html(getTranslation(keyValue));
    });
}

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
    fillPageContent();
}

function setLanguageDutch() {
    setPageLanguage('nl');
}

function setLanguageEnglish() {
    setPageLanguage('en');
}

function setLanguageFrench() {
    setPageLanguage('fr');
}