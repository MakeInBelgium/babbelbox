# praatbox

Bijdrage leveren? Dat kan!
* Maak een fork en een pull request.
* Meld problemen via de [issues](https://github.com/MakeInBelgium/babbelbox/issues).

## Kom er bij!

Neem dan deel aan de conversatie op de Slack workspace van de Corona-denktank Make in Belgium: https://join.coronadenktank.be (Kanaal: #corona-babbelbox).

## met python

Eenvoudig lokaal previewen met een van onderstaande terminal-commando's:

* `cd public && python3 -m http.server 8000` of (`cd public && python -m http.server 8000` als python 3 je standaardpython is)
* `cd public && python -m SimpleHTTPServer`

De praatbox is vervolgens bereikbaar op `http://localhost:8000`

## Met php

Heb je php op je computer geïnstalleerd? Gebruik dan de PHP built-in webserver:

```
$> cd public && php -S 0.0.0.0:8000
```

De praatbox is vervolgens bereikbaar op `http://localhost:8000`

## Changes live zetten

Elke aanpassing die in de `master` branch ge-merged wordt, komt automatisch online na 5 minuten op www.praatbox.be. Dit is het deploy-script op de server.

```bash
cd /var/www/html/praatbox.be/repo
git checkout .

VERSION=$(git rev-parse --short HEAD)

git pull

sed -i "s|{VERSION}|$VERSION|g" index.html
```

Bij hosting vragen: #team-tech-hosting op de Make In Belgium Slack.