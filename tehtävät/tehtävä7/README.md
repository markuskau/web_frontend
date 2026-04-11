# Tehtävä 7

## Tavoite

Tehtävän tavoitteena oli ohjata Robot Framework -testien loki- ja raporttitiedostot erilliseen `outputs/`-kansioon.

## Toteutus

Testien ajossa käytettiin Robot Frameworkin `-d` (output directory) -parametria, jonka avulla voidaan määrittää kansio, johon testien tulokset tallennetaan.

Testit suoritetaan komennolla:

```
robot -d outputs tests
```


Testien tulosten ohjaaminen onnistuu helposti käyttämällä `-d outputs` -parametria, joka parantaa projektin rakennetta ja pitää testitulokset erillään muusta koodista.
