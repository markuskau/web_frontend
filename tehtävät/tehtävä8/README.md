# Tehtävä 8

## Tavoite
Tehtävässä tarkoituksena oli luoda GitHub Pages -sivusto ja julkaista Robot Framework -testien HTML-raportit (log ja report) sivustolla.


## Toteutus

GitHub Pages otettiin käyttöön käyttämällä `docs/`-kansiota sivuston lähteenä.

Sivusto löytyy osoitteesta:
https://markuskau.github.io/web_frontend/

Sivustolla on kaksi linkkiä:
- Test Report
- Test Log


## Testien ajaminen

Testit ajetaan komennolla:

```bash
robot -d outputs tests
