# praatbox

Bijdrage leveren? Dat kan!
* Maak een fork en een pull request.
* Meld problemen via de [issues](https://github.com/MakeInBelgium/babbelbox/issues).

## Kom er bij!
Neem dan deel aan de conversatie op de Slack workspace van de Corona-denktank Make in Belgium: https://join.coronadenktank.be (Kanaal: #corona-babbelbox).


# local server
Zelf een lokale server opzetten? Dat kan op verschillende manieren!

## met python
Eenvoudig lokaal previewen met het terminal-commando: `python3 -m http.server 8000` (of `python -m http.server 8000` als python 3 je standaardpython is)
De praatbox is vervolgens bereikbaar op `http://localhost:8000`

## met php
Heb je php op je computer geïnstalleerd? Gebruik dan de PHP built-in webserver:

```
$> php -S 0.0.0.0:8000
```

De praatbox is vervolgens bereikbaar op `http://localhost:8000`

## met docker
Gebruik de `Dockerfile` om een image te builden. Zie `docker-run.sh` voor een voorbeeld van hoe het in productie wordt gedraaid. Hiervoor gebruiken we een set-up met Traefik, voor de config, zie de repository van [solidariteitsnetwerk](https://github.com/MakeInBelgium/solidariteitsnetwerk/tree/master/deployment).

# Vertalen
Alle tekst die gebruikt wordt, zit in `praatbox.pot`. Dit is een standaard bestandtype voor vertalingen. Met het gratis programma [POedit]() kan je op basis hiervan een vertaling maken. Deze sla je dan op als [isocode].po, bvb `fr.po`

Voor de teksten die door Javascript gegenereerd worden (in ./assets/app.js staan), zullen we de weergave automatiseren, voor de teksten die in HTML staan, is dit een manueel proces obv de voorziene .po files.