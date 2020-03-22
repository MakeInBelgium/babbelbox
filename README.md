# praatbox

Bijdrage leveren? Dat kan!
* Maak een fork en een pull request.
* Meld problemen via de [issues](https://github.com/MakeInBelgium/babbelbox/issues).

## Kom er bij!
Neem dan deel aan de conversatie op de Slack workspace van de Corona-denktank Make in Belgium: https://join.coronadenktank.be (Kanaal: #corona-babbelbox).


# local server
Zelf een lokale server opzetten? Dat kan op verschillende manieren!

## met python
Eenvoudig lokaal previewen met een van onderstaande terminal-commando's: 

* `python3 -m http.server 8000` of (`python -m http.server 8000` als python 3 je standaardpython is)
* `python -m SimpleHTTPServer`

De praatbox is vervolgens bereikbaar op `http://localhost:8000`

## met php
Heb je php op je computer geïnstalleerd? Gebruik dan de PHP built-in webserver:

```
$> php -S 0.0.0.0:8000
```

De praatbox is vervolgens bereikbaar op `http://localhost:8000`

## met docker
Gebruik de `Dockerfile` om een image te builden. Zie `docker-run.sh` voor een voorbeeld van hoe het in productie wordt gedraaid. Hiervoor gebruiken we een set-up met Traefik, voor de config, zie de repository van [solidariteitsnetwerk](https://github.com/MakeInBelgium/solidariteitsnetwerk/tree/master/deployment).


# Vertalingen
Alle teksten die meertalig moeten aangeboden worden zijn terug te vinden in /assets/translations.js.
Deze file bevat zowel de vertalingen (key:value) als ook enkele functies door op verschillende pagina's en in de app.js gebruikt worden om de juiste vertaling op te halen.

- In Javascript files: gebruik de getTranslation(key) functie;
- In HTML files: gebruik een attribuut 'key' met als waarde een vertaalsleutel; De inhoud van het element zal vervangen worden (html, is mogelijk!) ex: <h2 key="start-a-box">NOT_TRANSLATED</h2>