// make sure it is always set.
if(!localStorage.getItem('activeLanguage')) {
    localStorage.setItem('activeLanguage','nl');
}
let translations;

function init() {
    //Fetch will use caching
    fetch('./languages.json')
        .then((response) => response.json())
        .then((data) => {
            translations = data;
        })
        .catch((error) => {
            console.error('Error:', error);
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
    init();
    localStorage.setItem('activeLanguage', lang);
}